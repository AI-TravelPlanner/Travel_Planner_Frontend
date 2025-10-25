import React from 'react'
import ImageCarousel from '@/carousel/Carousel'
import Slider from './Slider'
import { Temp } from './Temp'
import DestinationSlider from './DestinationSlider'
import Slidertwo from './Slidertwo' 
import CtaSection from './CtaSection'; 

const HomePage = () => {
    return (
        <div className="space-y-6">
           <ImageCarousel   />
           {/* Add the other components. */}
           <p className="w-full h-full text-red-600 text-2xl bg-gray-300 flex items-center justify-center">Other components to be added by Jay. Thank you.</p>
            {/* Slider Component */}
            <Slider />
            <DestinationSlider/>
            <Slidertwo/> 
            <CtaSection/>
        
        
        </div>
    )
}

export default HomePage