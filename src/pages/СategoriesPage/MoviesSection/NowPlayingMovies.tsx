import {useState} from "react";
import {useNowPlayingMoviesQuery} from "@/features/movies/api/moviesApi.ts";
import {MovieSection} from "@/pages/СategoriesPage/MoviesSection/MovieSection.tsx";
import {Path} from "@/app/routing/config/Path.ts";

export const NowPlayingMovies = (props: any) => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError } = useNowPlayingMoviesQuery(props.isFullList ? page : 1);

    return (
        <MovieSection
            {...props}
            title="Now Playing"
            data={data}
            isLoading={isLoading}
            isError={isError}
            currentPage={page}
            onPageChange={setPage}
            viewMorePath={`${Path.Categories}/${Path.NowPlayingMovies}`}
        />
    );
};