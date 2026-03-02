import { Box, TextField, Button } from "@mui/material";
import s from "./MainPage.module.css";

interface Props {
    value: string;
    onChange: (val: string) => void;
    onSearch: () => void;
}

export const MovieSearch = ({ value, onChange, onSearch }: Props) => (
    <Box className={s.searchContainer}>
        <TextField
            fullWidth
            variant="standard"
            placeholder="Search movies..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            className={s.searchInput}
            slotProps={{ input: { disableUnderline: true } }}
        />
        <Button
            className={s.searchButton}
            variant="contained"
            onClick={onSearch}
            disabled={!value.trim()}
        >
            Search
        </Button>
    </Box>
);
