import {createSlice} from "@reduxjs/toolkit"
import type {FavoriteMovie} from "@/features/movies/api/movieApiTypes.ts";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        themeMode: (localStorage.getItem("theme") as ThemeMode) || "light",
        favorites: JSON.parse(localStorage.getItem("favorites") || "[]") as FavoriteMovie[],
        error: null as string | null,
    },
    selectors: {
        selectThemeMode: (state) => state.themeMode,
        selectFavorites: (state) => state.favorites,
        selectIsFavorite: (state, id: number) => state.favorites.some(m => m.id === id),
        selectAppError: (state) => state.error,
    },
    reducers: (create) => ({
        changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
            localStorage.setItem("theme", action.payload.themeMode)
        }),
        toggleFavoriteAC: create.reducer<{ movie: FavoriteMovie }>((state, action) => {
            const index = state.favorites.findIndex((m) => m.id === action.payload.movie.id);
            if (index > -1) {
                state.favorites.splice(index, 1);
            } else {
                state.favorites.push(action.payload.movie);
            }
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        }),
        setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
            state.error = action.payload.error
        }),
    }),
})

export const { selectThemeMode,selectFavorites, selectIsFavorite, selectAppError } = appSlice.selectors
export const { changeThemeModeAC,toggleFavoriteAC, setAppErrorAC } = appSlice.actions
export const appReducer = appSlice.reducer

export type ThemeMode = "dark" | "light"
