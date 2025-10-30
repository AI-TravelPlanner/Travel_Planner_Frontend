import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";
import img1 from "../assets/image1.jpg";
import img2 from "../assets/image2.jpg";
import img3 from "../assets/image3.jpg";
import img4 from "../assets/image4.jpeg";
import img5 from "../assets/image5.jpg";
import { TripSearchBar } from "@/plan-trip/TripSearchBar";
import { useLocation, useNavigate } from "react-router-dom";

export default function ImageCarousel({ className = "h-screen w-full" }) {
  const images = [img1, img2, img3, img4, img5];

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const timeoutRef = useRef(null);
  const delay = 2000;

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, delay);
    }
    return () => resetTimeout();
  }, [index, isPlaying]);

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 2500);
    return () => clearTimeout(timer);
  }, []);


  const location = useLocation();
  const navigate = useNavigate();
  const searchWrapRef = useRef(null);

  useEffect(() => {
    if (location.state?.focusTripSearch) {
      // Scroll search bar into view
      searchWrapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

      // Focus the first interactive control inside
      const el = searchWrapRef.current;
      const firstFocusable = el?.querySelector('input, button, [tabindex]:not([tabindex="-1"])');
      // Prevent scroll jump on focus (we just scrolled)
      firstFocusable?.focus({ preventScroll: true });

      // Trigger one-shot shine animation
      el?.classList.remove("ring-flash-once"); // reset if already present
      void el?.offsetWidth; // force reflow to restart animation
      el?.classList.add("ring-flash-once");

      // Clear the router state so it doesn’t re-trigger on back/forward
      navigate(".", { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const goTo = (i) => {
    setIndex(i % images.length);
    setIsPlaying(false);
  };

  return (
    <div
      className={`${className} relative overflow-hidden flex items-center justify-center`}
      style={{
        maxWidth: "100vw",
        overflowX: "hidden",
      }}
    >
      {/* Background Image Layer */}
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `url(${images[index]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(70%)",
          }}
        />
      </AnimatePresence>

      {/*Text Layer */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8">
        {hasAnimated ? (
          <>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              EXPLORE CANADA
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              Discover The True North Strong & Free!
              <br />
              <span className="text-white/90">
                From coast to coast — experience Canada’s breathtaking
                landscapes, vibrant cities, and unforgettable adventures.
              </span>
            </p>
          </>
        ) : (
          <>
            <motion.h1
              className="text-3xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
            >
              EXPLORE CANADA
            </motion.h1>
            <motion.p
              className="mt-4 text-sm sm:text-base md:text-xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.4,
                ease: "easeOut",
              }}
            >
              Discover The True North Strong & Free!
              <br />
              <span className="text-white/90">
                From coast to coast — experience Canada’s breathtaking
                landscapes, vibrant cities, and unforgettable adventures.
              </span>
            </motion.p>
          </>
        )}

        {/* Trip Search Bar (front-most UI) */}
        <div
          ref={searchWrapRef}
          className="ring-flash-wrap w-full max-w-5xl z-30 mt-50 shadow-xl/30"
          onFocusCapture={() => setIsPlaying(false)}
          onBlurCapture={() => setIsPlaying(true)}
        >
          <TripSearchBar />
        </div>
      </div>

      {/* Navigation Dots */}
      <div
        className="
          absolute
          top-50% right-4
          flex flex-col gap-4
          sm:gap-3
          md:gap-4
        "
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all duration-300 ${i === index
              ? "bg-white/80 scale-150 shadow-lg"
              : "bg-white/30 hover:bg-white/50"
              }`}
          />
        ))}
      </div>

      {/* Play / Pause Button*/}
      <div
        className="
          absolute bottom-4 right-4
          sm:bottom-6 sm:right-6
          md:bottom-8 md:right-8
        "
      >
        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          className="
            p-2 sm:p-3 md:p-4
            rounded-full bg-white/30 hover:bg-white/50
            transition shadow-md cursor-pointer
          "
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black" />
          ) : (
            <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black" />
          )}
        </button>
      </div>
    </div>
  );
}
