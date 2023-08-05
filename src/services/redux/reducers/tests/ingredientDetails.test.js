import {ingredient} from './mockData';
import burgerIngredientsReducer from "../viewedIngredientReducer.ts";
import {VIEW_DETAILS} from "../../types/viewedIngredientTypes.ts";

describe('Ingredient details reducers', () => {
    it('should return the initial state', () => {
        expect(burgerIngredientsReducer(undefined, {payload: undefined})).toEqual(
            {ingredientDetails: {}}
        );
    });

    it('set ingredient details', () => {
        expect(
            burgerIngredientsReducer(
                {},
                {
                    type: VIEW_DETAILS,
                    payload: ingredient,
                }
            )
        ).toEqual({ingredientDetails: ingredient});
    });
});