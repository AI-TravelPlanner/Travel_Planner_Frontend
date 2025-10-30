import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import {
    setDestination, setCheckIn, setCheckOut, setTravelers, submitSearch,
} from "@/redux-slices/tripSearchSlice";
import { toast } from "sonner";

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
    const days = Math.round(ms / 86400000);
    return Math.max(1, days);
};
const plural = (n, s, p) => (Number(n) === 1 ? s : p);
const isPositiveInt = (s) => /^\d+$/.test(s) && Number(s) > 0;

export const TripSearchBar = ({ onGeneratePrompt }) => {
    const dispatch = useDispatch();

    // local-only until submit
    const [destination, setDestinationLocal] = useState("");
    const [checkIn, setCheckInLocal] = useState("");
    const [checkOut, setCheckOutLocal] = useState("");
    const [travelers, setTravelersLocal] = useState("");

    const validateTravelers = () => {
        if (!isPositiveInt(travelers)) {
            toast.error("Travelers must be a positive number.");
            return false;
        }
        return true;
    };

    const handleSearch = (e) => {
        e?.preventDefault();

        if (!destination.trim() || !checkIn || !checkOut || !travelers) {
            toast.error("Please fill destination, dates, and travelers.");
            return;
        }
        if (!validateTravelers()) return;

        const days = diffDaysUTC(checkIn, checkOut);
        if (days === null || parseYMD(checkOut) <= parseYMD(checkIn)) {
            toast.error("Check-out must be after check-in.");
            return;
        }

        // Optional prompt (kept, not used)
        const t = Number(travelers);
        const prompt = `Plan a ${days}-day trip to ${destination} with ${t} ${plural(t, "traveler", "travelers")}. Check-in: ${checkIn}. Check-out: ${checkOut}.`;
        // onGeneratePrompt?.(prompt);

        // Commit to Redux on submit
        dispatch(submitSearch({ destination, checkIn, checkOut, travelers }));
        dispatch(setDestination(destination));
        dispatch(setCheckIn(checkIn));
        dispatch(setCheckOut(checkOut));
        dispatch(setTravelers(travelers));

        toast.success("Search saved.");
    };

    return (
        <form
            onSubmit={handleSearch}
            className="flex items-center justify-between bg-white rounded-2xl shadow-lg px-6 py-4 w-full max-w-5xl mx-auto space-y-4 md:space-y-0 md:space-x-4 backdrop-blur-sm"
        >
            {/* Destination */}
            <div className="flex flex-col pr-4 border-b md:border-b-0 md:border-r border-gray-200 flex-1 min-w-[150px]">
                <label className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" /> Destination
                </label>
                <Input
                    placeholder="City or Destination"
                    className="border-none p-0 text-sm text-gray-600 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={destination}
                    onChange={(e) => setDestinationLocal(e.target.value)}
                />
            </div>

            {/* Check-In */}
            <div className="flex flex-col px-0 md:px-4 border-b md:border-b-0 md:border-r border-gray-200 flex-1 min-w-[150px]">
                <label className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" /> Start Date
                </label>
                <Input
                    type="date"
                    className="border-none p-0 text-sm text-gray-600 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={checkIn}
                    onChange={(e) => setCheckInLocal(e.target.value)}
                />
            </div>

            {/* Check-Out */}
            <div className="flex flex-col px-0 md:px-4 border-b md:border-b-0 md:border-r border-gray-200 flex-1 min-w-[150px]">
                <label className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" /> End Date
                </label>
                <Input
                    type="date"
                    className="border-none p-0 text-sm text-gray-600 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={checkOut}
                    onChange={(e) => setCheckOutLocal(e.target.value)}
                />
            </div>

            {/* Travelers — text + custom validation with toast */}
            <div className="flex flex-col px-0 md:px-4 flex-1 min-w-[150px]">
                <label className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" /> Travelers
                </label>
                <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="Add Guests"
                    className="border-none p-0 text-sm text-gray-600 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={travelers}
                    onChange={(e) => setTravelersLocal(e.target.value)} // allow any input
                    onBlur={validateTravelers}   // toast on non-number when the user leaves the field
                />
            </div>

            {/* Search */}
            <div className="pl-0 md:pl-4 w-full md:w-auto">
                <Button
                    type="submit"
                    className="bg-[#4b1812] hover:bg-[#3a120e] text-white font-medium rounded-full px-6 py-5 flex items-center justify-center gap-2 w-full"
                >
                    <Search className="w-4 h-4" /> Search
                </Button>
            </div>
        </form>
    );
};
