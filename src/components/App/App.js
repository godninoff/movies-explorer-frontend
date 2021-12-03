import React from "react";
import { Route, Switch, useHistory, Redirect, useLocation } from "react-router-dom";
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

  const [moviesData, setMoviesData] = React.useState({
    moviesToShow: [],
    savedMoviesToShow: [],
    movies: [],
    savedMovies: [],
    searchTerm: '',
    isShorted: false
  });

  // =======================================
  //   USER & MOVIES PROMISES, CHECK TOKEN
  // =======================================

  const [movieSearchError, setMovieSearchError] = React.useState('');
  const currenLocation = useLocation();

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), moviesApi.getMoviesInfo()])
        .then(([user, movies]) => {
          setCurrentUser(user);
          const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
          setMoviesData(prevState => ({...prevState, movies, savedMovies, savedMoviesToShow: savedMovies}));
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

  const saveMovie = (savedMovie) => {
    Object.assign(savedMovie, { movieId: savedMovie.id });
    let savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
    const updatedMovies = [...savedMovies, savedMovie];
    localStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
    setMoviesData({...moviesData, savedMovies: updatedMovies, savedMoviesToShow: updatedMovies})
    mainApi
      .createMovie(savedMovie)
      .then(() => {
        // Save movie to BD
      })
      .catch((e) => console.log(e));
  };

  const movieRemove = (removedMovie) => {
    let savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
    savedMovies = savedMovies.filter((c) => c.id !== removedMovie.id);
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
    setMoviesData({...moviesData, savedMovies, savedMoviesToShow: savedMovies})
    mainApi
      .deleteMovieById(removedMovie.id)
      .then(() => {
        // Remove movie from BD
      })
      .catch((e) => console.log(e));
  };

  // =======================================
  //              SEARCH ACTIONS
  // =======================================

  const searchHandler = (searchTerm) => {
    setMoviesData(prevState => ({...prevState, searchTerm}));
  };

  const shortMoviesSwitcher = () => {
    setMoviesData(prevState => ({...prevState, isShorted: !moviesData.isShorted}));

  };

  const filterMovies = (data, searchTerm) => {
    return  data.filter((item) => {
      return Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
    });
  };

  React.useEffect(() => {
    setPreloader(true);
    switch (currenLocation.pathname) {
      case MOVIES_ROUTE:
        if (moviesData.searchTerm) {
          setMoviesData(prevState => {
            return {
              ...prevState,
              moviesToShow: filterMovies(prevState.movies, prevState.searchTerm)
            };
          });
        }
        if (moviesData.isShorted && moviesData.searchTerm) {
          setMoviesData(prevState => {
            return {
              ...prevState,
              moviesToShow: prevState.moviesToShow.filter(({duration}) => duration <= SHORT_MOVIE_DURATION)
            };
          });
        }
        break;
      case SAVED_MOVIES_ROUTE:
        if (moviesData.searchTerm) {
          setMoviesData(prevState => {
            return {
              ...prevState,
              savedMoviesToShow: filterMovies(prevState.savedMovies, prevState.searchTerm)
            };
          });
        }

        if (moviesData.isShorted) {
          setMoviesData(prevState => {
            return {
              ...prevState,
              savedMoviesToShow: prevState.savedMovies.filter(({duration}) => moviesData.isShorted && duration <= SHORT_MOVIE_DURATION)
            };
          });
        } else if (!moviesData.isShorted && !moviesData.searchTerm) {
          setMoviesData(prevState => {
            return {
              ...prevState,
              savedMoviesToShow: prevState.savedMovies
            };
          });
        }
        break;
    }
    setPreloader(false);
  }, [moviesData.searchTerm, moviesData.isShorted]);

  const resetFilters = () => {
    setMoviesData({...moviesData, moviesToShow: [], isShorted: false, searchTerm: ''});
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
          movies={moviesData.moviesToShow}
          searchTerm={moviesData.searchTerm}
          searchHandler={searchHandler}
          preloader={preloader}
          shortMoviesSwitcher={shortMoviesSwitcher}
          isShorted={moviesData.isShorted}
          movieSearchError={movieSearchError}
          onSaveMovie={saveMovie}
          onRemoveMovie={movieRemove}
          resetFilters={resetFilters}
        />

        <ProtectedRoute
          path={SAVED_MOVIES_ROUTE}
          component={SavedMovies}
          loggedIn={loggedIn}
          movies={moviesData.savedMoviesToShow}
          onRemoveMovie={movieRemove}
          searchHandler={searchHandler}
          shortMoviesSwitcher={shortMoviesSwitcher}
          isShorted={moviesData.isShorted}
          preloader={preloader}
          resetFilters={resetFilters}
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
