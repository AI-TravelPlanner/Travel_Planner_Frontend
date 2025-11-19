import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// Added Users for the people count
import { Calendar, Wallet, MapPin, ArrowRight, Users } from 'lucide-react'; 

import { fetchUserTrips } from '../api/apiService';
import { loadTripFromLocal } from '@/redux-slices/boardSlice';
import cardImage from '@/assets/image1.jpg'; 

const MyTripsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const { trips, status } = useSelector((state) => state.userTrips);

    useEffect(() => {
        if (user?.email) {
            dispatch(fetchUserTrips(user.email));
        }
    }, [user, dispatch]);

    const handleOpenTrip = (trip) => {
        dispatch(loadTripFromLocal(trip));
        navigate('/dashboard');
    };

    /**
     * Helper to format date range neatly (e.g., "14 Aug - 19 Aug")
     */
    const formatDateRange = (start, end) => {
        if (!start || !end) return "";
        
        const options = { day: 'numeric', month: 'short' };
        const sDate = new Date(start).toLocaleDateString('en-US', options);
        const eDate = new Date(end).toLocaleDateString('en-US', options);
        
        return `${sDate} - ${eDate}`;
    };

    if (status === 'loading') {
        return (
             <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="text-center animate-pulse">
                     <div className="h-8 w-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
                     <p className="text-gray-500">Loading your adventures...</p>
                </div>
             </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        My Trips
                    </h1>
                </div>

                {trips.length === 0 && status === 'succeeded' ? (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <h3 className="text-lg font-medium text-gray-900">No trips saved yet</h3>
                        <p className="text-gray-500 mt-1">Time to plan your next big adventure!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trips.map((trip) => {
                            // Access your specific data keys here. 
                            // Adjust 'userSelection' if your data is stored at the top level.
                            const startDate = trip.userSelection?.startDate || trip.startDate;
                            const endDate = trip.userSelection?.endDate || trip.endDate;
                            const travelers = trip.userSelection?.travelers || trip.numberOfPeople;
                            const budget = trip.userSelection?.budget || trip.budget;

                            return (
                                <div 
                                    key={trip.id} 
                                    className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                                >
                                    <div className="relative h-48 w-full overflow-hidden">
                                        <img
                                            src={cardImage}
                                            alt={trip.location}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg text-gray-900 line-clamp-1" title={trip.location}>
                                                {trip.location}
                                            </h3>
                                        </div>
                                        
                                        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                                            {trip.theme ? `${trip.theme} trip` : "Custom adventure"}
                                        </p>

                                        {/* --- UPDATED STATS SECTION --- */}
                                        {/* Added flex-wrap so items drop to next line if they get too wide */}
                                        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-gray-600 mb-5">
                                            
                                            {/* 1. Date Range (replacing simple 'Days' count for more info) */}
                                            {(startDate && endDate) ? (
                                                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
                                                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                                                    <span>{formatDateRange(startDate, endDate)}</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
                                                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                                                    <span>{trip.days?.length || 0} Days</span>
                                                </div>
                                            )}

                                            {/* 2. Budget */}
                                            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
                                                <Wallet className="w-3.5 h-3.5 text-gray-500" />
                                                <span>{budget ? `$${budget}` : 'No Budget'}</span>
                                            </div>

                                            {/* 3. Travelers (New) */}
                                            {travelers && (
                                                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
                                                    <Users className="w-3.5 h-3.5 text-gray-500" />
                                                    <span>{travelers} {Number(travelers) === 1 ? 'Person' : 'People'}</span>
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => handleOpenTrip(trip)}
                                            className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
                                        >
                                            View Plan <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTripsPage;