import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type {
    DiscoverParams,
    Movie,
    MovieCredits,
    MovieDetails,
    MoviesResponse
} from "@/features/movies/api/movieApiTypes.ts";


export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers) => {
            const token = import.meta.env.VITE_API_TOKEN;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: build => ({
        fetchMovies: build.query<MoviesResponse & { randomMovie?: Movie }, number | void>({
            query: (page = 1) => `movie/popular?page=${page}`,
            transformResponse: (response: MoviesResponse) => {
                const movies = response.results || [];
                return {
                    ...response,
                    randomMovie: movies.length > 0
                        ? movies[Math.floor(Math.random() * movies.length)]
                        : undefined
                };
            }
        }),
        searchMovies: build.query<MoviesResponse, { query: string; page?: number }>({
            query: ({ query, page = 1 }) => ({
                url: 'search/movie',
                params: {
                    query: query,
                    page: page,
                },
            }),
        }),
        topRatedMovies: build.query<MoviesResponse, number>({
            query: (page = 1) => ({
                url: 'movie/top_rated',
                params: {
                    page: page
                },
            }),
        }),
        upcomingMovies: build.query<MoviesResponse, number>({
            query: (page = 1) => ({
                url: 'movie/upcoming',
                params: {
                    page: page
                },
            }),
        }),
        nowPlayingMovies: build.query<MoviesResponse, number>({
            query: (page = 1) => ({
                url: 'movie/now_playing',
                params: {
                    page: page
                },
            }),
        }),
        fetchMovieDetails: build.query<MovieDetails, string>({
            query: (id) => `movie/${id}`
        }),
        fetchMovieCredits: build.query<MovieCredits, string>({
            query: (id) => `movie/${id}/credits`
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
        }),
        fetchGenres: build.query<{ genres: { id: number; name: string }[] }, void>({
            query: () => 'genre/movie/list',
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
} = moviesApi

