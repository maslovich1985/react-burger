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

            const bunFinder = (id) => {
                const bunIndex = state.ingredients.findIndex(ingredient => ingredient._id === id && ingredient.type === 'bun');
                return bunIndex !== -1;
            }
            const bunType = (item) => item.type === 'bun';
            const increaseCounter = [...state.ingredients.map((item) => item._id === increasedId
                ? ({...item, count: bunType(item) && item.count === 0
                        ? item.count + 2
                        : bunType(item) && item.count !== 0
                        ? item.count
                            : item.count + 1 })
                : bunFinder(increasedId) && bunType(item) ? ({...item, count: 0 })
                    : item)];
            return {...state, ingredients: increaseCounter };

        case DECREASE_INGREDIENTS_COUNTER:
            const decreasedId = action.payload;
            const decreaseCounter = [...state.ingredients.map((item) => item._id === decreasedId ? ({...item, count: item.count - 1 }) : item)];
            return {...state, ingredients: decreaseCounter };

        default:
            return state;
    }
};
export default ingredientsListReducer;