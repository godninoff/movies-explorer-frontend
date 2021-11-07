import './MoviesCardList.css';
import getInitialCards from '../../../utils/initialCards';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import { SAVED_MOVIES_ROUTE } from '../../../utils/consts';

const MoviesCardList = () => {

    const location = useLocation();

    return (
        <section className="movies-cards">
            <ul className="movies-card-list">
                {getInitialCards.map((card, num) =>
                <MoviesCard card={card} key={num} />)}
            </ul>     
            <button className={`movie__bottom-button ${location.pathname === SAVED_MOVIES_ROUTE ? "movie__bottom-button display-none" : ''}`}>Ещё</button>  
        </section>      
    );
    }

export default MoviesCardList;