import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {moviesApi} from "@/features/movies/api/moviesApi.ts";
import {appReducer} from "@/app/modal/app-slice.ts";

export const store = configureStore({
    reducer: {
        [moviesApi.reducerPath]: moviesApi.reducer,
        app: appReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(moviesApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
