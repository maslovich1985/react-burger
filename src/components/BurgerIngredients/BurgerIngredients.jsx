import React, { useState } from 'react';
import IngredientsType from "./IngredientsType/IngredientsType";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredients.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getIngredientDetails} from "../../services/redux/actions/viewedIngredientActions";
import {useNavigate} from "react-router-dom";
import {ingredients} from "../../services/redux/selectors/ingredientsListSelector";

function BurgerIngredients() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const items = useSelector(ingredients);
    const ingredientTypes = ['Булки', 'Соусы', 'Начинки'];
    const [currentTab, setCurrentTab] = useState(ingredientTypes[0]);
    const ingredientsTitle = 'Соберите бургер';
    const largeTextStyle = 'text text_type_main-large';
    const openModal = (id) => {
        const ingredient = items.find((item) => item._id === id)
        dispatch(getIngredientDetails(ingredient));
        navigate(`/ingredients/${id}`, {state: {background: true}})
    }

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
        </section>
    );
}

export default BurgerIngredients;