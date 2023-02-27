import {ADD_TO_CONSTRUCTOR, MOVE_IN_CONSTRUCTOR, REMOVE_FROM_CONSTRUCTOR} from "../types/burgerIngredientsTypes";

export const burgerIngredientsState = {
    burgerIngredients: [],
}

const burgerIngredients = (state = burgerIngredientsState, action) => {
    switch (action.type) {
        case ADD_TO_CONSTRUCTOR:
            const ingredient = action.payload;
            if (ingredient.type === 'bun') {
                if (state.burgerIngredients.length === 0) {
                    return {...state, burgerIngredients: [ingredient, ingredient]}
                }
                const sameBun = state.burgerIngredients.some(burgerIngredient => burgerIngredient._id === ingredient._id);
                const anotherBun = !sameBun && state.burgerIngredients.some(burgerIngredient => burgerIngredient.type === 'bun');
                if (sameBun) {
                    return state;
                } else if (anotherBun) {
                    const burgerData = [...state.burgerIngredients];
                    burgerData.splice(0, 1, ingredient);
                    burgerData.splice(burgerData.length - 1, 1, ingredient);
                    return {...state, burgerIngredients: burgerData};
                } else {
                    return {...state, burgerIngredients: [ingredient, ...state.burgerIngredients, ingredient]};
                }
            }
            if (state.burgerIngredients.length === 0) {
                return {...state, burgerIngredients: [ingredient]}
            }
            const burgerData = [...state.burgerIngredients];
            burgerData.splice(1, 0, ingredient);
            return {...state, burgerIngredients: burgerData};

        case REMOVE_FROM_CONSTRUCTOR:
            const i = action.payload;
            const burgerIngredients = [...state.burgerIngredients];
            burgerIngredients.splice(i, 1);
            return {...state, burgerIngredients};

        case MOVE_IN_CONSTRUCTOR:
            const {prevId, nextId} = action.payload;
            const burgerItems = [...state.burgerIngredients];
            const prevIndex = burgerItems.findIndex(item => item._id === prevId);
            const nextIndex = burgerItems.findIndex(item => item._id === nextId);
            const movedItems = burgerItems.splice(prevIndex, 1);
            burgerItems.splice(nextIndex, 0, movedItems[0]);
            return {...state, burgerIngredients: burgerItems};

        default:
            return state;
    }
};
export default burgerIngredients;
