"use client";

import { useState, useRef, useCallback } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";

const libraries = ["places"];

export default function CitySearch({ apiKey, value, onSelect }) {
  const [inputValue, setInputValue] = useState(value || "");
  const autocompleteRef = useRef(null);

  const onLoad = useCallback((autoC) => {
    autocompleteRef.current = autoC;
  }, []);

  const onPlaceChanged = useCallback(() => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.address_components) {
      const city =
        place.address_components.find((c) => c.types.includes("locality"))
          ?.long_name || "";

      const province =
        place.address_components.find((c) =>
          c.types.includes("administrative_area_level_1")
        )?.long_name || "";

      const country =
        place.address_components.find((c) => c.types.includes("country"))
          ?.long_name || "";

      if (country !== "Canada") return;

      const cityFull = [city, province, country].filter(Boolean).join(", ");
      setInputValue(cityFull);
      if (onSelect) onSelect({ city, province, country, cityFull });
    }
  }, [onSelect]);

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        types={["(cities)"]}
        restrictions={{ country: "ca" }}
      >
        <Input
          type="text"
          placeholder="eg., Toronto, etc"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full"
        />
      </Autocomplete>
    </LoadScript>
  );
}
