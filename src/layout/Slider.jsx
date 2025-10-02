import React, { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';

// --- START: The Corrected Image Imports ---

import flightImage from 'src/assets/Group 13.png'; 
import mountainImage from '../assets/Group 27.png';
import collageImage from '../assets/Group 1324.png';

// --- END: The Corrected Image Imports ---



// ... (rest of the code remains the same)



// --- Global Constants ---

const BRAND_COLOR = "#4A1919";



// --- Slider Data ---

const sliderData = [

    {

        type: "flight",

        title: "Ready to Take Flight?",

        description: "Canada's destinations are closer than you think. Find your flight and begin the adventure.",

        buttonText: "Explore",

        imageComponent: (

            <img

                src={flightImage}

                alt="Plane in Sky"

                className="w-full h-full object-cover"

            />

        )

    },

    {

        type: "rocky-mountains",

        title: "Your Canadian Adventure Starts Here",

        description: "Your perfect Canadian adventure is waiting. Whether you have a weekend or a month, our personalized planning tools will help you craft an unforgettable journey through the true north strong and free. Start planning your perfect trip today - because the best stories begin with a single step into the unknown.",
        buttonText: "Explore",
        imageComponent: (
            <img
                src={mountainImage}
                alt="Rocky Mountains Lake"
                className="w-full h-full object-cover"
            />
        )
    },
    {

        type: "overlapping-images",

        title: "Discover Canada's Hidden Depths",

        description: "Canada offers what many destinations have lost to overtourism - space to explore at your own pace. Picture crystal-clear lakes to yourself, genuine local culture, and meaningful Indigenous connections. From Newfoundland's rugged coastlines to Montreal's urban sophistication, Canada rewards travelers seeking authentic experiences over photo opportunities.",

        buttonText: "Discover",

        imageComponent: (

             <img

                src={collageImage}

                alt="Canadian Landscapes Collage"

                className="w-full h-full object-cover"

            />

        )

    },

];



// --- Main Slider Component ---

const Slider = () => {

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    // Automatic sliding every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlideIndex(prevIndex =>
                (prevIndex + 1) % sliderData.length
            );
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    const currentSlide = sliderData[currentSlideIndex];
    const goToSlide = (index) => {
        setCurrentSlideIndex(index);
    };
    const nextSlide = () => {
        setCurrentSlideIndex((currentSlideIndex + 1) % sliderData.length);
    };
    const prevSlide = () => {
        setCurrentSlideIndex((currentSlideIndex - 1 + sliderData.length) % sliderData.length);
    };
    const textContainerClasses = "lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center";
    const imageContainerClasses = "h-full min-h-[350px] w-full lg:w-1/2 relative p-4 lg:p-12 flex items-center justify-center";
    const cardBaseStyle = `max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch justify-between bg-white rounded-3xl shadow-2xl z-10 relative overflow-hidden`;
    return (
        <section className="min-h-[500px] py-12 px-4 lg:px-10 bg-gray-50 relative overflow-hidden">
            {/* Slide Content Container */}
            <div className={cardBaseStyle} style={{ minHeight: '500px' }}>   
                {/* Text Content */}
                <div className={textContainerClasses}>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                        {currentSlide.title}
                    </h2>
                    <div className="h-1.5 w-20 mb-6 rounded-full" style={{ backgroundColor: BRAND_COLOR }} />
                    <p className="text-base text-gray-600 mb-8 max-w-lg">
                        {currentSlide.description}
                    </p>
                    <Button
                        className="w-fit text-white hover:opacity-90"
                        style={{ backgroundColor: BRAND_COLOR }}
                    >
                        {currentSlide.buttonText}
                    </Button>
                </div>
                {/* Image Container */}
                <div className={imageContainerClasses}>
                    <div className="w-full h-full relative">
                        {/* Background layer */}
                        <div
                            className="absolute inset-0 rounded-[3rem] transform -rotate-3 translate-x-3 translate-y-3 shadow-2xl"
                            style={{ backgroundColor: BRAND_COLOR, opacity: 0.9 }}
                        />
                        {/* Main Image */}
                        <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transition-transform duration-500 ease-in-out"
                            style={{
                                 transform: `scale(${currentSlideIndex === 1 ? 0.98 : 1})`,
                                 width: '100%',
                                 height: '100%'
                              }}>
                            {currentSlide.imageComponent}
                        </div>
                    </div>
                </div>
            </div>
            {/* Navigation Controls */}
            <div className="max-w-7xl mx-auto flex items-center justify-center lg:justify-end mt-8 gap-4">
                {/* Arrow Buttons */}
                <div className="flex space-x-2 mr-6">
                    <Button
                        onClick={prevSlide}
                        variant="outline"
                        size="icon"
                        className="w-10 h-10"
                        aria-label="Previous slide"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </Button>
                    <Button
                        onClick={nextSlide}
                        variant="outline"
                        size="icon"
                        className="w-10 h-10"
                        aria-label="Next slide"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </Button>
                </div>
                {/* Dot Indicators */}
                <div className="flex space-x-2">
                    {sliderData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-2 w-2 rounded-full transition-all duration-300 ${
                                index === currentSlideIndex
                                    ? 'scale-125'
                                    : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            style={{ backgroundColor: index === currentSlideIndex ? BRAND_COLOR : undefined }}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
export default Slider;