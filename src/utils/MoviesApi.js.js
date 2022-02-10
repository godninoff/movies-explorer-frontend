import { API_URL } from "./consts";

class MoviesApi {
  constructor(options) {
    this._address = options.address;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMoviesApi() {
    return fetch(this._address, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}

export const moviesApi = new MoviesApi({
  address: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
