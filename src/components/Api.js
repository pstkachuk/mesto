export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _requestIsOk(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка - ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
    .then(this._requestIsOk);
  }

  getCards() {
    return fetch(this._baseUrl + '/cards', {
      method: 'GET',
      headers: this._headers
    })
    .then(this._requestIsOk);
  }

  getAllData() {
    return Promise.all([
      this.getUserInfo(),
      this.getCards()
    ]);
  }

  setUserInfo(name, about) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this._requestIsOk);
  }

  addNewCard(name, link) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this._requestIsOk);
  }

  deleteCard(id) {
    return fetch(this._baseUrl + `/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._requestIsOk);
  }

  like(id) {
    return fetch(this._baseUrl + `/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._requestIsOk);
  }

  deleteLike(id) {
    return fetch(this._baseUrl + `/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._requestIsOk);
  }

  setAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._requestIsOk);
  }
}
