const NORMA_API = 'https://norma.nomoreparties.space/api';

export function getIngredients() {
    return fetch(`${NORMA_API}/ingredients`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
}

export function getOrder(orderData) {
    return fetch(`${NORMA_API}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(orderData),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
}