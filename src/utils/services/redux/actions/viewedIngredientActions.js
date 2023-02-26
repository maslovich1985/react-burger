import {VIEW_DETAILS} from "../types/viewedIngredientTypes";
import {store} from "../../../../index";

export const getIngredientDetails = (id) => {
    const data = store.getState().ingredients.ingredients;
    const ingredient = data.find(ingredient => ingredient._id === id);
    return {
        type: VIEW_DETAILS,
        payload: ingredient,
    };
};