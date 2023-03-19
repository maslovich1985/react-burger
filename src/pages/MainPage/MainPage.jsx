import React from 'react';
import styles from "./MainPage.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import {useSelector} from "react-redux";
import {ingredients, responseError} from "../../services/redux/selectors/ingredientsListSelector";

export const MainPage = () => {
    const error = useSelector(responseError);
    const data = useSelector(ingredients);
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