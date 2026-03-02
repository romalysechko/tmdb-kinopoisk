import { useSearchParams } from 'react-router';
import { useSearchMoviesQuery } from "@/features/movies/api/moviesApi.ts";

export const useSearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';

    const { data, isLoading, isError } = useSearchMoviesQuery(
        { query },
        { skip: !query }
    );

    return {
        query,
        movies: data?.results || [],
        isLoading,
        isError
    };
};
