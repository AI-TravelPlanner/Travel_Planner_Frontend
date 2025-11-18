// import Redux Toolkit helper to create a slice with reducers and actions
import { createSlice, nanoid } from '@reduxjs/toolkit'
// import arrayMove utility to reorder arrays immutably
import { arrayMove } from '@dnd-kit/sortable'
import { addDays, formatISO, parseISO } from 'date-fns'
import { fetchTripPlan } from '../api/apiService';


const STORAGE_KEY = 'activeTripState'; // Must match the key from store.js

// The source JSON data provided by the user
const sourceTripJson = {
    location: 'Montreal, Canada',
    budget: 500.0,
    startDate: '2024-03-15',
    endDate: '2024-03-15',
    numberOfPeople: 1,
    theme: 'Food and History',
    days: [
        {
            dayNumber: 1,
            date: '2024-03-15',
            weather: {
                temperature: 5,
                condition: 'Cloudy',
            },
            hotel: {
                hotelName: 'Hotel Birks Montreal',
                location: '1240 Phillips Square, Montreal, QC H3B 3H4, Canada',
                pricePerNight: 300.0,
                placeDetails: {
                    /* ... hotel placeDetails ... */
                },
            },
            activities: [
                {
                    name: 'Visit Old Montreal',
                    price: 0.0,
                    duration: '3 hours',
                    placeDetails: {
                        placeId: 'ChIJKSezr_gayUwRDnKQVi-nC4U',
                        formattedAddress: '333 Rue de la Commune O, Montréal, QC H2Y 2E2, Canada',
                        photoUrls: [
                            'https://places.googleapis.com/v1/places/ChIJKSezr_gayUwRDnKQVi-nC4U/photos/AWn5SU5QCxllg3f9PImWRh9QT5OZvpZXiRqULD9BLFNf9gZWo11wGg4BGo7SOdO90pKf0qO40X6bTGqud6UPeijHwulRXCojNdQkTj2Nv0mDGkPh3gKDu1S0v3LtxMjKBe9VVrqX-PnUXk3jij3SJVzW4c2cwEAebUqQfPfKt-w6KJJrrg4hcK4ZSacb4zd9QaJO8PaDGLDGEJ4AEAKnN-nD0AwtLIDZtC7eAEBR476Zk01biZkGnz9jTSauTqiOEArnL_6cWbbECCuOMpLEY2btLrzugk7H2p_GtWS_bYypim2iVA/media?maxHeightPx=800&key=AIzaSyAb4OlMDJ0APq8X2qil_ZVMsWVBT0z0Vls',
                        ],
                        /* ... other activity placeDetails ... */
                    },
                },
                {
                    name: "Lunch at Schwartz's Deli",
                    price: 30.0,
                    duration: '1.5 hours',
                    placeDetails: {
                        placeId: 'ChIJEWsAWDMayUwRQPiLFOWhYdk',
                        formattedAddress: "3895 Boul. Saint-Laurent, Montréal, QC H2W 1K4, Canada",
                        photoUrls: [
                            'https://places.googleapis.com/v1/places/ChIJEWsAWDMayUwRQPiLFOWhYdk/photos/AWn5SU5VZugCzLXwn9qveiROAkttqclWdGnzZsuTFeuZVjWCJWH92lp-I_fK4QIPgf6lvAbrZl0wwpY2Ke0miVDTURwkOzmgD-2zpN8JBBJw83H484kH6vdnQ7oaRvLlOsXiuftI_qCRkdb9cQf6mJzxSSsWrphpgRjTQnjucMWFgSuatu5PFJwwZH_V3GNfPC0S0MfFlAlz7bladXeMTGPLvoVDrT4wcKevDq9KLTTD8eAsFcOnkEQ9U-DtMn4g8UwEbrM0BPyxybZ1LgbVJnrH9vL47KUftkoCmWlPjthEUkkWdA/media?maxHeightPx=800&key=AIzaSyAb4OlMDJ0APq8X2qil_ZVMsWVBT0z0Vls',
                        ],
                        /* ... other activity placeDetails ... */
                    },
                },
                // ... other activities
            ],
        },
        // ... potentially more days
    ],
}

