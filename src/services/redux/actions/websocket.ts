import {AppActions} from '../store';
import {WS_CONNECTION_START, WS_GET_MESSAGE} from "../types/wsTypes";

export const wsConnectionStart = (url: string): AppActions => {
    return {
        type: WS_CONNECTION_START,
        payload: url,
    };
};

export const wsGetMessage = (message: string) => {
    return {
        type: WS_GET_MESSAGE,
        payload: JSON.parse(message),
    };
};