import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";

export default function ImageCarousel({ className = "h-screen" }) {
  const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1513564774965-ac25ddf81e1e?auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FuYWRhfGVufDB8fDB8fHww&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1513564774965-ac25ddf81e1e?auto=format&fit=crop&w=1470&q=80",
  ];

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef(null);
  const delay = 3000;

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

  const goTo = (i) => {
    setIndex(i % images.length);
    setIsPlaying(false);
  };

  return (
    <div className={`${className} relative select-none overflow-hidden`}>
      {/* Images */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={`Slide ${index + 1}`}
          className="absolute inset-0 w-full h-full object-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1500x1000?text=Image+Not+Found";
          }}
        />
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20 ">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              i === index
                ? "bg-gray-200 scale-150"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Play / Pause Button */}
      <div className="absolute bottom-6 right-6 z-20">
        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          className="p-3 rounded-full bg-white/70 hover:bg-white/90 transition shadow-md cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-black" />
          ) : (
            <Play className="w-5 h-5 text-black" />
          )}
        </button>
      </div>
    </div>
  );
}
