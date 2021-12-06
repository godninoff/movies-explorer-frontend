import SearchForm from "../Movies/SearchForm/SearchFrom";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Movies/Preloader/Preloader";

const SavedMovies = (props) => {
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <SearchForm
        searchHandler={props.searchHandler}
        shortMoviesSwitcher={props.shortMoviesSwitcher}
        isShorted={props.isShorted}
        setInitFilter={props.setInitFilter}
      />
      {props.preloader && <Preloader />}
      <MoviesCardList
        resetFilters={props.resetFilters}
        movies={props.movies}
        onRemoveMovie={props.onRemoveMovie}
      />
      <Footer />
    </>
  );
};

export default SavedMovies;
