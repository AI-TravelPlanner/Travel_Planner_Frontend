import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Array holding hotel data
const hotelsArr = [
  {
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60",
    name: "Marriott Fallsview Hotel & Spa",
    location: "Niagara Falls, Ontario",
    rating: 8.4,
    ratingText: "Very Good",
    reviews: "3,241 reviews",
    popular: true,
    badges: ["Pool", "Spa", "WiFi"]
  },
  {
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=60",
    name: "Grand Luxury Resort",
    location: "Toronto, Ontario",
    rating: 9.1,
    ratingText: "Excellent",
    reviews: "2,856 reviews",
    popular: true,
    badges: ["Pool", "Gym", "Restaurant"]
  },
  {
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=60",
    name: "Riverside Boutique Hotel",
    location: "Ottawa, Ontario",
    rating: 8.7,
    ratingText: "Fabulous",
    reviews: "1,543 reviews",
    popular: false,
    badges: ["WiFi", "Bar", "Parking"]
  },
  {
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=60",
    name: "Mountain View Lodge",
    location: "Blue Mountains, Ontario",
    rating: 8.9,
    ratingText: "Fabulous",
    reviews: "2,124 reviews",
    popular: true,
    badges: ["Ski", "Spa", "Restaurant"]
  }
];

// Define the new color constant
const EXPLORE_BUTTON_COLOR = "#4A1919"; 
const HOVER_BUTTON_COLOR = "#3A1010"; // A slightly darker shade for the hover effect

export default function HotelCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? hotelsArr.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === hotelsArr.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (slideIndex) => {
    setDirection(slideIndex > currentIndex ? 1 : -1);
    setCurrentIndex(slideIndex);
  };

  // Calculate which cards to show (current and next 2)
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % hotelsArr.length;
      cards.push({ ...hotelsArr[index], index });
    }
    return cards;
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#4A1919' }}>
      <div className="w-full max-w-7xl mx-auto px-8 py-16">
        {/* Cards Container */}
        <div className="relative flex items-center justify-center gap-6">
          <AnimatePresence mode="popLayout">
            {getVisibleCards().map((hotel, idx) => (
              <motion.div
                key={`${hotel.index}-${currentIndex}`}
                initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex-shrink-0 w-80"
              >
                {/* Hotel Card */}
                <div className="bg-white rounded-lg overflow-hidden shadow-xl">
                  {/* Hotel Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Location & We're here badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <div className="bg-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <span>📍</span>
                        <span className="font-medium">We're here</span>
                      </div>
                      {hotel.popular && (
                        <div className="bg-orange-500 text-white px-3 py-1 rounded text-xs font-medium">
                          Popular
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    {/* Location */}
                    <p className="text-sm text-gray-600 mb-1">{hotel.location}</p>
                    
                    {/* Hotel Name */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{hotel.name}</h3>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-green-600 text-white px-2 py-1 rounded font-bold text-sm">
                        {hotel.rating}
                      </div>
                      <span className="font-semibold text-sm">{hotel.ratingText}</span>
                      <span className="text-sm text-gray-600">({hotel.reviews})</span>
                    </div>

                    {/* Badges */}
                    <div className="flex gap-2 mb-4">
                      {hotel.badges.map((badge, i) => (
                        <div key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                          {badge}
                        </div>
                      ))}
                    </div>

                    {/* Explore Button - MODIFIED */}
                    <button 
                        className="w-full text-white font-semibold py-2.5 rounded transition-colors"
                        style={{ backgroundColor: EXPLORE_BUTTON_COLOR, boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
                        // Note: For a true Tailwind hover effect with a custom color, you'd typically use 
                        // a utility class defined in your tailwind.config.js, or use JS for hover states.
                        // Since we are limited to inline style and Tailwind classes here, a simple
                        // style and className modification is used. For the hover effect from the 
                        // screenshot, I'll remove the hover class since it's hard to replicate perfectly 
                        // without custom Tailwind configuration.
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-10 transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-800" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-white/90 p-3 rounded-full shadow-lg z-10 transition-colors"
          >
            <ChevronRight size={24} className="text-gray-800" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {hotelsArr.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`transition-all rounded-full ${
                slideIndex === currentIndex 
                  ? "bg-white w-8 h-3" 
                  : "bg-white/50 w-3 h-3 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}