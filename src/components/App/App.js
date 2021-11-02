import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Error from "../Error/Error";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { mainApi } from "../../utils/MainApi";
// import { moviesApi } from "../../utils/MoviesApi.js";
import auth from "../../utils/auth";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import {LANDING_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts"

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  // const [savedMovies, setSavedMovies] = React.useState([]);
  // const [savedMoviesId, setSavedMoviesId] = React.useState([]);
  const [preloader, setPreloader] = React.useState(false);
  const history = useHistory();

  const [token, setToken] = React.useState("");
  const [updateRes, setUpdateRes] = React.useState(true);
  const [registerServerResponse, setRegisterLoginServerResponse] =
    React.useState("");

  React.useEffect(() => {
    setPreloader(true);
    setTimeout(() => {
      setPreloader(false);
    }, 700);
  }, []);

  function tokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        auth
          .getContent(jwt)
          .then((res) => {
            if (res) {
              setCurrentUser({ name: res.name, email: res.email });
              setToken(localStorage.getItem("jwt"));
              localStorage.setItem("loggedIn", "true");
              setLoggedIn(JSON.parse(localStorage.getItem("loggedIn")));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  const handleLoginSubmit = (email, password) => {
    setPreloader(true);
    return auth
      .login(email, password)
      .then((data) => {
        setPreloader(false);
        // tokenCheck();
        setCurrentUser({ name: data.name, email: data.email });
        history.push("/profile");
      })
      .catch((e) => {
        setPreloader(false);
        setRegisterLoginServerResponse(e.message);
      });
  };
  
  const handleRegisterSubmit = (email, name, password) => {
    setPreloader(true);
    auth
      .register(email, name, password)
      .then((res) => {
        setPreloader(false);
        // handleLoginSubmit(email, password);
      })
      .catch((e) => {
        setPreloader(false);
        setRegisterLoginServerResponse(e.message);
      });
  };

  // const handleSignOut = () => {
  //   auth.logout().then(() => {
  //     setLoggedIn(false);
  //     setCurrentUser({});
  //     history.push('/');
  //   })
  //   .catch((e) => console.log(e));
  // }

  const handleUserUpdate = (name, email) => {
    setPreloader(true);
    mainApi
      .updateUser(name, email, token)
      .then((data) => {
        setCurrentUser(data);
        setUpdateRes(true);
        setPreloader(false);
      })
      .catch((err) => {
        setPreloader(false);
        console.log(err.message);
        setUpdateRes(true);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path={LANDING_ROUTE}>
          <Main loggedIn={loggedIn} />
        </Route>
        <Route
          path="/movies"
          component={Movies}
          loggedIn={loggedIn}
          // movies={savedMovies}
        />

        <Route
          path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn}
          // movies={savedMovies}
        />

        <Route
          path={PROFILE_ROUTE}
          component={Profile}
          loggedIn={loggedIn}
          preloader={preloader}
          handleUserUpdate={handleUserUpdate}
          // onSignout={handleSignOut}
          updateRes={updateRes}
        />

        <Route path={REGISTRATION_ROUTE}>
          <Register
            onRegister={handleRegisterSubmit}
            onResponse={registerServerResponse}
            preloader={preloader}
          />
        </Route>
        <Route path={LOGIN_ROUTE}>
          <Login
            onLogin={handleLoginSubmit}
            onResponse={registerServerResponse}
            preloader={preloader}
          />
        </Route>
        <Route path={LANDING_ROUTE}>
          <Error />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
