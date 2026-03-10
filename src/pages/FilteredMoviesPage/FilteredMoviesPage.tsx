import { Box, Pagination } from "@mui/material";
import { useFetchFilteredMoviesQuery } from "@/features/movies/api/moviesApi";
import { useSelector } from "react-redux";
import { selectFavorites } from "@/app/modal/app-slice";
import { MovieGrid } from "./components/MovieGrid.tsx";
import {useMovieFilters} from "@/pages/FilteredMoviesPage/useMovieFilters.ts";
import {MovieFilters} from "@/pages/FilteredMoviesPage/components/MoviesFilters.tsx";

export const FilteredMoviesPage = () => {
    const { filters, debouncedFilters, updateFilter, setPage, resetFilters } = useMovieFilters();
    const { data, isLoading, isFetching, isError } = useFetchFilteredMoviesQuery(debouncedFilters);
    const favorites = useSelector(selectFavorites);

    const handlePageChange = (_: unknown, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Box sx={{ display: 'flex', gap: 3, p: 3, minHeight: '100vh' }}>
            <MovieFilters
                filters={filters}
                onFilterChange={updateFilter}
                onReset={resetFilters}
            />

            <Box sx={{ flexGrow: 1 }}>
                <MovieGrid
                    movies={data?.results}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    isError={isError}
                    favorites={favorites}
                />

                {data?.total_pages && data.total_pages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            count={Math.min(data.total_pages, 500)}
                            page={filters.page}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};
