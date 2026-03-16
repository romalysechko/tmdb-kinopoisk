import {useSearchParams} from "react-router";
import {useSearchMoviesQuery} from "@/features/movies/api/moviesApi.ts";

export const useSearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const page = Number(searchParams.get('page')) || 1;

    const { data, isLoading, isFetching } = useSearchMoviesQuery(
        { query, page },
        { skip: !query }
    );

    return {
        query,
        page,
        totalPages: data?.total_pages || 0,
        movies: data?.results || [],
        isLoading: isLoading || isFetching,
    };
};
