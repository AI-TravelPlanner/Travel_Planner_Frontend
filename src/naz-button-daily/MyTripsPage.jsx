import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// 1. Import the Thunk to get the LIST
import { fetchUserTrips } from '../api/apiService'; 

// 2. Import the SYNC action to open ONE trip (from your boardsSlice)
import { loadTripFromLocal } from '@/redux-slices/boardSlice'; 

const MyTripsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Get user info
    const { user } = useSelector((state) => state.auth);
    
    // Get the trips list from the userTrips slice
    const { trips, status } = useSelector((state) => state.userTrips);

    // Load the list when the component mounts
    useEffect(() => {
        if (user?.email) {
            dispatch(fetchUserTrips(user.email));
        }
    }, [user, dispatch]);

    // --- UPDATED HANDLER ---
    // We accept the full 'trip' object, not just the ID
    const handleOpenTrip = (trip) => {
        // 1. Dispatch the synchronous action. 
        // This instantly populates the 'boards' slice with this trip's data.
        dispatch(loadTripFromLocal(trip));
        
        // 2. Navigate immediately
        navigate('/dashboard'); 
    };

    if (status === 'loading') return <div className="p-10 text-center">Loading your trips...</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">My Saved Trips</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {trips.map((trip) => (
                    <div key={trip.id} className="border p-4 rounded shadow hover:shadow-md transition bg-white">
                        <h3 className="font-bold text-lg truncate">{trip.location}</h3>
                        <p className="text-gray-600 text-sm">{trip.theme}</p>
                        <p className="text-gray-500 text-xs mt-2">
                            {trip.days?.length || 0} Days • ${trip.budget}
                        </p>
                        
                        <button 
                            // --- PASS THE FULL TRIP OBJECT HERE ---
                            onClick={() => handleOpenTrip(trip)}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded text-sm w-full hover:bg-blue-700 transition-colors"
                        >
                            Open Plan
                        </button>
                    </div>
                ))}
            </div>
            
            {trips.length === 0 && status === 'succeeded' && (
                <div className="text-center py-10 text-gray-500">
                    You haven't saved any trips yet.
                </div>
            )}
        </div>
    );
};

export default MyTripsPage;