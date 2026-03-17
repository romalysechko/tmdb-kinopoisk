import { Box, Card, CardMedia, IconButton, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch } from "react-redux";
import { toggleFavoriteAC } from "@/app/modal/app-slice";
import {
    badgeStyles,
    cardStyles,
    favoriteBtnStyles,
    imageWrapperStyles,
    titleClampStyles
} from "./movieCard.styles.ts";
import type { Movie, FavoriteMovie } from "@/features/movies/api/movieApiTypes";
import {useNavigate} from "react-router";

type Props = {
    movie: Movie;
    isFavorite?: boolean;
};

export const MovieCard = ({ movie, isFavorite = false }: Props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!movie) return null;

    const handleCardClick = () => {
        navigate(`/movies/${movie.id}`);
    };
    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        dispatch(toggleFavoriteAC({
            movie: movie as unknown as FavoriteMovie
        }));
    };

    return (
        <Card elevation={0} sx={cardStyles} onClick={handleCardClick}>
            <Box sx={imageWrapperStyles}>
                <CardMedia
                    component="img"
                    image={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                            : "/noPoster.svg"
                    }
                    alt={movie.title}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />

                <IconButton
                    size="small"
                    className={`favorite-btn ${isFavorite ? 'is-favorite' : ''}`}
                    sx={favoriteBtnStyles}
                    onClick={handleFavoriteClick}
                >
                    {isFavorite ? (
                        <FavoriteIcon fontSize="small" sx={{ color: '#db2360' }} />
                    ) : (
                        <FavoriteBorderIcon fontSize="small" />
                    )}
                </IconButton>

                <Box sx={badgeStyles(movie.vote_average ?? 0)}>
                    {movie.vote_average?.toFixed(1) ?? "0.0"}
                </Box>
            </Box>

            <Typography variant="subtitle2" sx={titleClampStyles}>
                {movie.title}
            </Typography>
        </Card>
    );
};
