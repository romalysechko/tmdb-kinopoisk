import s from './SearchPage.module.css';
import {useSearchPage} from './useSearchPage';
import {MovieSearch} from "@/pages/MainPage/MovieSearch.tsx";
import {useMainPage} from "@/pages/MainPage/useMainPage.ts";

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const SearchPage = () => {
    const { query, movies, isError } = useSearchPage();
    const {searchQuery, setSearchQuery, handleSearch, isLoading } = useMainPage();

    if (isLoading) return <div className={s.container}>Searching...</div>;
    if (isError) return <div className={s.container}>Error occurred while searching.</div>;

    return (
        <div className={s.container}>
            <MovieSearch value={searchQuery}
                         onChange={setSearchQuery}
                         onSearch={handleSearch} />
            <h2 className={s.heading}>
                {query ? `Results for "${query}"` : 'Type something to search'}
            </h2>

            {movies.length === 0 && !isLoading && query && (
                <p>No movies found for your request.</p>
            )}

            <div className={s.grid}>
                {movies.map(movie => (
                    <div key={movie.id} className={s.card}>
                        {movie.poster_path ? (
                            <img
                                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                                alt={movie.title}
                                className={s.poster}
                            />
                        ) : (
                            <div className={s.posterFallback}>NO POSTER</div>
                        )}
                        <p className={s.movieTitle}>{movie.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
