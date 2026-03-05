import {useSelector} from 'react-redux';
import s from './FavoritesPage.module.css';
import {MovieCard} from "@/pages/СategoriesPage/MoviesSection/components/MovieCard/MovieCard.tsx";
import {selectFavorites} from "@/app/modal/app-slice.ts";

export const FavoritesPage = () => {
    const favorites = useSelector(selectFavorites);

    return (
        <div className={s.container}>
            <h1 className={s.title}>Favorites</h1>

            {favorites.length === 0 ? (
                <div className={s.empty}>У вас пока нет любимых фильмо️в</div>
            ) : (
                <div className={s.grid}>
                    {favorites.map(movie => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            poster={movie.poster_path}
                            rating={movie.vote_average}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

