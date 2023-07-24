import type {Middleware} from 'redux';
import {WS_GET_MESSAGE} from "./types/wsTypes";

export const socketMiddleware = (): Middleware => {
    return ((store) => {
        let socket: WebSocket | null = null;

        return (next) => (action) => {
            const {dispatch} = store;
            const {type, payload} = action;

            if (type === 'WS_CONNECTION_START') {
                // объект класса WebSocket
                socket = new WebSocket(action.payload);
            }
            if (socket) {
                // функция, которая вызывается при открытии сокета
                socket.onopen = (event) => {
                    dispatch({type: 'WS_CONNECTION_SUCCESS', payload: event});
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = (event) => {
                    dispatch({type: 'WS_CONNECTION_ERROR', payload: event});
                };

                // функция, которая вызывается при получения события от сервера
                socket.onmessage = (event) => {
                    dispatch({
                        type: WS_GET_MESSAGE,
                        payload: JSON.parse(event.data),
                    });
                };

                // функция, которая вызывается при закрытии соединения
                socket.onclose = (event) => {
                    dispatch({type: 'WS_CONNECTION_CLOSED', payload: event});
                };

                if (type === 'WS_SEND_MESSAGE') {
                    // функция для отправки сообщения на сервер
                    socket.send(JSON.stringify(payload));
                }

                if (type === 'WS_CONNECTION_CLOSED') {
                    socket.close();
                }
            }

            next(action);
        };
    }) as Middleware;
};