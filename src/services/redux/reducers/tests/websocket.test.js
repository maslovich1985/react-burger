import {initialState as wsInitialState, wsReducer} from '../websocket';
import {WS_CONNECTION_SUCCESS} from "../../types/wsTypes.ts";

describe('Websocket reducers', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, {payload: undefined})).toEqual(
            wsInitialState
        );
    });

    it('connection success reducer', () => {
        expect(
            wsReducer(wsInitialState, {
                type: WS_CONNECTION_SUCCESS,
                payload: {wsConnected: true},
            })
        ).toEqual({data: undefined, wsConnected: true});
    });
});