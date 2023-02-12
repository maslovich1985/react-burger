export default function getIngredients(NORMA_API) {
    return fetch(`${NORMA_API}/ingredients`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
}