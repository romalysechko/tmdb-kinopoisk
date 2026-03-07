import {
    Box, Paper, Typography, FormControl, InputLabel,
    Select, MenuItem, Slider, type SelectChangeEvent
} from "@mui/material";
import type { DiscoverParams } from "@/features/movies/api/movieApiTypes.ts";
import { type SyntheticEvent } from "react";
import * as s from "./movieFilters.styles"; // Импортируем все стили как объект 's'

type Props = {
    filters: DiscoverParams;
    onFilterChange: (key: string, value: string | number) => void;
};

export const MovieFilters = ({ filters, onFilterChange }: Props) => {
    return (
        <Paper elevation={0} sx={s.filtersPaperStyles}>
            <Typography variant="h6" sx={s.filterTitleStyles}>
                Фильтры
            </Typography>

            <FormControl fullWidth sx={s.filterFormControlStyles}>
                <InputLabel id="sort-label">Сортировать по</InputLabel>
                <Select
                    labelId="sort-label"
                    label="Сортировать по"
                    value={filters.sort_by}
                    onChange={(e: SelectChangeEvent) => onFilterChange('sort_by', e.target.value)}
                >
                    <MenuItem value="popularity.desc">По популярности (↓)</MenuItem>
                    <MenuItem value="popularity.asc">По популярности (↑)</MenuItem>
                    <MenuItem value="vote_average.desc">По рейтингу (↓)</MenuItem>
                    <MenuItem value="vote_average.asc">По рейтингу (↑)</MenuItem>
                    <MenuItem value="primary_release_date.desc">По дате (↓)</MenuItem>
                    <MenuItem value="primary_release_date.asc">По дате (↑)</MenuItem>
                    <MenuItem value="original_title.asc">По названию (А-Я)</MenuItem>
                    <MenuItem value="original_title.desc">По названию (Я-А)</MenuItem>
                </Select>
            </FormControl>

            <Box sx={s.ratingContainerStyles}>
                <Typography variant="body2" sx={s.ratingTextStyles}>
                    Минимальный рейтинг: <strong>{filters['vote_average.gte']}</strong>
                </Typography>
                <Slider
                    value={filters['vote_average.gte'] as number}
                    min={0}
                    max={10}
                    step={0.1}
                    valueLabelDisplay="auto"
                    onChange={(_: Event | SyntheticEvent, v: number | number[]) =>
                        onFilterChange('vote_average.gte', v as number)
                    }
                />
            </Box>
        </Paper>
    );
};