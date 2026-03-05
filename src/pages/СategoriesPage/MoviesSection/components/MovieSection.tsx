import {useNavigate} from 'react-router';
import {Pagination, Stack} from "@mui/material";
import s from '../containers/PopularMovies.module.css';
import type {MoviesResponse} from "@/features/movies/api/movieApiTypes.ts";
import {MovieCard} from "@/pages/СategoriesPage/MoviesSection/components/MovieCard/MovieCard.tsx";

interface MovieSectionProps {
    title: string;
    data?: MoviesResponse;
    isLoading: boolean;
    isError: boolean;
    isFullList?: boolean;
    limit?: number;
    showViewMore?: boolean;
    viewMorePath?: string;
    onPageChange?: (page: number) => void;
    currentPage?: number;
}

export const MovieSection = ({
                                 title,
                                 data,
                                 isLoading,
                                 isError,
                                 isFullList = false,
                                 limit = 6,
                                 showViewMore = false,
                                 viewMorePath,
                                 onPageChange,
                                 currentPage = 1
                             }: MovieSectionProps) => {
    const navigate = useNavigate();

    if (isLoading) return <div>Loading {title}...</div>;
    if (isError) return <div>Error loading movies.</div>;

    const allMovies = data?.results || [];
    const movies = isFullList ? allMovies : allMovies.slice(0, limit);

    return (
        <section className={s.section}>
            <div className={s.header}>
                <h2 className={s.title}>{title}</h2>
                {showViewMore && viewMorePath && (
                    // <Button component={Link} to={viewMorePath}>
                    //     Смотреть все
                    // </Button>
                    <button className={s.viewMoreBtn} onClick={() => navigate(viewMorePath)}>
                        View More
                    </button>
                )}
            </div>

            <div className={s.grid}>
                {movies?.map((movie) => (
                    <MovieCard key={movie.id}
                               id={movie.id}
                               title={movie.title}
                               poster={movie.poster_path}
                               rating={movie.vote_average} />
                ))}
            </div>

            {isFullList && data && data.total_pages > 1 && (
                <Stack spacing={2} sx={{ mt: 4, mb: 4, alignItems: 'center' }}>
                    <Pagination
                        count={data.total_pages > 500 ? 500 : data.total_pages}
                        page={currentPage}
                        onChange={(_, value) => {
                            onPageChange?.(value);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        color="primary"
                        size="large"
                    />
                </Stack>
            )}
        </section>
    );
};
