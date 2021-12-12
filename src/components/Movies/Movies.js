import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchFrom";
import React from "react";
import Preloader from "./Preloader/Preloader";
import {CurrentUserContext} from "../../context/CurrentUserContext";

const Movies = (props) => {
    const {userMoviesData} = React.useContext(CurrentUserContext);
    const [moviesData] = userMoviesData;
  return (
    <main className="movies">
      <Header loggedIn={props.loggedIn} />
      <SearchForm
        searchTerm={moviesData.movies.searchTerm}
        isChecked={moviesData.movies.isShorted}
        searchHandler={props.searchHandler}
        shortMoviesSwitcher={props.shortMoviesSwitcher}
      />
      {props.preloader && <Preloader />}
      <MoviesCardList
        movies={moviesData.movies.toShow}
        onSaveMovie={props.onSaveMovie}
        onRemoveMovie={props.onRemoveMovie}
        movieSearchError={props.movieSearchError}
      />
      <Footer />
    </main>
  );
};

export default Movies;
