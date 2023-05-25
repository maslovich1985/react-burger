export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_ERROR = "GET_ORDER_ERROR";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";

export type OrderActionType =
    | typeof GET_ORDER_SUCCESS
    | typeof GET_ORDER_ERROR
    | typeof GET_ORDER_REQUEST;
