import {VIEW_DETAILS, ViewedIngredientActionType} from "../types/viewedIngredientTypes";
import {IngredientWithCount} from "../../../components/BurgerIngredients/IngredientsType/IngredientCard/IngredientCard";

interface InitialState {
    ingredientDetails: IngredientWithCount | {};
}

export const ingredientDetailsState: InitialState = {
    ingredientDetails: {}
};

export interface ViewedIngredientAction {
    type: ViewedIngredientActionType;
    payload?: any;
}

const burgerIngredientsReducer = (state = ingredientDetailsState, action: ViewedIngredientAction) => {
    switch (action.type) {
        case VIEW_DETAILS:
            return {...state, ingredientDetails: action.payload};

        default:
            return state;
    }
};
export default burgerIngredientsReducer;