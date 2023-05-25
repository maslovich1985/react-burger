import React, {useState} from 'react';
import IngredientsType from "./IngredientsType/IngredientsType";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredients.module.css'
import {getIngredientDetails} from "../../services/redux/actions/viewedIngredientActions";
import {useNavigate} from "react-router-dom";
import {ingredients} from "../../services/redux/selectors/ingredientsListSelector";
import {useAppDispatch, useAppSelector} from "../../services/redux/hooks";
import {IngredientWithCount} from "./IngredientsType/IngredientCard/IngredientCard";
import {ViewedIngredientAction} from "../../services/redux/reducers/viewedIngredientReducer";

function BurgerIngredients() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const items = useAppSelector<IngredientWithCount[]>(ingredients);
    const ingredientTypes = ['Булки', 'Соусы', 'Начинки'];
    const [currentTab, setCurrentTab] = useState(ingredientTypes[0]);
    const ingredientsTitle = 'Соберите бургер';
    const largeTextStyle = 'text text_type_main-large';
    const openModal = (id: string) => {
        const ingredient = items.find((item) => item._id === id);
        dispatch(getIngredientDetails(ingredient) as unknown as ViewedIngredientAction);
        navigate(`/ingredients/${id}`, {state: {background: true}});
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