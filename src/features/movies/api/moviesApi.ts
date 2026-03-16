import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
    DiscoverParams,
    Movie,
    MovieCredits,
    MovieDetails,
    MoviesResponse
} from "@/features/movies/api/movieApiTypes.ts";
import {
    GenresResponseSchema,
    MovieCreditsSchema,
    MovieDetailsSchema,
    MoviesResponseSchema
} from "@/features/movies/Zod/MovieSchema.tsx";
import { z } from 'zod';


const validate = <T,>(schema: z.ZodSchema<T>, data: unknown): T => {
    const result = schema.safeParse(data);
    if (!result.success) {
        console.error("Zod Error Details:", result.error.issues);
        throw {
            status: 'ZOD_ERROR',
            data: { status_message: "Ошибка валидации данных сервера" },
            originalError: result.error.issues
        };
    }
    return result.data;
};

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers) => {
            const token = import.meta.env.VITE_API_TOKEN;
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: build => ({
        fetchMovies: build.query<MoviesResponse & { randomMovie?: Movie }, number | void>({
            query: (page = 1) => `movie/popular?page=${page}`,
            transformResponse: (response: unknown) => {
                const data = validate(MoviesResponseSchema, response); // Валидация
                const movies = data.results || [];
                return {
                    ...data,
                    randomMovie: movies.length > 0
                        ? movies[Math.floor(Math.random() * movies.length)]
                        : undefined
                };
            }
        }),
        searchMovies: build.query<MoviesResponse, { query: string; page?: number }>({
            query: ({ query, page = 1 }) => ({
                url: 'search/movie',
                params: { query, page },
            }),
            transformResponse: (res) => validate(MoviesResponseSchema, res),
        }),
        topRatedMovies: build.query<MoviesResponse, number>({
            query: (page = 1) => ({ url: 'movie/top_rated', params: { page } }),
            transformResponse: (res) => validate(MoviesResponseSchema, res),
        }),
        upcomingMovies: build.query<MoviesResponse, number>({
            query: (page = 1) => ({ url: 'movie/upcoming', params: { page } }),
            transformResponse: (res) => validate(MoviesResponseSchema, res),
        }),
        nowPlayingMovies: build.query<MoviesResponse, number>({
            query: (page = 1) => ({ url: 'movie/now_playing', params: { page } }),
            transformResponse: (res) => validate(MoviesResponseSchema, res),
        }),
        fetchMovieDetails: build.query<MovieDetails, string>({
            query: (id) => `movie/${id}`,
            transformResponse: (res) => validate(MovieDetailsSchema, res),
        }),
        fetchMovieCredits: build.query<MovieCredits, string>({
            query: (id) => `movie/${id}/credits`,
            transformResponse: (res) => validate(MovieCreditsSchema, res),
        }),
        fetchFilteredMovies: build.query<MoviesResponse, DiscoverParams>({
            query: (params) => ({
                url: 'discover/movie',
                params: {
                    ...params,
                    page: params.page || 1,
                    sort_by: params.sort_by || 'popularity.desc',
                },
            }),
            transformResponse: (res) => validate(MoviesResponseSchema, res),
        }),
        fetchGenres: build.query<{ genres: { id: number; name: string }[] }, void>({
            query: () => 'genre/movie/list',
            transformResponse: (res) => validate(GenresResponseSchema, res),
        }),
        fetchSimilarMovies: build.query<MoviesResponse, string>({
            query: (movieId) => `movie/${movieId}/similar`,
            transformResponse: (res) => validate(MoviesResponseSchema, res),
        }),
    }),
})

export const {
    useFetchMoviesQuery,
    useSearchMoviesQuery,
    useTopRatedMoviesQuery,
    useUpcomingMoviesQuery,
    useNowPlayingMoviesQuery,
    useFetchMovieDetailsQuery,
    useFetchMovieCreditsQuery,
    useFetchFilteredMoviesQuery,
    useFetchGenresQuery,
    useFetchSimilarMoviesQuery,
} = moviesApi
