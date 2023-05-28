class Api {
  constructor(options) {
    this._url = options.baseUrl
    this._headers = options.headers
  }

//to avoid double-coding in methods below
  _handleServerResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`There is following server error: ${res.status}`)
    }
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers
      //method POST by default
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  getUserData() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers
      //method POST by default
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  sendUserData(profileInputsData) {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: profileInputsData.name,
        about: profileInputsData.description })
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  addNewCard({ name, link }) {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({name, link})
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  sendAvatarLink(avatarLink) {
    return fetch(`${this._url}users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatarLink.avatar
      })
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  addCardLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT',
    })
      .then(res => {return this._handleServerResponse(res)})
  }

  deleteCardLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(res => {return this._handleServerResponse(res)})
  }
}
////////////////////////////////////// Export class Api instance
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66/',
  headers: {
    authorization: '7e8805bf-057f-451c-a0fd-2bbbfedd0401',
    'Content-Type': 'application/json'
  }
})

