import {Header} from "@/common/components/Header/Header.tsx";
import {Routing} from "@/app/routing/ui/Routing.tsx";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {useSelector} from "react-redux";
import {selectThemeMode} from "@/app/modal/app-slice.ts";
import {createTheme} from "@mui/material/styles";

export const App = () => {
    const themeMode = useSelector(selectThemeMode);


    const theme = createTheme({
        palette: {
            mode: themeMode,
        },
    });
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Header/>
                <Routing/>
            </ThemeProvider>
        </>
    )
}