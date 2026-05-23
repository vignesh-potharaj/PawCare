"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeartPulse, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollyHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isPreloaderFaded, setIsPreloaderFaded] = useState(false);

  // Total frames in your directory
  const frameCount = 244;
  const preloadedImagesRef = useRef<HTMLImageElement[]>([]);

  // Set starting frame explicitly to 0 (Array base index 0)
  const frameObjRef = useRef({ frame: 0 });

  // Returns path using zero-padded 1-based naming logic (001 to 244)
  const getFramePath = (index: number) => {
    return `/images/ezgif-frame-${String(index).padStart(3, "0")}.png`;
  };

  // Canvas draw helper with aspect-fill letterboxing
  const renderCanvas = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = winW * dpr;
    canvas.height = winH * dpr;
    canvas.style.width = `${winW}px`;
    canvas.style.height = `${winH}px`;
    ctx.scale(dpr, dpr);

    const imgW = img.width;
    const imgH = img.height;
    const imgRatio = imgW / imgH;
    const winRatio = winW / winH;

    let drawW = winW;
    let drawH = winH;
    let x = 0;
    let y = 0;

    if (winRatio > imgRatio) {
      drawH = winW / imgRatio;
      y = (winH - drawH) / 2;
    } else {
      drawW = winH * imgRatio;
      x = (winW - drawW) / 2;
    }

    ctx.clearRect(0, 0, winW, winH);
    ctx.drawImage(img, x, y, drawW, drawH);
  };

  // Preload frames into sequential indices safely
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    const preloadImages = () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = getFramePath(i);

        img.onload = () => {
          if (!isMounted) return;
          loaded++;
          setLoadedCount(loaded);
          if (loaded === frameCount) {
            preloadedImagesRef.current = images;
            setTimeout(() => {
              setIsPreloaderFaded(true);
              setTimeout(() => {
                setLoading(false);
              }, 800);
            }, 300);
          }
        };

        img.onerror = () => {
          if (!isMounted) return;
          loaded++;
          setLoadedCount(loaded);
          if (loaded === frameCount) {
            preloadedImagesRef.current = images;
            setTimeout(() => {
              setIsPreloaderFaded(true);
              setTimeout(() => {
                setLoading(false);
              }, 800);
            }, 300);
          }
        };

        images.push(img);
      }
    };

    preloadImages();

    return () => {
      isMounted = false;
    };
  }, []);

  // Initialize GSAP Scroll scrubbing configuration
  useEffect(() => {
    if (loading) return;

    // Render initial viewport frame instantly on load
    if (preloadedImagesRef.current[0]) {
      renderCanvas(preloadedImagesRef.current[0]);
    }

    const handleResize = () => {
      const currentIdx = Math.max(0, Math.min(frameCount - 1, Math.floor(frameObjRef.current.frame)));
      const img = preloadedImagesRef.current[currentIdx];
      if (img) renderCanvas(img);
    };
    window.addEventListener("resize", handleResize);

    // Using gsap.context maps targets securely and kills timeline overlaps
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: true,
          invalidateOnRefresh: true, // Recalculates canvas layout measurements if resized
        },
      });

      // Animate from index 0 to index 243 directly matching array structures
      tl.to(
        frameObjRef.current,
        {
          frame: frameCount - 1,
          ease: "none",
          duration: 10,
          onUpdate: () => {
            const currentIdx = Math.max(0, Math.min(frameCount - 1, Math.floor(frameObjRef.current.frame)));
            const img = preloadedImagesRef.current[currentIdx];
            if (img && img.complete) {
              renderCanvas(img);
            }
          },
        },
        0
      );

      // Beat 1 Text Sequence
      tl.fromTo(
        text1Ref.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        0.5
      );
      tl.to(
        text1Ref.current,
        { opacity: 0, y: -40, duration: 1.2, ease: "power2.in" },
        2.5
      );

      // Beat 2 Text Sequence
      tl.fromTo(
        text2Ref.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        4.0
      );
      tl.to(
        text2Ref.current,
        { opacity: 0, y: -40, duration: 1.2, ease: "power2.in" },
        6.0
      );

      // Beat 3 Text Sequence & Final Contrast Screen Overlay
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 0.5, duration: 1.5, ease: "none" },
        7.5
      );
      tl.fromTo(
        text3Ref.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.8, ease: "power3.out" },
        8.0
      );
    }, containerRef);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert(); // Secure clean up memory leaks upon unmounting
    };
  }, [loading]);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Preloader Overlay */}
      {loading && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F9F8F6] transition-all duration-1000 ease-in-out ${isPreloaderFaded ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
        >
          <div className="flex flex-col items-center max-w-sm px-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-clinic-teal flex items-center justify-center text-white mb-6 animate-pulse shadow-lg shadow-clinic-teal/20">
              <HeartPulse className="w-10 h-10" />
            </div>
            <h1 className="font-serif font-bold text-4xl text-navy-800 mb-2">
              Vet<span className="text-clinic-teal">Care</span>
            </h1>
            <p className="text-navy-800/60 font-sans text-sm tracking-wide mb-8">
              PREMIUM SCROLLYTELLING
            </p>
            <div className="w-64 h-1.5 bg-warm-300 rounded-full overflow-hidden mb-4 relative">
              <div
                className="h-full bg-clinic-teal transition-all duration-150 ease-out"
                style={{ width: `${(loadedCount / frameCount) * 100}%` }}
              ></div>
            </div>
            <div className="text-lg font-serif font-bold text-navy-800">
              {Math.round((loadedCount / frameCount) * 100)}%
            </div>
            <p className="text-xs text-navy-800/40 mt-1 font-sans">
              Caching cinematic frames for smooth playback...
            </p>
          </div>
        </div>
      )}

      {/* Hero Scroll Container */}
      <div ref={containerRef} className="relative h-[600vh] w-full bg-warm-100">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas ref={canvasRef} className="block w-full h-full object-cover" />
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-navy-900 pointer-events-none opacity-0"
          />

          {/* Beat 1 Text */}
          <div
            ref={text1Ref}
            className="absolute bottom-12 left-6 md:left-16 lg:left-24 max-w-md p-8 rounded-2xl glass-card shadow-lg opacity-0"
          >
            <span className="text-xs font-semibold text-clinic-blue uppercase tracking-wider block mb-2">
              Empathetic Treatment
            </span>
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-navy-800 leading-snug">
              Comprehensive care for your best friend.
            </h2>
            <div className="w-12 h-1 bg-clinic-teal mt-4 rounded-full"></div>
          </div>

          {/* Beat 2 Text */}
          <div
            ref={text2Ref}
            className="absolute bottom-12 right-6 md:right-16 lg:right-24 max-w-md p-8 rounded-2xl glass-card shadow-lg text-right opacity-0"
          >
            <span className="text-xs font-semibold text-clinic-teal uppercase tracking-wider block mb-2">
              Advanced Practice
            </span>
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-navy-800 leading-snug">
              Expert teams. State-of-the-art treatment.
            </h2>
            <div className="w-12 h-1 bg-clinic-blue ml-auto mt-4 rounded-full"></div>
          </div>

          {/* Beat 3 Text */}
          <div
            ref={text3Ref}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-auto opacity-0"
          >
            <span className="text-xs font-semibold text-clinic-teal uppercase tracking-widest block mb-4">
              Our Promise
            </span>
            <h2 className="font-serif font-bold text-4xl md:text-6xl text-white leading-tight max-w-3xl mb-8">
              Because they deserve better care.
            </h2>
            <a
              href="#contact"
              className="group flex items-center gap-2 px-8 py-4 rounded-full border border-white text-white font-semibold text-lg hover:bg-white hover:text-navy-900 transition-all duration-300 shadow-xl shadow-black/10"
            >
              Book Now
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}