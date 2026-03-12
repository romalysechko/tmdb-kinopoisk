import type {CastMember} from "@/features/movies/api/movieApiTypes.ts";
import {Avatar, Box, Grid, Stack, Typography} from "@mui/material";


const ACTOR_IMAGE_URL = 'https://image.tmdb.org/t/p/w200';

export const MovieCast = ({cast}: { cast: CastMember[] }) => (
    <Box sx={{mt: 8}}>
        <Typography variant="h4" gutterBottom sx={{fontWeight: 'bold', mb: 4}}>
            В главных ролях
        </Typography>
        <Grid container spacing={3}>
            {cast.map((actor) => (
                <Grid size={{xs: 6, sm: 4, md: 1.71}} key={actor.id}>
                    <Stack alignItems="center" textAlign="center" spacing={1.5}>
                        <Avatar
                            src={actor.profile_path ? `${ACTOR_IMAGE_URL}${actor.profile_path}` : ''}
                            sx={{width: {xs: 80, md: 100}, height: {xs: 80, md: 100}, boxShadow: 2}}
                        />
                        <Box>
                            <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>{actor.name}</Typography>
                            <Typography variant="caption" color="text.secondary">{actor.character}</Typography>
                        </Box>
                    </Stack>
                </Grid>
            ))}
        </Grid>
    </Box>
);
