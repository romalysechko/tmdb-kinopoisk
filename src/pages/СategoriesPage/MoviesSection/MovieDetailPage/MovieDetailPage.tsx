import { useParams } from 'react-router';
import { useFetchMovieDetailsQuery, useFetchMovieCreditsQuery } from "@/features/movies/api/moviesApi.ts";
import s from './MovieDetailPage.module.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const ACTOR_IMAGE_URL = 'https://image.tmdb.org/t/p/w200';

export const MovieDetailPage = () => {
    const { id } = useParams();

    const { data: movie, isLoading: isMovieLoading, isError: isMovieError } = useFetchMovieDetailsQuery(id || '');
    const { data: credits, isLoading: isCreditsLoading } = useFetchMovieCreditsQuery(id || '');

    if (isMovieLoading || isCreditsLoading) return <div className={s.container}>Загрузка...</div>;
    if (isMovieError || !movie) return <div className={s.container}>Ошибка загрузки фильма.</div>;

    const cast = credits?.cast?.slice(0, 7) || [];

    return (
        <div className={s.container}>
            <div className={s.mainInfo}>
                <img
                    src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://placehold.co'}
                    alt={movie.title}
                    className={s.mainPoster}
                />
                <div className={s.details}>
                    <h1 className={s.title}>{movie.title}</h1>
                    {movie.tagline && <p className={s.tagline}>"{movie.tagline}"</p>}

                    <div className={s.stats}>
                        <span><strong>Рейтинг:</strong> ⭐ {movie.vote_average?.toFixed(1)}</span>
                        <span><strong>Дата:</strong> {movie.release_date}</span>
                    </div>

                    <h3>Описание</h3>
                    <p className={s.description}>{movie.overview}</p>

                    <div>
                        <strong>Жанры:</strong> {movie.genres?.map((g: any) => g.name).join(', ')}
                    </div>
                </div>
            </div>

            <div className={s.castSection}>
                <h2 className={s.sectionTitle}>Актерский состав</h2>
                <div className={s.actorsList}>
                    {cast.map((actor: any) => (
                        <div key={actor.id} className={s.actorCard}>
                            <div className={s.avatarWrapper}>
                                <img
                                    src={actor.profile_path ? `${ACTOR_IMAGE_URL}${actor.profile_path}` : 'https://placehold.co'}
                                    alt={actor.name}
                                    className={s.actorImage}
                                />
                            </div>
                            <p className={s.actorName}>{actor.name}</p>
                            <p className={s.characterName}>{actor.character}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
