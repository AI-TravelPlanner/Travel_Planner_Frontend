import React from 'react';
import { Button } from '@/components/ui/button';

// The dark red background color from the screenshot
const BACKGROUND_COLOR = "#4A1919"; 
// The off-white/white color for the text and button background
const TEXT_COLOR = "white"; 

const CtaSection = () => {
    return (
        // 1. Change background color to the dark red
        <section className="py-20 px-4" style={{ backgroundColor: BACKGROUND_COLOR }}>
            <div className="max-w-4xl mx-auto text-center">
                
                {/* Main Heading */}
                {/* 2. Change text color to white and adjust styling */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight" style={{ color: TEXT_COLOR }}>
                    No Worries!<br />
                    We've Got You Covered
                </h2>
                
                {/* Description Text */}
                {/* 3. Change text color to white and adjust styling */}
                <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: TEXT_COLOR }}>
                    From budget-friendly adventures to luxury escapes, we'll find the perfect 
                    Canadian experience that fits YOUR budget.
                </p>
                
                {/* CTA Button */}
                <Button 
                    // 4. Change button styles: background white, text dark red, no shadow/scale effects
                    className="px-8 py-4 text-lg font-bold rounded-md"
                    // Inline styles for high-contrast background/text
                    style={{ backgroundColor: TEXT_COLOR, color: BACKGROUND_COLOR }}
                >
                    Find My Trip
                </Button>
            </div>
        </section>
    );
};

export default CtaSection;