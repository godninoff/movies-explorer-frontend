const {localhost, BACKEND_URL} = require(`./consts`);
const axios = require(`axios`);
const TIMEOUT = 5000; // Таймаут на запрос к серверу

class API {
    constructor(baseURL, timeout) {
        this._http = axios.create({
            baseURL,
            timeout
        });
    }

    async _load(url, options) {
        const allOptions = {
            url,
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
            ...options
        };
        const response = await this._http.request({...allOptions});
        if (response.status === 200) {
            const {data} = response.data;
            return data;
        }
        return Promise.reject(response.data);
    }

    register(email, password, name) {
        return this._load("/signup", {
            method: 'POST',
            data: {email, password, name}
        });
    };

    login(email, password) {
        return this._load("/signin", {method: 'POST', data: JSON.stringify({email, password})});
    };

    logout() {
        return this._load("/signout", {method: "DELETE"});
    };

    getUserInfo() {
        return this._load("/users/me");
    }

    updateUser(name, email) {
        return this._load("/signout", {
            method: "PATCH",
            data: JSON.stringify({
                name,
                email
            })
        });
    }

    createMovie(movie) {
        return this._load("/signout", {
            method: 'POST',
            data: JSON.stringify({
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
        });
    }

    deleteMovieById(movieId) {
        return this._load(`/movies/${movieId}`, {method: 'DELETE'});
    }

    getMoviesInfo() {
        return this._load("/movies");
    }
}

const defaultAPI = new API(localhost, TIMEOUT);

module.exports = {
    API,
    getAPI: () => defaultAPI
};
