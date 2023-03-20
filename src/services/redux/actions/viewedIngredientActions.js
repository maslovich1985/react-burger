import {VIEW_DETAILS} from "../types/viewedIngredientTypes";

export const getIngredientDetails = (ingredient) => {
    return {
        type: VIEW_DETAILS,
        payload: ingredient,
    };
};