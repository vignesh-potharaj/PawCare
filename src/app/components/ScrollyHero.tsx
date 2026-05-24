"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ScrollyHeroProps {
  /** Ref to the real navbar logo <a> element for fly-to animation target */
  navLogoRef: React.RefObject<HTMLAnchorElement | null>;
  /** Callback to reveal the real navbar logo after overlay unmounts */
  onPreloaderDone: () => void;
}

export default function ScrollyHero({ navLogoRef, onPreloaderDone }: ScrollyHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Preloader refs
  const preloaderRef = useRef<HTMLDivElement>(null);
  const heroLogoRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [framesLoaded, setFramesLoaded] = useState(false);
  const logoScale = 3;
  const canvasDimensionsRef = useRef({ width: 0, height: 0 });

  // Total frames in your directory
  const frameCount = 244;
  const preloadedImagesRef = useRef<HTMLImageElement[]>([]);

  // Set starting frame explicitly to 0 (Array base index 0)
  const frameObjRef = useRef({ frame: 0 });

  // Returns path using zero-padded 1-based naming logic (001 to 244)
  const getFramePath = (index: number) => {
    return `/images/ezgif-frame-${String(index).padStart(3, "0")}.png`;
  };

  // Canvas draw helper with aspect-fill and smart mobile centering
  const drawFrameToCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width: winW, height: winH } = canvasDimensionsRef.current;
    if (winW === 0 || winH === 0) return;

    const imgW = img.width;
    const imgH = img.height;
    const imgRatio = imgW / imgH;
    const winRatio = winW / winH;

    let drawW = winW;
    let drawH = winH;
    let x = 0;
    let y = 0;

    if (winRatio < imgRatio) {
      // Narrow screens (mobile portrait): scale down to fit width to keep veterinary assistants visible
      drawW = winW;
      drawH = winW / imgRatio;
      x = 0;
      y = (winH - drawH) / 2;
    } else {
      // Wide screens: standard cover logic
      drawH = winH;
      drawW = winH * imgRatio;
      x = (winW - drawW) / 2;
      y = 0;
    }

    // Fill canvas background with theme's warm cream first to avoid flickering/white letterbox bars
    ctx.fillStyle = "#F9F8F6";
    ctx.fillRect(0, 0, winW, winH);
    ctx.drawImage(img, x, y, drawW, drawH);
  }, []);

  // Resize canvas dimensions and scale context once, avoiding layout thrashing
  const resizeCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const winW = window.innerWidth;
    const winH = window.innerHeight;

    // Cap dpr at 2 to avoid memory overhead and GPU stuttering
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = winW * dpr;
    canvas.height = winH * dpr;
    canvas.style.width = `${winW}px`;
    canvas.style.height = `${winH}px`;
    ctx.scale(dpr, dpr);

    canvasDimensionsRef.current = { width: winW, height: winH };

    // Redraw active frame
    const currentFrameIndex = Math.max(1, Math.min(frameCount, Math.floor(frameObjRef.current.frame)));
    const img = preloadedImagesRef.current[currentFrameIndex - 1];
    if (img && img.complete) {
      drawFrameToCanvas(img);
    } else if (preloadedImagesRef.current[0]) {
      drawFrameToCanvas(preloadedImagesRef.current[0]);
    }
  }, [drawFrameToCanvas]);

  // Preload frames into sequential indices safely
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    const onFrameReady = () => {
      if (!isMounted) return;
      loaded++;
      if (loaded === frameCount) {
        preloadedImagesRef.current = images;
        setFramesLoaded(true);
      }
    };

    const preloadImages = () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = getFramePath(i);
        img.onload = onFrameReady;
        img.onerror = onFrameReady;
        images.push(img);
      }
    };

    preloadImages();

    return () => {
      isMounted = false;
    };
  }, []);

  // Phase 2: Fly-to-navbar animation (triggers when all frames are loaded)
  useEffect(() => {
    if (!framesLoaded) return;

    const heroLogo = heroLogoRef.current;
    const navLogo = navLogoRef.current;
    const preloader = preloaderRef.current;
    if (!heroLogo || !navLogo || !preloader) {
      // Fallback: if refs are missing, just unmount
      setLoading(false);
      onPreloaderDone();
      return;
    }

    const ctx = gsap.context(() => {
      const heroRect = heroLogo.getBoundingClientRect();
      const navRect = navLogo.getBoundingClientRect();

      // Calculate the scale ratio (nav logo size / hero logo size)
      const scaleTarget = logoScale * (navRect.width / heroRect.width);

      // Calculate translation deltas (center-to-center, then adjust for scale)
      const heroCenterX = heroRect.left + heroRect.width / 2;
      const heroCenterY = heroRect.top + heroRect.height / 2;
      const navCenterX = navRect.left + navRect.width / 2;
      const navCenterY = navRect.top + navRect.height / 2;

      const deltaX = navCenterX - heroCenterX;
      const deltaY = navCenterY - heroCenterY;

      // Make overlay non-interactive during fly phase
      preloader.style.pointerEvents = "none";

      gsap.to(heroLogo, {
        x: deltaX,
        y: deltaY,
        scale: scaleTarget,
        duration: 1.2,
        ease: "expo.inOut",
        onComplete: () => {
          // Fade out the overlay background
          gsap.to(preloader, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              setLoading(false);
              onPreloaderDone();
            },
          });
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, [framesLoaded, navLogoRef, onPreloaderDone]);

  // Initialize GSAP Scroll scrubbing configuration
  useEffect(() => {
    if (loading) return;

    // Set initial size and render first frame
    resizeCanvasDimensions();

    // Use requestAnimationFrame for throttled resize handler to prevent stutters
    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) {
        window.cancelAnimationFrame(resizeTimeout);
      }
      resizeTimeout = window.requestAnimationFrame(() => {
        resizeCanvasDimensions();
      });
    };
    window.addEventListener("resize", handleResize);

    // Using gsap.context maps targets securely and kills timeline overlaps
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5000",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // Animate from frame index 1 directly to the total frame count
      tl.to(
        frameObjRef.current,
        {
          frame: frameCount,
          ease: "none",
          duration: 10,
          onUpdate: () => {
            // Clamp between 1 and 244 to strictly match folder contents
            const currentFrameIndex = Math.max(1, Math.min(frameCount, Math.floor(frameObjRef.current.frame)));

            // Array base index is currentFrameIndex - 1
            const img = preloadedImagesRef.current[currentFrameIndex - 1];

            if (img && img.complete) {
              drawFrameToCanvas(img);
            }
          },
        },
        0
      );

      // Text Beat Timings
      tl.fromTo(text1Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, 0.5);
      tl.to(text1Ref.current, { opacity: 0, y: -40, duration: 1.2, ease: "power2.in" }, 2.5);

      tl.fromTo(text2Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, 4.0);
      tl.to(text2Ref.current, { opacity: 0, y: -40, duration: 1.2, ease: "power2.in" }, 6.0);

      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 0.5, duration: 1.5, ease: "none" }, 7.5);
      tl.fromTo(text3Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.8, ease: "power3.out" }, 8.0);
    }, containerRef);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout) {
        window.cancelAnimationFrame(resizeTimeout);
      }
      ctx.revert(); // Secure clean up memory leaks upon unmounting
    };
  }, [loading, resizeCanvasDimensions, drawFrameToCanvas]);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Phase 1 & 2: Logo Preloader Overlay */}
      {loading && (
        <div
          ref={preloaderRef}
          className="fixed inset-0 flex items-center justify-center bg-white dark:bg-cream"
          style={{ zIndex: 60 }}
        >
          <div
            ref={heroLogoRef}
            className="w-[280px] h-[90px]"
            style={{
              width: "280px",
              height: "90px",
              transform: `scale(${logoScale})`,
              transformOrigin: "center center",
              willChange: "transform",
            }}
          >
            <img
              src="/images/logo.png"
              alt="PawJoy Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Hero Scroll Container */}
      <div ref={containerRef} className="relative w-full bg-warm-100">
        <div className="h-screen w-full overflow-hidden">
          <canvas ref={canvasRef} className="block w-full h-full object-cover" />
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-navy-900 pointer-events-none opacity-0"
          />

          {/* Beat 1 Text */}
          <div
            ref={text1Ref}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md md:bottom-12 md:left-16 md:translate-x-0 md:w-auto p-5 md:p-8 rounded-2xl glass-card shadow-lg pointer-events-none opacity-0 text-center md:text-left"
          >
            <span className="text-xs font-semibold text-clinic-blue uppercase tracking-wider block mb-2">
              Empathetic Treatment
            </span>
            <h2 className="font-serif font-bold text-2xl md:text-3xl lg:text-4xl text-navy-800 leading-snug">
              Comprehensive care for your best friend.
            </h2>
            <div className="w-12 h-1 bg-clinic-teal mx-auto md:ml-0 mt-4 rounded-full"></div>
          </div>

          {/* Beat 2 Text */}
          <div
            ref={text2Ref}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md md:bottom-12 md:right-16 md:left-auto md:translate-x-0 md:w-auto p-5 md:p-8 rounded-2xl glass-card shadow-lg pointer-events-none opacity-0 text-center md:text-right"
          >
            <span className="text-xs font-semibold text-clinic-teal uppercase tracking-wider block mb-2">
              Advanced Practice
            </span>
            <h2 className="font-serif font-bold text-2xl md:text-3xl lg:text-4xl text-navy-800 leading-snug">
              Expert teams. State-of-the-art treatment.
            </h2>
            <div className="w-12 h-1 bg-clinic-blue mx-auto md:mr-0 md:ml-auto mt-4 rounded-full"></div>
          </div>

          {/* Beat 3 Text */}
          <div
            ref={text3Ref}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pb-[env(safe-area-inset-bottom)] pointer-events-none opacity-0"
          >
            <span className="text-xs font-semibold text-clinic-teal uppercase tracking-widest block mb-4">
              Our Promise
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mb-8">
              Because they deserve better care.
            </h2>
            <a
              href="#contact"
              className="group pointer-events-auto flex items-center gap-2 px-8 py-4 rounded-full border border-white text-white font-semibold text-lg hover:bg-white hover:text-navy-900 transition-all duration-300 shadow-xl shadow-black/10"
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