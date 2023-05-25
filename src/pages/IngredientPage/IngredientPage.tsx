import React, {useEffect} from 'react';
import styles from "./IngredientPage.module.css";
import {useParams} from "react-router-dom";
import {getIngredientDetails} from "../../services/redux/actions/viewedIngredientActions";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import {ingredientDetails} from "../../services/redux/selectors/viewedIngredientSelector";
import {ingredients} from "../../services/redux/selectors/ingredientsListSelector";
import {useAppDispatch, useAppSelector} from "../../services/redux/hooks";
import {ViewedIngredientAction} from "../../services/redux/reducers/viewedIngredientReducer";

export interface Ingredient {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: 'main' | 'bun' | 'sauce';
    __v: number;
    _id: string;
}

function IngredientPage() {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const items = useAppSelector(ingredients);
    const details = useAppSelector(ingredientDetails);
    useEffect(() => {
        const ingredient = items.find((item: Ingredient) => item._id === id);
        dispatch(getIngredientDetails(ingredient) as unknown as ViewedIngredientAction);
    }, [id, items, dispatch]);

    return details && (
        <div className={`${styles.wrapper} mt-30`}>
            <IngredientDetails/>
        </div>
    )
}

export default IngredientPage;