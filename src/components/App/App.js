import React from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Error from "../Error/Error";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { mainApi } from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { moviesApi } from "../../utils/MoviesApi.js";
import auth from "../../utils/auth";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import {
  LANDING_ROUTE,
  LOGIN_ROUTE,
  MOVIES_ROUTE,
  NOTFOUND_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  SAVED_MOVIES_ROUTE,
  SHORT_MOVIE_DURATION,
  SUCCESS_MESSAGE,
} from "../../utils/consts";

const App = () => {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [preloader, setPreloader] = React.useState(false);

  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);

  // =======================================
  //   USER & MOVIES PROMISES, CHECK TOKEN
  // =======================================

  const [movieSearchError, setMovieSearchError] = React.useState('');

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), moviesApi.getMoviesInfo()])
        .then(([user, movies]) => {
          setCurrentUser(user);
          setMovies(movies);

          let allCards = JSON.parse(localStorage.getItem("savedMovies")) || [];

          setSavedMovies(allCards);
        })
        .catch((e) => {
          console.log(e);
          setMovieSearchError(e);
        });
    }
  }, [loggedIn]);

  const checkToken = React.useCallback(() => {
    mainApi
      .getUserInfo()
      .then((data) => {
        if (data) {
          setLoggedIn(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  React.useEffect(() => {
    checkToken();
  }, [checkToken]);

  // =======================================
  //              USER ACTIONS
  // =======================================

  const [updateProfilelMessage, setUpdateProfileMessage] = React.useState({
    message: "",
    type: "",
  });
  const [serverResponseError, setServerResponseError] = React.useState("");

  const onLogin = (email, password) => {
    setPreloader(true);
    auth
      .login(email, password)
      .then((data) => {
        checkToken();
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);

        setPreloader(false);
        history.push(MOVIES_ROUTE);
      })
      .catch((e) => {
        setPreloader(false);
        setServerResponseError(e.message);
      });
  };

  const onRegister = (email, password, name) => {
    setPreloader(true);
    auth
      .register(email, password, name)
      .then(() => {
        setPreloader(false);
        onLogin(email, password, name);
      })
      .catch((e) => {
        setPreloader(false);
        setServerResponseError(e.message);
      });
  };

  const onSignout = () => {
    auth
      .logout()
      .then(() => {
        localStorage.clear();
        setLoggedIn(false);
        setCurrentUser({ name: "", email: "" });
        history.push(LANDING_ROUTE);
      })
      .catch((e) => console.log(e));
  };

  const updateProfile = (name, email) => {
    setPreloader(true);
    mainApi
      .updateUser(name, email)
      .then((data) => {
        setUpdateProfileMessage({
          message: SUCCESS_MESSAGE,
          type: "success",
        });
        setCurrentUser(data);
        setPreloader(false);
      })
      .catch((e) => {
        setPreloader(false);

        console.log(e.message);
        setUpdateProfileMessage({
          message: e.message,
          type: "error",
        });
      });
  };

  // =======================================
  //              MOVIES ACTIONS
  // =======================================

  const saveMovie = (card) => {
    Object.assign(card, { movieId: card.id });
    let allCards = JSON.parse(localStorage.getItem("savedMovies")) || [];
    localStorage.setItem("savedMovies", JSON.stringify([...allCards, card]));
    mainApi
      .createMovie(card)
      .then(() => {
        setSavedMovies(allCards);
      })
      .catch((e) => console.log(e));
  };

  const movieRemove = (card) => {
    let allCards = JSON.parse(localStorage.getItem("savedMovies")) || [];
    allCards = allCards.filter((c) => c.id !== card.id);
    localStorage.setItem("savedMovies", JSON.stringify(allCards));
    mainApi
      .deleteMovieById(card.id)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c.id !== card.id));
      })
      .catch((e) => console.log(e));
  };

  // =======================================
  //              SEARCH ACTIONS
  // =======================================

  const [moviesToShow, setMoviesToShow] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isShorted, setIsShorted] = React.useState(false);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const shortMoviesSwitcher = () => {
    setIsShorted(!isShorted);
  };

  const filterData = (cards = [], isShorted, searchTerm) => {
    let result = cards;
    if (isShorted) {
      result = result.filter(
        ({ duration }) => duration <= SHORT_MOVIE_DURATION
      );
    }
    if (searchTerm !== "") {
      result = result.filter((card) => {
        return Object.values(card)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
    }
    if (!isShorted && !searchTerm) {
      return [];
    } 
    return result;
  };

  React.useEffect(() => {
    setPreloader(true);

    
    const filteredCards = filterData(movies, isShorted, searchTerm);
    setMoviesToShow(filteredCards);
    setPreloader(false);
  }, [setMoviesToShow, movies, isShorted, searchTerm]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path={LANDING_ROUTE}>
          <Main loggedIn={loggedIn} />
        </Route>
        <ProtectedRoute
          path={MOVIES_ROUTE}
          component={Movies}
          loggedIn={loggedIn}
          movies={moviesToShow}
          savedMovies={savedMovies}
          searchTerm={searchTerm}
          searchHandler={searchHandler}
          preloader={preloader}
          shortMoviesSwitcher={shortMoviesSwitcher}
          isShorted={isShorted}
          movieSearchError={movieSearchError}
          onSaveMovie={saveMovie}
          onRemoveMovie={movieRemove}
        />

        <ProtectedRoute
          path={SAVED_MOVIES_ROUTE}
          component={SavedMovies}
          loggedIn={loggedIn}
          movies={moviesToShow}
          onRemoveMovie={movieRemove}
          savedMovies={savedMovies}
          searchHandler={searchHandler}
          shortMoviesSwitcher={shortMoviesSwitcher}
          isShorted={isShorted}
          preloader={preloader}
        />

        <ProtectedRoute
          path={PROFILE_ROUTE}
          component={Profile}
          loggedIn={loggedIn}
          preloader={preloader}
          updateProfile={updateProfile}
          onSignout={onSignout}
          onResponseError={serverResponseError}
          updateProfilelMessage={updateProfilelMessage}
        />
        <Route path={REGISTRATION_ROUTE}>
          {!loggedIn ? (
            <Register
              onRegister={onRegister}
              onResponseError={serverResponseError}
              preloader={preloader}
            />
          ) : (
            <Redirect to={LANDING_ROUTE} />
          )}
        </Route>
        <Route path={LOGIN_ROUTE}>
          {!loggedIn ? (
            <Login
              onLogin={onLogin}
              onResponseError={serverResponseError}
              preloader={preloader}
            />
          ) : (
            <Redirect to={LANDING_ROUTE} />
          )}
        </Route>
        <Route path={NOTFOUND_ROUTE}>
          <Error />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
};

export default App;
