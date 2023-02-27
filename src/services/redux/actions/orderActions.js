import { GET_ORDER_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "../types/orderTypes";
import { getOrder } from "../../../utils/burger-api";

const getOrderSucces = (order) => {
    return {
        type: GET_ORDER_SUCCESS,
        payload: order,
    };
};

const getOrderRequest = () => {
    return {
        type: GET_ORDER_REQUEST,
    };
};

const getOrderError = () => {
    return {
        type: GET_ORDER_ERROR,
    };
};


export const getOrderThunk = (data) => (dispatch) => {
    if (data.length !== 0) {
        const ingredientsId = data.map(ingredient => ingredient._id);
        const orderBody = { ingredients: ingredientsId };
        dispatch(getOrderRequest());
        getOrder(orderBody).then(res => {
            dispatch(getOrderSucces(res))
        }).catch(() => dispatch(getOrderError()));
    }
}