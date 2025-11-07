import React, { useState, useRef, useEffect } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight } from "lucide-react"

export const AttractionItem = ({
    image,
    title,
    duration,
    timeline,
    timeOfDay,
    location,
    description,
    photos,
    isDragging = false,
}) => {
    const [open, setOpen] = useState(false)
    const [photoIndex, setPhotoIndex] = useState(0)
    const [carouselApi, setCarouselApi] = useState(null)
    const hoverTimeoutRef = useRef(null)

    const handleMouseEnter = () => {
        if (!isDragging) {
            hoverTimeoutRef.current = window.setTimeout(() => {
                setOpen(true)
            }, 500)
        }
    }

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current)
            hoverTimeoutRef.current = null
        }
        setOpen(false)
    }

    // Use photos array if provided; otherwise fall back to single imgSrc
    const imgSrcFallback =
        image ||
        "https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=400&q=80"

    const photoList =
        Array.isArray(photos) && photos.length > 0 ? photos : [imgSrcFallback]

    // hook carousel API + keep photoIndex in sync with Embla
    const handleSetApi = (api) => {
        if (!api) return
        setCarouselApi(api)
        setPhotoIndex(api.selectedScrollSnap())

        api.on("select", () => {
            setPhotoIndex(api.selectedScrollSnap())
        })
    }

    // Auto-advance while popover is open
    useEffect(() => {
        if (!open || !carouselApi || photoList.length <= 1) return

        const id = setInterval(() => {
            if (!carouselApi) return
            if (carouselApi.canScrollNext()) {
                carouselApi.scrollNext()
            } else {
                carouselApi.scrollTo(0)
            }
        }, 2500)

        return () => clearInterval(id)
    }, [open, carouselApi, photoList.length])

    // Reset back to first slide when popover closes
    useEffect(() => {
        if (!open && carouselApi) {
            carouselApi.scrollTo(0)
        }
    }, [open, carouselApi])

    const goPrev = (e) => {
        e.stopPropagation()
        if (!carouselApi) return
        if (carouselApi.canScrollPrev()) {
            carouselApi.scrollPrev()
        } else {
            carouselApi.scrollTo(photoList.length - 1)
        }
    }

    const goNext = (e) => {
        e.stopPropagation()
        if (!carouselApi) return
        if (carouselApi.canScrollNext()) {
            carouselApi.scrollNext()
        } else {
            carouselApi.scrollTo(0)
        }
    }

    return (
        <Popover
            open={open && !isDragging}
            onOpenChange={(newOpen) => {
                if (!isDragging) setOpen(newOpen)
            }}
        >
            <PopoverTrigger asChild>
                <div
                    className="flex items-center gap-2 p-1.5 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ pointerEvents: isDragging ? "none" : "auto" }}
                >
                    {/* Thumbnail (always show first photo / fallback) */}
                    <div className="flex-shrink-0">
                        <img
                            src={photoList[0] || imgSrcFallback}
                            alt={title}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </div>

                    {/* Text block */}
                    <div className="flex flex-col min-w-0">
                        {/* Title – up to 2 lines */}
                        <p className="text-[13px] font-medium leading-tight line-clamp-2 break-words">
                            {title || "Untitled attraction"}
                        </p>

                        {/* Duration + Timeline (left/right) */}
                        <div className="mt-0.5 grid grid-cols-2 gap-1 text-[11px] text-gray-500">
                            <p className="whitespace-nowrap overflow-hidden text-ellipsis text-left">
                                {duration}
                            </p>
                            <p className="whitespace-nowrap overflow-hidden text-ellipsis text-right">
                                {timeline}
                            </p>
                        </div>
                    </div>
                </div>
            </PopoverTrigger>

            <PopoverContent
                side="right"
                align="center"
                className="w-80 max-w-xs p-3 space-y-3 shadow-xl"
            >
                <div className="flex flex-col gap-2">
                    {/* Image carousel */}
                    <div className="relative w-full h-40 rounded-lg overflow-hidden">
                        <Carousel
                            setApi={handleSetApi}
                            opts={{
                                loop: photoList.length > 1,
                            }}
                            className="w-full h-full"
                        >
                            <CarouselContent className="h-full">
                                {photoList.map((src, idx) => (
                                    <CarouselItem key={idx} className="h-40">
                                        <img
                                            src={src}
                                            alt={title}
                                            className="w-full h-full object-cover"
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>

                        {photoList.length > 1 && (
                            <>
                                {/* 
                                <button
                                    type="button"
                                    onClick={goPrev}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 text-white p-1.5 transition"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>

                                <button
                                    type="button"
                                    onClick={goNext}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 text-white p-1.5 transition"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                                */}
                                {/* Dots */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                                    {photoList.map((_, idx) => (
                                        <span
                                            key={idx}
                                            className={
                                                "h-1.5 rounded-full transition-all " +
                                                (idx === photoIndex
                                                    ? "w-4 bg-white"
                                                    : "w-2 bg-white/60")
                                            }
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Title + location */}
                    <div>
                        <p className="font-semibold text-sm break-words">
                            {title || "Untitled attraction"}
                        </p>
                        {location && (
                            <p className="text-xs text-gray-500 mt-0.5 break-words">
                                {location}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    {description && (
                        <p className="text-sm text-gray-700 break-words">
                            {description}
                        </p>
                    )}

                    {/* Bottom meta row */}
                    <div className="flex flex-wrap justify-between gap-x-2 gap-y-1 text-[11px] text-gray-500 border-t pt-2">
                        {duration && <span>Duration: {duration}</span>}
                        {timeline && <span>{timeline}</span>}
                        {timeOfDay && <span>{timeOfDay}</span>}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
