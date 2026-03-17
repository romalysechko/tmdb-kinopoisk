import { useState } from "react";
import { useUpcomingMoviesQuery } from "@/features/movies/api/moviesApi.ts";
import { MovieSection } from "@/pages/СategoriesPage/MoviesSection/components/MovieSection.tsx";
import { Path } from "@/app/routing/config/Path.ts";

interface UpcomingMoviesProps {
    isFullList?: boolean;
    title?: string;
    limit?: number;
    showViewMore?: boolean;
}

export const UpcomingMovies = ({
                                   isFullList = false,
                                   showViewMore = !isFullList
                               }: UpcomingMoviesProps) => {
    const [page, setPage] = useState(1);

    const {
        data: upcomingData,
        isLoading: isUpcomingLoading,
        isError: isUpcomingError
    } = useUpcomingMoviesQuery(isFullList ? page : 1);

    return (
        <MovieSection
            title="Upcoming Movies"
            data={upcomingData}
            isLoading={isUpcomingLoading}
            isError={isUpcomingError}
            currentPage={page}
            onPageChange={setPage}
            isFullList={isFullList}
            showViewMore={showViewMore}
            viewMorePath={`${Path.Categories}/${Path.UpcomingMovies}`}
        />
    );
};

