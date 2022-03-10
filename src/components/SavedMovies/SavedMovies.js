import SearchForm from "../Movies/SearchForm/SearchFrom";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Movies/Preloader/Preloader";
import { SHORT_MOVIE_DURATION } from "../../utils/consts";
import React from "react";

const SavedMovies = (props) => {
  const [isShorted, setIsShorted] = React.useState(
    JSON.parse(localStorage.getItem("checkboxSavedMovies"))
  );
  const [moviesToShow, setMoviesToShow] = React.useState([]);
  const movieSearch = JSON.parse(localStorage.getItem("savedMovieSearch"));

  const searchShort = (movies) => {
    return movies.filter(({ duration }) => duration <= SHORT_MOVIE_DURATION);
  };

  const shortMoviesSwitcher = () => {
    setIsShorted(!isShorted);
    localStorage.setItem("checkboxSavedMovies", JSON.stringify(!isShorted));
  };

  React.useEffect(() => {
    if (isShorted) {
      if (movieSearch) {
        setMoviesToShow(searchShort(props.savedMoviesToShow));
      } else {
        setMoviesToShow(searchShort(props.savedMovies));
      }
    } else {
      if (movieSearch) {
        setMoviesToShow(props.savedMoviesToShow);
      } else {
        setMoviesToShow(props.savedMovies);
      }
    }
  }, [isShorted, movieSearch, props.savedMovies, props.savedMoviesToShow]);

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <SearchForm
        searchHandler={props.searchHandler}
        shortMoviesSwitcher={shortMoviesSwitcher}
        isShorted={isShorted}
        movieSearch={movieSearch}
      />
      {props.preloader && <Preloader />}
      <MoviesCardList
        movies={moviesToShow}
        onRemoveMovie={props.onRemoveMovie}
        movieSearchError={props.movieSearchError}
      />
      <Footer />
    </>
  );
};

export default SavedMovies;
