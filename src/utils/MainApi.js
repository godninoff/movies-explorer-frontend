import { localhost } from "./consts";

class MainApi {
    constructor(options) {
        this._address = options.address;
        this._headers = options.headers;
        this._credentials = options.credentials; 
    }

    _checkResponse(res) {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(res => Promise.reject(res));
      }

    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            method: 'GET',
            headers: this._headers,
            credentials: this._credentials,
        })
        .then(this._checkResponse);
    }  

    updateUser(name, email) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: this._credentials,
            body: JSON.stringify({
              name,
              email
          })
      }) 
      .then(this._checkResponse);
    }

    createMovie(movie) {
       return fetch(`${this._address}/movies`, {
        method: 'POST',
        headers: this._headers,
        credentials: this._credentials,
        body: JSON.stringify({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: movie.image,
          trailer: movie.trailer,
          thumbnail: movie.thumbnail,
          movieId: movie.movieId,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
        })
      })
      .then(this._checkResponse);
    }

    deleteMovieById(movieId) {
      return fetch(`${this._address}/movies/${movieId}`, {
        method: 'DELETE',
        headers: this._headers,
        credentials: this._credentials,
      })
      .then(this._checkResponse);
    }

    getMoviesInfo() {
      return fetch(`${this._address}/movies`, {
        headers: this._headers,
        credentials: this._credentials,
      })
      .then(this._checkResponse);
    }
}

export const mainApi = new MainApi({
    address: localhost,
    headers: {
      'Content-Type': 'application/json'
      },
    credentials: 'include'
});