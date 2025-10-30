import { createSlice } from '@reduxjs/toolkit';

const tripSlice = createSlice({
  name: 'trips',
  initialState: {
    selectedTrip: null,
    expandedTripId: null,
    allTrips: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1489447068241-b3490214e879?w=800",
        name: "Marriott Fallsview Hotel & Spa",
        location: "Niagara Falls, Ontario",
        rating: 8.4,
        ratingText: "Very Good",
        reviews: "3,241 reviews",
        popular: true,
        badges: ["Pool", "Spa", "WiFi"],
        dates: ["2025-11-15", "2025-11-16", "2025-11-17", "2025-11-18", "2025-11-19"],
        boards: [
          {
            id: "board-1-1",
            date: "2025-11-15",
            items: ["niagara-1", "niagara-2"]
          },
          {
            id: "board-1-2",
            date: "2025-11-16",
            items: ["niagara-3", "niagara-4"]
          },
          {
            id: "board-1-3",
            date: "2025-11-17",
            items: ["niagara-5", "niagara-6"]
          },
          {
            id: "board-1-4",
            date: "2025-11-18",
            items: ["niagara-7", "niagara-8"]
          },
          {
            id: "board-1-5",
            date: "2025-11-19",
            items: ["niagara-9", "niagara-10"]
          }
        ],
        itinerary: [
          {
            id: "niagara-1",
            name: "Niagara Falls Boat Tour",
            duration: "2 hours",
            timeOfDay: "Morning",
            image: "https://images.unsplash.com/photo-1489447068241-b3490214e879?w=400",
            location: "Niagara Falls, Ontario",
            description: "Experience the power of Niagara Falls up close on the iconic Hornblower boat tour. Get soaked by the mist as you sail into the heart of the falls."
          },
          {
            id: "niagara-2",
            name: "Journey Behind the Falls",
            duration: "1.5 hours",
            timeOfDay: "Afternoon",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
            location: "Niagara Falls, Ontario",
            description: "Descend 125 feet down to tunnels that lead behind the massive sheet of water. View the falls from unique observation decks."
          },
          {
            id: "niagara-3",
            name: "Clifton Hill Entertainment",
            duration: "3 hours",
            timeOfDay: "Evening",
            image: "https://images.unsplash.com/photo-1533854775446-95c4609da544?w=400",
            location: "Niagara Falls, Ontario",
            description: "Explore Niagara's famous entertainment district with wax museums, haunted houses, arcades, and restaurants with stunning falls views."
          },
          {
            id: "niagara-4",
            name: "Niagara-on-the-Lake Wine Tour",
            duration: "4 hours",
            timeOfDay: "Afternoon",
            image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400",
            location: "Niagara-on-the-Lake, Ontario",
            description: "Visit world-renowned wineries in picturesque Niagara-on-the-Lake. Sample ice wines and tour historic vineyards."
          },
          {
            id: "niagara-5",
            name: "Spa Treatment at Hotel",
            duration: "2 hours",
            timeOfDay: "Evening",
            image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400",
            location: "Marriott Fallsview Hotel & Spa",
            description: "Relax with a luxurious spa treatment overlooking Niagara Falls. Choose from massages, facials, and hydrotherapy."
          },
          {
            id: "niagara-6",
            name: "Skylon Tower Dining",
            duration: "2 hours",
            timeOfDay: "Evening",
            image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
            location: "Niagara Falls, Ontario",
            description: "Enjoy fine dining 775 feet above the falls at the revolving restaurant. Watch the sunset over both American and Canadian falls."
          },
          {
            id: "niagara-7",
            name: "Whirlpool Aero Car",
            duration: "1 hour",
            timeOfDay: "Morning",
            image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400",
            location: "Niagara Falls, Ontario",
            description: "Ride the historic cable car across the Niagara Whirlpool. Experience breathtaking views of the swirling rapids below."
          },
          {
            id: "niagara-8",
            name: "Butterfly Conservatory",
            duration: "1.5 hours",
            timeOfDay: "Afternoon",
            image: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400",
            location: "Niagara Falls, Ontario",
            description: "Walk through a tropical rainforest filled with over 2,000 butterflies. Experience exotic plants and cascading waterfalls."
          },
          {
            id: "niagara-9",
            name: "Fallsview Casino Gaming",
            duration: "3 hours",
            timeOfDay: "Evening",
            image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400",
            location: "Niagara Falls, Ontario",
            description: "Try your luck at the luxurious Fallsview Casino. Over 3,000 slot machines and 130 gaming tables with falls views."
          },
          {
            id: "niagara-10",
            name: "Helicopter Tour",
            duration: "30 minutes",
            timeOfDay: "Morning",
            image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400",
            location: "Niagara Falls, Ontario",
            description: "Soar over Niagara Falls and the Niagara region in a helicopter. Unforgettable aerial views of all three waterfalls."
          }
        ]
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
        name: "Grand Luxury Resort",
        location: "Toronto, Ontario",
        rating: 9.1,
        ratingText: "Excellent",
        reviews: "2,856 reviews",
        popular: true,
        badges: ["Pool", "Gym", "Restaurant"],
        dates: ["2025-11-20", "2025-11-21", "2025-11-22", "2025-11-23", "2025-11-24", "2025-11-25"],
        boards: [
          {
            id: "board-2-1",
            date: "2025-11-20",
            items: ["toronto-1", "toronto-2"]
          },
          {
            id: "board-2-2",
            date: "2025-11-21",
            items: ["toronto-3", "toronto-4"]
          },
          {
            id: "board-2-3",
            date: "2025-11-22",
            items: ["toronto-5", "toronto-6"]
          },
          {
            id: "board-2-4",
            date: "2025-11-23",
            items: ["toronto-7", "toronto-8"]
          },
          {
            id: "board-2-5",
            date: "2025-11-24",
            items: ["toronto-9", "toronto-10"]
          },
          {
            id: "board-2-6",
            date: "2025-11-25",
            items: ["toronto-11", "toronto-12"]
          }
        ],
        itinerary: [
          {
            id: "toronto-1",
            name: "CN Tower Visit",
            duration: "3 hours",
            timeOfDay: "Morning",
            image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400",
            location: "Toronto, Ontario",
            description: "Visit Canada's iconic CN Tower. Experience the glass floor, EdgeWalk, and breathtaking 360-degree views of Toronto."
          },
          {
            id: "toronto-2",
            name: "Ripley's Aquarium of Canada",
            duration: "2.5 hours",
            timeOfDay: "Afternoon",
            image: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=400",
            location: "Toronto, Ontario",
            description: "Walk through the underwater tunnel and see over 20,000 aquatic animals including sharks, jellyfish, and sea turtles."
          },
          {
            id: "toronto-3",
            name: "Distillery District Exploration",
            duration: "2 hours",
            timeOfDay: "Evening",
            image: "https://images.unsplash.com/photo-1513342791620-b106dc487c94?w=400",
            location: "Toronto, Ontario",
            description: "Stroll through Toronto's historic Distillery District. Explore art galleries, boutique shops, and artisan restaurants in Victorian-era buildings."
          },
          {
            id: "toronto-4",
            name: "Toronto Islands Ferry & Beach",
            duration: "4 hours",
            timeOfDay: "Morning",
            image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400",
            location: "Toronto Islands, Ontario",
            description: "Take a ferry to Toronto Islands for beaches, bike rentals, and stunning skyline views. Perfect escape from the city bustle."
          },
          {
            id: "toronto-5",
            name: "St. Lawrence Market Food Tour",
            duration: "2 hours",
            timeOfDay: "Afternoon",
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
            location: "Toronto, Ontario",
            description: "Sample diverse cuisines at one of the world's best food markets. Try peameal bacon sandwiches and fresh Canadian produce."
          },
          {
            id: "toronto-6",
            name: "Casa Loma Castle Tour",
            duration: "2.5 hours",
            timeOfDay: "Morning",
            image: "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=400",
            location: "Toronto, Ontario",
            description: "Explore Toronto's majestic Gothic Revival castle. Tour secret passages, towers, and beautiful gardens."
          },
          {
            id: "toronto-7",
            name: "Royal Ontario Museum",
            duration: "3 hours",
            timeOfDay: "Afternoon",
            image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400",
            location: "Toronto, Ontario",
            description: "Discover world cultures and natural history at Canada's largest museum. See dinosaurs, ancient Egypt, and contemporary art."
          },
          {
            id: "toronto-8",
            name: "Kensington Market Walking Tour",
            duration: "2 hours",
            timeOfDay: "Afternoon",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
            location: "Toronto, Ontario",
            description: "Explore Toronto's most eclectic neighborhood. Browse vintage shops, international food stalls, and street art."
          },
          {
            id: "toronto-9",
            name: "Hockey Hall of Fame",
            duration: "2 hours",
            timeOfDay: "Morning",
            image: "https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=400",
            location: "Toronto, Ontario",
            description: "Celebrate Canada's favorite sport. See the Stanley Cup, interactive exhibits, and hockey memorabilia."
          },
          {
            id: "toronto-10",
            name: "Toronto Harbour Cruise",
            duration: "2.5 hours",
            timeOfDay: "Evening",
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
            location: "Toronto Harbour, Ontario",
            description: "Cruise Lake Ontario with stunning views of the Toronto skyline. Watch the sunset over the city lights."
          },
          {
            id: "toronto-11",
            name: "Graffiti Alley Art Walk",
            duration: "1.5 hours",
            timeOfDay: "Afternoon",
            image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400",
            location: "Toronto, Ontario",
            description: "Walk through Toronto's famous street art district. See ever-changing murals and urban art installations."
          },
          {
            id: "toronto-12",
            name: "Toronto Blue Jays Game",
            duration: "3.5 hours",
            timeOfDay: "Evening",
            image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400",
            location: "Rogers Centre, Toronto",
            description: "Experience baseball at the iconic Rogers Centre. Watch the Blue Jays play under the retractable roof."
          }
        ]
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
        name: "Riverside Boutique Hotel",
        location: "Ottawa, Ontario",
        rating: 8.7,
        ratingText: "Fabulous",
        reviews: "1,543 reviews",
        popular: false,
        badges: ["WiFi", "Bar", "Parking"],
        dates: ["2025-11-25", "2025-11-26", "2025-11-27", "2025-11-28"],
        boards: [
          {
            id: "board-3-1",
            date: "2025-11-25",
            items: ["ottawa-1", "ottawa-2"]
          },
          {
            id: "board-3-2",
            date: "2025-11-26",
            items: ["ottawa-3", "ottawa-4"]
          },
          {
            id: "board-3-3",
            date: "2025-11-27",
            items: ["ottawa-5", "ottawa-6"]
          },
          {
            id: "board-3-4",
            date: "2025-11-28",
            items: ["ottawa-7", "ottawa-8"]
          }
        ],
        itinerary: [
          {
            id: "ottawa-1",
            name: "Parliament Hill Tour",
            duration: "2 hours",
            timeOfDay: "Morning",
            image: "https://images.unsplash.com/photo-1589802829985-817e51171b92?w=400",
            location: "Ottawa, Ontario",
            description: "Explore Canada's seat of government with a guided tour of Parliament Hill. See the Peace Tower and watch the Changing of the Guard ceremony."
          },
          {
            id: "ottawa-2",
            name: "Rideau Canal Walk",
            duration: "1.5 hours",
            timeOfDay: "Afternoon",
            image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400",
            location: "Ottawa, Ontario",
            description: "Walk along the UNESCO World Heritage Rideau Canal. In winter, skate on the world's largest skating rink."
          },
          {
            id: "ottawa-3",
            name: "ByWard Market Experience",
            duration: "2.5 hours",
            timeOfDay: "Evening",
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
            location: "Ottawa, Ontario",
            description: "Visit Canada's oldest and largest public market. Shop for local crafts, fresh produce, and enjoy diverse restaurants."
          },
          {
            id: "ottawa-4",
            name: "Canadian Museum of History",
            duration: "3 hours",
            timeOfDay: "Morning",
            image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400",
            location: "Gatineau, Quebec",
            description: "Discover Canada's rich history across the river in Gatineau. Explore indigenous culture and Canadian heritage exhibitions."
          },
          {
            id: "ottawa-5",
            name: "National Gallery of Canada",
            duration: "2.5 hours",
            timeOfDay: "Afternoon",
            image: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=400",
            location: "Ottawa, Ontario",
            description: "View world-class art collections including the famous Maman spider sculpture. Explore Canadian and international masterpieces."
          },
          {
            id: "ottawa-6",
            name: "Canadian War Museum",
            duration: "2 hours",
            timeOfDay: "Morning",
            image: "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=400",
            location: "Ottawa, Ontario",
            description: "Journey through Canada's military history from First Nations conflicts to modern peacekeeping missions."
          },
          {
            id: "ottawa-7",
            name: "Major's Hill Park Picnic",
            duration: "1.5 hours",
            timeOfDay: "Afternoon",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
            location: "Ottawa, Ontario",
            description: "Relax in this historic park with views of Parliament, the Ottawa River, and Rideau Canal locks."
          },
          {
            id: "ottawa-8",
            name: "Ottawa River Kayaking",
            duration: "3 hours",
            timeOfDay: "Morning",
            image: "https://images.unsplash.com/photo-1501908734255-16579c18c25f?w=400",
            location: "Ottawa River, Ontario",
            description: "Paddle the Ottawa River with stunning views of Parliament Hill. Suitable for all skill levels."
          }
        ]
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
        name: "Mountain View Lodge",
        location: "Blue Mountains, Ontario",
        rating: 8.9,
        ratingText: "Fabulous",
        reviews: "2,124 reviews",
        popular: true,
        badges: ["Ski", "Spa", "Restaurant"],
        dates: ["2025-11-05", "2025-11-06", "2025-11-07", "2025-11-08", "2025-11-09"],
        boards: [
          {
            id: "board-4-1",
            date: "2025-11-05",
            items: ["bluemountain-1", "bluemountain-2"]
          },
          {
            id: "board-4-2",
            date: "2025-11-06",
            items: ["bluemountain-3", "bluemountain-4"]
          },
          {
            id: "board-4-3",
            date: "2025-11-07",
            items: ["bluemountain-5", "bluemountain-6"]
          },
          {
            id: "board-4-4",
            date: "2025-11-08",
            items: ["bluemountain-7", "bluemountain-8"]
          },
          {
            id: "board-4-5",
            date: "2025-11-09",
            items: ["bluemountain-9", "bluemountain-10"]
          }
        ],
        itinerary: [
          {
            id: "bluemountain-1",
            name: "Ski Lesson & Slopes",
            duration: "3 hours",
            timeOfDay: "Morning",
            image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
            location: "Blue Mountain Resort, Ontario",
            description: "Hit the slopes at Ontario's premier ski resort. Professional lessons available for all skill levels with stunning Georgian Bay views."
          },
          {
            id: "bluemountain-2",
            name: "Mountain Hiking Trail",
            duration: "4 hours",
            timeOfDay: "Afternoon",
            image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400",
            location: "Blue Mountains, Ontario",
            description: "Hike the scenic Bruce Trail through Niagara Escarpment forests. Experience waterfalls, limestone caves, and autumn colors."
          },
          {
            id: "bluemountain-3",
            name: "Blue Mountain Village Shopping",
            duration: "2 hours",
            timeOfDay: "Evening",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
            location: "Blue Mountain Village, Ontario",
            description: "Explore the charming pedestrian village with boutique shops, art galleries, and cozy cafes nestled at the mountain base."
          },
          {
            id: "bluemountain-4",
            name: "Scandinave Spa Experience",
            duration: "3 hours",
            timeOfDay: "Afternoon",
            image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400",
            location: "Blue Mountains, Ontario",
            description: "Indulge in Nordic-inspired thermal baths and saunas surrounded by forest. Experience hot/cold hydrotherapy circuits."
          },
          {
            id: "bluemountain-5",
            name: "Ridge Runner Mountain Coaster",
            duration: "1 hour",
            timeOfDay: "Morning",
            image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400",
            location: "Blue Mountain Resort, Ontario",
            description: "Ride Canada's longest mountain coaster through the forest. Control your speed as you twist and turn down the mountain."
          },
          {
            id: "bluemountain-6",
            name: "Snowshoeing Adventure",
            duration: "2.5 hours",
            timeOfDay: "Morning",
            image: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=400",
            location: "Blue Mountains, Ontario",
            description: "Trek through pristine winter landscapes on snowshoes. Guided tours through peaceful forest trails."
          },
          {
            id: "bluemountain-7",
            name: "Tubing Park",
            duration: "2 hours",
            timeOfDay: "Afternoon",
            image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=400",
            location: "Blue Mountain Resort, Ontario",
            description: "Race down snow-covered lanes on inflatable tubes. Fun for all ages with magic carpet lift service."
          },
          {
            id: "bluemountain-8",
            name: "Georgian Bay Sunset Tour",
            duration: "2 hours",
            timeOfDay: "Evening",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
            location: "Georgian Bay, Ontario",
            description: "Drive to Georgian Bay shoreline for spectacular sunset views. Visit charming waterfront towns along the way."
          },
          {
            id: "bluemountain-9",
            name: "Collingwood Brewery Tour",
            duration: "2 hours",
            timeOfDay: "Afternoon",
            image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400",
            location: "Collingwood, Ontario",
            description: "Tour local craft breweries and sample award-winning beers. Learn about the brewing process and local ingredients."
          },
          {
            id: "bluemountain-10",
            name: "Ice Climbing Experience",
            duration: "3 hours",
            timeOfDay: "Morning",
            image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400",
            location: "Blue Mountains, Ontario",
            description: "Learn ice climbing on frozen waterfalls with expert instructors. Equipment and safety gear provided."
          }
        ]
      }
    ],
  },
  reducers: {
    selectTrip: (state, action) => {
      state.selectedTrip = action.payload;
      state.expandedTripId = action.payload?.id || null;
    },
    clearSelectedTrip: (state) => {
      state.selectedTrip = null;
      state.expandedTripId = null;
    },
    expandTrip: (state, action) => {
      state.expandedTripId = action.payload;
    },
    collapseTrip: (state) => {
      state.expandedTripId = null;
    },
  },
});

export const { selectTrip, clearSelectedTrip, expandTrip, collapseTrip } = tripSlice.actions;
export default tripSlice.reducer;