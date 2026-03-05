import {useState} from "react";
import {useFetchMoviesQuery} from "@/features/movies/api/moviesApi.ts";
import {useNavigate} from "react-router";
import {Path} from "@/app/routing/config/Path.ts";

export const useMainPage = () => {
    const { data, isLoading } = useFetchMoviesQuery(1);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const randomMovie = data?.randomMovie || null;

    const imagePath = randomMovie?.backdrop_path || randomMovie?.poster_path;

    const imageUrl = imagePath
        ? `https://image.tmdb.org/t/p/w1280${imagePath}`
        : null;

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`${Path.Search}?query=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return {
        randomMovie,
        imageUrl,
        searchQuery,
        setSearchQuery,
        handleSearch,
        isLoading
    };
};
