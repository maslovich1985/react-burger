import React from 'react';
import styles from './IngredientDetails.module.css'
import {useSelector} from "react-redux";
import {ingredientDetails} from "../../utils/services/redux/selectors/viewedIngredientSelector";

function IngredientDetails() {
    const ingredient = useSelector(ingredientDetails);
    const nutrientsHeaders = {
        calories: 'Калории,ккал',
        proteins: 'Белки, г',
        fat: 'Жиры, г',
        carbohydrates: 'Углеводы, г'
    };
    const mediumTextStyle = 'text text_type_main-medium';
    const inactiveTextStyle = 'text text_type_main-default text_color_inactive';
    return (
        <div className={styles.wrapper}>
            <img className={styles.img_style} src={ingredient.image_large} alt='ингридиент'/>
            <div className={`${mediumTextStyle} mt-4 mb-8`}>
                {ingredient.name}
            </div>
            <div className={styles.nutrients_container}>
                {Object.entries(nutrientsHeaders).map(([key, value], i) => {
                    return (
                        <div key={i} className={`${i === 0 ? styles.calories : styles.nutrients}`}>
                            <div className={inactiveTextStyle}>
                                {nutrientsHeaders[key]}
                            </div>
                            <div className={`${inactiveTextStyle} mt-2`}>
                                {ingredient[key]}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default IngredientDetails;