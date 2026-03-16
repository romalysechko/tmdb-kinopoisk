import { z } from 'zod';

export const MovieSchema = z.object({
    id: z.number(),
    title: z.string().optional(),
    poster_path: z.string().nullable().optional(),
    backdrop_path: z.string().nullable().optional(),
    vote_average: z.number().optional(),
    overview: z.string().optional(),
    release_date: z.string().optional(),
});

export const MoviesResponseSchema = z.object({
    page: z.number(),
    results: z.array(MovieSchema),
    total_pages: z.number(),
    total_results: z.number(),
});

export const MovieDetailsSchema = z.object({
    id: z.number(),
    title: z.string(),
    tagline: z.string().optional(),
    overview: z.string(),
    poster_path: z.string().nullable(),
    vote_average: z.number(),
    release_date: z.string(),
    genres: z.array(z.object({ id: z.number(), name: z.string() })),
    runtime: z.number().optional(),
});

export const MovieCreditsSchema = z.object({
    cast: z.array(z.object({
        id: z.number(),
        name: z.string(),
        character: z.string(),
        profile_path: z.string().nullable(),
    })),
});

export const GenresResponseSchema = z.object({
    genres: z.array(z.object({ id: z.number(), name: z.string() })),
});
