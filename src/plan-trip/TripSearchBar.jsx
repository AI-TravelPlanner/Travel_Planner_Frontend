import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTripPlan } from "@/api/apiService";
import {
  setDestination,
  setCheckIn,
  setCheckOut,
  setTravelers,
  submitSearch,
} from "@/redux-slices/tripSearchSlice";
import { toast } from "sonner";

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

export const DestinationSearchInput = ({ value, onChange }) => {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  // Load Google Maps JS
  useEffect(() => {
    if (!window.google) {
      if (!document.getElementById("google-maps-script")) {
        const script = document.createElement("script");
        script.id = "google-maps-script";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${
          import.meta.env.VITE_GOOGLE_API_KEY
        }&libraries=places`;
        script.async = true;
        script.onload = () => console.log("Google Maps JS loaded");
        script.onerror = () => toast.error("Failed to load Google Maps API");
        document.body.appendChild(script);
      }
    }
  }, []);

  // Fetch suggestions
  useEffect(() => {
    if (!query || !window.google) {
      setSuggestions([]);
      return;
    }
    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      { input: query, componentRestrictions: { country: "CA" } },
      (predictions, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setSuggestions(predictions.map((p) => p.description));
        } else {
          setSuggestions([]);
        }
      }
    );
  }, [query]);

  // Hide dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (place) => {
    setQuery(place);
    onChange(place);
    setShowDropdown(false);
  };

  return (
    <div ref={containerRef} className="flex flex-col w-full h-">
      <label className="font-semibold text-gray-800 text-sm flex items-center gap-2">
        <MapPin className="w-4 h-4 text-gray-500" /> Destination
      </label>
      <Input
        placeholder="City or Destination"
        className="border-none p-2 text-sm text-gray-600 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
      />
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute left-0 top-full mt-1 w-50 max-h-40 overflow-y-auto bg-white shadow-lg rounded-lg border border-gray-200">
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const TripSearchBar = ({ onGeneratePrompt }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [destination, setDestinationLocal] = useState("");
  const [checkIn, setCheckInLocal] = useState("");
  const [checkOut, setCheckOutLocal] = useState("");
  const [travelers, setTravelersLocal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateTravelers = () => {
    if (!isPositiveInt(travelers)) {
      toast.error("Travelers must be a positive number.");
      return false;
    }
    return true;
  };

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!destination.trim() || !checkIn || !checkOut || !travelers) {
      toast.error("Please fill destination, dates, and travelers.");
      return;
    }
    if (!validateTravelers()) return;

    const days = diffDaysUTC(checkIn, checkOut) + 1;
    if (days === null || parseYMD(checkOut) <= parseYMD(checkIn)) {
      toast.error("Check-out must be after check-in.");
      return;
    }

    const t = Number(travelers);
    const prompt = `Plan a ${days}-day trip to ${destination} with ${t} ${plural(
      t,
      "traveler",
      "travelers"
    )}. Check-in: ${checkIn}. Check-out: ${checkOut}.`;

    dispatch(submitSearch({ destination, checkIn, checkOut, travelers }));
    dispatch(setDestination(destination));
    dispatch(setCheckIn(checkIn));
    dispatch(setCheckOut(checkOut));
    dispatch(setTravelers(travelers));

    setIsLoading(true);
    const toastId = toast.loading("Generating your trip plan...");
    try {
      await dispatch(fetchTripPlan({ prompt })).unwrap();
      toast.success("Trip generated! Redirecting…", { id: toastId });
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to generate trip. Please try again.", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl shadow-lg px-6 py-4 w-full max-w-5xl mx-auto space-y-4 md:space-y-0 md:space-x-4 backdrop-blur-sm"
    >
      <div className="flex-1 min-w-[150px]">
        <DestinationSearchInput
          value={destination}
          onChange={setDestinationLocal}
        />
      </div>

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
          onChange={(e) => setTravelersLocal(e.target.value)}
          onBlur={validateTravelers}
        />
      </div>

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
