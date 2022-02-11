import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchFrom";
import React from "react";
import Preloader from "./Preloader/Preloader";
import { SHORT_MOVIE_DURATION } from "../../utils/consts";

const Movies = (props) => {
  const [isShorted, setIsShorted] = React.useState(false);
  const [moviesToShow, setMoviesToShow] = React.useState([]);

  const searchShort = (movies) => {
    return movies.filter(({ duration }) => duration <= SHORT_MOVIE_DURATION);
  };

  const shortMoviesSwitcher = () => {
    setIsShorted(!isShorted);
  };

  React.useEffect(() => {
    if (isShorted) {
      const shortedMoviesToShow = searchShort(props.movies);
      if (shortedMoviesToShow.length !== 0) {
        setMoviesToShow(shortedMoviesToShow);
      } else {
        setMoviesToShow([]);
      }
    }
  }, [props.movies, isShorted]);

  return (
    <main className="movies">
      <Header loggedIn={props.loggedIn} />
      <SearchForm
        searchHandler={props.searchHandler}
        shortMoviesSwitcher={shortMoviesSwitcher}
      />
      {props.preloader && <Preloader />}
      <MoviesCardList
        movies={isShorted ? moviesToShow : props.movies}
        onSaveMovie={props.onSaveMovie}
        onRemoveMovie={props.onRemoveMovie}
        movieSearchError={props.movieSearchError}
      />
      <Footer />
    </main>
  );
};

export default Movies;
