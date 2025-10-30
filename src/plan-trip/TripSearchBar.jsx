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
    setTravelers,
    submitSearch
} from "@/redux-slices/tripSearchSlice";
import { toast } from "sonner"


/* --- helpers --- */
const parseYMD = (s) => {
    if (!s) return null;
    const [y, m, d] = s.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d));
};
const diffDaysUTC = (startStr, endStr) => {
    const a = parseYMD(startStr);
    const b = parseYMD(endStr);
    if (!a || !b) return null;
    const ms = b.getTime() - a.getTime();
    const days = Math.round(ms / 86400000); // 24*60*60*1000
    return Math.max(1, days); // at least a 1-day trip if same day
};
const plural = (n, s, p) => (Number(n) === 1 ? s : p);

export const TripSearchBar = () => {
    // Get the dispatch function
    const dispatch = useDispatch();

    // Read the current state from the Redux store
    const { destination, checkIn, checkOut, travelers } = useSelector((state) => state.tripSearch);

    const handleSearch = () => {
        // basic validation
        if (!destination?.trim() || !checkIn || !checkOut || !travelers) {
            toast.error("Please fill destination, dates, and travelers.");
            return;
        }
        const days = diffDaysUTC(checkIn, checkOut);
        if (days === null) {
            toast.error("Please provide valid dates.");
            return;
        }
        if (parseYMD(checkOut) <= parseYMD(checkIn)) {
            toast.error("Check-out must be after check-in.");
            return;
        }

        const t = Number(travelers);
        if (!Number.isFinite(t) || t <= 0) {
            toast.error("Travelers must be a positive number.");
            return;
        }

        const prompt = `Plan a ${days}-day trip to ${destination} with ${t} ${plural(
            t,
            "traveler",
            "travelers"
        )}. Check-in: ${checkIn}. Check-out: ${checkOut}.`;

        console.log("AI prompt:", prompt);
        // TODO: Dispatch an action to fetch results based on this state
        dispatch(submitSearch({ destination, checkIn, checkOut, travelers }));
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

