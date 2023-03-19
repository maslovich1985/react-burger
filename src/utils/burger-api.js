import { getCookie } from './cookie'

const NORMA_API = 'https://norma.nomoreparties.space/api';

const checkRes = (res) => {
    if (res.ok) {
        return res.json();
    }
    return res.json().then((err) => Promise.reject(err));
}

export function getIngredients() {
    return fetch(`${NORMA_API}/ingredients`).then(checkRes)
}

export function getOrder(orderData) {
    return fetch(`${NORMA_API}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(orderData),
    })
        .then(checkRes)
}

export function resetPass(email) {
    return fetch(`${NORMA_API}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(email),
    })
        .then(checkRes)
}

export function userRegister(data) {
    return fetch(`${NORMA_API}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),
    })
        .then(checkRes)
}

export function userLogin(data) { // "ssss@gmail.com", "Alex", 'qwerty'
    return fetch(`${NORMA_API}/auth/login`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: getCookie('accessToken')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
    })
        .then(checkRes)
}

export function userProfile() {
  return fetch(`${NORMA_API}/auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
      .then(checkRes)
}

export function refreshToken() {
  return fetch(`${NORMA_API}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ token: getCookie('refreshToken') }),
  })
      .then(checkRes)
};

export function resetPassword(email) {
    return fetch(`${NORMA_API}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ email }),
    })
        .then(checkRes)
};

export function resetPasswordWithCode(password, code) {
    return fetch(`${NORMA_API}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ password, token: code }),
    })
        .then(checkRes)
};

export function logout() {
    return fetch(`${NORMA_API}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ token: getCookie('refreshToken') }),
    }).then(checkRes);
};

export function updateProfile(name, email) {
    return fetch(`${NORMA_API}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: getCookie('accessToken'),
        },
        body: JSON.stringify({ name, email }),
    }).then(checkRes);
};