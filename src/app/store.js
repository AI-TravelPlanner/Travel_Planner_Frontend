import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '@/redux-slices/boardSlice'
import aliasTemplatesReducer from '@/kanban-feature/template-board-suggestions/aliasTemplatesSlice'
import filterReducer from '@/redux-slices/filterSlice'
import authReducer from '@/authSlice/authSlice'
import tripReducer from '@/redux-slices/tripSlice'

const store = configureStore({
    reducer: {
        boards: boardReducer,
        aliasTemplates: aliasTemplatesReducer,
        filter: filterReducer,
        auth: authReducer,
        trips: tripReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['auth/setUser'],
                ignoredPaths: ['auth.user'],
            },
        }),
})

export default store