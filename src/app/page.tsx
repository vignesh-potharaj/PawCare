import Navbar from "./components/Navbar";
import ScrollyHero from "./components/ScrollyHero";
import Services from "./components/Services";
import About from "./components/About";
import Footer from "./components/Footer";

export default function Home() {
  return (
    // Explicitly hide overflow-x here to prevent layout shifting during pin execution
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#F9F8F6]">
      {/* Dynamic Header with forced high z-index stacking */}
      <Navbar />

      {/* Hero Section with Pinned Scroll Scrubbing */}
      <div className="relative w-full z-10">
        <ScrollyHero />
      </div>

      {/* Subsequent Content Sections wrapped to securely stack over/under pinning contexts */}
      <div className="relative w-full z-20 bg-[#F9F8F6]">
        <Services />
        <About />
        <Footer />
      </div>
    </main>
  );
}