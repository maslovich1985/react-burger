import {
    DECREASE_INGREDIENTS_COUNTER,
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    INCREASE_INGREDIENTS_COUNTER,
    IngredientsListActionType
} from "../types/ingredientsListTypes";
import {Ingredient} from "../../../pages/IngredientPage/IngredientPage";
import {IngredientWithCount} from "../../../components/BurgerIngredients/IngredientsType/IngredientCard/IngredientCard";

interface InitialState {
    ingredients: IngredientWithCount[] | [];
    requestIsSent: boolean,
    responseError: boolean,
}

export const ingredientsListState: InitialState = {
    ingredients: [],
    requestIsSent: false,
    responseError: false,
}

export interface IngredientsListAction {
    type: IngredientsListActionType;
    payload: Ingredient[] | string;
}


const ingredientsListReducer = (state = ingredientsListState, action: IngredientsListAction) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {...state, requestIsSent: true};

        case GET_INGREDIENTS_SUCCESS:
            const data = action.payload;
            const ingredientsWithCounter = typeof data !== 'string' ? data.map((item: Ingredient) => ({
                ...item,
                count: 0
            })) : [];
            return {...state, ingredients: ingredientsWithCounter, requestIsSent: false, responseError: false};

        case GET_INGREDIENTS_ERROR:
            return {...state, requestIsSent: false, responseError: true};

        case INCREASE_INGREDIENTS_COUNTER:
            const id = action.payload;
            const increasedIngredient = state.ingredients.find(ingredient => ingredient._id === id);
            const updateIngredients = state.ingredients.map((item) => {
                if (item._id !== id) {
                    if (item.type === 'bun' && increasedIngredient && increasedIngredient.type === 'bun') {
                        item.count = 0;
                        return item;
                    }
                    return item;
                }
                item.count = item.type === 'bun' ? 2 : item.count + 1;
                return item;
            });
            return {...state, ingredients: updateIngredients};

        case DECREASE_INGREDIENTS_COUNTER:
            const decreasedId = action.payload;
            const decreaseCounter = [...state.ingredients.map((item) => item._id === decreasedId ? ({
                ...item,
                count: item.count - 1
            }) : item)];
            return {...state, ingredients: decreaseCounter};

        default:
            return state;
    }
};
export default ingredientsListReducer;