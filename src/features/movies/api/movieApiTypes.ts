export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    overview: string;
    release_date: string;
}

export interface MoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface FavoriteMovie {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
}
export interface Genre {
    id: number;
    name: string;
}

export interface MovieDetails {
    id: number;
    title: string;
    tagline?: string;
    overview: string;
    poster_path: string | null;
    vote_average: number;
    release_date: string;
    genres: Genre[];
}

export interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

export interface MovieCredits {
    cast: CastMember[];
}
export interface DiscoverParams {
    page?: number;
    sort_by?: string;
    with_genres?: string;
    'vote_average.gte'?: number;
    'vote_average.lte'?: number;
    primary_release_year?: number;
}
