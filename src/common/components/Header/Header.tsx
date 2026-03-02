import {Link, NavLink} from 'react-router'
import s from './Header.module.css'
import {Path} from "@/app/routing/config/Path.ts";
import {useDispatch, useSelector} from "react-redux";
import {changeThemeModeAC, selectThemeMode} from "@/app/modal/app-slice.ts";
import {Box, Switch} from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';

const navItems = [
    { to: Path.Main, label: 'Home' },
    { to: Path.Categories, label: 'Category Movies' },
    { to: Path.FilteredMovies, label: 'Filtered Movies' },
    { to: Path.Search, label: 'Search' },
    { to: Path.Favorites, label: 'Favorites' },
];

export const Header = () => {
    const dispatch = useDispatch()
    const themeMode = useSelector(selectThemeMode)

    const toggleTheme = () => {
        const nextTheme = themeMode === 'light' ? 'dark' : 'light'
        dispatch(changeThemeModeAC({ themeMode: nextTheme }))
    }
    const themeClass = themeMode === 'dark' ? s.dark : s.light;
    return (
        <header className={`${s.container} ${themeClass}`}>
            <Link to={Path.Main} className={s.logo}>
                <img src="/logo.svg" alt="Movies App" />
            </Link>

            <nav>
                <ul className={s.list}>
                    {navItems.map(item => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    `${s.link} ${isActive ? s.activeLink : ''}`
                                }
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {themeMode === 'light' ? (
                    <LightMode fontSize="small" sx={{ color: '#ffb300' }} />
                ) : (
                    <DarkMode fontSize="small" sx={{ color: '#f5f5f5' }} />
                )}
                <Switch checked={themeMode === "dark"} onChange={toggleTheme} />
            </Box>
        </header>
    )
}
