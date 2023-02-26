import { GET_ORDER_REQUEST, GET_ORDER_ERROR, GET_ORDER_SUCCESS } from "../types/orderTypes";

export const orderState = {
    order: {},
    requestIsSent: false,
    responseError: false,
}

const orderReducer = (state = orderState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {...state, requestIsSent: true };

        case GET_ORDER_SUCCESS:
            return {...state, order: action.payload, requestIsSent: false, responseError: false };

        case GET_ORDER_ERROR:
            return {...state, requestIsSent: false, responseError: true };

        default:
            return state;
    }
};
export default orderReducer;