import React, { useState, useEffect } from 'react';
import IngredientsType from "./IngredientsType/IngredientsType";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredients.module.css'
import DataPropTypes from '../../utils/prop-types';
import PropTypes from "prop-types";
import ModalPortal from "../ModalPortal/ModalPortal";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

function BurgerIngredients({data}) {
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [ingredient, setIngredient] = useState(null);
    useEffect(() => {
        function handleEscapeKey(event) {
            if (event.code === 'Escape') {
                setIsModalOpened(false);
            }
        }

        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [])
    const ingredientTypes = ['Булки', 'Соусы', 'Начинки'];
    const [currentTab, setCurrentTab] = useState(ingredientTypes[0]);
    const ingredientsTitle = 'Соберите бургер';
    const largeTextStyle = 'text text_type_main-large';
    const openModal = (id) => {
        const ingredient = data.find(ingredient => ingredient._id === id);
        setIngredient(ingredient);
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
                <IngredientsType onClick={openModal} data={data} type={currentTab}/>
            </div>
            {isModalOpened && (
                <>
                    <ModalPortal onClick={closeModal} isShowHeader={true}>
                        <IngredientDetails ingredient={ingredient}/>
                    </ModalPortal>
                    <ModalOverlay onClick={closeModal}/>
                </>
            )}
        </section>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(DataPropTypes)
}

export default BurgerIngredients;