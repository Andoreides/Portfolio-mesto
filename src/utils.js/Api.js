export class Api {
    constructor(host, token) {
        this._host = host;
        this._token = token;
        this._hadleError = this._hadleError.bind(this);
    }
    _hadleError(res) {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Ошибка при загрузке данных');
    }

    getIntialCards() {
        return fetch(`${this._host}/cards`, {
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
        })
        .then(this._hadleError);
    }
    getUserInfo() {
        return fetch(`${this._host}/users/me`, {
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
        })
        .then(this._hadleError);
    }
    createUserInfo(info) {
        return fetch(`${this._host}/users/me`, { 
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                name: info.nameProf,
                about: info.ajob
            }),
        })
        .then(this._hadleError);
    }
    createCard(element){
        return fetch(`${this._host}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: element.name,
                link: element.link
            }),
        })
        .then(this._hadleError);
    }
    deleteCard(id) {
        return fetch(`${this._host}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
        })
        .then(this._hadleError);
    }
    likePointer(id) {
        return fetch(`${this._host}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
        .then(this._hadleError);
    }
    deleteLike(id) {
        return fetch(`${this._host}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
        .then(this._hadleError);
    }
    saveAvatar(data) {
        return fetch(`${this._host}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
        .then(this._hadleError);
    }
    
}