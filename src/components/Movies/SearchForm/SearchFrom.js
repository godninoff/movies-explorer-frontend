import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import useForm from "../../../utils/useForm";
import React from "react";

const SearchForm = (props) => {
  const [text, setText] = React.useState(props.searchTerm);
  const { handleChange, errors } = useForm();

  const search = (e) => {
    e.preventDefault();
    props.searchHandler(text);
  };

  const onTextInput = (e) => {
    handleChange(e);
    setText(e.target.value)
  };

  return (
    <section className="search-form">
      <div className="search-form__main-container">
        <form className="search__form" name="movies-search" onSubmit={search}>
          <fieldset className="search__movie">
            <div className="search__movie-section">
              <input
                className="search__movie-input"
                required
                name="searchForm"
                type="text"
                placeholder="Фильм"
                id="searchForm"
                value={text}
                onChange={(e) => onTextInput(e)}
              />
              <button className="search__button" type="submit">
                Найти
              </button>
            </div>
            {errors.searchForm && <p>{errors.searchForm}</p>}
            <FilterCheckbox
                isChecked={props.isChecked}
                shortMoviesSwitcher={props.shortMoviesSwitcher} />
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default SearchForm;
