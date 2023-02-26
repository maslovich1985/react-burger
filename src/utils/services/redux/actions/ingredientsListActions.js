import { GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_ERROR, DECREASE_INGREDIENTS_COUNTER,
    INCREASE_INGREDIENTS_COUNTER } from "../types/ingredientsListTypes";
import { getIngredients } from "../../../burger-api";

const getIngredientsSucces = (ingredients) => {
    return {
        type: GET_INGREDIENTS_SUCCESS,
        payload: ingredients,
    };
};

const getIngredientsRequest = () => {
    return {
        type: GET_INGREDIENTS_REQUEST,
    };
};

const getIngredientsError = () => {
    return {
        type: GET_INGREDIENTS_ERROR,
    };
};

export const increaseIngredientCounter = (id) => {
    return {
        type: INCREASE_INGREDIENTS_COUNTER,
        payload: id,
    };
};

export const decreaseIngredientCounter = (id) => {
    return {
        type: DECREASE_INGREDIENTS_COUNTER,
        payload: id,
    };
};

export const getIngredientsThunk = () => (dispatch) => {
    dispatch(getIngredientsRequest());
    getIngredients().then(res => {
        dispatch(getIngredientsSucces(res.data))
    }).catch(() => dispatch(getIngredientsError()));
}