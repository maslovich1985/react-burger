import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from "./IngredientPage.module.css";
import {ingredients} from "../../services/redux/selectors/ingredientsListSelector";
import {useParams} from "react-router-dom";
import {getIngredientDetails} from "../../services/redux/actions/viewedIngredientActions";

function IngredientPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const data = useSelector(ingredients);
    let ingredient;
    useEffect(() => {
        if (data.length) {
            ingredient = data.find(zzz => zzz._id === id);
            dispatch(getIngredientDetails(ingredient));
        }
    }, [dispatch, id, data]);
    const nutrientsHeaders = {
        calories: 'Калории,ккал',
        proteins: 'Белки, г',
        fat: 'Жиры, г',
        carbohydrates: 'Углеводы, г'
    };
    const mediumTextStyle = 'text text_type_main-medium';
    const inactiveTextStyle = 'text text_type_main-default text_color_inactive';
    return ingredient && (
            <div className={`${styles.wrapper} mt-30`}>
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
        )
}

export default IngredientPage;