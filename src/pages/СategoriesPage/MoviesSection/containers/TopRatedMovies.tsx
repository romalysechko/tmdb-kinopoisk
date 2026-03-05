import { useState } from "react";
import { useTopRatedMoviesQuery } from "@/features/movies/api/moviesApi.ts";
import { MovieSection } from "@/pages/СategoriesPage/MoviesSection/components/MovieSection.tsx";
import { Path } from "@/app/routing/config/Path.ts";

interface TopRatedMoviesProps {
    isFullList?: boolean;
    title?: string;
    limit?: number;
    showViewMore?: boolean;
}

export const TopRatedMovies = ({
                                   isFullList = false,
                                   showViewMore = !isFullList
                               }: TopRatedMoviesProps) => {
    const [page, setPage] = useState(1);

    const {
        data: topRatedData,
        isLoading: isTopRatedLoading,
        isError: isTopRatedError
    } = useTopRatedMoviesQuery(isFullList ? page : 1);

    return (
        <MovieSection
            title="Top Rated"
            data={topRatedData}
            isLoading={isTopRatedLoading}
            isError={isTopRatedError}
            currentPage={page}
            onPageChange={setPage}
            isFullList={isFullList}
            showViewMore={showViewMore && !isFullList}
            viewMorePath={`${Path.Categories}/${Path.TopRatedMovies}`}
        />
    );
};
