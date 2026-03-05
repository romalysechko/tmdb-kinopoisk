import { Box, Container, Typography, Stack } from '@mui/material';

export const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) => theme.palette.mode === 'light'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[900],
                borderTop: '1px solid',
                borderColor: 'divider'
            }}
        >
            <Container maxWidth="lg">
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                >
                    <Typography variant="body2" color="text.secondary">
                        © 2026 Kinopoisk Demo · Все права защищены
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
};
