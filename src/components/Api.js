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

  addNewCard() {

  }
}