// --- THIS IS THE NEW LOADING LOGIC ---
const loadStateFromStorage = () => {
    try {
        const serializedState = localStorage.getItem(STORAGE_KEY);
        if (serializedState === null) {
            // No state saved, normalize the default
            return normalizeData(sourceTripJson);
        }
        // IMPORTANT: We parse the saved state. We DO NOT normalize it again,
        // because we are saving the *already normalized state*.
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Could not load state from localStorage", err);
        // Fallback to default
        return normalizeData(sourceTripJson);
    }
};

/**
 * Normalizes the source JSON into the *original* state shape
 * ('boards', 'itemsById') to maintain compatibility.
 */
const normalizeData = (tripJson) => {
    const initialState = {
        // --- New Top-Level State ---
        location: tripJson.location,
        budget: tripJson.budget,
        startDate: tripJson.startDate,
        endDate: tripJson.endDate,
        numberOfPeople: tripJson.numberOfPeople,
        theme: tripJson.theme,

        // --- Original State Structure ---
        boards: {},
        boardOrder: [],
        itemsById: {},
    }

    // Process each 'day' from JSON and map it to a 'board'
    tripJson.days.forEach((day) => {
        // 1. Create a 'board' ID
        const boardId = `board-${day.dayNumber}`
        initialState.boardOrder.push(boardId)

        const itemIds = []

        // 2. Process and normalize 'activities' and map them to 'items'
        day.activities.forEach((activity) => {
            // Create a unique 'item' ID
            const itemId = nanoid()
            itemIds.push(itemId)

            // Add the full activity object (mapped to 'item' fields) to the global map
            initialState.itemsById[itemId] = {
                id: itemId,
                title: activity.name,
                duration: activity.duration,
                price: activity.price,
                placeDetails: activity.placeDetails, // Store all Google Place data

                // Map to original fields for compatibility
                image:
                    activity.placeDetails?.photoUrls?.[0] ||
                    'https://i.pinimg.com/736x/21/83/ab/2183ab07ff2e0e561e0e0738705d4343.jpg',
                location: activity.placeDetails?.formattedAddress || '',
                description: activity.placeDetails?.website || '', // Example mapping
                timeOfDay: '', // This field was in the old state, default to empty
                timeline: '',  // This field was in the old state, default to empty
            }
        })

        // 3. Add the normalized 'board' object to the `boards` map
        initialState.boards[boardId] = {
            id: boardId,
            title: `Day ${day.dayNumber}`, // Use dayNumber for the title
            date: formatISO(parseISO(day.date)), // Ensure consistent ISO format
            hotelName: day.hotel.hotelName,
            items: itemIds, // The array of activity/item IDs

            // Add new data to the board object
            hotel: day.hotel,
            weather: day.weather,
            dayNumber: day.dayNumber, // Keep this for easy reference
        }
    })

    return initialState
}

// Generate the initial state
const initialState = loadStateFromStorage();

