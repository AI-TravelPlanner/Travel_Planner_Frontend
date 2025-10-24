import React from 'react'
import Slider from './Slider'
import { Temp } from './Temp'
import DestinationSlider from './DestinationSlider'
import Slidertwo from './Slidertwo' 
import CtaSection from './CtaSection'; 

const HomePage = () => {
    return (
        <div className="space-y-6">
            {/* Slider Component */}
            <Slider />
            <DestinationSlider/>
            <Slidertwo/> 
            <CtaSection/>
        
        
        </div>
    )
}

export default HomePage