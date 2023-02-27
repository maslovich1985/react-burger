import React, { useState } from 'react';
import IngredientsType from "./IngredientsType/IngredientsType";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredients.module.css'
import ModalPortal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {useDispatch} from "react-redux";
import {getIngredientDetails} from "../../services/redux/actions/viewedIngredientActions";

function BurgerIngredients() {
    const dispatch = useDispatch();
    const [isModalOpened, setIsModalOpened] = useState(false);

    const ingredientTypes = ['Булки', 'Соусы', 'Начинки'];
    const [currentTab, setCurrentTab] = useState(ingredientTypes[0]);
    const ingredientsTitle = 'Соберите бургер';
    const largeTextStyle = 'text text_type_main-large';
    const openModal = (id) => {
        dispatch(getIngredientDetails(id));
        setIsModalOpened(true);
    }

    const closeModal = () => setIsModalOpened(false);

    return (
        <section className={styles.wrapper}>
            <div className={`${largeTextStyle} ${styles.ingredients_title} mt-10 mb-5`}>{ingredientsTitle}</div>
            <div className={`${styles.ingredient_types} mb-10`}>
                {ingredientTypes.map((type, i) => (
                    <Tab key={i} value={type} active={currentTab === type} onClick={setCurrentTab}>
                        {type}
                    </Tab>
                ))}
            </div>
            <div className={styles.ingredient_types_container}>
                <IngredientsType onClick={openModal} type={currentTab} setTab={setCurrentTab}/>
            </div>
            {isModalOpened && (
                <ModalPortal onClick={closeModal} isShowHeader={true}>
                    <IngredientDetails/>
                </ModalPortal>
            )}
        </section>
    );
}

export default BurgerIngredients;