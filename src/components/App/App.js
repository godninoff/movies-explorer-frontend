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
  const location = useLocation();
  const [loggedIn, setLoggedIn] = React.useState(
    JSON.parse(localStorage.getItem("auth"))
  );
  const [currentUser, setCurrentUser] = React.useState({});
  const [preloader, setPreloader] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = React.useState("");

  // =======================================
  //   USER & MOVIES PROMISES, CHECK TOKEN
  // =======================================

  const [movieSearchError, setMovieSearchError] = React.useState("");

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), moviesApi.getMoviesInfo()])
        .then(([user, movies]) => {
          setCurrentUser(user);
          setMoviesData(prevState => ({
            ...prevState,
            movies: {
              ...prevState.movies,
              total: movies
            }
          }));
        })
        .catch((e) => {
          console.log(e);
          setMovieSearchError(e);
        });
    }
  }, [loggedIn]);

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .getUserInfo(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser({ name: res.name, email: res.email });
            setToken(localStorage.getItem("jwt"));
            localStorage.setItem("auth", true);
            setLoggedIn(JSON.parse(localStorage.getItem("auth")));
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  React.useEffect(() => {
    checkToken();
  }, []);

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
    localStorage.setItem("auth", false);
    setLoggedIn(JSON.parse(localStorage.getItem("auth")));
    localStorage.clear();
    history.push(LANDING_ROUTE);
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
    console.log(card)
    mainApi
      .createMovie(card)
      .then(() => {
        // setSavedMovies
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
        // deleteMovie from saved
      })
      .catch((e) => console.log(e));
  };

  // =======================================
  //              SEARCH ACTIONS
  // =======================================

  const moviesDataFromLocalStorage = localStorage.getItem("moviesData");
  const defaultMoviesData = {
    movies: {
      total: [],
      toShow: [],
      isShorted: false,
      searchTerm: ""
    },
    savedMovies: {
      total: [],
      toShow: [],
      isShorted: false,
      searchTerm: ""
    }
  };
  const [moviesData, setMoviesData] = React.useState(moviesDataFromLocalStorage ? JSON.parse(moviesDataFromLocalStorage) : defaultMoviesData);

  const getCurrentRouteName = () => {
    const routeNames = {
      [MOVIES_ROUTE]: "movies",
      [SAVED_MOVIES_ROUTE]: "savedMovies"
    };

    return routeNames[location.pathname];
  };
  const filterMovies = (isShorted, searchTerm, moviesToFilter) => {
    let result = moviesToFilter;

    if (searchTerm) {
      result = result.filter((movie) => {
        return (
            Object.values(movie)
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
      })
    }

    if (isShorted) {
      result = result.filter(({duration}) => duration <= SHORT_MOVIE_DURATION);
    }

    return result;
  };
  const searchHandler = (searchTerm) => {
    const currentRoute = getCurrentRouteName();

    setMoviesData(prevState => ({
      ...prevState,
      [currentRoute]: {
        ...prevState[currentRoute],
        toShow: filterMovies(prevState[currentRoute].isShorted, searchTerm, prevState[currentRoute].total),
        searchTerm
      }
    }));
  };
  const shortMoviesSwitcher = (isShorted) => {
    const currentRoute = getCurrentRouteName();

    setMoviesData(prevState => ({
      ...prevState,
      [currentRoute]: {
        ...prevState[currentRoute],
        toShow: filterMovies(isShorted, prevState[currentRoute].searchTerm, prevState[currentRoute].total),
        isShorted
      }
    }));
  };

  React.useEffect(() => {
    localStorage.setItem("moviesData", JSON.stringify(moviesData))
  })

  return (
    <CurrentUserContext.Provider
        value={{
          currentUserData: [currentUser, setCurrentUser],
          userMoviesData: [moviesData, setMoviesData]
        }}
        moviesData={moviesData}>
      <Switch>
        <Route exact path={LANDING_ROUTE}>
          <Main loggedIn={loggedIn} />
        </Route>
        <ProtectedRoute
          path={MOVIES_ROUTE}
          component={Movies}
          loggedIn={loggedIn}
          searchHandler={searchHandler}
          preloader={preloader}
          shortMoviesSwitcher={shortMoviesSwitcher}
          movieSearchError={movieSearchError}
          onSaveMovie={saveMovie}
          onRemoveMovie={movieRemove}
        />

        <ProtectedRoute
          path={SAVED_MOVIES_ROUTE}
          component={SavedMovies}
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
