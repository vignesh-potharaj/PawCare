import Navbar from "./components/Navbar";
import ScrollyHero from "./components/ScrollyHero";
import Services from "./components/Services";
import About from "./components/About";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Dynamic Header */}
      <Navbar />

      {/* Hero Section with Pinned Scroll Scrubbing */}
      <ScrollyHero />

      {/* Services Specialties Section */}
      <Services />

      {/* About & Compassionate Care Section */}
      <About />

      {/* Deep Navy Footer */}
      <Footer />
    </main>
  );
}
