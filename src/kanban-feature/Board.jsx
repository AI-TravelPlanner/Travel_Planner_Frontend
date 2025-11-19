import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import SortableItem from './SortableItem'
import { useDispatch, useSelector } from 'react-redux'
import { reserveBoardToTemplate } from '../kanban-feature/template-board-suggestions/thunk'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { GripHorizontal, Trash2 } from 'lucide-react'
import { parseISO, format } from 'date-fns'
import { CardEditSheet } from '@/components/CardEditSheet'
import { useState, useEffect } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

export default function Board({ board, isAnyDragging, suppressSyncRef }) {
    const dispatch = useDispatch()

    const [editOpen, setEditOpen] = useState(false)
    const [photoIndex, setPhotoIndex] = useState(0)
    const [carouselApi, setCarouselApi] = useState(null)

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: board.id,
        data: {
            type: 'board',
            boardId: board.id,
        },
    })

    const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
        id: `droppable-${board.id}`,
        data: {
            type: 'container',
            boardId: board.id
        },
    })

    const handleReserveBoard = (e) => {
        suppressSyncRef.current = true
        e.stopPropagation()
        dispatch(reserveBoardToTemplate(board.id))
        setTimeout(() => {
            suppressSyncRef.current = false
        }, 300);
    }

    const boardDateDisplay = board?.date ? format(parseISO(board.date), 'MMM d, yyyy') : ''
    const dayWeather = board?.weather || {}

    // Safely extract hotel photos
    const hotelPhotos = board?.hotel?.placeDetails?.photoUrls || []
    const hasPhotos = hotelPhotos.length > 0
    const fallbackPhoto =
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1000&auto=format&fit=crop"
    const photosToShow = hasPhotos ? hotelPhotos : [fallbackPhoto]

    // Hook into shadcn carousel API to keep dots in sync
    useEffect(() => {
        if (!carouselApi) return

        const onSelect = () => {
            setPhotoIndex(carouselApi.selectedScrollSnap())
        }

        onSelect() // initial
        carouselApi.on("select", onSelect)
        return () => {
            carouselApi.off("select", onSelect)
        }
    }, [carouselApi])

    // Auto-advance photos while board is mounted
    useEffect(() => {
        if (!carouselApi || photosToShow.length <= 1) return

        const id = setInterval(() => {
            if (carouselApi.canScrollNext()) {
                carouselApi.scrollNext()
            } else {
                carouselApi.scrollTo(0)
            }
        }, 3000)

        return () => clearInterval(id)
    }, [carouselApi, photosToShow.length])

    return (

        <Card ref={setNodeRef}
            data-board-id={board.id}
            data-board-type="draggable-board" className="w-full min-h-[var(--kanban-card-h-base)] overflow-hidden gap-1 rounded-2xl shadow-lg p-2 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">


            {/* --- HEADER SECTION (With Drag Handle and Button) --- */}
            <div className="flex justify-between items-center px-3">
                {/* Drag Handle */}
                <div
                    {...attributes}
                    {...listeners}
                    className="cursor-grab text-gray-500 p-1"
                    style={{ touchAction: 'none' }} // Recommended for touch devices
                >
                    <GripHorizontal className="h-5 w-5" />
                </div>

                {/* Date label */}
                <div className="text-xs text-gray-500 mt-1 flex flex-col items-center">
                    <p>
                        {dayWeather.temperature}&deg; C
                    </p>
                    <p>
                        {dayWeather.condition}
                    </p>
                </div>

                {/* Delete Button */}
                <button
                    onClick={handleReserveBoard}
                    onMouseDown={(e) => e.stopPropagation()} // Extra precaution
                    className="bg-transparent border-none text-gray-500 hover:text-red-500 cursor-pointer p-1 rounded-md"
                >
                    <Trash2 className="h-4 w-4" />
                </button>


            </div>


            {/* Main Image (Hotel photo carousel) */}
            <button
                type="button"
                className="h-35 w-full rounded-t-2xl overflow-hidden focus:outline-none"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => setEditOpen(true)}
            >
                <div className="relative w-full h-40 rounded-2xl overflow-hidden group">
                    <Carousel
                        setApi={setCarouselApi}
                        opts={{
                            loop: photosToShow.length > 1,
                        }}
                        className="w-full h-full"
                    >
                        <CarouselContent className="h-full">
                            {photosToShow.map((src, idx) => (
                                <CarouselItem key={idx} className="h-40">
                                    <img
                                        src={src}
                                        alt={board?.hotel?.hotelName || `Hotel photo ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>

                    {/* --- NEW: Hotel Name Overlay --- */}
                    {/* This gradient ensures text is readable on any image */}
                    <div className="absolute bottom-2 left-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-14 pointer-events-none">
                        <h3 className="text-white text-sm leading-tight truncate shadow-sm">
                            {board?.hotel?.hotelName || "Hotel Name"}
                        </h3>
                    </div>

                    {/* Dots Indicator */}
                    {photosToShow.length > 1 && (
                        <div className="absolute bottom-3 right-3 flex gap-1.5 z-10">
                            {photosToShow.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={
                                        "h-1.5 rounded-full transition-all shadow-sm " +
                                        (idx === photoIndex ? "w-4 bg-white" : "w-2 bg-white/60")
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>
            </button>

            <CardContent className="p-1">
                {/* Small header also as trigger (optional) */}
                <button
                    type="button"
                    className="font-semibold text-gray-700 text-xs text-center w-full py-1 hover:opacity-80 transition"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => setEditOpen(true)}
                >
                    Day Activities
                </button>

                {/* ITEMS (not a trigger; still draggable) */}
                <div
                    className={`divide-y flex-1 flex flex-col gap-2 rounded-md transition-all duration-200 ease-in-out relative ${isOver ? 'border-[3px] border-dashed border-blue-500 bg-blue-500/5' : 'border-2 border-transparent'}`}
                    ref={setDroppableNodeRef}
                >
                    <SortableContext id={board.id} items={board.items} strategy={verticalListSortingStrategy}>
                        {board.items.map((itemId) => (
                            <SortableItem
                                key={itemId}
                                id={itemId}
                                boardId={board.id}
                                isAnyDragging={isAnyDragging || isDragging}
                            />
                        ))}
                    </SortableContext>

                    {board.items.length === 0 && (
                        <div className="text-center text-gray-500 text-sm italic py-3 px-3.5 border border-dashed border-gray-300 rounded-xl">
                            Drop items here
                        </div>
                    )}
                </div>
            </CardContent>

            {/* The dialog now lives in its own component */}
            <CardEditSheet open={editOpen} onOpenChange={setEditOpen} board={board} />

        </Card>
    )
}