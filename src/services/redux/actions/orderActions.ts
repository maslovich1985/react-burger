import {GET_ORDER_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS} from "../types/orderTypes";
import {getOrder} from "../../../utils/burger-api";
import {AppActions} from "../store";
import {IngredientWithCount} from "../../../components/BurgerIngredients/IngredientsType/IngredientCard/IngredientCard";
import {AppDispatch} from "../hooks";

export interface Order {
    name: string;
    success: boolean;
    order: {
        number: number;
    }
}

const getOrderSuccess = (order: Order): AppActions => {
    return {
        type: GET_ORDER_SUCCESS,
        payload: order,
    };
};

const getOrderRequest = (): AppActions => {
    return {
        type: GET_ORDER_REQUEST,
    };
};

const getOrderError = (): AppActions => {
    return {
        type: GET_ORDER_ERROR,
    };
};

export const getOrderThunk = (data: IngredientWithCount[]) => (dispatch: AppDispatch) => {
    if (data.length !== 0) {
        const ingredientsId = data.map(ingredient => ingredient._id);
        const orderBody = {ingredients: ingredientsId};
        dispatch(getOrderRequest());
        getOrder(orderBody).then(res => {
            dispatch(getOrderSuccess(res))
        }).catch(() => dispatch(getOrderError()));
    }
}