import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
    return (
        <section className="search-form">
            <div className="search-form__main-container">
            <form className="search__form" name="movies-search">
                <fieldset className="search__movie">
                    <div className="search__movie-section">
                        <input className="serch__movie-input" required name="movie" type="text" placeholder="Фильм" />
                        <button className="search__button" type="submit">Найти</button>
                    </div>
                    <FilterCheckbox />
                </fieldset>
            </form>
            </div>
        </section>
    );
}

export default SearchForm;