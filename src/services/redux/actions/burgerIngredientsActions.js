import {ADD_TO_CONSTRUCTOR, REMOVE_FROM_CONSTRUCTOR, MOVE_IN_CONSTRUCTOR} from "../types/burgerIngredientsTypes";
import {store} from "../../../index";

export const addIngredientInBurger = ({id}) => {
    const data = store.getState().ingredients.ingredients;
    const ingredient = data.find(ingredient => ingredient._id === id);
    return {
        type: ADD_TO_CONSTRUCTOR,
        payload: ingredient,
    };
};

export const removeIngredientFromBurger = (i) => {
    return {
        type: REMOVE_FROM_CONSTRUCTOR,
        payload: i,
    };
};

export const moveIngredientInBurger = (prevId, nextId) => {
    return {
        type: MOVE_IN_CONSTRUCTOR,
        payload: {prevId, nextId},
    };
};