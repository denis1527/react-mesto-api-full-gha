class MestoAuth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _returnRes(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  _request(url, options) {
    return fetch(url, options).then(this._returnRes)
  }

  register(email, password) {
    return this._request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    })
  }

  authorize(email, password) {
    return this._request(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    })
  }

  validationToken(token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
  }
}

const mestoAuth = new MestoAuth({
  baseUrl: 'httpssu://denis1527.nomoreparties.co/api'
});

export default mestoAuth;




