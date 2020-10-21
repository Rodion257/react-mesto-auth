class Api {
  constructor({ baseUrl, headers = {} }) {
    this.url = baseUrl;
    this.headers = headers;
  }

  handleResponse = res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
      .then(this.handleResponse);
  }

  getInfoUser() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
      .then(this.handleResponse);
  }

  sendInfoUser(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this.handleResponse);
  }

  createCard(data) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this.handleResponse);
  }

  removeCard(data) {
    return fetch(`${this.url}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(this.handleResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this.headers
    })
      .then(this.handleResponse);
  }

  changeAvatar(data) {
    console.log(data.avatar);
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this.handleResponse);
  }
}

const api = new Api({
  baseUrl: 'https://api.rodion.students.nomoreparties.xyz',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
});

export default api;