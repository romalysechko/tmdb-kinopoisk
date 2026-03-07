import { useState } from "react";
import { Box, Alert, Skeleton, Pagination } from "@mui/material";
import { useFetchFilteredMoviesQuery } from "@/features/movies/api/moviesApi";
import { useSelector } from "react-redux";
import { selectFavorites } from "@/app/modal/app-slice";
import { MovieCard } from "@/pages/СategoriesPage/MoviesSection/components/MovieCard/MovieCard";
import type { DiscoverParams } from "@/features/movies/api/movieApiTypes.ts";
import {MovieFilters} from "@/pages/FilteredMoviesPage/MoviesFilters.tsx";

export const FilteredMoviesPage = () => {
    const [filters, setFilters] = useState<DiscoverParams>({
        page: 1,
        sort_by: 'popularity.desc',
        with_genres: '',
        'vote_average.gte': 0,
    });

    const { data, isLoading, isFetching, isError } = useFetchFilteredMoviesQuery(filters);
    const favorites = useSelector(selectFavorites);

    const handleFilterChange = (key: string, value: string | number) => {
        setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
    };

    const handlePageChange = (_: unknown, value: number) => {
        setFilters(prev => ({ ...prev, page: value }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Box sx={{ display: 'flex', gap: 3, p: 3, minHeight: '100vh' }}>
            <MovieFilters filters={filters} onFilterChange={handleFilterChange} />

            <Box sx={{ flexGrow: 1 }}>
                {isError && <Alert severity="error" sx={{ mb: 3 }}>Ошибка загрузки</Alert>}

                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2.5 }}>
                    {isLoading || isFetching
                        ? Array.from(new Array(10)).map((_, i) => (
                            <Skeleton key={i} variant="rectangular" sx={{ aspectRatio: '2/3', borderRadius: 2 }} />
                        ))
                        : data?.results?.map(movie => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                isFavorite={favorites.some(fav => fav.id === movie.id)}
                            />
                        ))
                    }
                </Box>

                {data?.total_pages && data.total_pages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            count={Math.min(data.total_pages, 500)}
                            page={filters.page}
                            onChange={handlePageChange}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};
