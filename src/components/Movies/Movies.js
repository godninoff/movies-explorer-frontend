import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchFrom';

function Movies(props) {
    return (
        <main className="movies">
            <Header loggedIn={props.loggedIn} />
            <SearchForm />
            <MoviesCardList 
                movies={props.movies}
            />
            <Footer />
        </main>
    );
}

export default Movies;