import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import useForm from '../../../utils/useForm';

const SearchForm = (props) => {
    const {handleChange, values, errors} = useForm();

    const handleSubmit = e => {
        e.preventDefault();
        props.onSubmit(values.searchForm);
    }

    return (
        <section className="search-form">
            <div className="search-form__main-container">
            <form className="search__form" name="movies-search" onSubmit={handleSubmit}>
                <fieldset className="search__movie">
                    <div className="search__movie-section">
                        <input 
                            className="search__movie-input" 
                            required 
                            name="searchForm" 
                            type="text" 
                            placeholder="Фильм" 
                            id="searchForm"
                            value={values.searchForm || ''}
                            onChange={handleChange}
                        />
                        <button className="search__button" type="submit">Найти</button>
                    </div>
                    {errors.searchForm && <p>{errors.searchForm}</p>}
                    <FilterCheckbox />
                </fieldset>
            </form>
            </div>
        </section>
    );
}

export default SearchForm;