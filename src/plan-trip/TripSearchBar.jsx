import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Search } from "lucide-react"

export const TripSearchBar = () => {
    return (
        <div className="flex items-center justify-between bg-white rounded-2xl shadow-md px-6 py-4 w-full max-w-5xl mx-auto space-x-4 backdrop-blur-sm">
            {/* Destination */}
            <div className="flex flex-col pr-4 border-r border-gray-200 flex-1">
                <label className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" /> Destination
                </label>
                <Input
                    placeholder="City or Destination"
                    className="border-none p-0 text-sm text-gray-600 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>

            {/* Check-In */}
            <div className="flex flex-col px-4 border-r border-gray-200 flex-1">
                <label className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" /> Check-In
                </label>
                <Input
                    type="date"
                    className="border-none p-0 text-sm text-gray-600 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>

            {/* Check-Out */}
            <div className="flex flex-col px-4 border-r border-gray-200 flex-1">
                <label className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" /> Check-Out
                </label>
                <Input
                    type="date"
                    className="border-none p-0 text-sm text-gray-600 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>

            {/* Travelers */}
            <div className="flex flex-col px-4 border-r border-gray-200 flex-1">
                <label className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" /> Travelers
                </label>
                <Input
                    placeholder="Add Guests"
                    className="border-none p-0 text-sm text-gray-600 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>

            {/* Search Button */}
            <div className="pl-4">
                <Button className="bg-[#4b1812] hover:bg-[#3a120e] text-white font-medium rounded-full px-6 py-5 flex items-center gap-2">
                    <Search className="w-4 h-4" /> Search
                </Button>
            </div>
        </div>
    )
}
