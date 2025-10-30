// thunks.js (or similar file)
import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { addKanbanBoard, removeKanbanBoard } from '@/redux-slices/boardSlice'; // From the Kanban slice
import { removeTemplate, addTemplate } from './aliasTemplatesSlice'; // From the Template slice

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