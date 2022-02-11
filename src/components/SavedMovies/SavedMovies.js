import SearchForm from "../Movies/SearchForm/SearchFrom";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Movies/Preloader/Preloader";
import { SHORT_MOVIE_DURATION } from "../../utils/consts";
import React from "react";

const SavedMovies = (props) => {
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
      const shortedMoviesToShow = searchShort(props.savedMovies);
      if (shortedMoviesToShow.length !== 0) {
        setMoviesToShow(shortedMoviesToShow);
      } else {
        setMoviesToShow([]);
      }
    }
  }, [props.savedMovies, isShorted]);
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <SearchForm
        searchHandler={props.searchHandler}
        shortMoviesSwitcher={shortMoviesSwitcher}
      />
      {props.preloader && <Preloader />}
      <MoviesCardList
        movies={isShorted ? moviesToShow : props.savedMovies}
        onRemoveMovie={props.onRemoveMovie}
      />
      <Footer />
    </>
  );
};

export default SavedMovies;
