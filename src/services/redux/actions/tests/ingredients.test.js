import {decreaseIngredientCounter, increaseIngredientCounter} from "../ingredientsListActions.ts";
import {DECREASE_INGREDIENTS_COUNTER, INCREASE_INGREDIENTS_COUNTER} from "../../types/ingredientsListTypes.ts";


describe('Ingredients action creators', () => {
    it('Увеличение количества ингредиентов на 1', () => {
        const id = '60d3b41abdacab0026a733c6';
        const expectedAction = {
            type: INCREASE_INGREDIENTS_COUNTER,
            payload: id,
        };
        expect(increaseIngredientCounter(id)).toEqual(expectedAction);
    });

    it('Уменьшение количества ингредиентов на 1', () => {
        const id = '60d3b41abdacab0026a733c6';
        const expectedAction = {
            type: DECREASE_INGREDIENTS_COUNTER,
            payload: id,
        };
        expect(decreaseIngredientCounter(id)).toEqual(expectedAction);
    });
});