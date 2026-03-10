import {Box, Slider, Typography} from "@mui/material";
import {type SyntheticEvent} from "react";
import * as s from "@/pages/FilteredMoviesPage/movieFilters.styles";

export const RatingSection = ({ value, onChange }: { value: number, onChange: (val: number) => void }) => (
    <Box sx={s.ratingContainerStyles}>
        <Typography variant="body2" sx={s.ratingTextStyles}>
            Минимальный рейтинг: <strong>{value}</strong>
        </Typography>
        <Slider
            value={value}
            min={0} max={10} step={0.1}
            valueLabelDisplay="auto"
            onChange={(_: Event | SyntheticEvent, v: number | number[]) => onChange(v as number)}
        />
    </Box>
);
