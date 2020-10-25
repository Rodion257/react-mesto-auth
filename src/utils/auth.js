export const BASE_URL = 'https://api.rodion.students.nomoreparties.xyz';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, email })
  })
    .then((response => response.json()))
    .then((data) => {
      if (data) {
        localStorage.setItem('jwt', data.token);
        return data;
      } else {
        return;
      }
    })
    .catch(err => console.log(err))
};