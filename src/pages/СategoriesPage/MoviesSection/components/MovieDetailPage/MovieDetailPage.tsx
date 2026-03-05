import {Avatar, Box, Button, Card, CardMedia, CircularProgress, Grid, Stack, Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useFetchMovieCreditsQuery, useFetchMovieDetailsQuery} from "@/features/movies/api/moviesApi.ts";
import {useNavigate, useParams} from "react-router";
import type {CastMember, Genre, MovieCredits, MovieDetails} from "@/features/movies/api/movieApiTypes.ts";
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const ACTOR_IMAGE_URL = 'https://image.tmdb.org/t/p/w200';

export const MovieDetailPage = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {data: movie, isLoading: isMovieLoading, isError: isMovieError} =
        useFetchMovieDetailsQuery(id || '');

    const {data: credits, isLoading: isCreditsLoading} =
        useFetchMovieCreditsQuery(id || '');

    if (isMovieLoading || isCreditsLoading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
                <CircularProgress/>
            </Box>
        );
    }

    if (isMovieError || !movie) {
        return (
            <Box sx={{textAlign: 'center', mt: 10}}>
                <Typography variant="h6" color="error">Ошибка при загрузке данных о фильме.</Typography>
                <Button onClick={() => navigate(-1)} sx={{mt: 2}}>Вернуться назад</Button>
            </Box>
        );
    }
    const typedMovie = movie as MovieDetails;
    const cast = (credits as MovieCredits)?.cast?.slice(0, 7) || [];

    return (
        <Box sx={{maxWidth: 1200, margin: '0 auto', p: {xs: 2, md: 4}}}>
            <Button
                startIcon={<ArrowBackIcon/>}
                onClick={() => navigate(-1)}
                sx={{mb: 4, fontWeight: 'bold'}}
            >
                Назад
            </Button>

            <Grid container spacing={5}>
                <Grid size={{xs: 12, md: 4}}>
                    <Card elevation={6} sx={{borderRadius: 3}}>
                        <CardMedia
                            component="img"
                            image={typedMovie.poster_path ? `${IMAGE_BASE_URL}${typedMovie.poster_path}` : 'https://placehold.co'}
                            alt={typedMovie.title}
                        />
                    </Card>
                </Grid>

                <Grid size={{xs: 12, md: 8}}>
                    <Typography variant="h2" component="h1" gutterBottom
                                sx={{fontWeight: 800, fontSize: {xs: '2rem', md: '3.5rem'}}}>
                        {typedMovie.title}
                    </Typography>

                    {typedMovie.tagline && (
                        <Typography variant="h6" color="text.secondary" gutterBottom sx={{fontStyle: 'italic', mb: 2}}>
                            "{typedMovie.tagline}"
                        </Typography>
                    )}

                    <Stack direction="row" spacing={3} sx={{mb: 4}}>
                        <Box sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            fontWeight: 'bold'
                        }}>
                            ⭐ {typedMovie.vote_average?.toFixed(1)}
                        </Box>
                        <Typography variant="subtitle1" color="text.secondary">
                            📅 {typedMovie.release_date}
                        </Typography>
                    </Stack>

                    <Typography variant="h5" gutterBottom sx={{fontWeight: 'bold'}}>Описание</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{mb: 4, lineHeight: 1.7}}>
                        {typedMovie.overview}
                    </Typography>

                    <Typography variant="body1">
                        <Typography component="span" sx={{fontWeight: 'bold', mr: 1}}>Жанры:</Typography>
                        {typedMovie.genres?.map((g: Genre) => g.name).join(', ')}
                    </Typography>
                </Grid>
            </Grid>

            <Box sx={{mt: 8}}>
                <Typography variant="h4" gutterBottom sx={{fontWeight: 'bold', mb: 4}}>
                    В главных ролях
                </Typography>
                <Grid container spacing={3}>
                    {cast.map((actor: CastMember) => (
                        <Grid size={{xs: 6, sm: 4, md: 1.71}} key={actor.id}>
                            <Stack alignItems="center" textAlign="center" spacing={1.5}>
                                <Avatar
                                    src={actor.profile_path ? `${ACTOR_IMAGE_URL}${actor.profile_path}` : ''}
                                    sx={{width: {xs: 80, md: 100}, height: {xs: 80, md: 100}, boxShadow: 2}}
                                />
                                <Box>
                                    <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>{actor.name}</Typography>
                                    <Typography variant="caption" color="text.secondary">{actor.character}</Typography>
                                </Box>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};
