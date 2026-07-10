import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { TopBar } from "@/components/layout/top-bar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
