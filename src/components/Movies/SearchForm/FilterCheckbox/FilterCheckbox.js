import "./FilterCheckbox.css";

const FilterCheckbox = (props) => {
  return (
    <label className="search__toggle-checkbox">
      <input
        type="checkbox"
        className="checkbox"
        name="short"
        id="box"
        onChange={props.shortMoviesSwitcher}
      />
      Короткометражки
    </label>
  );
};

export default FilterCheckbox;
