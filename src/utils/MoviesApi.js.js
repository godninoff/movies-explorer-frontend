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

    getMoviesInfo() {
        return fetch(this._address, {
          headers: this._headers,
        })
        .then(res => this._checkResponse(res)) 
      }  
}

export const moviesApi = new MoviesApi({
    address: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
      'Content-Type': 'application/json'
      },
})