import {Box, Skeleton, Container, Grid} from '@mui/material';
export const MainPageSkeleton = () => {
    return (
        <Box sx={{ backgroundColor: '#121212', minHeight: '100vh' }}>
            <Skeleton
                variant="rectangular"
                sx={{
                    width: '100%',
                    height: { xs: '350px', md: '550px' },
                    mb: 4
                }}
            />

            <Container maxWidth="xl">
                {[1, 2, 3, 4].map((section) => (
                    <Box key={section} sx={{ mb: 6 }}>
                        <Skeleton
                            variant="text"
                            width="250px"
                            height={45}
                            sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)' }}
                        />

                        <Grid container spacing={2.5}>
                            {[1, 2, 3, 4, 5, 6].map((card) => (
                                <Grid key={card} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                                    <Box>
                                        <Skeleton
                                            variant="rounded"
                                            sx={{ width: '100%', height: 300, borderRadius: 2, mb: 1 }}
                                        />
                                        <Skeleton variant="text" sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.05)' }} width="80%" />
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ))}
            </Container>
        </Box>
    );
};
