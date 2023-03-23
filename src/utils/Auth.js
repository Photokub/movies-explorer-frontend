export const BASE_URL = 'https://api.photokub.nomoredomains.work';

export const register = ({name, email, password}) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        mode: "cors",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password})
    })
        .then(checkResponse)
};

export const authorize = ({password, email}) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        mode: "cors",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then(checkResponse)
};

export const checkToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
        credentials: 'include',
        headers: this._headers,
    }).then((res) => this.handleResponse(res));
}


export const logOut =() => {
    return fetch(`${BASE_URL}/signout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(checkResponse)
}

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`)