import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/pages/HomePage/Navbar";
interface LayoutProps {
  children: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col font-roboto">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
