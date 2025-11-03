import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function SiteLayout({ children }) {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Navbar />
        <AnnouncementBar />
      </div>
      <main>{children}</main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
