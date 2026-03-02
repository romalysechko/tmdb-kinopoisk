import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type {MoviesResponse} from "@/features/movies/api/movieApiTypes.ts";


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
        fetchMovies: build.query<MoviesResponse, number>({
            query: (page = 1) => `movie/popular?page=${page}`
        }),
        searchMovies: build.query<MoviesResponse, { query: string }>({
            query: ({ query }) => ({
                url: 'search/movie',
                params: {
                    api_key: import.meta.env.VITE_API_KEY,
                    query: query,
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
    }),
})

export const { useFetchMoviesQuery, useSearchMoviesQuery, useTopRatedMoviesQuery, useUpcomingMoviesQuery, useNowPlayingMoviesQuery } = moviesApi

