"use client";

import { useState, useEffect, forwardRef } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  /** Controls logo visibility — starts hidden (false) during preloader, revealed (true) after fly animation */
  logoVisible?: boolean;
}

const Navbar = forwardRef<HTMLAnchorElement, NavbarProps>(
  ({ logoVisible = true }, ref) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        // Hide navbar when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }

        setIsScrolled(currentScrollY > 50);
        setLastScrollY(currentScrollY);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const navLinks = [
      { label: "Services", href: "#services" },
      { label: "Our Team", href: "#about" },
      { label: "Facilities", href: "#facilities" },
      { label: "Contact", href: "#contact" },
    ];

    return (
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
          } ${isScrolled
            ? "glass-nav py-4 shadow-sm"
            : "bg-transparent py-2"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            ref={ref}
            href="#"
            className="flex items-center hover:opacity-90 transition-opacity"
            style={{
              opacity: logoVisible ? 1 : 0,
              transition: "opacity 0.15s ease",
            }}
          >
            <img
              src="/images/logo.png"
              alt="PawJoy Logo"
              className="h-[60px] w-auto object-contain"
            />
          </a>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-navy-800/80 hover:text-clinic-teal text-sm font-medium transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-clinic-teal transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Primary CTA (Desktop) */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full border border-clinic-teal text-clinic-teal font-semibold text-sm hover:bg-clinic-teal hover:text-white transition-all duration-300 shadow-sm shadow-clinic-teal/5"
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-navy-800 hover:text-clinic-teal transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`fixed inset-0 top-[72px] bg-warm-100 z-40 flex flex-col px-8 py-12 gap-8 md:hidden transition-transform duration-500 ease-in-out shadow-inner ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-navy-800 text-xl font-serif font-bold hover:text-clinic-teal transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="h-[1px] bg-warm-300 w-full"></div>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-4 rounded-xl bg-clinic-teal text-white font-semibold shadow-md shadow-clinic-teal/20 hover:bg-clinic-tealHover transition-colors duration-300"
          >
            Book Appointment
          </a>
        </div>
      </nav>
    );
  }
);

Navbar.displayName = "Navbar";

export default Navbar;
