import { useState, useMemo, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import type { DiscoverParams } from "@/features/movies/api/movieApiTypes.ts";

const INITIAL_FILTERS: DiscoverParams = {
    page: 1,
    sort_by: 'popularity.desc',
    with_genres: '',
    'vote_average.gte': 0,
};

export const useMovieFilters = () => {
    const [filters, setFilters] = useState<DiscoverParams>(INITIAL_FILTERS);
    const [debouncedFilters, setDebouncedFilters] = useState<DiscoverParams>(INITIAL_FILTERS);

    const debouncedSetFilters = useMemo(
        () => debounce((newFilters: DiscoverParams) => setDebouncedFilters(newFilters), 300),
        []
    );

    useEffect(() => () => debouncedSetFilters.cancel(), [debouncedSetFilters]);

    const updateFilter = useCallback((key: string, value: string | number) => {
        setFilters(prev => {
            let nextValue = value;

            if (key === 'with_genres') {
                const currentGenres = prev.with_genres ? String(prev.with_genres).split(',') : [];
                const targetId = String(value);
                const updated = currentGenres.includes(targetId)
                    ? currentGenres.filter(id => id !== targetId)
                    : [...currentGenres, targetId];
                nextValue = updated.join(',');
            }

            const nextFilters = { ...prev, [key]: nextValue, page: 1 };
            debouncedSetFilters(nextFilters);
            return nextFilters;
        });
    }, [debouncedSetFilters]);

    const setPage = useCallback((page: number) => {
        const next = (prev: DiscoverParams) => ({ ...prev, page });
        setFilters(prev => next(prev));
        setDebouncedFilters(prev => next(prev));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters(INITIAL_FILTERS);
        setDebouncedFilters(INITIAL_FILTERS);
        debouncedSetFilters.cancel();
    }, [debouncedSetFilters]);

    return { filters, debouncedFilters, updateFilter, setPage, resetFilters };
};
