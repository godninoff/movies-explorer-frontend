import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchFrom';

function Movies() {
    return (
        <main className="movies">
            <Header />
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </main>
    );
}

export default Movies;