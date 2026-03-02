import {useNavigate} from 'react-router';
import {useUpcomingMoviesQuery} from "@/features/movies/api/moviesApi.ts";
import {Path} from "@/app/routing/config/Path.ts";
import s from './PopularMovies.module.css';
import {Pagination, Stack} from "@mui/material";
import {useState} from "react";

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface UpcomingProps {
    title?: string;
    isFullList?: boolean;
    limit?: number;
    showViewMore?: boolean;
}

export const UpcomingMovies = ({
                                   title = "Upcoming Movies",
                                   isFullList = false,
                                   limit = 6,
                                   showViewMore = false
                               }: UpcomingProps) => {
    const [page, setPage] = useState(1)
    const navigate = useNavigate();
    const { data, isLoading, isError } = useUpcomingMoviesQuery(isFullList ? page : 1);


    const allMovies = data?.results || [];
    const movies = isFullList ? allMovies : allMovies.slice(0, limit);

    const handleViewMore = () => {
        navigate(`${Path.Categories}/${Path.UpcomingMovies}`);
    };
    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    if (isLoading) return <div>Loading popular movies...</div>;
    if (isError) return <div>Error loading movies.</div>;

    return (
        <section className={s.section}>
            <div className={s.header}>
                <h2 className={s.title}>{title}</h2>
                {showViewMore && (
                    <button className={s.viewMoreBtn} onClick={handleViewMore}>
                        View More
                    </button>
                )}
            </div>

            <div className={s.grid}>
                {movies.map(movie => (
                    <div key={movie.id} className={s.card}>
                        <img
                            src={movie.poster_path
                                ? `${IMAGE_BASE_URL}${movie.poster_path}`
                                : 'https://placehold.co'}
                            alt={movie.title}
                            className={s.poster}
                        />
                        <p className={s.movieTitle}>{movie.title}</p>
                    </div>
                ))}
            </div>
            {isFullList && data && data.total_pages > 1 && (
                <Stack spacing={2} sx={{ mt: 4, mb: 4, alignItems: 'center' }}>
                    <Pagination
                        count={data.total_pages > 500 ? 500 : data.total_pages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                        variant="outlined"
                        shape="rounded"
                        sx={{
                            '& .MuiPaginationItem-root': { color: '#fff', borderColor: 'rgba(255,255,255,0.3)' },
                            '& .Mui-selected': { backgroundColor: 'rgba(255,255,255,0.2) !important' }
                        }}
                    />
                </Stack>
            )}
        </section>
    );
};