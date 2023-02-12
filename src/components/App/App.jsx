import React, { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import styles from './App.module.css'
import getIngredients from "../../utils/burger-api";

function App() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const url = 'https://norma.nomoreparties.space/api'
    useEffect(() => {
        getIngredients(url)
            .then(json => setData(json.data))
            .catch((response) => setError(response));
    }, [])

    if (error) {
        return (
            <section>
                <h1>Что-то пошло не так :(</h1>
                <p>
                    В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
                </p>
            </section>
        );
    }
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
