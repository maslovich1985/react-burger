import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {ingredient, orderData} from './mockData';
import {NORMA_API} from "../../../../utils/burger-api.ts";
import orderInfo, {orderState} from "../orderReducer.ts";
import {GET_ORDER_REQUEST, GET_ORDER_SUCCESS} from "../../types/orderTypes.ts";
import {getOrderThunk} from "../../actions/orderActions.ts";

describe('Order reducers', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return the initial state', () => {
        expect(orderInfo(undefined, {payload: undefined})).toEqual(
            orderState
        );
    });

    it('returns the order data when the API call is successful', async () => {
        // eslint-disable-next-line no-undef
        const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(orderData),
            ok: true,
        });
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const store = mockStore();

        await store.dispatch(getOrderThunk([ingredient]));
        const actions = store.getActions();

        expect(actions[0]).toMatchObject({
            type: GET_ORDER_REQUEST,
        });

        expect(actions[1]).toEqual(
            expect.objectContaining({
                type: GET_ORDER_SUCCESS,
                payload: orderData,
            })
        );

        expect(mockFetch).toHaveBeenCalledWith(`${NORMA_API}/orders`, {
            body: '{"ingredients":["_id"]}',
            headers: {
                Authorization: undefined,
                'Content-Type': 'application/json;charset=utf-8',
            },
            method: 'POST',
        });
    });
});