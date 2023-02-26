import React, { useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import styles from './App.module.css'
import {getIngredientsThunk} from "../../utils/services/redux/actions/ingredientsListActions";
import { useDispatch, useSelector } from "react-redux";
import {ingredients, responseError} from "../../utils/services/redux/selectors/ingredientsListSelector";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {

    const dispatch = useDispatch();
    const error = useSelector(responseError);
    const data = useSelector(ingredients);
    useEffect(() => {
        dispatch(getIngredientsThunk());
    }, [dispatch])

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
            { data.length && (
                <main className={styles.wrapper}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </DndProvider>
                </main>
            )}
        </>
  );
}

export default App;
