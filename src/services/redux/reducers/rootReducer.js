import { combineReducers } from "redux";
import viewedIngredientReducer from "./viewedIngredientReducer";
import orderReducer from "./orderReducer";
import burgerIngredientsReducer from './burgerIngredientsReducer';
import ingredientsListReducer from "./ingredientsListReducer"

const rootReducer = combineReducers({
    ingredients: ingredientsListReducer,
    burgerIngredients: burgerIngredientsReducer,
    orderInfo: orderReducer,
    viewedIngredient: viewedIngredientReducer,
});

export default rootReducer;