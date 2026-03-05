import { useState } from "react";
import { useFetchMoviesQuery } from "@/features/movies/api/moviesApi.ts";
import { MovieSection } from "@/pages/СategoriesPage/MoviesSection/components/MovieSection.tsx";
import { Path } from "@/app/routing/config/Path.ts";

interface PopularMoviesSectionProps {
    isFullList?: boolean;
    title?: string;
    limit?: number;
    showViewMore?: boolean;
}

export const PopularMoviesSection = ({
                                         isFullList = false,
                                         showViewMore = !isFullList
                                     }: PopularMoviesSectionProps) => {
    const [page, setPage] = useState(1);

    const {
        data: moviesData,
        isLoading: isMoviesLoading,
        isError: isMoviesError
    } = useFetchMoviesQuery(isFullList ? page : 1);

    return (
        <MovieSection
            title="Popular Movies"
            data={moviesData}
            isLoading={isMoviesLoading}
            isError={isMoviesError}
            currentPage={page}
            onPageChange={setPage}
            isFullList={isFullList}
            showViewMore={showViewMore && !isFullList}
            viewMorePath={`${Path.Categories}/${Path.PopularMovies}`}
        />
    );
};
