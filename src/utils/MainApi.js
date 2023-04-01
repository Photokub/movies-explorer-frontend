class MainApi {
    constructor(setting) {
        this._adress = setting.baseUrl;
        this._headers = setting.headers;
    }

    _request(url, options) {
        return fetch(url, options).then(this.handleResp)
    }

    handleResp(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
        }
        return res.json();
    }

    getUserProfile() {
        return this._request(`${this._adress}/users/me`, {
            method: "GET",
            credentials: 'include',
            headers: this._headers,
        })
    }

    updateUserData({name, email}) {
        return this._request(`${this._adress}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                email: email,
            })
        })
    }

    getMovies() {
        return this._request(`${this._adress}/movies`, {
            method: "GET",
            credentials: 'include',
            headers: this._headers,
        })
    }

    saveMovie(data) {
        return this._request(`${this._adress}/movies/`, {
            method: "POST",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                trailerLink: data.trailerLink,
                image: 'https://api.nomoreparties.co' + data.image.url,
                thumbnail: 'https://api.nomoreparties.co' + data.image.formats.thumbnail.url,
                movieId: data.id,
                nameRU: data.nameRU,
                nameEN: data.nameEN,
            })
        })
    }

    deleteMovie(id) {
        return this._request(`${this._adress}/movies/${id}`, {
            method: "DELETE",
            credentials: 'include',
            headers: this._headers,
        })
    }

}

export const mainApi = new MainApi({
    credentials: 'include',
    baseUrl: 'https://api.photokub.nomoredomains.work',
    headers: {
        "content-type": "application/json",
        'Accept': 'application/json',
    }
})