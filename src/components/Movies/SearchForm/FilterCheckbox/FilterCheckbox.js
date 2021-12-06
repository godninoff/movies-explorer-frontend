import "./FilterCheckbox.css";

const FilterCheckbox = (props) => {
  return (
    <label className="search__toggle-checkbox">
      <input
        type="checkbox"
        className="checkbox"
        name="short"
        checked={props.isShorted}
        id="box"
        onChange={(e) => props.shortMoviesSwitcher(e.target.checked)}
      />
      Короткометражки
    </label>
  );
};

export default FilterCheckbox;
