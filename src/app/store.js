import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '@/redux-slices/boardSlice'
import aliasTemplatesReducer from '@/kanban-feature/template-board-suggestions/aliasTemplatesSlice'
import filterReducer from '@/redux-slices/filterSlice'
import authReducer from "@/authSlice/authSlice"
import tripReducer from '@/redux-slices/tripSlice'
import tripFormReducer from '@/redux-slices/tripSearchSlice'


const STORAGE_KEY = 'activeTripState';

const store = configureStore({
    reducer: {
        auth: authReducer,
        boards: boardReducer,
        aliasTemplates: aliasTemplatesReducer,
        filter: filterReducer,
        trips: tripReducer,
        tripSearch: tripFormReducer
    },
})


// --- THIS IS THE AUTO-SAVE LOGIC ---
// This function will run *after* every single action
store.subscribe(() => {
    try {
        const state = store.getState();
        // We only want to save the 'boards' slice
        const serializedState = JSON.stringify(state.boards);
        localStorage.setItem(STORAGE_KEY, serializedState);
    } catch (err) {
        console.error("Could not save state to localStorage", err);
    }
});
// --- END OF AUTO-SAVE LOGIC ---

export default store
