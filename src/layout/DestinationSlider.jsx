import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectTrip } from '@/redux-slices/tripSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const EXPLORE_BUTTON_COLOR = "#4A1919";

export default function DestinationSlider() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hotelsArr = useSelector((state) => state.trips.allTrips || []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleExplore = (hotel) => {
    dispatch(selectTrip(hotel));
    navigate('/dashboard');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, hotelsArr.length]);

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
                <div className="bg-white rounded-lg overflow-hidden shadow-xl">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-1">{hotel.location}</p>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{hotel.name}</h3>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-green-600 text-white px-2 py-1 rounded font-bold text-sm">
                        {hotel.rating}
                      </div>
                      <span className="font-semibold text-sm">{hotel.ratingText}</span>
                      <span className="text-sm text-gray-600">({hotel.reviews})</span>
                    </div>

                    <div className="flex gap-2 mb-4">
                      {hotel.badges.map((badge, i) => (
                        <div key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                          {badge}
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => handleExplore(hotel)}
                      className="w-full text-white font-semibold py-2.5 rounded transition-colors hover:opacity-90"
                      style={{ backgroundColor: EXPLORE_BUTTON_COLOR, boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-10 transition-colors">
            <ChevronLeft size={24} className="text-gray-800" />
          </button>

          <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-white/90 p-3 rounded-full shadow-lg z-10 transition-colors">
            <ChevronRight size={24} className="text-gray-800" />
          </button>
        </div>

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
