import {Box, Chip, Skeleton, Stack, Typography} from "@mui/material";
import {useFetchGenresQuery} from "@/features/movies/api/moviesApi";

export const GenreSection = ({ selectedIds, onToggle }: { selectedIds: string[], onToggle: (id: number) => void }) => {
    const { data, isLoading } = useFetchGenresQuery();

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 600, color: 'text.secondary' }}>
                Жанры
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
                {isLoading ? (
                    Array.from(new Array(8)).map((_, i) => (
                        <Skeleton key={i} variant="rounded" width={75} height={28} sx={{ borderRadius: 2 }} />
                    ))
                ) : (
                    data?.genres.map((genre) => (
                        <Chip
                            key={genre.id}
                            label={genre.name}
                            clickable
                            size="small"
                            color={selectedIds.includes(String(genre.id)) ? "primary" : "default"}
                            variant={selectedIds.includes(String(genre.id)) ? "filled" : "outlined"}
                            onClick={() => onToggle(genre.id)}
                            sx={{ borderRadius: '6px' }}
                        />
                    ))
                )}
            </Stack>
        </Box>
    );
};
