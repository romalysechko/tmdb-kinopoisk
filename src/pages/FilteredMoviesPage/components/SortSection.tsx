import {FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent} from "@mui/material";
import * as s from "@/pages/FilteredMoviesPage/movieFilters.styles";

export const SortSection = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => (
    <FormControl fullWidth sx={s.filterFormControlStyles}>
        <InputLabel id="sort-label">Сортировать по</InputLabel>
        <Select
            labelId="sort-label"
            label="Сортировать по"
            value={value}
            onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
        >
            <MenuItem value="popularity.desc">По популярности (↓)</MenuItem>
            <MenuItem value="popularity.asc">По популярности (↑)</MenuItem>
            <MenuItem value="vote_average.desc">По рейтингу (↓)</MenuItem>
            <MenuItem value="vote_average.asc">По рейтингу (↑)</MenuItem>
            <MenuItem value="primary_release_date.desc">По дате (↓)</MenuItem>
            <MenuItem value="primary_release_date.asc">По дате (↑)</MenuItem>
        </Select>
    </FormControl>
);
