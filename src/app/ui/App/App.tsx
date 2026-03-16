import {Header} from "@/common/components/Header/Header.tsx";
import {Routing} from "@/app/routing/ui/Routing.tsx";
import {Alert, Box, CssBaseline, Snackbar, ThemeProvider} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectAppError, selectThemeMode, setAppErrorAC} from "@/app/modal/app-slice.ts";
import {createTheme} from "@mui/material/styles";
import {useEffect} from "react";
import {Footer} from "@/common/components/Footer/Footer.tsx";
import {GlobalLoader} from "@/common/components/GlobalLoader/GlobalLoader.tsx";

export const App = () => {
    const themeMode = useSelector(selectThemeMode);
    const error = useSelector(selectAppError);
    const dispatch = useDispatch();

    const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        dispatch(setAppErrorAC({ error: null }));
    };


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
            <GlobalLoader/>
            <Snackbar
                open={!!error}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

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