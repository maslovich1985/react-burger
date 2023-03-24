import { VIEW_DETAILS } from "../types/viewedIngredientTypes";

export const ingredientDetailsState = {
    ingredientDetails: {}
};

const burgerIngredientsReducer = (state = ingredientDetailsState, action) => {
    switch (action.type) {
        case VIEW_DETAILS:
            return {...state, ingredientDetails: action.payload};

        default:
            return state;
    }
};
export default burgerIngredientsReducer;