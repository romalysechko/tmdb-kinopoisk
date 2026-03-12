import {Box, Grid, Stack, Typography} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type {Genre, MovieDetails} from "@/features/movies/api/movieApiTypes.ts";

interface MovieInfoProps {
    movie: MovieDetails;
}

const formatRuntime = (minutes: number | undefined | null): string => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} ч ${mins} мин`;
};

export const MovieInfo = ({movie}: MovieInfoProps) => {
    return (
        <Grid size={{xs: 12, md: 8}}>
            <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{fontWeight: 800, fontSize: {xs: '2rem', md: '3.5rem'}}}
            >
                {movie.title}
            </Typography>

            {movie.tagline && (
                <Typography
                    variant="h6"
                    color="text.secondary"
                    gutterBottom
                    sx={{fontStyle: 'italic', mb: 2}}
                >
                    "{movie.tagline}"
                </Typography>
            )}

            <Stack direction="row" spacing={3} sx={{mb: 4}} alignItems="center">
                <Box sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontWeight: 'bold'
                }}>
                    ⭐ {movie.vote_average?.toFixed(1)}
                </Box>

                <Typography variant="subtitle1" color="text.secondary">
                    📅 {movie.release_date}
                </Typography>

                {movie.runtime && movie.runtime > 0 ? (
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        sx={{display: 'flex', alignItems: 'center', gap: 0.5}}
                    >
                        <AccessTimeIcon fontSize="small"/>
                        {formatRuntime(movie.runtime)}
                    </Typography>
                ) : null}
            </Stack>

            <Typography variant="h5" gutterBottom sx={{fontWeight: 'bold'}}>
                Описание
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{mb: 4, lineHeight: 1.7}}>
                {movie.overview || "Описание отсутствует."}
            </Typography>

            <Typography variant="body1">
                <Typography component="span" sx={{fontWeight: 'bold', mr: 1}}>
                    Жанры:
                </Typography>
                {movie.genres?.length > 0
                    ? movie.genres.map((g: Genre) => g.name).join(', ')
                    : "Не указаны"}
            </Typography>
        </Grid>
    );
};
