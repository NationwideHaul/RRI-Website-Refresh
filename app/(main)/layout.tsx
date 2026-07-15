import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ScrollLine } from "@/components/blocks/scroll-line";

// Anchors the scroll-drawn line connects: from the top of the "Every coverage"
// panel, through each section, down to the footer. (Renders nothing on routes
// where these anchors don't exist.)
const SCROLL_LINE_ANCHORS = [
  "#coverage-panel",
  'section[aria-labelledby="reviews-heading"]',
  "#coverage-options",
  'section[aria-labelledby="about-heading"]',
  "#faq",
  'section[aria-labelledby="policy-review-heading"]',
  "footer",
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Nav />
      {/* Top padding clears the fixed floating nav. The home hero cancels
          this with a negative margin so its gradient runs up behind the nav. */}
      <main className="flex-1 pt-24">{children}</main>
      <Footer />
      <ScrollLine anchors={SCROLL_LINE_ANCHORS} />
    </div>
  );
}
