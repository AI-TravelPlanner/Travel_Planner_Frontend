import { createSlice } from '@reduxjs/toolkit';

const tripSlice = createSlice({
  name: 'trips',
  initialState: {
    selectedTrip: null,
    expandedTripId: null, // NEW: Track which trip is expanded in dashboard
    allTrips: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60",
        name: "Marriott Fallsview Hotel & Spa",
        location: "Niagara Falls, Ontario",
        rating: 8.4,
        ratingText: "Very Good",
        reviews: "3,241 reviews",
        popular: true,
        badges: ["Pool", "Spa", "WiFi"],
        // NEW: Add sample itinerary data
        dates: ["Oct 25, 2025", "Oct 26, 2025", "Oct 27, 2025"],
        itinerary: [
          {
            name: "Niagara Falls Tour",
            duration: "2 hours",
            image: "https://images.unsplash.com/photo-1489447068241-b3490214e879?w=400"
          },
          {
            name: "Spa Treatment",
            duration: "1.5 hours",
            image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400"
          }
        ]
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=60",
        name: "Grand Luxury Resort",
        location: "Toronto, Ontario",
        rating: 9.1,
        ratingText: "Excellent",
        reviews: "2,856 reviews",
        popular: true,
        badges: ["Pool", "Gym", "Restaurant"],
        dates: ["Oct 28, 2025", "Oct 29, 2025"],
        itinerary: [
          {
            name: "CN Tower Visit",
            duration: "3 hours",
            image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400"
          }
        ]
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=60",
        name: "Riverside Boutique Hotel",
        location: "Ottawa, Ontario",
        rating: 8.7,
        ratingText: "Fabulous",
        reviews: "1,543 reviews",
        popular: false,
        badges: ["WiFi", "Bar", "Parking"],
        dates: ["Nov 1, 2025", "Nov 2, 2025"],
        itinerary: [
          {
            name: "Parliament Tour",
            duration: "2 hours",
            image: "https://images.unsplash.com/photo-1589802829985-817e51171b92?w=400"
          }
        ]
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=60",
        name: "Mountain View Lodge",
        location: "Blue Mountains, Ontario",
        rating: 8.9,
        ratingText: "Fabulous",
        reviews: "2,124 reviews",
        popular: true,
        badges: ["Ski", "Spa", "Restaurant"],
        dates: ["Nov 5, 2025", "Nov 6, 2025", "Nov 7, 2025"],
        itinerary: [
          {
            name: "Ski Lesson",
            duration: "3 hours",
            image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400"
          },
          {
            name: "Mountain Hiking",
            duration: "4 hours",
            image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400"
          }
        ]
      }
    ],
  },
  reducers: {
    // Existing reducer
    selectTrip: (state, action) => {
      state.selectedTrip = action.payload;
      // NEW: Auto-expand when selecting
      state.expandedTripId = action.payload?.id || null;
    },
    
    // NEW: Clear selection when leaving dashboard
    clearSelectedTrip: (state) => {
      state.selectedTrip = null;
      state.expandedTripId = null;
    },
    
    // NEW: Expand/collapse trip in dashboard
    expandTrip: (state, action) => {
      state.expandedTripId = action.payload;
    },
    
    // NEW: Collapse trip
    collapseTrip: (state) => {
      state.expandedTripId = null;
    },
  },
});

export const { 
  selectTrip, 
  clearSelectedTrip, 
  expandTrip, 
  collapseTrip 
} = tripSlice.actions;

export default tripSlice.reducer;