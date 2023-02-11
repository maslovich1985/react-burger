import React, { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import styles from './App.module.css'

function App() {
    const [data, setData] = useState(null);
    const url = 'https://norma.nomoreparties.space/api/ingredients '
    useEffect(() => {
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            })
            .then(json => setData(json.data))
            .catch(response => console.log(response.status, response.statusText))
    }, [])
    return (
        <>
            <AppHeader/>
            {data && (<main className={styles.wrapper}>
                <BurgerIngredients data={data}/>
                <BurgerConstructor data={data}/>
            </main>)}

        </>
  );
}

export default App;
