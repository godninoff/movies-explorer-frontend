import React from "react";
import SearchForm from "../Movies/SearchForm/SearchFrom";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Movies/Preloader/Preloader";
import {CurrentUserContext} from "../../context/CurrentUserContext";

const SavedMovies = (props) => {
    const {userMoviesData} = React.useContext(CurrentUserContext);
    const [moviesData] = userMoviesData;
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <SearchForm
          searchTerm={moviesData.movies.searchTerm}
          isChecked={moviesData.movies.isShorted}
          searchHandler={props.searchHandler}
          shortMoviesSwitcher={props.shortMoviesSwitcher}
      />
      {props.preloader && <Preloader />}
      <MoviesCardList
        movies={moviesData.savedMovies.toShow}
        savedMovies={props.savedMovies}
        onRemoveMovie={props.onRemoveMovie}
      />
      <Footer />
    </>
  );
};

export default SavedMovies;
