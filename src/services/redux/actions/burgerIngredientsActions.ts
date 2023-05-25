import {ADD_TO_CONSTRUCTOR, MOVE_IN_CONSTRUCTOR, REMOVE_FROM_CONSTRUCTOR} from "../types/burgerIngredientsTypes";
import {AppActions, store} from "../store";
import {IngredientWithCount} from "../../../components/BurgerIngredients/IngredientsType/IngredientCard/IngredientCard";

export const addIngredientInBurger = (id: string): AppActions => {
    const data = store.getState().ingredients.ingredients;
    const ingredient = data.find((ingredient: IngredientWithCount) => ingredient._id === id);
    return {
        type: ADD_TO_CONSTRUCTOR,
        payload: ingredient,
    };
};

export const removeIngredientFromBurger = (i: number): AppActions => {
    return {
        type: REMOVE_FROM_CONSTRUCTOR,
        payload: i,
    };
};

export const moveIngredientInBurger = (prevId: string, nextId: string): AppActions => {
    return {
        type: MOVE_IN_CONSTRUCTOR,
        payload: {prevId, nextId},
    };
};