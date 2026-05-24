"use client";

import { useRef, useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import ScrollyHero from "./components/ScrollyHero";
import Services from "./components/Services";
import About from "./components/About";
import Footer from "./components/Footer";

export default function Home() {
  const navLogoRef = useRef<HTMLAnchorElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  const handlePreloaderDone = useCallback(() => {
    setIsAnimating(false);
  }, []);

  return (
    // Explicitly hide overflow-x here to prevent layout shifting during pin execution
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#F9F8F6]">
      {/* Dynamic Header with forced high z-index stacking */}
      <div className={isAnimating ? "invisible pointer-events-none" : ""}>
        <Navbar ref={navLogoRef} logoVisible={!isAnimating} />
      </div>

      {/* Hero Section with Pinned Scroll Scrubbing */}
      <div className="relative w-full z-10">
        <ScrollyHero
          navLogoRef={navLogoRef}
          onPreloaderDone={handlePreloaderDone}
        />
      </div>

      {/* Subsequent Content Sections wrapped to securely stack over/under pinning contexts */}
      <div className={`relative w-full z-20 bg-[#F9F8F6] ${isAnimating ? "hidden" : ""}`}>
        <Services />
        <About />
        <Footer />
      </div>
    </main>
  );
}