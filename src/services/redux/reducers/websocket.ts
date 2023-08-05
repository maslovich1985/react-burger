import {Order} from "../actions/orderActions";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_USER_NAME_UPDATE,
    WsActionType
} from "../types/wsTypes";

export interface IOrderData {
    success: boolean;
    orders: Order[];
    total: number;
    totalToday: number;
}

export const initialState = {
    wsConnected: false,
    data: undefined,
};

export interface IWebsocketAction {
    type?: WsActionType;
    payload?: IOrderData;
}

export const wsReducer = (state = initialState, action: IWebsocketAction) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
            };

        case WS_GET_MESSAGE:
            return {
                ...state,
                data: action.payload,
            };

        case WS_USER_NAME_UPDATE:
            return {
                ...state,
                user: action.payload,
            };

        default:
            return state;
    }
};