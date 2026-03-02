import { createTheme } from "@mui/material/styles"
import type {ThemeMode} from "@/app/modal/app-slice.ts";

export const getTheme = (themeMode: ThemeMode) => {
    return createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: "#0d253f",
            },
        },
    })
}
