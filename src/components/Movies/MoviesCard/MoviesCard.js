import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import {
  API_PREFIX,
  MOVIES_ROUTE,
  SAVED_MOVIES_ROUTE,
} from "../../../utils/consts";

const MoviesCard = (props) => {
  const location = useLocation();

  const userMovies = JSON.parse(localStorage.getItem("userMovies")).find(
    (item) => item.nameRU === props.card.nameRU
  );

  const isSaved = (movie) => {
    if (movie === undefined) {
      return false;
    } else {
      return true;
    }
  };
  const [like, setLike] = React.useState(isSaved(userMovies));

  const likeHandler = () => {
    if (location.pathname === SAVED_MOVIES_ROUTE) {
      props.onRemoveMovie(props.card._id);
    } else if (!like) {
      props.onSaveMovie(props.card);
      setLike(true);
    } else {
      props.onRemoveMovie(userMovies._id);
      setLike(false);
    }
  };

  // кнопка лайка карточки закрашена || не закрашена
  const handleLikeButton = `movie__button ${
    like ? "movie__button pushed" : "movie__button like"
  }`;

  // по роуту saved, вместо кнопки лайка, крестик(удаление) карточки
  const removeLike = `movie__button ${
    location.pathname === SAVED_MOVIES_ROUTE ? "remove" : ""
  }`;

  // по роуту movies вызови условие переключения лайков || кнопка удаления
  const cardButtonAction = `movie__button ${
    location.pathname === MOVIES_ROUTE ? handleLikeButton : removeLike
  }`;

  // условие нужно для того, чтобы корректно отображать постер фильма на разных роутах.
  // в movies он приходит, как image.url, а в карточках юзера, как image.
  const cardImage = `${API_PREFIX}${props.card.image.url}`;
  const moviesRoute = location.pathname === MOVIES_ROUTE;
  const cardImagePrefix = moviesRoute ? cardImage : props.card.image;

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
        href={props.card.trailerLink || props.card.trailer}
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
          onClick={likeHandler}
          type="button"
        ></button>
        <p className="movie__duration">{formatTime(props.card.duration)}</p>
      </div>
    </article>
  );
};

export default MoviesCard;
