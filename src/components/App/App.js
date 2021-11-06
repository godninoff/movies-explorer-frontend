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
import { CurrentUserContext } from "../../context/CurrentUserContext";
import {LANDING_ROUTE, LOGIN_ROUTE, MOVIES_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SAVED_MOVIES_ROUTE} from "../../utils/consts"
import frontApi from "../../utils/api";
const api = frontApi.getAPI();

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [preloader, setPreloader] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  // const [savedMovies, setSavedMovies] = React.useState([]);
  // const [savedMoviesId, setSavedMoviesId] = React.useState([]);
  const [updateRes, setUpdateRes] = React.useState(true);
  const [serverResponse, setRserverResponse] =
    React.useState("");

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo()])
        .then(([data]) => {
          setCurrentUser(data);
        })
        .catch((e) => console.log(e));
    }
  }, [loggedIn]);

  const checkToken = React.useCallback(() => {
    api.getUserInfo()
    .then((data) => {
      if (data) {
        setLoggedIn(true);
      }
    })
    .catch((e) => {
      console.log(e);
    })
  }, []);

  React.useEffect(() => {
    checkToken();
  }, [checkToken]);

  const onLogin = (email, password) => {
    setPreloader(true);
    api
      .login(email, password)
      .then(() => {
        setLoggedIn(true);
        setPreloader(false);
        checkToken();
        history.push(PROFILE_ROUTE);
      })
      .catch((e) => {
        setPreloader(false);
        setRserverResponse(e.message);
      });
  };
  
  const onRegister = (email, password, name) => {
    setPreloader(true);
    api
      .register(email, password, name)
      .then(() => {
        setPreloader(false);
        onLogin(email, password, name);
      })
      .catch((e) => {
        setPreloader(false);
        setRserverResponse(e.message);
      });
  };

  const onSignout = () => {
    api.logout().then(() => {
      setLoggedIn(false);
      setCurrentUser({});
      history.push(LANDING_ROUTE);
    })
    .catch((e) => console.error(e));
  }

 
  const updateProfile = (name, email) => {
    setPreloader(true);
    api
      .updateUser(name, email)
      .then((data) => {
      setCurrentUser(data);
        setPreloader(false);
      })
      .catch((e) => {
        setPreloader(false);
        console.error(e.message);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path={LANDING_ROUTE}>
          <Main loggedIn={loggedIn} />
        </Route>
        <Route
          path={MOVIES_ROUTE}
          component={Movies}
          loggedIn={loggedIn}
          // movies={savedMovies}
        />

        <Route
          path={SAVED_MOVIES_ROUTE}
          component={SavedMovies}
          loggedIn={loggedIn}
          // movies={savedMovies}
        />

        <Route
          path={PROFILE_ROUTE}
          component={Profile}
          loggedIn={loggedIn}
          preloader={preloader}
          updateProfile={updateProfile}
          onSignout={onSignout}
          updateRes={updateRes}
        />

        <Route path={REGISTRATION_ROUTE}>
          <Register
            onRegister={onRegister}
            onResponse={serverResponse}
            preloader={preloader}
          />
        </Route>
        <Route path={LOGIN_ROUTE}>
          <Login
            onLogin={onLogin}
            onResponse={serverResponse}
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
