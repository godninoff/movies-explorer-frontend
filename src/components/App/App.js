import React from "react";
import {
  Route,
  Switch,
  useHistory,
  Redirect,
  useLocation,
} from "react-router-dom";
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
  const [loggedIn, setLoggedIn] = React.useState(
    JSON.parse(localStorage.getItem("auth"))
  );
  const [currentUser, setCurrentUser] = React.useState({});
  const [preloader, setPreloader] = React.useState(false);

  // TODO вынести в отдельный сервис start
  // Операции с фильмами
  const defaultMoviesConfig = {
    all: [],
    toShow: [],
    isShort: false,
    searchTerm: ''
  };
  const [movies, setMovies] = React.useState(defaultMoviesConfig);
  const setAllMovies = (movies) => {
    setMovies((prevState => ({
      ...prevState,
      all: movies,
      toShow: movies
    })))
  };
  const setMoviesFilters = (searchTerm, isShort) => {
    switch (currenLocation.pathname.replace('/', '')) {
      case 'movies':
        setMovies((prevState => ({
          ...prevState,
          searchTerm,
          isShort,
          toShow: filterMovies(prevState.all, searchTerm, isShort)
        })))
        break;
      case 'saved-movies':
        setUserMovies((prevState => ({
          ...prevState,
          [currentUser._id]: {
            ...prevState[currentUser._id],
            searchTerm,
            isShort,
            toShow: filterMovies(prevState[currentUser._id].all, searchTerm, isShort)
          }
        })))
        break;
    }
  };

  // Операции с фильмами пользователя
  const [userMovies, setUserMovies] = React.useState({});
  const setCurrentUserMovies = (userId, userMovies) => {
    setUserMovies((prevState) => ({
      ...prevState,
      [userId]: {
        ...prevState[userId],
        all: userMovies,
        toShow: userMovies,
        searchTerm: '',
        isShort: false
      }
    }))
  };
  const addUserMovie = (movie) => {
    const userId = currentUser._id;
    const isMovieSaved = userMovies[userId].all.some(({id}) => id === movie.id);

    if (isMovieSaved) {
      console.error(`Id ${movie.id} уже есть в сохранённых фильмах`)
      return;
    }

    setUserMovies((prevState) => ({
      ...prevState,
      [userId]: {
        ...prevState[userId],
        all: [...prevState[userId].all, movie],
        toShow: [...prevState[userId].toShow, movie]
      }
    }))
  };
  const removeUserMovie = (movieId) => {
    const userId = currentUser._id;
    const isMovieSaved = userMovies[userId].all.some(({id}) => id === movieId);

    if (!isMovieSaved) {
      console.error(`Id ${movieId} не существует в сохранённых фильмах`)
      return;
    }

    setUserMovies((prevState) => {
      const all = prevState[userId].all.filter(({id}) => id !== movieId);

      return {
        ...prevState,
        [userId]: {
          ...prevState[userId],
          all,
          toShow: all
        }
      }
    })
  };
// TODO вынести в отдельный сервис end

  // =======================================
  //   USER & MOVIES PROMISES, CHECK TOKEN
  // =======================================

  const [movieSearchError, setMovieSearchError] = React.useState("");
  const currenLocation = useLocation();

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([
        mainApi.getUserInfo(),
        moviesApi.getMoviesInfo(),
        mainApi.getUserMovies(),
      ])
        .then(([user, movies, userMovies]) => {
          setCurrentUser(user);
          setAllMovies(movies)
          setCurrentUserMovies(user._id, userMovies)
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
        localStorage.setItem("user", JSON.stringify(currentUser));
        setLoggedIn(JSON.parse(localStorage.getItem("auth")));
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
  // eslint-disable-next-line no-unused-vars
  const [initFilter, setInitFilter] = React.useState(false);

  const saveMovie = (savedMovie) => {
    mainApi
      .createMovie(savedMovie)
      .then(() => {
        addUserMovie(savedMovie)
      })
      .catch((e) => console.error(e));
  };

  const movieRemove = (removedMovie) => {
    mainApi
      .deleteMovieById(removedMovie._id)
      .then(() => {
        removeUserMovie(removedMovie.id)
      })
      .catch((e) => console.log(e));
  };

  // =======================================
  //              SEARCH ACTIONS
  // =======================================

  const searchHandler = (searchTerm) => {
    switch (currenLocation.pathname.replace('/', '')) {
      case 'movies':
        setMoviesFilters(searchTerm, movies.isShort);
        break;
      case 'saved-movies':
        setMoviesFilters(searchTerm, userMovies[currentUser._id].isShort);
        break;
    }
  };

  const shortMoviesSwitcher = (isShorted) => {
    switch (currenLocation.pathname.replace('/', '')) {
      case 'movies':
        setMoviesFilters(movies.searchTerm, isShorted);
        break;
      case 'saved-movies':
        setMoviesFilters(userMovies[currentUser._id].searchTerm, isShorted);
        break;
    }
  };

  const filterMovies = (data, searchTerm, isShort) => {
    let _data = data.slice(0);
    if (isShort) {
      _data = _data.filter(({duration}) => duration <= SHORT_MOVIE_DURATION);
    }

    _data = _data.filter((item) => {
      return Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
    });

    console.log('Фильтры:', searchTerm, isShort, '\nРезультат:', _data)
    return _data;
  };
  const savedMovies =  currentUser && currentUser._id && userMovies[currentUser._id] ? userMovies[currentUser._id].toShow : [];
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path={LANDING_ROUTE}>
          <Main loggedIn={loggedIn} />
        </Route>
        <ProtectedRoute
          path={MOVIES_ROUTE}
          component={Movies}
          movies={movies.toShow}
          savedMovies={savedMovies}
          loggedIn={loggedIn}
          searchHandler={searchHandler}
          preloader={preloader}
          movieSearchError={movieSearchError}
          onSaveMovie={saveMovie}
          onRemoveMovie={movieRemove}
          shortMoviesSwitcher={shortMoviesSwitcher}
        />

        <ProtectedRoute
          path={SAVED_MOVIES_ROUTE}
          component={SavedMovies}
          movies={savedMovies}
          loggedIn={loggedIn}
          onRemoveMovie={movieRemove}
          searchHandler={searchHandler}
          shortMoviesSwitcher={shortMoviesSwitcher}
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
