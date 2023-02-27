import { GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_ERROR, INCREASE_INGREDIENTS_COUNTER, DECREASE_INGREDIENTS_COUNTER } from "../types/ingredientsListTypes";

export const ingredientsListState = {
    ingredients: [],
    requestIsSent: false,
    responseError: false,
}

const ingredientsListReducer = (state = ingredientsListState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {...state, requestIsSent: true };

        case GET_INGREDIENTS_SUCCESS:
            const data = action.payload;
            const ingredientsWithCounter = data.map((item) => ({...item, count: 0}));
            return {...state, ingredients: ingredientsWithCounter, requestIsSent: false, responseError: false };

        case GET_INGREDIENTS_ERROR:
            return {...state, requestIsSent: false, responseError: true };

        case INCREASE_INGREDIENTS_COUNTER:
            const { id: increasedId } = action.payload;
            const increasedIngredient = state.ingredients.find(ingredient => ingredient._id === increasedId);
            const updateIngredients = state.ingredients.map((item) => {
                if (item._id !== increasedId) {
                    if (item.type === 'bun' && increasedIngredient.type === 'bun') {
                        item.count = 0;
                        return item;
                    }
                    return item;
                }
                item.count = item.type === 'bun' ? 2 : item.count + 1;
                return item;
            });
            return { ...state, ingredients: updateIngredients };

        case DECREASE_INGREDIENTS_COUNTER:
            const decreasedId = action.payload;
            const decreaseCounter = [...state.ingredients.map((item) => item._id === decreasedId ? ({...item, count: item.count - 1 }) : item)];
            return {...state, ingredients: decreaseCounter };

        default:
            return state;
    }
};
export default ingredientsListReducer;