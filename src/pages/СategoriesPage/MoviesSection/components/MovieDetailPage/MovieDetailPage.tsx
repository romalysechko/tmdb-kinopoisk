import {Box, Button, Card, CardMedia, CircularProgress, Grid, Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    useFetchMovieCreditsQuery,
    useFetchMovieDetailsQuery,
    useFetchSimilarMoviesQuery
} from "@/features/movies/api/moviesApi.ts";
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import type {RootState} from "@/app/modal/store.ts";
import {MovieCast} from "@/pages/СategoriesPage/MoviesSection/components/MovieDetailPage/MovieCast.tsx";
import {SimilarMovies} from "@/pages/СategoriesPage/MoviesSection/components/MovieDetailPage/SimilarMovies.tsx";
import {MovieInfo} from "@/pages/СategoriesPage/MoviesSection/components/MovieDetailPage/MovieInfo.tsx";

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const MovieDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: movie, isLoading: isMovieLoading, isError: isMovieError } = useFetchMovieDetailsQuery(id || '');
    const { data: credits, isLoading: isCreditsLoading } = useFetchMovieCreditsQuery(id || '');
    const { data: similarData, isLoading: isSimilarLoading } = useFetchSimilarMoviesQuery(id || '');

    const favorites = useSelector((state: RootState) => state.app.favorites) || [];

    if (isMovieLoading || isCreditsLoading || isSimilarLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (isMovieError || !movie) {
        return (
            <Box sx={{ textAlign: 'center', mt: 10 }}>
                <Typography variant="h6" color="error">Ошибка при загрузке данных.</Typography>
                <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>Назад</Button>
            </Box>
        );
    }

    const cast = credits?.cast?.slice(0, 7) || [];
    const similarMovies = similarData?.results?.slice(0, 6) || [];

    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', p: { xs: 2, md: 4 } }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 4, fontWeight: 'bold' }}>
                Назад
            </Button>

            <Grid container spacing={5}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card elevation={6} sx={{ borderRadius: 3 }}>
                        <CardMedia
                            component="img"
                            image={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://placehold.co'}
                            alt={movie.title}
                        />
                    </Card>
                </Grid>
                <MovieInfo movie={movie} />
            </Grid>

            <MovieCast cast={cast} />
            <SimilarMovies movies={similarMovies} favorites={favorites} />
        </Box>
    );
};