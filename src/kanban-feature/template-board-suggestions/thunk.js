// thunks.js (or similar file)
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addKanbanBoard, removeKanbanBoard } from '@/redux-slices/boardSlice'; // From the Kanban slice
import { removeTemplate, addTemplate } from './aliasTemplatesSlice'; // From the Template slice

import { nanoid } from 'nanoid';
import { addItems } from '@/redux-slices/boardSlice'; // To add items to the boards slice
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/plan';
/**
 * Thunk to copy a template board to the Kanban slice AND remove it from the template list.
 * Payload: The original board object from the aliasTemplatesSlice.
 */
export const addTemplateToKanbanAndRemove = createAsyncThunk(
    'aliasTemplates/addToKanbanAndRemove',
    async (templateBoard, { dispatch }) => {

        // --- PREPARE THE NEW BOARD ---

        // 1. Create a deep copy and generate new unique IDs
        const copiedBoard = JSON.parse(JSON.stringify(templateBoard));


        // 2. Dispatch action to the TARGET SLICE (Kanban/boardsSlice). 
        // There is no need to create a new ID for the card or items. Maintain the same
        // ID for a card and an item throughout the lifetime of the web application
        dispatch(addKanbanBoard(copiedBoard));

        // 3. Dispatch action back to the SOURCE SLICE (aliasTemplatesSlice) to remove it
        dispatch(removeTemplate(templateBoard.id));
    }
);


/**
* Thunk to move a board from the Kanban view (boardsSlice) back to the 
* template list (aliasTemplatesSlice).
* * Payload: The ID of the board to be reserved (string).
*/
export const reserveBoardToTemplate = createAsyncThunk(
    'boards/reserveToTemplate',
    async (boardId, { getState, dispatch }) => {
        // ... (code to get state and boardToReserve is correct)
        const state = getState();
        const boardToReserve = state.boards.boards[boardId];

        if (!boardToReserve) {
            console.error(`Board ID ${boardId} not found in Kanban boards.`);
            return;
        }

        // --- TRANSACTION ---

        // 2. Dispatch action to the DESTINATION SLICE (aliasTemplatesSlice)
        dispatch(addTemplate(boardToReserve));

        // 3. Dispatch action to the SOURCE SLICE (boardsSlice)
        //    *** THIS IS THE FIX ***
        // Pass an object to keep the items in itemsById
        dispatch(removeKanbanBoard({ boardId, keepItems: true }));
    }
);


/**
 * --- 3. ADD THIS NEW THUNK ---
 * Thunk to fetch alternative daily options.
 * 'requestData' will be an object { location, theme, budget, etc. }
 */
export const fetchDailyOptions = createAsyncThunk(
    'aliasTemplates/fetchOptions', // This action type belongs to the 'aliasTemplates' slice
    async (requestData, { rejectWithValue, dispatch }) => {
        try {
            // 4. Call the new API endpoint
            const response = await axios.post(`${API_URL}/options/day`, requestData);
            
            // response.data is the array of Day objects: [ { dayNumber: 2, ... }, { dayNumber: 2, ... } ]
            
            // 5. Normalize the data (separate templates from items)
            const newTemplates = [];
            const newItems = {}; // This will hold the activity (item) data

            // Check if response.data is an array
            if (!Array.isArray(response.data)) {
                throw new Error("API did not return an array of days");
            }

            response.data.forEach((day, index) => {
                // A. Create a new unique template ID
                const templateId = `template-${day.dayNumber}-${index}-${nanoid(5)}`;
                const itemIds = [];

                // B. Normalize the activities (items)
                if (day.activities && Array.isArray(day.activities)) {
                    day.activities.forEach((activity) => {
                        const itemId = nanoid(); // Create a unique item ID
                        itemIds.push(itemId);
                        
                        // Map the activity to your 'item' structure
                        newItems[itemId] = {
                            id: itemId,
                            title: activity.name,
                            duration: activity.duration,
                            price: activity.price,
                            placeDetails: activity.placeDetails,
                            image: activity.placeDetails?.photoUrls?.[0] || 'https://i.pinimg.com/736x/21/83/ab/2183ab07ff2e0e561e0e0738705d4343.jpg',
                            location: activity.placeDetails?.formattedAddress || '',
                            description: activity.placeDetails?.website || '',
                            timeOfDay: '', // default
                            timeline: '', // default
                        };
                    });
                }
                
                // C. Create the new template object (the board)
                newTemplates.push({
                    id: templateId,
                    title: `Day ${day.dayNumber} (Option ${index + 1})`,
                    items: itemIds, // Just the IDs
                    
                    // We store the full day data here. When the user drags
                    // this template onto the board, your 'addKanbanBoard'
                    // reducer can use this data to set the hotel/weather.
                    fullDayData: day 
                });
            });

            // 6. --- CROSS-SLICE UPDATE ---
            // Dispatch the 'addItems' action to the boardsSlice
            // to add all the new activities to the itemsById map.
            dispatch(addItems(newItems)); 

            // 7. Return the 'newTemplates' as the payload
            // This will be caught by aliasTemplatesSlice
            return newTemplates; 

        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to fetch options';
            return rejectWithValue(message);
        }
    }
);