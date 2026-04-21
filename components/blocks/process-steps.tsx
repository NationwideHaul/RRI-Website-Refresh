import { cn } from "@/lib/utils";

export type ProcessStep = {
  title: string;
  duration: string;
  detail: string;
};

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="relative grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-6">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li
            key={step.title}
            className={cn(
              "relative flex flex-col gap-3",
              !isLast &&
                "before:absolute before:left-[14px] before:top-11 before:h-[calc(100%-2rem)] before:w-px before:bg-gray-300 md:before:left-16 md:before:top-5 md:before:h-px md:before:w-[calc(100%-4.5rem)]",
            )}
          >
            <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-3">
              <span className="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-soft text-[18px] font-bold text-primary md:h-11 md:w-11">
                {index + 1}
              </span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-primary">
                {step.duration}
              </span>
            </div>
            <div className="flex flex-col gap-2 md:pl-0">
              <h3 className="text-[18px] font-semibold leading-[1.3] text-foreground">
                {step.title}
              </h3>
              <p className="text-[15px] leading-[1.55] text-gray-700">
                {step.detail}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
