import {getCookie} from './cookie'
import {Ingredient} from "../pages/IngredientPage/IngredientPage";

const NORMA_API = 'https://norma.nomoreparties.space/api';
export const wssBaseApiUrl = 'wss://norma.nomoreparties.space/orders';

interface Ingredients {
    data: Ingredient[];
}

export interface Login {
    email: string;
    password: string;
}

export interface Register extends Login {
    name: string;
}

const checkRes = <T>(res: {
    json: () => Promise<T>;
    ok: boolean;
}): Promise<T> => {
    if (res.ok) {
        return res.json();
    }
    return res.json().then((err) => Promise.reject(err));
}

export function getIngredients() {
    return fetch(`${NORMA_API}/ingredients`).then(checkRes<Ingredients>)
}

export function getOrder(orderData: { ingredients: string[] }) {
    return fetch(`${NORMA_API}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: getCookie('accessToken')
        } as HeadersInit,
        body: JSON.stringify(orderData),
    })
        .then(checkRes)
}

export function userRegister(data: Register) {
    return fetch(`${NORMA_API}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),
    })
        .then(checkRes)
}

export function userLogin(data: Login) {
    return fetch(`${NORMA_API}/auth/login`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: getCookie('accessToken')
        } as HeadersInit,
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
        } as HeadersInit,
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
        body: JSON.stringify({token: getCookie('refreshToken')}),
    })
        .then(checkRes)
};

export function resetPassword(email: string) {
    return fetch(`${NORMA_API}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({email}),
    })
        .then(checkRes)
};

export function resetPasswordWithCode(password: string, code: string) {
    return fetch(`${NORMA_API}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({password, token: code}),
    })
        .then(checkRes)
};

export function logout() {
    return fetch(`${NORMA_API}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({token: getCookie('refreshToken')}),
    })
        .then(checkRes);
};

export function updateProfile(name: string, email: string) {
    return fetch(`${NORMA_API}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: getCookie('accessToken'),
        } as HeadersInit,
        body: JSON.stringify({name, email}),
    })
        .then(checkRes);
};