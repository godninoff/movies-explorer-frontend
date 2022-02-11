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
  SUCCESS_MESSAGE,
} from "../../utils/consts";

const App = () => {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(
    JSON.parse(localStorage.getItem("auth"))
  );
  const [currentUser, setCurrentUser] = React.useState({});
  const [preloader, setPreloader] = React.useState(false);

  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [moviesToShow, setMoviesToShow] = React.useState([]);

  // =======================================
  //     GET: user, movieApi, userMovies
  // =======================================

  const [movieSearchError, setMovieSearchError] = React.useState("");

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getUserMovies()])
        .then(([user, userMovies]) => {
          setCurrentUser(user);
          setSavedMovies(userMovies);
          localStorage.setItem("userMovies", JSON.stringify(userMovies));
        })
        .catch((e) => {
          console.log(e);
          setMovieSearchError(e);
        });
    }
  }, [loggedIn]);

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
      .then(() => {
        localStorage.setItem("auth", true);
        setLoggedIn(JSON.parse(localStorage.getItem("auth")));
        // getLocalStorage();
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
        localStorage.setItem("auth", false);
        setLoggedIn(JSON.parse(localStorage.getItem("auth")));
        localStorage.clear();
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

  // const getCurrentMovies = (data) => {
  //   if (data) {
  //     setMovies(data);
  //   }
  // };

  // const getCurrentSearch = (searchTerm, moviesToShow, isShorted) => {
  //   if (searchTerm) {
  //     setSearchTerm(searchTerm);
  //     setMoviesToShow(moviesToShow);
  //     setIsShorted(isShorted);
  //   }
  // };

  // const getLocalStorage = () => {
  //   const currentMovies = JSON.parse(localStorage.getItem("moviesApi"));
  //   const moviesToShow = JSON.parse(localStorage.getItem("foundMovies"));
  //   const searchTerm = JSON.parse(localStorage.getItem("searchTerm"));
  //   const isShorted = JSON.parse(localStorage.getItem("isShorted"));

  //   getCurrentMovies(currentMovies);
  //   getCurrentSearch(searchTerm, moviesToShow, isShorted);
  // };

  const saveMovie = (savedMovie) => {
    Object.assign(savedMovie, { movieId: savedMovie.id });
    const movieId = savedMovies.find(
      (movie) => movie.movieId === savedMovie.id
    );
    if (movieId) {
      console.log("Данный фильм уже в Вашей коллекции!");
      return;
    }

    mainApi
      .createMovie(savedMovie)
      .then((res) => {
        const userMovies = [...savedMovies, res];
        localStorage.setItem("userMovies", JSON.stringify(userMovies));
        setSavedMovies([...savedMovies, res]);
      })
      .catch((e) => console.log(e));
  };

  const movieRemove = (removedMovie) => {
    mainApi
      .deleteMovieById(removedMovie)
      .then(() => {
        const userMovies = savedMovies.filter(
          (m) => m.movieId !== removedMovie
        );
        localStorage.setItem("userMovies", JSON.stringify(userMovies));
        setSavedMovies(userMovies);
      })
      .catch((e) => console.log(e));
  };

  // =======================================
  //              SEARCH ACTIONS
  // =======================================

  const filterMovies = (data, searchTerm) => {
    return data.filter((item) => {
      return Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  };

  const searchSavedMovies = (searchTerm) => {
    const isSaved = JSON.parse(localStorage.getItem("userMovies"));
    const savedMoviesToShow = filterMovies(isSaved, searchTerm);

    if (savedMoviesToShow.length !== 0) {
      setSavedMovies(savedMoviesToShow);
    } else {
      setSavedMovies([]);
    }
  };

  const searchHandler = (searchTerm) => {
    const searchQuery = (query) => {
      const moviesToShow = filterMovies(query, searchTerm);
      if (moviesToShow.length !== 0) {
        localStorage.setItem("foundMovies", JSON.stringify(moviesToShow));
        setMovies(JSON.parse(localStorage.getItem("foundMovies")));
      } else {
        setMovies([]);
      }
    };

    if (moviesToShow.length === 0) {
      moviesApi
        .getMoviesApi()
        .then((cards) => {
          setMoviesToShow(cards);
          searchQuery(cards);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      searchQuery(moviesToShow);
    }
  };

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
          movies={movies}
          savedMovies={savedMovies}
          searchHandler={searchHandler}
          preloader={preloader}
          movieSearchError={movieSearchError}
          onSaveMovie={saveMovie}
          onRemoveMovie={movieRemove}
        />

        <ProtectedRoute
          path={SAVED_MOVIES_ROUTE}
          component={SavedMovies}
          loggedIn={loggedIn}
          savedMovies={savedMovies}
          onRemoveMovie={movieRemove}
          searchHandler={searchSavedMovies}
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
