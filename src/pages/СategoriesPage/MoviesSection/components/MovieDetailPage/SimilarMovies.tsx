import type {Movie} from "@/features/movies/api/movieApiTypes";
import {Box, Grid, Typography} from "@mui/material";
import {MovieCard} from "../MovieCard/MovieCard";

export const SimilarMovies = ({movies, favorites}: {
    movies:
        Movie[], favorites: Movie[]
}) => {
    if (movies.length === 0) return null;

    return (
        <Box sx={{mt: 8}}>
            <Typography variant="h4" gutterBottom sx={{fontWeight: 'bold', mb: 4}}>
                Похожие фильмы
            </Typography>
            <Grid container spacing={2}>
                {movies.map((simMovie) => (
                    <Grid size={{xs: 6, sm: 4, md: 2}} key={simMovie.id}>
                        <MovieCard
                            movie={simMovie}
                            isFavorite={favorites.some((f: Movie) => f.id === simMovie.id)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
