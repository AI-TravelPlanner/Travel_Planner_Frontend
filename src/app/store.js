import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '@/redux-slices/boardSlice'
import aliasTemplatesReducer from '@/kanban-feature/template-board-suggestions/aliasTemplatesSlice'
import filterReducer from '@/redux-slices/filterSlice'
import authReducer from "@/authSlice/authSlice"
import tripReducer from '@/redux-slices/tripSlice'
import tripFormReducer from '@/redux-slices/tripSearchSlice'

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

export default store
