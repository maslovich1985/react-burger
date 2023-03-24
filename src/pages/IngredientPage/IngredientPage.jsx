import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from "./IngredientPage.module.css";
import {useParams} from "react-router-dom";
import {getIngredientDetails} from "../../services/redux/actions/viewedIngredientActions";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import {ingredientDetails} from "../../services/redux/selectors/viewedIngredientSelector";
import {ingredients} from "../../services/redux/selectors/ingredientsListSelector";

function IngredientPage() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const items = useSelector(ingredients);
    const details = useSelector(ingredientDetails);
    useEffect(() => {
        const ingredient = items.find((item) => item._id === id);
        dispatch(getIngredientDetails(ingredient));
    }, [id, items, dispatch]);

    return details && (
        <div className={`${styles.wrapper} mt-30`}>
            <IngredientDetails />
        </div>
    )
}

export default IngredientPage;