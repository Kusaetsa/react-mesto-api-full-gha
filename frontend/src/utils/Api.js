class Api {
  constructor(config) {
    this._url = config.url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _requestWhithToken(url, method, body) {
    const token = localStorage.getItem('jwt');
    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })
    .then(
      this._checkResponse
    )
  }

  getInitialCardsFromServer() {
    return this._requestWhithToken(`${this._url}cards`, 'GET')
  };

  getUserInfoFromServer() {
    return this._requestWhithToken(`${this._url}users/me`, 'GET')
  };

  setUserInfoOnServer(data) {
    return this._requestWhithToken(`${this._url}users/me`, 'PATCH', data)
  };

  addNewCardOnServer(data) {
    return this._requestWhithToken(`${this._url}cards`, 'POST', data)
  };

  deleteMyCard(id) {
    return this._requestWhithToken(`${this._url}cards/${id}`, 'DELETE')
  };

  editAvatarImage(data) {
    return this._requestWhithToken(`${this._url}users/me/avatar`, 'PATCH', data)
  }

  changeLikeCardStatus(id, isLiked) {
    if(isLiked) {
      return this._requestWhithToken(`${this._url}cards/${id}/likes`, 'PUT')
    } else {
      return this._requestWhithToken(`${this._url}cards/${id}/likes`, 'DELETE')
    }
  }

}

const api = new Api({
  url: 'https://api.myplaces.nomoreparties.co/',
})

export default api;



