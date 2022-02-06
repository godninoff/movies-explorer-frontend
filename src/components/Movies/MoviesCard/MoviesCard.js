import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import {
  API_PREFIX,
  MOVIES_ROUTE,
  SAVED_MOVIES_ROUTE,
} from "../../../utils/consts";
import { CurrentUserContext } from "../../../context/CurrentUserContext";

const MoviesCard = (props) => {
  const location = useLocation();

  const pushCardButton = (card) => {

    if (props.isSaved) {
      props.onRemoveMovie(card);
    } else {
      props.onSaveMovie(card);
    }
  };

// кнопка лайка карточки закрашена || не закрашена
  const likeSwitch = `movie__button ${
      props.isSaved ? "movie__button pushed" : "movie__button like"
  }`;

// по роуту saved, вместо кнопки лайка, крестик(удаление) карточки
  const buttonStatus = `movie__button ${
    location.pathname === SAVED_MOVIES_ROUTE ? "remove" : ""
  }`;

  // по роуту movies вызови условие переключения лайков || кнопка удаления
  const cardButtonAction = `movie__button ${
    location.pathname === MOVIES_ROUTE ? likeSwitch : buttonStatus
  }`;

// условие нужно для того, чтобы корректно отображать постер фильма на разных роутах.
// в movies он приходит, как image.url, а в карточках юзера, как image.
  const cardImage = `${API_PREFIX}${props.card.image.url}`;
  const savedMovie = location.pathname === MOVIES_ROUTE;
  const cardImagePrefix = savedMovie ? cardImage : props.card.image;

// формат времени короткометражек
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 60);
    const m = Math.floor(seconds % 60);
    return `${h === 0 ? "" : `${h}ч`} ${m}м`;
  };

  return (
    <article className="movie">
      <a
        className="movie__trailer"
        href={props.card.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie__image"
          src={cardImagePrefix}
          alt={props.card.nameRU}
        />
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
