import {
  API_PREFIX,
  BACKEND_URL,
  // localhost,
} from "./consts";

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
    return res.json().then((res) => Promise.reject(res));
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      credentials: this._credentials,
    }).then(this._checkResponse);
  }

  updateUser(name, email) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this._checkResponse);
  }

  getUserMovies() {
    return fetch(`${this._address}/movies`, {
      method: "GET",
      credentials: this._credentials,
      headers: this._headers,
    }).then(this._checkResponse);
  }

  createMovie(movie) {
    return fetch(`${this._address}/movies`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        country: movie.country || "data",
        director: movie.director || "data",
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${API_PREFIX}${movie.image.url}`,
        trailer: movie.trailerLink,
        thumbnail: `${API_PREFIX}${movie.image.formats.thumbnail.url}`,
        nameRU: movie.nameRU || "data",
        nameEN: movie.nameEN || "data",
        movieId: movie.movieId,
      }),
    }).then(this._checkResponse);
  }

  deleteMovieById(movieId) {
    return fetch(`${this._address}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this._credentials,
    }).then(this._checkResponse);
  }
}

export const mainApi = new MainApi({
  address: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
});
