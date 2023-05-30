import {GET_ORDER_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, OrderActionType} from "../types/orderTypes";
import {Order} from "../actions/orderActions";

interface InitialState {
    order: Order | null;
    requestIsSent: boolean,
    responseError: boolean,
}

export const orderState: InitialState = {
    order: null,
    requestIsSent: false,
    responseError: false,
}

export interface OrderAction {
    type: OrderActionType;
    payload?: any;
}

const orderInfo = (state = orderState, action: OrderAction) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {...state, requestIsSent: true};

        case GET_ORDER_SUCCESS:
            return {...state, order: action.payload, requestIsSent: false, responseError: false};

        case GET_ORDER_ERROR:
            return {...state, requestIsSent: false, responseError: true};

        default:
            return state;
    }
};
export default orderInfo;