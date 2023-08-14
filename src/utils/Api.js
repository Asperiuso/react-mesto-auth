const apiBaseUrl = "https://mesto.nomoreparties.co/v1/cohort-69";
const apiToken = "d30a28cc-3f89-4e69-baa3-301026382752"; 

class Api {
  constructor() {
    this._baseUrl = apiBaseUrl;
    this._headers = {
      authorization: apiToken,
      "Content-Type": "application/json",
    };
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(
      this._handleResponse
    );
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
      this._handleResponse
    );
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  setUserAvatar(urlObj) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(urlObj),
    }).then(this._handleResponse);
  }

  like(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  dislike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }
}

const api = new Api();

export default api;
