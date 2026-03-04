import {useState} from "react";
import {useTopRatedMoviesQuery} from "@/features/movies/api/moviesApi.ts";
import {MovieSection} from "@/pages/СategoriesPage/MoviesSection/MovieSection.tsx";
import {Path} from "@/app/routing/config/Path.ts";

export const TopRatedMovies = (props: any) => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError } = useTopRatedMoviesQuery(props.isFullList ? page : 1);

    return (
        <MovieSection
            {...props}
            title="Top Rated Movies"
            data={data}
            isLoading={isLoading}
            isError={isError}
            currentPage={page}
            onPageChange={setPage}
            viewMorePath={`${Path.Categories}/${Path.TopRatedMovies}`}
        />
    );
};