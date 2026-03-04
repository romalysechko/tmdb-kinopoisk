import {Navigate, Route, Routes} from "react-router";
import {MainPage} from "@/pages/MainPage/MainPage.tsx";
import {CategoriesPage} from "@/pages/СategoriesPage/CategoriesPage.tsx";
import {FilteredMoviesPage} from "@/pages/FilteredMoviesPage/FilteredMoviesPage.tsx";
import {SearchPage} from "@/pages/Search/SearchPage.tsx";
import {FavoritesPage} from "@/pages/Favorites/FavoritesPage.tsx";
import {PageNotFound} from "@/common/components/PageNotFound/PageNotFound.tsx";
import {Path} from "@/app/routing/config/Path.ts";
import {PopularMoviesSection} from "@/pages/СategoriesPage/MoviesSection/PopularMoviesSection.tsx";
import {TopRatedMovies} from "@/pages/СategoriesPage/MoviesSection/TopRatedMovies.tsx";
import {UpcomingMovies} from "@/pages/СategoriesPage/MoviesSection/UpcomingMovies.tsx";
import {NowPlayingMovies} from "@/pages/СategoriesPage/MoviesSection/NowPlayingMovies.tsx";
import {MovieDetailPage} from "@/pages/СategoriesPage/MoviesSection/MovieDetailPage/MovieDetailPage.tsx";
export const Routing = () => (
    <Routes>
        <Route path={Path.Main} element={<MainPage />} />
        <Route path={Path.MovieDetail} element={<MovieDetailPage />} />
        <Route path={Path.Categories} element={<CategoriesPage />} >
            <Route index element={<Navigate to={Path.PopularMovies} replace />} />
            <Route path={Path.PopularMovies} element={<PopularMoviesSection isFullList={true}/>}/>
            <Route path={Path.TopRatedMovies} element={<TopRatedMovies isFullList={true}/>}/>
            <Route path={Path.UpcomingMovies} element={<UpcomingMovies isFullList={true}/>}/>
            <Route path={Path.NowPlayingMovies} element={<NowPlayingMovies isFullList={true}/>}/>
        </Route>
        <Route path={Path.FilteredMovies} element={<FilteredMoviesPage />} />
        <Route path={Path.Search} element={<SearchPage />} />
        <Route path={Path.Favorites} element={<FavoritesPage />} />
        <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
);