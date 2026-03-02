import {createSlice} from "@reduxjs/toolkit"

export const appSlice = createSlice({
    name: "app",
    initialState: {
        themeMode: (localStorage.getItem("theme") as ThemeMode) || "light",
        error: null as string | null,
        isLoggedIn: false,
    },
    selectors: {
        selectThemeMode: (state) => state.themeMode,
        selectAppError: (state) => state.error,
        selectIsLoggedIn: (state) => state.isLoggedIn,
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
    }),
})

export const { selectThemeMode, selectAppError, selectIsLoggedIn } = appSlice.selectors
export const { changeThemeModeAC, setAppErrorAC, setIsLoggedInAC } = appSlice.actions
export const appReducer = appSlice.reducer

export type ThemeMode = "dark" | "light"
