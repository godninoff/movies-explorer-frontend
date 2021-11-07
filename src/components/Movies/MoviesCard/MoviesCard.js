import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { MOVIES_ROUTE } from '../../../utils/consts';

const MoviesCard = (props) => {
    const location = useLocation();
    const [like, setLike] = React.useState(false);
    const likeStatus = () => setLike(!like);
    const likeSwitch = `movie__button ${like ? 'movie__button pushed' : 'movie__button'}`
    const buttonStatus = `movie__button ${location.pathname === MOVIES_ROUTE ? 'like' : 'remove'}`;
    
    return (
        <article className="movie">
            <img className="movie__image" src={props.card.image} alt={props.card.nameRu}/> 
            <div className="movie__container">
                <h2 className="movie__name">{props.card.nameRu}</h2>
                <button className={`${buttonStatus} ${likeSwitch}`} onClick={likeStatus} type="button"></button>
                <p className="movie__duration">{props.card.duration}</p>    
            </div>
        </article>
    );
}

export default MoviesCard;