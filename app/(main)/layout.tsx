import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      {/* Top padding clears the fixed floating nav. The home hero cancels
          this with a negative margin so its gradient runs up behind the nav. */}
      <main className="flex-1 pt-24">{children}</main>
      <Footer />
    </div>
  );
}
