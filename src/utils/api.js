class Api {
  constructor({ baseUrl }) {
    this.url = baseUrl;
    this.jwt = '';
  }
  handleResponse = res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  handleToken() {
    this.jwt = localStorage.getItem('jwt');
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.jwt}`,
      }
    })
      .then(this.handleResponse)
      .then(data => data);
  }

  getInfoUser() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.jwt}`,
      }
    })
      .then(this.handleResponse)
      .then(data => data);
  }

  sendInfoUser(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.jwt}`,
      },
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
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.jwt}`,
      },
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
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.jwt}`,
      }
    })
      .then(this.handleResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.jwt}`,
      }
    })
      .then(this.handleResponse);
  }

  changeAvatar(data) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.jwt}`,
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this.handleResponse);
  }
}

const api = new Api({
  baseUrl: 'https://api.rodion.students.nomoreparties.xyz',
});

export default api;
