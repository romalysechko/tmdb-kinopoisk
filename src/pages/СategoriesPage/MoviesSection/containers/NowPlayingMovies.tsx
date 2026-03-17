import { useState } from "react";
import { useNowPlayingMoviesQuery } from "@/features/movies/api/moviesApi.ts";
import { MovieSection } from "@/pages/СategoriesPage/MoviesSection/components/MovieSection.tsx";
import { Path } from "@/app/routing/config/Path.ts";

interface NowPlayingMoviesProps {
    isFullList?: boolean;
    title?: string;
    limit?: number;
    showViewMore?: boolean;
}

export const NowPlayingMovies = ({
                                     isFullList = false,
                                     showViewMore = !isFullList
                                 }: NowPlayingMoviesProps) => {
    const [page, setPage] = useState(1);

    const {
        data: moviesData,
        isLoading: isMoviesLoading,
        isError: isMoviesError
    } = useNowPlayingMoviesQuery(isFullList ? page : 1);

    return (
        <MovieSection
            title="Now Playing"
            data={moviesData}
            isLoading={isMoviesLoading}
            isError={isMoviesError}
            currentPage={page}
            onPageChange={setPage}
            isFullList={isFullList}
            showViewMore={showViewMore}
            viewMorePath={`${Path.Categories}/${Path.NowPlayingMovies}`}
        />
    );
};

