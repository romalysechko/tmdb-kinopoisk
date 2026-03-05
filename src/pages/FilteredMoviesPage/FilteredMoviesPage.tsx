import { type SyntheticEvent, useState } from "react";
import {
    Alert,
    Box,
    Card,
    CardContent,
    CardMedia,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    type SelectChangeEvent,
    Slider,
    Typography,
    Skeleton,
    Pagination,
    useTheme
} from "@mui/material";
import { useFetchFilteredMoviesQuery } from "@/features/movies/api/moviesApi";
import type { DiscoverParams } from "@/features/movies/api/movieApiTypes.ts";

export const FilteredMoviesPage = () => {
    const theme = useTheme(); // Для доступа к переменным темы, если понадобится

    // 1. Состояние фильтров
    const [filters, setFilters] = useState<DiscoverParams>({
        page: 1,
        sort_by: 'popularity.desc',
        with_genres: '',
        'vote_average.gte': 0,
    });

    // 2. Запрос данных через RTK Query
    const { data, isLoading, isFetching, isError } = useFetchFilteredMoviesQuery(filters);

    const movies = data?.results || [];
    // TMDB ограничивает выдачу 500 страницами
    const totalPages = data?.total_pages ? Math.min(data.total_pages, 500) : 0;

    // 3. Обработчики изменений
    const handleFilterChange = (key: string, value: string | number) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            page: 1 // Сбрасываем на первую страницу при смене любого фильтра
        }));
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setFilters(prev => ({ ...prev, page: value }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Массив для скелетонов (по 5 в ряд, возьмем 10 штук)
    const skeletons = Array.from(new Array(10));

    return (
        <Box sx={{
            display: 'flex',
            gap: 3,
            p: 3,
            minHeight: '100vh',
            bgcolor: 'background.default', // Адаптивный фон страницы
            color: 'text.primary',        // Адаптивный цвет текста
            transition: 'background-color 0.3s ease'
        }}>
            {/* 6.1. Левый блок фильтрации */}
            <Paper
                elevation={0}
                sx={{
                    width: 280,
                    p: 3,
                    height: 'fit-content',
                    position: 'sticky',
                    top: 20,
                    flexShrink: 0,
                    bgcolor: 'background.paper', // Цвет сайдбара меняется по теме
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease'
                }}
            >
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Фильтры
                </Typography>

                {/* 6.1.1. Сортировка */}
                <FormControl fullWidth sx={{ mb: 4 }}>
                    <InputLabel id="sort-label">Сортировать по</InputLabel>
                    <Select
                        labelId="sort-label"
                        label="Сортировать по"
                        value={filters.sort_by}
                        onChange={(e: SelectChangeEvent) => handleFilterChange('sort_by', e.target.value)}
                    >
                        <MenuItem value="popularity.desc">По популярности (убывание)</MenuItem>
                        <MenuItem value="popularity.asc">По популярности (возрастание)</MenuItem>
                        <MenuItem value="vote_average.desc">По рейтингу (убывание)</MenuItem>
                        <MenuItem value="vote_average.asc">По рейтингу (возрастание)</MenuItem>
                        <MenuItem value="primary_release_date.desc">По дате выпуска (убывание)</MenuItem>
                        <MenuItem value="primary_release_date.asc">По дате выпуска (возрастание)</MenuItem>
                        <MenuItem value="original_title.asc">По названию (А-Я)</MenuItem>
                        <MenuItem value="original_title.desc">По названию (Я-А)</MenuItem>
                    </Select>
                </FormControl>

                {/* Рейтинг */}
                <Box sx={{ px: 1 }}>
                    <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                        Минимальный рейтинг: <strong>{filters['vote_average.gte']}</strong>
                    </Typography>
                    <Slider
                        value={filters['vote_average.gte'] as number}
                        min={0}
                        max={10}
                        step={0.1}
                        valueLabelDisplay="auto"
                        onChange={(_: Event | SyntheticEvent, v: number | number[]) => handleFilterChange('vote_average.gte', v as number)}
                    />
                </Box>
            </Paper>

            {/* Основной контент */}
            <Box sx={{ flexGrow: 1 }}>
                {isError && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        Ошибка при загрузке данных. Проверьте соединение.
                    </Alert>
                )}

                {/* Сетка: Ровно 5 постеров в ряд */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 2.5
                }}>
                    {(isLoading || isFetching) && movies.length === 0
                        ? skeletons.map((_, index) => (
                            <Box key={index}>
                                <Skeleton
                                    variant="rectangular"
                                    sx={{ aspectRatio: '2/3', borderRadius: 2, bgcolor: 'action.hover' }}
                                />
                                <Skeleton sx={{ mt: 1, bgcolor: 'action.hover' }} />
                                <Skeleton width="60%" sx={{ bgcolor: 'action.hover' }} />
                            </Box>
                        ))
                        : movies.map(movie => (
                            <Card
                                key={movie.id}
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    bgcolor: 'background.paper',
                                    borderRadius: 2,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: theme.shadows[4]
                                    }
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{ aspectRatio: '2/3', objectFit: 'cover' }}
                                    image={movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                                        : 'https://via.placeholder.com'}
                                    alt={movie.title}
                                />
                                <CardContent sx={{ p: 1.5, flexGrow: 1 }}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 'bold',
                                            lineHeight: 1.2,
                                            height: '2.4em',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {movie.title}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'warning.main', display: 'flex', alignItems: 'center', mt: 1 }}>
                                        ★ {movie.vote_average.toFixed(1)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))
                    }
                </Box>

                {/* Пагинация */}
                {!isLoading && movies.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 4 }}>
                        <Pagination
                            count={totalPages}
                            page={filters.page}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    fontWeight: 'bold'
                                }
                            }}
                        />
                    </Box>
                )}

                {!isLoading && !isFetching && movies.length === 0 && (
                    <Typography textAlign="center" sx={{ mt: 10, color: 'text.secondary' }}>
                        Фильмов с такими параметрами не найдено.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};
