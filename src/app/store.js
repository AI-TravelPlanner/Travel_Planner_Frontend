import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '@/redux-slices/boardSlice'
import aliasTemplatesReducer from '@/kanban-feature/template-board-suggestions/aliasTemplatesSlice'
import filterReducer from '@/redux-slices/filterSlice'

const store = configureStore({
    reducer: {
        boards: boardReducer,
        aliasTemplates: aliasTemplatesReducer,
        filter: filterReducer,
    },
})

export default store
