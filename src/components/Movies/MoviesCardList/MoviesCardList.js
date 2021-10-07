import './MoviesCardList.css';
import getInitialCards from '../../../utils/initialCards';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList() {

    const location = useLocation();

    return (
        <section className="movies-cards">
            <ul className="movies-card-list">
                {getInitialCards.map((card, num) =>
                <MoviesCard card={card} key={num} />)}
            </ul>     
            <button className={`movie__bottom-button ${location.pathname === '/saved-movies' ? "movie__bottom-button display-none" : ''}`}>Ещё</button>  
        </section>      
    );
    }

export default MoviesCardList;