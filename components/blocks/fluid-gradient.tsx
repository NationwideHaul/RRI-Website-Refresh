"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Interactive fluid "noise gradient" background built on OGL (WebGL) with
 * custom GLSL shaders. A mouse-velocity-driven flowmap displaces a domain-
 * warped fbm noise field colored around the brand blue #225296, with a
 * subtle pseudo-3D light response in the fluid's wake.
 *
 * - requestAnimationFrame loop, paused when the tab is hidden or the
 *   section is out of view (IntersectionObserver + visibilitychange)
 * - Respects prefers-reduced-motion: renders one static frame, no listeners
 * - DPR capped (2 desktop / 1.5 coarse pointers) to hold 60fps on mobile
 * - CSS noise-gradient fallback paints instantly and stays if WebGL is
 *   unavailable; the canvas is aria-hidden and pointer-events: none
 */
export function FluidGradient({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      let ogl: typeof import("ogl");
      try {
        ogl = await import("ogl");
      } catch {
        return; // keep CSS fallback
      }
      if (cancelled || !containerRef.current) return;

      const { Renderer, Program, Mesh, Triangle, Flowmap, Vec2 } = ogl;

      const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

      let renderer: InstanceType<typeof Renderer>;
      try {
        renderer = new Renderer({
          dpr: Math.min(window.devicePixelRatio || 1, coarsePointer ? 1.5 : 2),
          alpha: false,
          antialias: false,
          depth: false,
        });
      } catch {
        return; // WebGL unavailable — CSS fallback stays
      }

      const gl = renderer.gl;
      const canvas = gl.canvas as HTMLCanvasElement;
      canvas.style.position = "absolute";
      canvas.style.inset = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      container.appendChild(canvas);

      const flowmap = new Flowmap(gl, {
        size: 128,
        falloff: 0.28,
        dissipation: 0.965,
      });

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: VERTEX,
        fragment: FRAGMENT,
        uniforms: {
          uTime: { value: 12.0 },
          uResolution: { value: new Vec2(1, 1) },
          tFlow: flowmap.uniform,
        },
      });
      const mesh = new Mesh(gl, { geometry, program });

      let aspect = 1;
      const resize = () => {
        const { width, height } = container.getBoundingClientRect();
        if (width === 0 || height === 0) return;
        renderer.setSize(width, height);
        aspect = width / height;
        program.uniforms.uResolution.value.set(width, height);
      };
      resize();
      const resizeObserver = new ResizeObserver(() => {
        resize();
        if (!running) renderOnce();
      });
      resizeObserver.observe(container);

      // ---- mouse / touch → flowmap velocity -------------------------------
      const mouse = new Vec2(-1, -1);
      const velocity = new Vec2();
      const lastMouse = new Vec2();
      let lastTime: number | null = null;
      let velocityNeedsUpdate = false;

      const onPointerMove = (e: PointerEvent | TouchEvent) => {
        // Touch is driven exclusively by touchmove (it keeps firing during
        // scroll, after pointercancel). Browsers dual-dispatch pointermove +
        // touchmove for the same finger move; processing both zeroes the
        // computed velocity and kills the wake on touch devices.
        if (!("changedTouches" in e) && (e as PointerEvent).pointerType === "touch") {
          return;
        }
        const point = "changedTouches" in e ? e.changedTouches[0] : e;
        if (!point) return;
        const rect = container.getBoundingClientRect();
        const x = point.clientX - rect.left;
        const y = point.clientY - rect.top;
        mouse.set(x / rect.width, 1 - y / rect.height);

        const now = performance.now();
        if (lastTime === null) {
          lastTime = now;
          lastMouse.set(x, y);
        }
        const deltaX = x - lastMouse.x;
        const deltaY = y - lastMouse.y;
        lastMouse.set(x, y);
        const delta = Math.max(14, now - lastTime);
        lastTime = now;
        velocity.set(deltaX / delta, -deltaY / delta);
        velocityNeedsUpdate = true;
      };

      // Listeners live on the parent section so content on top still drives
      // the fluid. Passive: never blocks scrolling.
      const eventHost = container.parentElement ?? container;
      eventHost.addEventListener("pointermove", onPointerMove, { passive: true });
      eventHost.addEventListener("touchmove", onPointerMove, { passive: true });

      // ---- render loop with visibility + in-view + reduced-motion gates ---
      let raf = 0;
      let lastFrame = 0;
      let running = false;
      let inView = true;

      const frame = (t: number) => {
        raf = requestAnimationFrame(frame);
        // Cap at ~60fps: on 120Hz+ displays extra frames double GPU cost
        // with zero visual benefit (the drift is time-based) and make the
        // flowmap dissipation refresh-rate dependent.
        if (t - lastFrame < 15) return;
        lastFrame = t;
        if (!velocityNeedsUpdate) {
          mouse.set(-1, -1);
          velocity.set(0, 0);
        }
        velocityNeedsUpdate = false;
        flowmap.aspect = aspect;
        flowmap.mouse.copy(mouse);
        flowmap.velocity.lerp(velocity, velocity.len() ? 0.5 : 0.1);
        flowmap.update();
        program.uniforms.uTime.value = t * 0.001;
        renderer.render({ scene: mesh });
      };

      const renderOnce = () => {
        flowmap.update();
        renderer.render({ scene: mesh });
      };

      const syncLoop = () => {
        const shouldRun =
          !reducedQuery.matches && inView && document.visibilityState === "visible";
        if (shouldRun && !running) {
          running = true;
          raf = requestAnimationFrame(frame);
        } else if (!shouldRun && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
        if (reducedQuery.matches) renderOnce(); // static noise gradient
      };

      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
          syncLoop();
        },
        { rootMargin: "100px" },
      );
      intersectionObserver.observe(container);

      const onVisibility = () => syncLoop();
      document.addEventListener("visibilitychange", onVisibility);
      const onReducedChange = () => syncLoop();
      reducedQuery.addEventListener("change", onReducedChange);

      syncLoop();
      renderOnce(); // paint immediately, even before the loop's first frame

      cleanup = () => {
        cancelAnimationFrame(raf);
        running = false;
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        reducedQuery.removeEventListener("change", onReducedChange);
        eventHost.removeEventListener("pointermove", onPointerMove);
        eventHost.removeEventListener("touchmove", onPointerMove);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        canvas.remove();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      // CSS fallback: brand-blue radial blend + SVG turbulence grain.
      // Visible until WebGL paints (and forever if WebGL is unavailable).
      style={{
        backgroundColor: "#1a3a6e",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"), radial-gradient(120% 140% at 15% 20%, #2f6ac0 0%, rgba(47,106,192,0) 55%), radial-gradient(110% 130% at 85% 80%, #0d1d3c 0%, rgba(13,29,60,0) 60%), linear-gradient(135deg, #225296 0%, #16386b 100%)`,
      }}
    />
  );
}

