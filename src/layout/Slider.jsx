import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const BRAND_COLOR = "#4A1919";

const sliderData = [
  {
    type: "flight",
    title: "Ready to Take Flight?",
    description: "Canada's destinations are closer than you think. Find your flight and begin the adventure.",
    buttonText: "Explore",
    imageSrc: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=60",
    alt: "Plane in Sky",
  },
{
  type: "rocky-mountains",
  title: "Your Canadian Adventure Starts Here",
  description: "Your perfect Canadian adventure is waiting. Whether you have a weekend or a month, our personalized planning tools will help you craft an unforgettable journey through the true north strong and free. Start planning your perfect trip today - because the best stories begin with a single step into the unknown.",
  buttonText: "Explore",
  imageSrc: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&auto=format&fit=crop&q=80", // Jasper National Park
  alt: "Jasper National Park, Alberta",
},
{
  type: "overlapping-images",
  title: "Discover Canada's Hidden Depths",
  description: "Canada offers what many destinations have lost to overtourism - space to explore at your own pace. Picture crystal-clear lakes to yourself, genuine local culture, and meaningful Indigenous connections. From Newfoundland's rugged coastlines to Montreal's urban sophistication, Canada rewards travelers seeking authentic experiences over photo opportunities.",
  buttonText: "Discover",
  imageSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80", // Moraine Lake
  alt: "Moraine Lake in Banff National Park",
},

];

const Slider = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleSlideChange((currentSlideIndex + 1) % sliderData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlideIndex]);

  const handleSlideChange = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlideIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  const currentSlide = sliderData[currentSlideIndex];

  const goToSlide = (index) => handleSlideChange(index);
  const nextSlide = () => handleSlideChange((currentSlideIndex + 1) % sliderData.length);
  const prevSlide = () => handleSlideChange((currentSlideIndex - 1 + sliderData.length) % sliderData.length);

  return (
    <section className="min-h-screen py-12 px-4 lg:px-10 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-stretch justify-between bg-white rounded-3xl shadow-2xl overflow-hidden relative" style={{ minHeight: '600px' }}>
        
        {/* Text Content */}
        <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
          <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              {currentSlide.title}
            </h2>
            <div 
              className="h-1.5 w-24 mb-8 rounded-full transition-all duration-500" 
              style={{ backgroundColor: BRAND_COLOR }}
            />
            <p className="text-lg text-gray-700 mb-10 leading-relaxed max-w-xl">
              {currentSlide.description}
            </p>
            <Button 
              className="w-fit px-8 py-6 text-lg font-semibold text-white hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: BRAND_COLOR }}
            >
              {currentSlide.buttonText}
            </Button>
          </div>
        </div>

        {/* Image Content */}
        <div className="lg:w-1/2 min-h-[400px] lg:min-h-[600px] p-6 lg:p-12 flex items-center justify-center order-1 lg:order-2">
          <div className="w-full h-full relative">
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={currentSlide.imageSrc}
                alt={currentSlide.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="max-w-7xl mx-auto absolute bottom-8 left-0 right-0 px-4 lg:px-10">
        <div className="flex items-center justify-center lg:justify-end gap-6">
          {/* Arrow Buttons */}
          <div className="flex space-x-3">
            <Button 
              onClick={prevSlide}
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full bg-white hover:bg-gray-50 border-2 transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <Button 
              onClick={nextSlide}
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full bg-white hover:bg-gray-50 border-2 transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>

          {/* Dot Indicators */}
          <div className="flex space-x-3 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-full shadow-lg">
            {sliderData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlideIndex 
                    ? 'w-8' 
                    : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
                style={{ 
                  backgroundColor: index === currentSlideIndex ? BRAND_COLOR : undefined 
                }}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlideIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;