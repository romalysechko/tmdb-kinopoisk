import { useNavigate } from 'react-router';
import { Button, Box, Typography, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Если установлены иконки
import HomeIcon from '@mui/icons-material/Home';
import s from './PageNotFound.module.css';

export const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="80vh"
            textAlign="center"
        >
            <Typography variant="h1" className={s.title} sx={{ fontWeight: 'bold', fontSize: '10rem' }}>
                404
            </Typography>
            <Typography variant="h5" className={s.subtitle} sx={{ mb: 4, textTransform: 'uppercase',fontSize: '4rem' }}>
                page not found
            </Typography>

            <Stack direction="row" spacing={2}>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    size="small"
                >
                    Назад
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<HomeIcon />}
                    onClick={() => navigate('/')}
                    size="small"
                >
                    На главную
                </Button>
            </Stack>
        </Box>
    );
};
