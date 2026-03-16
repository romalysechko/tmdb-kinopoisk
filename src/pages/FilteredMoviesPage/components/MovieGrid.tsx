import {Alert, Box} from "@mui/material";
import {MovieCard} from "@/pages/СategoriesPage/MoviesSection/components/MovieCard/MovieCard.tsx";
import type {Movie} from "@/features/movies/api/movieApiTypes.ts";
import {MovieSkeleton} from "@/common/components/MovieSkeleton/MovieSkeleton.tsx";

interface Props {
    movies?: Movie[];
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    favorites: Movie[];
}

export const MovieGrid = ({ movies, isLoading, isFetching, isError, favorites }: Props) => {
    if (isError) return <Alert severity="error" sx={{ mb: 3 }}>Ошибка загрузки</Alert>;

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 2.5,
            opacity: isFetching ? 0.6 : 1,
            transition: 'opacity 0.2s'
        }}>
            {isLoading
                ? Array.from(new Array(10)).map((_, i) => (
                    <MovieSkeleton key={i}/>
                ))
                : movies?.map(movie => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        isFavorite={favorites.some(fav => fav.id === movie.id)}
                    />
                ))
            }
        </Box>
    );
};
