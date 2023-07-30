import {
    DECREASE_INGREDIENTS_COUNTER,
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    INCREASE_INGREDIENTS_COUNTER
} from "../types/ingredientsListTypes";
import {getIngredients} from "../../../utils/burger-api";
import {Ingredient} from "../../../pages/IngredientPage/IngredientPage";
import {AppActions} from "../store";
import {AppDispatch} from "../hooks";

const getIngredientsSucces = (ingredients: Ingredient[]): AppActions => {
    return {
        type: GET_INGREDIENTS_SUCCESS,
        payload: ingredients,
    };
};

const getIngredientsRequest = (): AppActions => {
    return {
        type: GET_INGREDIENTS_REQUEST,
    };
};

const getIngredientsError = (): AppActions => {
    return {
        type: GET_INGREDIENTS_ERROR,
    };
};

export const increaseIngredientCounter = (id: string): AppActions => {
    return {
        type: INCREASE_INGREDIENTS_COUNTER,
        payload: id,
    };
};

export const decreaseIngredientCounter = (id: string): AppActions => {
    return {
        type: DECREASE_INGREDIENTS_COUNTER,
        payload: id,
    };
};

export const getIngredientsThunk = () => (dispatch: AppDispatch) => {
    dispatch(getIngredientsRequest());
    getIngredients().then(res => {
        dispatch(getIngredientsSucces(res.data))
    }).catch(() => dispatch(getIngredientsError()));
}