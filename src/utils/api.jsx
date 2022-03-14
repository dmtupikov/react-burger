import { getCookie } from './cookie';
const url = 'https://norma.nomoreparties.space/api/';

export const getData = async () => {
  return fetch(url + 'ingredients')
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
}


export const getDataOrder = async (ingredients) => {
  return fetch(url + 'orders', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: ingredients,
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
}

export const forgotPasswordRequest = async (form) => {
  return await fetch(url + 'password-reset', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
}

export const resetPasswordRequest = async (form) => {
  return await fetch(url + 'password-reset/reset', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
}

export const authRequest = async (form, uri) => {
  return await fetch(url + uri, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
}

export const getAuthRequest = async () => {
  return await fetch(url + 'auth/user', {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
}

export const updateAuthRequest = async (form) => {
  return await fetch(url + 'auth/user', {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
}

export const logoutRequest = async () => {
  return await fetch(url + 'auth/logout', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ token: localStorage.refreshToken })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
}

export const getAccessTokenRequest = async () => {
  return await fetch(url + 'auth/token', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ token: localStorage.refreshToken })
  })
   .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
};