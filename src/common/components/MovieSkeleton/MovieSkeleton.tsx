import {Box, Skeleton} from "@mui/material";

export const MovieSkeleton = () => (
    <Box>
        <Skeleton
            variant="rectangular"
            sx={{ aspectRatio: "2/3", borderRadius: 2 }}
        />
        <Skeleton sx={{ mt: 1 }} />
        <Skeleton width="60%" />
    </Box>
);