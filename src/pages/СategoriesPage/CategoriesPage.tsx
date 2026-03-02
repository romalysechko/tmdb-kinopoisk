import { NavLink, Outlet } from 'react-router';
import { Path } from "@/app/routing/config/Path.ts";
import s from './CategoriesPage.module.css';

export const CategoriesPage = () => {
    return (
        <div className={s.container}>
            {/* Навигация по категориям (Вкладки) */}
            <nav className={s.tabs}>
                <NavLink
                    to={`${Path.Categories}/${Path.PopularMovies}`}
                    className={({ isActive }) => (isActive ? s.activeTab : s.tab)}
                >
                    Popular Movies
                </NavLink>

                <NavLink
                    to={`${Path.Categories}/${Path.TopRatedMovies}`}
                    className={({ isActive }) => (isActive ? s.activeTab : s.tab)}
                >
                    Top Rated Movies
                </NavLink>

                <NavLink
                    to={`${Path.Categories}/${Path.UpcomingMovies}`}
                    className={({ isActive }) => (isActive ? s.activeTab : s.tab)}
                >
                    Upcoming Movies
                </NavLink>

                <NavLink
                    to={`${Path.Categories}/${Path.NowPlayingMovies}`}
                    className={({ isActive }) => (isActive ? s.activeTab : s.tab)}
                >
                    Now Playing Movies
                </NavLink>
            </nav>

            {/* Контентная область для списков фильмов */}
            <div className={s.content}>
                <Outlet />
            </div>
        </div>
    );
};
