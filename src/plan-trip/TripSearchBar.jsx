import React from "react";
// Assuming you have shadcn/ui components available in these paths
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Search } from "lucide-react";
// Import Redux hooks and actions
import { useSelector, useDispatch } from "react-redux";
import {
    setDestination,
    setCheckIn,
    setCheckOut,
    setTravelers
} from "@/redux-slices/tripSearchSlice";

export const TripSearchBar = () => {
    // Get the dispatch function
    const dispatch = useDispatch();

    // Read the current state from the Redux store
    // This selector (state.tripSearch) matches the key in your store.js
    const { destination, checkIn, checkOut, travelers } = useSelector((state) => state.tripSearch);

    // This function now just reads from Redux state
    const handleSearch = () => {
        // You can get the state again here, or just use the variables above
        const currentState = { destination, checkIn, checkOut, travelers };
        console.log("Searching with:", currentState);
        // TODO: Dispatch an action to fetch results based on this state
        // e.g., dispatch(fetchTrips(currentState));
    };

    return (
        <div className="flex  items-center justify-between bg-white rounded-2xl shadow-lg px-6 py-4 w-full max-w-5xl mx-auto space-y-4 md:space-y-0 md:space-x-4 backdrop-blur-sm">
            {/* Destination */}
            <div className="flex flex-col pr-4 border-b md:border-b-0 md:border-r border-gray-200 flex-1 min-w-[150px]">
                <label className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" /> Destination
                </label>
                <Input
                    placeholder="City or Destination"
                    className="border-none p-0 text-sm text-gray-600 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                    // Make it a controlled component
                    value={destination}
                    // Dispatch an action on change
                    onChange={(e) => dispatch(setDestination(e.target.value))}
                />
            </div>

            {/* Check-In */}
            <div className="flex flex-col px-0 md:px-4 border-b md:border-b-0 md:border-r border-gray-200 flex-1 min-w-[150px]">
                <label className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" /> Check-In
                </label>
                <Input
                    type="date"
                    className="border-none p-0 text-sm text-gray-600 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                    // Make it a controlled component
                    value={checkIn}
                    // Dispatch an action on change
                    onChange={(e) => dispatch(setCheckIn(e.target.value))}
                />
            </div>

            {/* Check-Out */}
            <div className="flex flex-col px-0 md:px-4 border-b md:border-b-0 md:border-r border-gray-200 flex-1 min-w-[150px]">
                <label className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" /> Check-Out
                </label>
                <Input
                    type="date"
                    className="border-none p-0 text-sm text-gray-600 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                    // Make it a controlled component
                    value={checkOut}
                    // Dispatch an action on change
                    onChange={(e) => dispatch(setCheckOut(e.target.value))}
                />
            </div>

            {/* Travelers */}
            <div className="flex flex-col px-0 md:px-4 flex-1 min-w-[150px]">
                <label className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" /> Travelers
                </label>
                <Input
                    placeholder="Add Guests"
                    className="border-none p-0 text-sm text-gray-600 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                    // Make it a controlled component
                    value={travelers}
                    // Dispatch an action on change
                    onChange={(e) => dispatch(setTravelers(e.target.value))}
                />
            </div>

            {/* Search Button */}
            <div className="pl-0 md:pl-4 w-full md:w-auto">
                <Button
                    className="bg-[#4b1812] hover:bg-[#3a120e] text-white font-medium rounded-full px-6 py-5 flex items-center justify-center gap-2 w-full"
                    onClick={handleSearch}
                >
                    <Search className="w-4 h-4" /> Search
                </Button>
            </div>
        </div>
    )
}

