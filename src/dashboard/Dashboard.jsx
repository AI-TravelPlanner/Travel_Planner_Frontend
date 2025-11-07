import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearSelectedTrip } from '@/redux-slices/tripSlice';

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import DragAndDrop from '@/kanban-feature/DragAndDrop';
import TemplateBoardList from '@/kanban-feature/template-board-suggestions/TemplateBoard';

export default function Dashboard() {
    const dispatch = useDispatch();
    const selectedTrip = useSelector((state) => state.trips.selectedTrip);
    const expandedTripId = useSelector((state) => state.trips.expandedTripId);
    const selectedTripRef = useRef(null);

    // NEW: Auto-scroll to selected trip when arriving from homepage
    useEffect(() => {
        if (selectedTrip && selectedTripRef.current) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                selectedTripRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 100);
        }
    }, [selectedTrip]);

    // NEW: Cleanup when leaving dashboard
    useEffect(() => {
        return () => {
            dispatch(clearSelectedTrip());
        };
    }, [dispatch]);

    return (
        <SidebarProvider>
            <SidebarInset className="flex h-dvh min-h-0 flex-col overflow-hidden"
                style={{
                    // Single source of truth for sizes:
                    // tweak these to resize every card everywhere
                    '--kanban-card-w-base': '240px',
                    '--kanban-card-h-base': '240px',
                }}>

                {/* UPDATED: Added ref for auto-scroll and expanded state indicator */}
                {selectedTrip && (
                    <div
                        ref={selectedTripRef}
                        className={`bg-white p-6 rounded-lg shadow-lg mb-4 transition-all duration-300 ${expandedTripId === selectedTrip.id
                            ? 'border-4 border-[#4A1919] ring-2 ring-[#4A1919]/20'
                            : 'border-2 border-gray-200'
                            }`}
                    >
                        <div className="flex items-start gap-4">
                            {/* Trip Image */}
                            <img
                                src={selectedTrip.image}
                                alt={selectedTrip.name}
                                className="w-32 h-32 object-cover rounded-lg"
                            />

                            {/* Trip Details */}
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900">{selectedTrip.name}</h2>
                                <p className="text-gray-600 mb-2">{selectedTrip.location}</p>

                                <div className="flex items-center gap-2 mb-3">
                                    <div className="bg-green-600 text-white px-2 py-1 rounded font-bold text-sm">
                                        {selectedTrip.rating}
                                    </div>
                                    <span className="font-semibold text-sm">{selectedTrip.ratingText}</span>
                                    <span className="text-sm text-gray-600">({selectedTrip.reviews})</span>
                                </div>

                                <div className="flex gap-2">
                                    {selectedTrip.badges?.map((badge, i) => (
                                        <div key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                                            {badge}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* NEW: Itinerary Section - Only show if expanded */}
                        {expandedTripId === selectedTrip.id && selectedTrip.itinerary && (
                            <div className="mt-6 border-t pt-6">
                                <h3 className="text-xl font-bold mb-4 text-gray-900">Trip Itinerary</h3>

                                {/* Dates Navigation */}
                                {selectedTrip.dates && (
                                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                                        {selectedTrip.dates.map((date, index) => (
                                            <button
                                                key={index}
                                                className="bg-[#4A1919] text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-[#6B2B2B] transition-colors"
                                            >
                                                {date}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Timeline/Activities */}
                                <div className="space-y-4">
                                    {selectedTrip.itinerary.map((item, index) => (
                                        <div key={index} className="flex gap-4 items-start">
                                            {/* Timeline marker */}
                                            <div className="flex flex-col items-center">
                                                <div className="w-4 h-4 bg-[#4A1919] rounded-full"></div>
                                                {index < selectedTrip.itinerary.length - 1 && (
                                                    <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                                                )}
                                            </div>

                                            {/* Activity card */}
                                            <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                                                <div className="flex gap-4">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-20 h-20 object-cover rounded-lg"
                                                    />
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                                        <p className="text-sm text-gray-600">{item.duration}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {/* Top block: not scrollable, sticks because below container scrolls */}
                <div className="shrink-0 p-4">
                    <div className="grid auto-rows-min gap-2 px-10 md:grid-cols-1">
                        <div className="w-full bg-muted/50 aspect-[16/2] rounded-xl">
                            <DragAndDrop />
                        </div>
                    </div>
                </div>

                {/* Only this area scrolls */}
                <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 thin-scrollbar">
                    <TemplateBoardList />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}



