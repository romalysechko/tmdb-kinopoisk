import {useEffect} from "react";
import {Box, Container, Pagination, Skeleton, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {selectFavorites} from "@/app/modal/app-slice";
import {MovieCard} from "@/pages/СategoriesPage/MoviesSection/components/MovieCard/MovieCard";
import {MovieSearch} from "@/pages/MainPage/MovieSearch.tsx";
import {useSearchPage} from "./useSearchPage";
import {useMainPage} from "@/pages/MainPage/useMainPage.ts";
import type {Movie} from "@/features/movies/api/movieApiTypes.ts";
import {Path} from "@/app/routing/config/Path.ts";

export const SearchPage = () => {
    const navigate = useNavigate();
    const { query, movies, isLoading, totalPages, page } = useSearchPage();
    const { searchQuery, setSearchQuery, handleSearch } = useMainPage();
    const favorites = useSelector(selectFavorites);

    useEffect(() => {
        setSearchQuery(query || '');
    }, [query, setSearchQuery]);

    const handleInputChange = (val: string) => {
        setSearchQuery(val);

        if (val === '') {
            navigate(Path.Search, { replace: true });
        }
    };

    const handlePageChange = (_: unknown, value: number) => {
        navigate(`${Path.Search}?query=${encodeURIComponent(query)}&page=${value}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4, minHeight: '100vh' }}>
            <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '100%', maxWidth: 800 }}>
                    <MovieSearch
                        value={searchQuery}
                        onChange={handleInputChange}
                        onSearch={handleSearch}
                    />
                </Box>
            </Box>

            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                {query ? `Результаты по запросу: "${query}"` : 'Введите название для поиска'}
            </Typography>

            {isLoading ? (
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 3 }}>
                    {Array.from(new Array(8)).map((_, i) => (
                        <Skeleton key={i} variant="rounded" sx={{ aspectRatio: '2/3', borderRadius: 2 }} />
                    ))}
                </Box>
            ) : (
                <>
                    {query && movies.length > 0 && (
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: 3
                        }}>
                            {movies.map((movie: Movie) => (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    isFavorite={favorites.some(fav => fav.id === movie.id)}
                                />
                            ))}
                        </Box>
                    )}

                    {query && movies.length === 0 && (
                        <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
                            По вашему запросу ничего не найдено.
                        </Typography>
                    )}
                </>
            )}

            {/* Пагинация */}
            {!isLoading && totalPages > 1 && query && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                    <Pagination
                        count={Math.min(totalPages, 500)}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                    />
                </Box>
            )}
        </Container>
    );
};
