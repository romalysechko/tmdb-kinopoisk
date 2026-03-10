import {Box, Button, Paper, Typography} from "@mui/material";
import type {DiscoverParams} from "@/features/movies/api/movieApiTypes.ts";
import * as s from "../movieFilters.styles.ts";
import { SortSection } from "./SortSection.tsx";
import {RatingSection} from "@/pages/FilteredMoviesPage/components/RatingSection.tsx";
import {GenreSection} from "@/pages/FilteredMoviesPage/components/GenreSection.tsx";

type Props = {
    filters: DiscoverParams;
    onFilterChange: (key: string, value: string | number) => void;
    onReset: () => void;
};

export const MovieFilters = ({ filters, onFilterChange, onReset }: Props) => {
    const selectedGenres = filters.with_genres ? String(filters.with_genres).split(',') : [];

    const isFiltered = filters.with_genres !== '' ||
        filters.sort_by !== 'popularity.desc' ||
        filters['vote_average.gte'] !== 0;

    return (
        <Paper elevation={0} sx={s.filtersPaperStyles}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={s.filterTitleStyles}>Фильтры</Typography>
                <Button
                    size="small"
                    onClick={onReset}
                    disabled={!isFiltered}
                >
                    Сброс
                </Button>
            </Box>

            <SortSection
                value={filters.sort_by as string}
                onChange={(val) => onFilterChange('sort_by', val)}
            />

            <RatingSection
                value={filters['vote_average.gte'] as number}
                onChange={(val) => onFilterChange('vote_average.gte', val)}
            />

            <GenreSection
                selectedIds={selectedGenres}
                onToggle={(id) => onFilterChange('with_genres', id)}
            />
        </Paper>
    );
};
