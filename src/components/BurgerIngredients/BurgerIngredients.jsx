import React from 'react';
import IngredientsType from "./IngredientsType/IngredientsType";
import styles from './BurgerIngredients.module.css'
import data from '../../utils/data'

function BurgerIngredients() {
    const ingredientsTitle = 'Соберите бургер';
    const largeTextStyle = 'text text_type_main-large';
    const inactiveTextStyle = 'text text_type_main-default text_color_inactive';
    const ingredientTypes = ['Булки', 'Соусы', 'Начинки'];
    return (
        <section className={styles.wrapper}>
            <div className={`${largeTextStyle} ${styles.ingredients_title} mt-10 mb-5`}>{ingredientsTitle}</div>
            <div className={`${inactiveTextStyle} ${styles.ingredient_types} mb-10`}>
                {ingredientTypes.map((type, i) => (
                    <div key={i} className={styles.ingredient_type}>{type}</div>
                ))}
            </div>
            <div className={styles.ingredient_types_container}>
                <IngredientsType data={data}/>
            </div>
        </section>
    );
}

export default BurgerIngredients;