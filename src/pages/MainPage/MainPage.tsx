import s from "./MainPage.module.css";
import {useMainPage} from "./useMainPage";
import {MovieSearch} from "./MovieSearch";
import {PopularMoviesSection} from "@/pages/СategoriesPage/MoviesSection/containers/PopularMoviesSection.tsx";
import {TopRatedMovies} from "@/pages/СategoriesPage/MoviesSection/containers/TopRatedMovies.tsx";
import {UpcomingMovies} from "@/pages/СategoriesPage/MoviesSection/containers/UpcomingMovies.tsx";
import {NowPlayingMovies} from "@/pages/СategoriesPage/MoviesSection/containers/NowPlayingMovies.tsx";
import {MainPageSkeleton} from "@/common/components/MovieSkeleton/MainPageSkeleton.tsx";

export const MainPage = () => {
    const {randomMovie, imageUrl, searchQuery, setSearchQuery, handleSearch, isLoading} = useMainPage();

    if (isLoading || !randomMovie) {
        return <MainPageSkeleton />;
    }

    const heroStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%), url(${imageUrl})`
    };

    return (
        <>
            <div className={s.hero} style={heroStyle}>
                <MovieSearch
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSearch={handleSearch}
                />
                <h1 className={s.title}>{randomMovie.title}</h1>
            </div>
            <div className={s.layout}>
                <PopularMoviesSection title="Popular Movies"
                                      limit={6}
                                      showViewMore={true}
                />
                <TopRatedMovies title="Top Rated Movies"
                                limit={6}
                                showViewMore={true}
                />
                <UpcomingMovies title="Upcoming Movies"
                                limit={6}
                                showViewMore={true}
                />
                <NowPlayingMovies title="Now Playing Movies"
                                limit={6}
                                showViewMore={true}
                />
            </div>
        </>

    );
};