// create a Redux slice named 'boards' with initial state and reducers
const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        // --- New Reducer for Top-Level Info ---
        updateTripDetails: (state, action) => {
            const { location, budget, startDate, endDate, numberOfPeople, theme } = action.payload;
            if (location) state.location = location;
            if (budget) state.budget = budget;
            if (startDate) state.startDate = startDate;
            if (endDate) state.endDate = endDate;
            if (numberOfPeople) state.numberOfPeople = numberOfPeople;
            if (theme) state.theme = theme;
        },

        // --- Original Reducers (Modified for new data) ---

        /**
         * Set every board's date such that board at boardOrder[i] receives baseDate + i days
         * Payload: { baseDateISO: string }
         */
        setBoardDatesFromBase: (state, action) => {
            const baseDateISO = action.payload
            const baseDate = parseISO(baseDateISO)
            // iterate through boardOrder and set date for each board
            for (let i = 0; i < state.boardOrder.length; i++) {
                const boardId = state.boardOrder[i]
                const boardDate = addDays(baseDate, i)
                state.boards[boardId].date = formatISO(boardDate)
            }
        },

        /**
         * Optionally, an action to update a single board's date directly:
         * Payload: { boardId, dateISO }
         */
        setBoardDate: (state, action) => {
            const { boardId, dateISO } = action.payload
            if (state.boards[boardId]) {
                state.boards[boardId].date = dateISO
            }
        },

        /**
         * Adds a new empty board to the state with a unique id.
         * NOW: Also adds default 'hotel' and 'weather' objects.
         */
        addEmptyBoard: (state) => {
            const newId = `board-${Date.now()}`
            const boardOrder = state.boardOrder
            const boards = state.boards

            let newDate = new Date().toISOString()

            if (boardOrder.length > 0) {
                const lastBoardId = boardOrder[boardOrder.length - 1]
                const lastBoard = boards[lastBoardId]

                if (lastBoard && lastBoard.date) {
                    const nextDay = addDays(parseISO(lastBoard.date), 1)
                    newDate = nextDay.toISOString()
                }
            }

            const newDayNumber = boardOrder.length + 1;

            const newBoard = {
                id: newId,
                items: [],
                date: newDate,
                title: `Day ${newDayNumber}`,
                dayNumber: newDayNumber,

                // Add defaults for new data
                hotelName: 'Select a hotel',
                hotel: { hotelName: 'Select a hotel', location: '', pricePerNight: 0, placeDetails: null },
                weather: { temperature: null, condition: '' },
            }

            state.boards[newId] = newBoard
            state.boardOrder.push(newId)
        },

        /**
         * Reorder items within the same board.
         * Payload: { boardId, oldIndex, newIndex }
         */
        moveItemWithinBoard: (state, action) => {
            const { boardId, oldIndex, newIndex } = action.payload
            state.boards[boardId].items = arrayMove(
                state.boards[boardId].items,
                oldIndex,
                newIndex,
            )
        },

        /**
         * Move an item from one board to another.
         * Payload: { fromBoardId, toBoardId, activeId, newIndex }
         */
        moveItemAcrossBoards: (state, action) => {
            const { fromBoardId, toBoardId, activeId, newIndex } = action.payload

            if (!state.boards[fromBoardId] || !state.boards[toBoardId]) {
                console.warn('moveItemAcrossBoards: invalid board id(s)', {
                    fromBoardId,
                    toBoardId,
                    activeId,
                })
                return
            }

            const from = state.boards[fromBoardId].items
            const to = state.boards[toBoardId].items

            const idx = from.indexOf(activeId)
            if (idx !== -1) from.splice(idx, 1)

            if (newIndex === undefined || newIndex === -1 || newIndex >= to.length) {
                to.push(activeId)
            } else {
                to.splice(newIndex, 0, activeId)
            }
        },

        /**
         * Reorder boards themselves.
         * NOW: Also updates 'dayNumber' and 'title' to match the new position.
         * Payload: { oldIndex, newIndex }
         */
        moveBoard: (state, action) => {
            const { oldIndex, newIndex } = action.payload

            // 1) Snapshot current order and the dates and temperature at each position
            const oldOrder = state.boardOrder.slice()
            const datesByPos = oldOrder.map((id) => state.boards[id]?.date ?? null)
            const temperaturesByPos = oldOrder.map((id) => state.boards[id]?.weather ?? null)   // capture all weather information for that day

            // 2) Compute the new order
            const newOrder = arrayMove(oldOrder, oldIndex, newIndex)

            // 3) Commit the new order
            state.boardOrder = newOrder

            // 4) Reassign dates so that positions keep their original dates
            //    AND re-assign dayNumber and title to match the new position
            for (let i = 0; i < newOrder.length; i++) {
                const boardId = newOrder[i]
                const dateForThisPosition = datesByPos[i]
                const weatherForThisPosition = temperaturesByPos[i]

                if (boardId && state.boards[boardId]) {
                    if (dateForThisPosition != null) {
                        state.boards[boardId].date = dateForThisPosition
                    }
                    if (weatherForThisPosition != null) {
                        state.boards[boardId].weather = weatherForThisPosition
                    }
                    // Update dayNumber and title
                    const newDayNumber = i + 1;
                    state.boards[boardId].dayNumber = newDayNumber;
                    state.boards[boardId].title = `Day ${newDayNumber}`;
                }
            }
        },

        /**
         * Adds a brand new board object (e.g., from a template).
         * This reducer logic is from your original file.
         * Payload: { id, title, items }
         */
        addKanbanBoard: (state, action) => {
            const newBoard = action.payload // Note: This might be incomplete (missing hotel, weather)

            // Ensure default fields exist if not provided
            const boardData = {
                hotelName: 'Select a hotel',
                hotel: { hotelName: 'Select a hotel', location: '', pricePerNight: 0, placeDetails: null },
                weather: { temperature: null, condition: '' },
                ...newBoard, // Provided fields will overwrite defaults
            };

            boardData.weather = { temperature: null, condition: '' }; // Clear the weather info for new boards

            // 1. Add to the boards dictionary
            state.boards[boardData.id] = boardData

            // 2. Set date based on the last board
            const lastBoardID = state.boardOrder[state.boardOrder.length - 1]
            const lastBoard = state.boards[lastBoardID]
            if (lastBoard?.date) {
                boardData.date = addDays(parseISO(lastBoard.date), 1).toISOString()
            } else if (!boardData.date) {
                boardData.date = new Date().toISOString();
            }

            // 3. Set dayNumber and Title
            const newDayNumber = state.boardOrder.length + 1;
            boardData.dayNumber = newDayNumber;
            // Only set title if not provided
            if (!newBoard.title) {
                boardData.title = `Day ${newDayNumber}`;
            }

            // 4. Check if items are in itemsById (from original logic)
            boardData.items.forEach((item) => {
                if (!state.itemsById.hasOwnProperty(item)) {
                    console.log(`${item} not in items by ID`)
                    // You would need to add logic here to fetch/add item details
                    // state.itemsById[item] = { ... }
                }
            })

            // 5. Add to the boardOrder array (at the end)
            state.boardOrder.push(boardData.id)
        },

        /**
      * Removes an entire board by its ID from the Kanban state.
      * NOW: Accepts { boardId, keepItems } to prevent item deletion on reserve.
      * Payload: string (boardId) OR { boardId: string, keepItems: boolean }
      */
        removeKanbanBoard: (state, action) => {
            // Check if payload is the old string or the new object
            const boardId = typeof action.payload === 'string' ? action.payload : action.payload.boardId;
            const keepItems = action.payload.keepItems || false; // Default to false

            const removedIndex = state.boardOrder.indexOf(boardId)
            if (removedIndex === -1) return

            const itemsToRemove = state.boards[boardId]?.items || [];

            // Capture the weather information for the board that is being removed
            let nextBoardWeather = state.boards[boardId]?.weather || null;
            let weatherInfoPlch = nextBoardWeather;

            // 1) Remove the board data
            delete state.boards[boardId]

            // 2) Compute the new order
            const newOrder = state.boardOrder.filter((id) => id !== boardId)

            // 3) Shift dates back AND update dayNumber/title
            for (let i = removedIndex; i < newOrder.length; i++) {
                const id = newOrder[i]
                const b = state.boards[id]
                weatherInfoPlch = b?.weather;   // store the board's weather info before overwriting
                b.weather = nextBoardWeather; // update the board's weather to the next board's weather info
                nextBoardWeather = weatherInfoPlch; // shift the placeholder to the next board's weather info

                if (b) {
                    if (b.date) {
                        b.date = addDays(parseISO(b.date), -1).toISOString()
                    }
                    const newDayNumber = i + 1;
                    b.dayNumber = newDayNumber;
                    b.title = `Day ${newDayNumber}`;
                }
            }

            // 4) Commit new order
            state.boardOrder = newOrder

            // 5) (Optional Cleanup) Remove orphaned items
            //    ONLY delete items if keepItems is false
            if (!keepItems) {
                itemsToRemove.forEach(itemId => {
                    delete state.itemsById[itemId];
                });
            }
        },

        /**
             * NEW: A better reducer for updating the entire hotel object.
             * This replaces 'updateBoardHotelName'
             * Payload: { boardId, hotel } // hotel is the full hotel object
             */
        updateBoardHotel: (state, action) => {
            const { boardId, hotelName } = action.payload

            if (state.boards[boardId]) {
                // Updates the nested object
                state.boards[boardId].hotel.hotelName = hotelName;
                // ALSO updates the top-level 'hotelName' for consistency
                state.boards[boardId].hotelName = hotelName;
            }
        },

        /**
         * ADDS an attraction (item) to a board.
         * This one correctly maps the new data structure.
         * Payload: { boardId, item } // 'item' is the full activity object
         */
        addAttractionToBoard: (state, action) => {
            const { boardId, item } = action.payload
            const board = state.boards[boardId]
            if (!board) return

            const id = nanoid()

            // This block is now correct
            state.itemsById[id] = {
                id,
                // 1. Map 'item.name' (from new data) to 'title' (in state)
                title: item.name || item.title || '',
                duration: item.duration || '',
                price: item.price || 0,
                // 2. Store the rich 'placeDetails' object
                placeDetails: item.placeDetails || null,

                // 3. Map new data fields to old fields for compatibility
                image:
                    item.placeDetails?.photoUrls?.[0] || // Get image from placeDetails
                    item.image ||
                    'https://i.pinimg.com/736x/21/83/ab/2183ab07ff2e0e561e0e0738705d4343.jpg',
                location: item.placeDetails?.formattedAddress || item.location || '', // Get location from placeDetails
                description: item.placeDetails?.website || item.description || '', // Get description from placeDetails

                // Keep original fields
                timeline: item.timeline || '',
                timeOfDay: item.timeOfDay || '',
            }
            board.items.push(id)
        },

        /**
         * This reducer is generic and correct as-is.
         * It merges any fields you send into the existing item.
         * Payload: { itemId, updatedFields }
         */
        updateAttractionItem: (state, action) => {
            const { itemId, updatedFields } = action.payload
            if (state.itemsById[itemId]) {
                state.itemsById[itemId] = {
                    ...state.itemsById[itemId],
                    ...updatedFields,
                }
            }
        },

        /**
         * --- ADD THIS NEW REDUCER ---
         * Merges a map of new items into the main itemsById state.
         * Payload: { "item-123": { ... }, "item-124": { ... } }
         */
        addItems: (state, action) => {
            // This will add all new items from the payload
            // and overwrite any existing ones with the same ID.
            Object.assign(state.itemsById, action.payload);
        },

        /**
         * Removes an attraction (item) from a board and from the global state.
         * Payload: { boardId, itemId }
         */
        removeAttractionItem: (state, action) => {
            const { boardId, itemId } = action.payload;

            // 1. Remove from the board's item list
            if (state.boards[boardId]) {
                state.boards[boardId].items = state.boards[boardId].items.filter(
                    id => id !== itemId
                );
            }

            // 2. Remove from the global itemsById map
            if (state.itemsById[itemId]) {
                delete state.itemsById[itemId];
            }
        },

        /**
     * Loads a trip directly from an existing object (no API call).
     * Payload: The full Trip object (from the dashboard list).
     */
        loadTripFromLocal: (state, action) => {
            console.log("Loading locally:", action.payload);

            try {
                // 1. Reuse your existing normalize logic
                const newState = normalizeData(action.payload);

                // 2. CRITICAL: Restore the Database ID so 'Save' works correctly later
                newState.currentTripId = action.payload.id;

                // 3. Return the new state (replacing the current state)
                return newState;
            } catch (error) {
                console.error("Failed to normalize local trip:", error);
                // If it fails, keep existing state
                return state;
            }
        },

    },//reducers

    extraReducers: (builder) => {
        builder
            .addCase(fetchTripPlan.pending, (state) => {
                // Optional: You can set a loading status here
                console.log('Fetching new trip plan...');
            })
            .addCase(fetchTripPlan.fulfilled, (state, action) => {

                // --- THIS IS THE CRITICAL PART ---

                // 1. Log exactly what the API gave us
                console.log('API call successful. Payload received:');
                console.log(JSON.stringify(action.payload, null, 2));

                try {
                    // 2. Try to run your *existing* normalize function
                    const newState = normalizeData(action.payload);

                    console.log('Normalization successful. Updating state.');

                    // 3. If it works, return the new state
                    // This *replaces* the entire 'boards' slice
                    return newState;

                } catch (error) {
                    // 4. If normalizeData crashes, LOG THE ERROR
                    console.error('CRITICAL: normalizeData function failed!', error);
                    console.error('The payload above is what caused the crash.');

                    // 5. Return the *old* state so the app doesn't crash
                    return state;
                }
            })
            .addCase(fetchTripPlan.rejected, (state, action) => {
                // This now works thanks to our previous fix
                console.error('Failed to fetch trip plan:', action.payload);
            });

    },
})

// export the generated action creators
export const {
    moveItemWithinBoard,
    moveItemAcrossBoards,
    moveBoard,
    addKanbanBoard,
    removeKanbanBoard,
    setBoardDatesFromBase,
    setBoardDate,
    addEmptyBoard,
    addAttractionToBoard,
    updateAttractionItem,

    // Export new reducers
    updateTripDetails,
    updateBoardHotel,
    removeAttractionItem,
    addItems,
    loadTripFromLocal

} = boardsSlice.actions

export default boardsSlice.reducer
