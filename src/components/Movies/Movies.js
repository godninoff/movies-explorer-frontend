import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchFrom";
import React from "react";
import Preloader from "./Preloader/Preloader";

const Movies = (props) => {
  return (
    <main className="movies">
      <Header loggedIn={props.loggedIn} />
      <SearchForm
        isShorted={props.isShorted}
        searchTerm={props.searchTerm}
        searchHandler={props.searchHandler}
        shortMoviesSwitcher={props.shortMoviesSwitcher}
        setInitFilter={props.setInitFilter}
      />
      {props.preloader && <Preloader />}
      <MoviesCardList
        resetFilters={props.resetFilters}
        movies={props.movies}
        onSaveMovie={props.onSaveMovie}
        onRemoveMovie={props.onRemoveMovie}
        movieSearchError={props.movieSearchError}
      />
      <Footer />
    </main>
  );
};

export default Movies;
