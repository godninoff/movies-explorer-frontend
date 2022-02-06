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
        searchTerm={props.searchTerm}
        shortMoviesSwitcher={props.shortMoviesSwitcher}
      />
      {props.preloader && <Preloader />}
      <MoviesCardList
        movies={props.movies}
        onRemoveMovie={props.onRemoveMovie}
      />
      <Footer />
    </>
  );
};

export default SavedMovies;
