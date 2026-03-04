import {createSlice} from "@reduxjs/toolkit"
import type {FavoriteMovie} from "@/features/movies/api/movieApiTypes.ts";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        themeMode: (localStorage.getItem("theme") as ThemeMode) || "light",
        error: null as string | null,
        isLoggedIn: false,
        favorites: JSON.parse(localStorage.getItem("favorites") || "[]") as FavoriteMovie[],
    },
    selectors: {
        selectThemeMode: (state) => state.themeMode,
        selectAppError: (state) => state.error,
        selectIsLoggedIn: (state) => state.isLoggedIn,
        selectFavorites: (state) => state.favorites,
        selectIsFavorite: (state, id: number) => state.favorites.some(m => m.id === id),
    },
    reducers: (create) => ({
        changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
            localStorage.setItem("theme", action.payload.themeMode)
        }),
        setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
            state.error = action.payload.error
        }),
        setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
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
    }),
})

export const { selectThemeMode,selectFavorites, selectIsFavorite, selectAppError, selectIsLoggedIn } = appSlice.selectors
export const { changeThemeModeAC,toggleFavoriteAC, setAppErrorAC, setIsLoggedInAC } = appSlice.actions
export const appReducer = appSlice.reducer

export type ThemeMode = "dark" | "light"
