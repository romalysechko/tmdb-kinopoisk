export const Path = {
    Main: '/',
    MovieDetail: '/movies/:id',
    Categories: '/categories',
    PopularMovies:'popular-movies',
    TopRatedMovies:'top-movies',
    UpcomingMovies:'upcoming-movies',
    NowPlayingMovies:'nowPlaying-movies',
    FilteredMovies: '/movies/filter',
    Search: '/search',
    Favorites: '/favorites',
    NotFound: '*',
} as const;