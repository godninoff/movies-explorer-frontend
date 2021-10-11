import React from 'react';
import { Route, Switch } from 'react-router-dom'; 
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Error from '../Error/Error';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';

function App() {


  return (
    <>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route >  
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/">
          <Error />
        </Route> 
      </Switch>
    </>  
  );
}

export default App;
