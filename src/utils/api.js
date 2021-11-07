const {localhost, BACKEND_URL} = require(`./consts`);
const TIMEOUT = 5000; // Таймаут на запрос к серверу

class API {
    constructor(baseURL, timeout) {
        this._httpRequest = (url, options) => {
            const fullUrl = url ? `${baseURL}${url}` : baseURL;

            return Promise.race([
                fetch(fullUrl, options),
                new Promise((_, reject) => {
                    let timerId = setTimeout(() => {
                        reject(new Error(`fail by timeout! > ${timeout} ms`))
                        clearTimeout(timerId)
                    }, timeout);
                })
            ])
        };
    }

    async _load(url, options) {
        const allOptions = {
            url,
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            ...options
        };
        const response = await this._httpRequest(url, {...allOptions});
        if (response.ok) {
            return response.json();
        }

        return response.json().then(customMessage => Promise.reject(customMessage));
    }

    register(email, password, name) {
        return this._load("/signup", {
            method: 'POST',
            body:JSON.stringify( {email, password, name})
        });
    };

    login(email, password) {
        return this._load("/signin", {method: 'POST', body: JSON.stringify({email, password})});
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
