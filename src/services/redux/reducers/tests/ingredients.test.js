import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {ingredient} from './mockData';
import ingredientsListReducer, {ingredientsListState} from "../ingredientsListReducer.ts";
import {
    DECREASE_INGREDIENTS_COUNTER,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    INCREASE_INGREDIENTS_COUNTER
} from "../../types/ingredientsListTypes.ts";
import {NORMA_API} from "../../../../utils/burger-api.ts";
import {getIngredientsThunk} from "../../actions/ingredientsListActions.ts";

describe('Ingredients reducers', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    const fakeIngredientsData = {
        success: true,
        data: [ingredient],
    };
    const fakeIngredientsDataWithCount = [{...ingredient, count: 1}];

    it('should return the initial state', () => {
        expect(ingredientsListReducer(undefined, {payload: undefined})).toEqual(
            ingredientsListState
        );
    });

    it('decrease ingredient count', () => {
        expect(
            ingredientsListReducer(
                {
                    ingredients: [{...ingredient, count: 2}],
                    requestIsSent: false,
                    responseError: false,
                },
                {
                    type: DECREASE_INGREDIENTS_COUNTER,
                    payload: '_id',
                }
            )
        ).toEqual({
            ingredients: [{...ingredient, count: 1}],
            requestIsSent: false,
            responseError: false,
        });
    });

    it('increase ingredient count type = "bun"', () => {
        expect(
            ingredientsListReducer(
                {
                    ingredients: [{...ingredient}],
                    requestIsSent: false,
                    responseError: false,
                },
                {
                    type: INCREASE_INGREDIENTS_COUNTER,
                    payload: '_id',
                }
            )
        ).toEqual({
            ingredients: [{...ingredient, count: 2}],
            requestIsSent: false,
            responseError: false,
        });
    });

    it('increase ingredient count type !== "bun"', () => {
        expect(
            ingredientsListReducer(
                {
                    ingredients: [{...ingredient, type: 'sauce'}],
                    requestIsSent: false,
                    responseError: false,
                },
                {
                    type: INCREASE_INGREDIENTS_COUNTER,
                    payload: '_id',
                }
            )
        ).toEqual({
            ingredients: [{...ingredient, type: 'sauce', count: 2}],
            requestIsSent: false,
            responseError: false,
        });
    });

    it('returns the ingredients data when the API call is successful', async () => {
        // eslint-disable-next-line no-undef
        const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(fakeIngredientsData),
            ok: true,
        });
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const store = mockStore();

        await store.dispatch(getIngredientsThunk());
        const actions = store.getActions();
        expect(actions[0]).toMatchObject({
            type: GET_INGREDIENTS_REQUEST,
        });

        expect(actions[1]).toEqual(
            expect.objectContaining({
                type: GET_INGREDIENTS_SUCCESS,
                payload: fakeIngredientsDataWithCount,
            })
        );

        expect(mockFetch).toHaveBeenCalledWith(`${NORMA_API}/ingredients`);
    });
});