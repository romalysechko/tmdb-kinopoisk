import { useNavigate } from "react-router";
import { IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import s from './MovieCard.module.css';
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/modal/store.ts";
import { selectIsFavorite, toggleFavoriteAC } from "@/app/modal/app-slice.ts";

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface MovieCardProps {
    id: number;
    title: string;
    poster: string | null;
    rating: number;
}

export const MovieCard = ({ id, title, poster, rating }: MovieCardProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 1. УБРАЛИ useState. Теперь всё берем ТОЛЬКО из Redux
    const isFavorite = useSelector((state: RootState) => selectIsFavorite(state, id));

    const getRatingClass = (vote: number) => {
        if (vote >= 7) return s.high;
        if (vote >= 5) return s.medium;
        return s.low;
    };

    const handleNavigate = () => {
        navigate(`/movies/${id}`);
    };

    const toggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        // 2. Отправляем объект фильма в Redux
        dispatch(toggleFavoriteAC({
            movie: {
                id,
                title,
                poster_path: poster,
                vote_average: rating
            }
        }));
    };

    return (
        <div className={s.card} onClick={handleNavigate}>
            <div className={s.imageWrapper}>
                <img
                    src={poster ? `${IMAGE_BASE_URL}${poster}` : 'https://placehold.co'}
                    alt={title}
                    className={s.poster}
                />

                <div className={`${s.badge} ${getRatingClass(rating)}`}>
                    {rating.toFixed(1)}
                </div>

                <IconButton
                    onClick={toggleFavorite}
                    className={s.favoriteBtn}
                    sx={{
                        color: isFavorite ? '#ef476f' : '#ffffff',
                        backgroundColor: 'rgba(0, 0, 0, 0.5) !important',
                        '&:hover': {
                            transform: 'scale(1.2)',
                            backgroundColor: 'rgba(0, 0, 0, 0.7) !important',
                        },
                        // Чтобы иконка не дергалась при наведении
                        transition: 'all 0.2s ease'
                    }}
                >
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
            </div>
            <h3 className={s.movieTitle}>{title}</h3>
        </div>
    );
};
