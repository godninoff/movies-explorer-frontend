import './FilterCheckbox.css';

const FilterCheckbox = () => {
    return (
        <label className="search__toggle-checkbox">   
            <input type="checkbox" className="checkbox" name="short" id="box" />
            Короткометражки 
        </label>    
    );
}

export default FilterCheckbox;