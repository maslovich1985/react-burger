import burgerIngredients, {burgerIngredientsState} from "../burgerIngredientsReducer.ts";
import {ADD_TO_CONSTRUCTOR, REMOVE_FROM_CONSTRUCTOR} from "../../types/burgerIngredientsTypes.ts";
import {ingredient} from "./mockData.js";

describe('Ingredients reducers', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should return the initial state', () => {
        expect(burgerIngredients(undefined, {payload: undefined})).toEqual(
            burgerIngredientsState
        );
    });

    it('remove ingredient', () => {
        expect(
            burgerIngredients([{...ingredient, id: '_id'}], {
                type: REMOVE_FROM_CONSTRUCTOR,
                payload: '_id',
            })
        ).toEqual({0: {...ingredient, id: '_id'}, burgerIngredients: undefined});
    });

    it('add ingredient type === "bun"', () => {
        expect(
            burgerIngredients(burgerIngredientsState, {
                type: ADD_TO_CONSTRUCTOR,
                payload: {ingredient, id: 'generatedId'},
            })
        ).toEqual({burgerIngredients: [{id: "generatedId", ingredient: {...ingredient}}]})
    });

    it('add ingredient type === "sauce"', () => {
        expect(
            burgerIngredients(burgerIngredientsState, {
                type: ADD_TO_CONSTRUCTOR,
                payload: {
                    ingredient: {...ingredient, type: 'sauce'},
                    id: 'generatedId',
                },
            })
        ).toEqual({
            burgerIngredients: [{
                id: "generatedId",
                ingredient: {...ingredient, type: 'sauce'}
            }]
        });
    });
});