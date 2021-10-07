import React from 'react';
import './MoviesCard.css';

function MoviesCard(props) {
    return (
        <article className="movie">
            <img className="movie__image" src={props.card.image} alt={props.card.nameRu}/> 
            <div className="movie__container">
                <h2 className="movie__name">{props.card.nameRu}</h2>
                <button className="movie__like" type="button"></button>
                <p className="movie__duration">{props.card.duration}</p>    
            </div>
        </article>
    );
}

export default MoviesCard;