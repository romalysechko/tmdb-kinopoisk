import { useSelector } from 'react-redux';
import { LinearProgress, Box } from '@mui/material';
import { moviesApi } from '@/features/movies/api/moviesApi';
import type {RootState} from "@/app/modal/store.ts";

export const GlobalLoader = () => {

    const isFetching = useSelector((state: RootState) => {
        const queries = state[moviesApi.reducerPath]?.queries;
        if (!queries) return false;

        return Object.values(queries).some(
            (query) => query?.status === 'pending'
        );
    });

    if (!isFetching) return null;

    return (
        <Box sx={{ width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
            <LinearProgress color="primary" />
        </Box>
    );
};
