import { Box, Skeleton } from '@mui/material';

export const MovieSkeleton = () => (
    <Box sx={{ width: '100%', maxWidth: 200 }}>
        <Skeleton
            variant="rounded"
            sx={{ width: '100%', height: 250, borderRadius: 2, mb: 1 }}
        />
        <Skeleton variant="text" width="40%" height={20} />
    </Box>
);
