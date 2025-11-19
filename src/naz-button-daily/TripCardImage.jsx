import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react'; // Fallback icon
import cardImage from '@/assets/image1.jpg'; // Your default fallback

// --- CONFIGURATION ---
// Ideally, put this in your .env file (VITE_GOOGLE_API_KEY)
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const TripCardImage = ({ location }) => {
    const [photoUrl, setPhotoUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!location || !GOOGLE_API_KEY) {
            setLoading(false);
            return;
        }

        const fetchPhoto = async () => {
            try {
                // 1. Search for the Place ID using Text Search (New)
                const searchUrl = `https://places.googleapis.com/v1/places:searchText`;
                const searchResponse = await fetch(searchUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Goog-Api-Key': GOOGLE_API_KEY,
                        'X-Goog-FieldMask': 'places.photos', // Only ask for photos
                    },
                    body: JSON.stringify({ textQuery: location })
                });

                const searchData = await searchResponse.json();

                // 2. Extract Photo Reference
                if (searchData.places && searchData.places[0]?.photos?.length > 0) {
                    const photoName = searchData.places[0].photos[0].name;

                    // 3. Construct the Photo URL
                    // Format: https://places.googleapis.com/v1/{NAME}/media?key={KEY}&maxHeightPx=400
                    const url = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=500&maxWidthPx=800&key=${GOOGLE_API_KEY}`;
                    setPhotoUrl(url);
                }
            } catch (error) {
                console.error("Error fetching place image:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPhoto();
    }, [location]);

    // --- RENDER LOGIC ---

    if (loading) {
        return (
            <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                <MapPin className="text-gray-400 w-8 h-8" />
            </div>
        );
    }

    return (
        <img
            src={photoUrl || cardImage} // Use fetched URL, or fallback to your local image
            alt={location}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { e.target.src = cardImage; }} // Safety net if URL fails loading
        />
    );
};

export default TripCardImage;