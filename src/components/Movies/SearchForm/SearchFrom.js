import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import useForm from "../../../utils/useForm";
import React from "react";

const SearchForm = (props) => {
  const { handleChange, errors, values } = useForm();
  const inputEl = React.useRef("");

  const search = (e) => {
    e.preventDefault();
    props.setInitFilter(true);
  };

  const handleTextInput = (e) => {
    props.searchHandler(e?.target?.value?.trim());
    handleChange(e);
  };

  return (
    <section className="search-form">
      <div className="search-form__main-container">
        <form className="search__form" name="movies-search" onSubmit={search}>
          <fieldset className="search__movie">
            <div className="search__movie-section">
              <input
                ref={inputEl}
                className="search__movie-input"
                required
                name="searchForm"
                type="text"
                placeholder="Фильм"
                id="searchForm"
                value={values.searchForm || props.storageSearchField || ""}
                onChange={(e) => handleTextInput(e)}
              />
              <button className="search__button" type="submit">
                Найти
              </button>
            </div>
            {errors.searchForm && <p>{errors.searchForm}</p>}
            <FilterCheckbox
              shortMoviesSwitcher={props.shortMoviesSwitcher}
              isShorted={props.isShorted}
            />
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default SearchForm;
