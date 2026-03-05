import {Header} from "@/common/components/Header/Header.tsx";
import {Routing} from "@/app/routing/ui/Routing.tsx";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import {useSelector} from "react-redux";
import {selectThemeMode} from "@/app/modal/app-slice.ts";
import {createTheme} from "@mui/material/styles";
import {useEffect} from "react";
import {Footer} from "@/common/components/Footer/Footer.tsx";

export const App = () => {
    const themeMode = useSelector(selectThemeMode);


    const theme = createTheme({
        palette: {
            mode: themeMode,
        },
    });
    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(themeMode);
    }, [themeMode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                <Header/>
                <Box component="main" sx={{flexGrow: 1}}>
                    <Routing/>
                </Box>

                <Footer/>
            </Box>
        </ThemeProvider>
    )
}