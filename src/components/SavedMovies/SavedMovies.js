import SearchForm from "../Movies/SearchForm/SearchFrom";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Movies/Preloader/Preloader";

const SavedMovies = (props) => {
  const storageSearchField = JSON.parse(
    localStorage.getItem("searchSavedMovies")
  );

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <SearchForm
        searchHandler={props.searchHandler}
        searchTerm={props.searchTerm}
        shortMoviesSwitcher={props.shortMoviesSwitcher}
        isShorted={props.isShorted}
        setInitFilter={props.setInitFilter}
        storageSearchField={storageSearchField}
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