const VERTEX = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D tFlow;
varying vec2 vUv;

// Soft gaussian falloff around an anchor (aspect-corrected on x).
float gauss(vec2 uv, vec2 c, float r, float aspect) {
  vec2 d = vec2((uv.x - c.x) * aspect, uv.y - c.y);
  return exp(-dot(d, d) / (r * r));
}

// Smooth mesh gradient in the brand-blue family (ramp.com style): a few
// soft color anchors orbit slowly and blend with gaussian weights — no
// fbm noise and no per-frame grain, so the motion reads buttery-smooth.
// A gentle sinusoidal warp adds life; the cursor flowmap adds a soft
// liquid displacement + specular sheen on top. Static film grain lives in
// a CSS overlay above the canvas, so the texture never flickers.
void main() {
  vec3 flow = texture2D(tFlow, vUv).rgb;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  float t = uTime * 0.08;

  // Gentle large-scale warp (smooth sinusoids, not noise) + cursor flow
  vec2 uv = vUv;
  uv += 0.018 * vec2(sin(uv.y * 3.1 + t * 0.9), cos(uv.x * 3.3 - t * 0.8));
  uv += flow.xy * 0.10;

  // Brand palette
  vec3 cDeep  = vec3(0.043, 0.106, 0.224); // deep navy underlay
  vec3 cBrand = vec3(0.133, 0.322, 0.588); // #225296
  vec3 cMid   = vec3(0.180, 0.400, 0.680);
  vec3 cLight = vec3(0.360, 0.560, 0.860); // soft light blue

  // Slowly orbiting color anchors
  vec2 p1 = vec2(0.22 + 0.13 * sin(t * 0.60), 0.28 + 0.10 * cos(t * 0.50));
  vec2 p2 = vec2(0.78 + 0.11 * cos(t * 0.44), 0.30 + 0.13 * sin(t * 0.52));
  vec2 p3 = vec2(0.60 + 0.13 * sin(t * 0.38), 0.78 + 0.11 * cos(t * 0.60));
  vec2 p4 = vec2(0.18 + 0.10 * cos(t * 0.54), 0.82 + 0.10 * sin(t * 0.42));

  float w1 = gauss(uv, p1, 0.55, aspect);
  float w2 = gauss(uv, p2, 0.60, aspect);
  float w3 = gauss(uv, p3, 0.55, aspect);
  float w4 = gauss(uv, p4, 0.50, aspect);
  float wb = 0.35; // base weight keeps deep navy underlying everything

  vec3 col = (cLight * w1 + cBrand * w2 + cMid * w3 + cLight * w4 + cDeep * wb)
           / (w1 + w2 + w3 + w4 + wb);

  // Cursor wake: gentle specular sheen + faint cyan tint, no hard edges
  float flowAmt = clamp(length(flow.xy) * 1.4, 0.0, 1.0);
  vec3 normal = normalize(vec3(-flow.xy * 1.4, 1.0));
  vec3 lightDir = normalize(vec3(-0.35, 0.5, 0.8));
  float spec = pow(max(dot(reflect(-lightDir, normal), vec3(0.0, 0.0, 1.0)), 0.0), 12.0);
  col += spec * 0.12 * flowAmt;
  col += vec3(0.0, 1.0, 0.99) * flowAmt * 0.03;

  gl_FragColor = vec4(col, 1.0);
}
`;
