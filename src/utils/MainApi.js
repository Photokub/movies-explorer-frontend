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

    updateUserData({name, about}) {
        return this._request(`${this._adress}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about,
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
        return this._request(`${this._adress}/movies`, {
            method: "POST",
            credentials: 'include',
            headers: this._headers,
        })
    }

    // saveMovie(id, save) {
    //     return this._request(`${this._adress}/movies`, {
    //         method: save ? "PUT" : "DELETE",
    //         credentials: 'include',
    //         headers: this._headers,
    //     })
    // }

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