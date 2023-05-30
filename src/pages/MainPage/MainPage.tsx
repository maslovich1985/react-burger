import React from 'react';
import styles from "./MainPage.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import {ingredients, responseError} from "../../services/redux/selectors/ingredientsListSelector";
import {useAppSelector} from "../../services/redux/hooks";

export const MainPage = () => {
    const error = useAppSelector(responseError);
    const data = useAppSelector(ingredients);
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
    return data.length && (
        <main className={styles.wrapper}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </DndProvider>
        </main>
    )
};