import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { MOVIES_ROUTE, SAVED_MOVIES_ROUTE } from "../../../utils/consts";

const MoviesCard = (props) => {
  const location = useLocation();
  let savedCards = JSON.parse(localStorage.getItem("savedMovies")) || [];

  const [like, setLike] = React.useState(
    savedCards.some((c) => c.id === props.card.id)
  );

  const likeStatus = () => setLike(!like);

  const likeSwitch = `movie__button ${
    like ? "movie__button pushed" : "movie__button like"
  }`;

  const buttonStatus = `movie__button ${
    location.pathname === SAVED_MOVIES_ROUTE ? "remove" : ""
  }`;

  const cardButtonAction = `movie__button ${
    location.pathname === MOVIES_ROUTE ? likeSwitch : buttonStatus
  }`;

  const cardImage = `https://api.nomoreparties.co${props.card.image.url}`;

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 60);
    const m = Math.floor(seconds % 60);
    return `${h === 0 ? "" : `${h}ч`} ${m}м`;
  };

  const pushCardButton = (card) => {
    let allCards = JSON.parse(localStorage.getItem("savedMovies")) || [];
    const isLiked = allCards.some((c) => c.id === card.id);
    likeStatus();
    if (isLiked) {
      props.onRemoveMovie(card);
    } else {
      props.onSaveMovie(card);
    }
  };

  return (
    <article className="movie">
      <a
        className="movie__trailer"
        href={props.card.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img className="movie__image" src={cardImage} alt={props.card.nameRU} />
      </a>
      <div className="movie__container">
        <h2 className="movie__name">{props.card.nameRU}</h2>
        <button
          className={cardButtonAction}
          onClick={() => pushCardButton(props.card)}
          type="button"
        ></button>
        <p className="movie__duration">{formatTime(props.card.duration)}</p>
      </div>
    </article>
  );
};

export default MoviesCard;
