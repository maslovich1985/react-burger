import {combineReducers} from "redux";
import viewedIngredientReducer from "./viewedIngredientReducer";
import orderReducer from "./orderReducer";
import burgerIngredientsReducer from './burgerIngredientsReducer';
import ingredientsListReducer from "./ingredientsListReducer"
import userReducer from "./userReducer";
import {wsReducer} from "./websocket";

const rootReducer = combineReducers({
    ingredients: ingredientsListReducer,
    burgerIngredients: burgerIngredientsReducer,
    orderInfo: orderReducer,
    viewedIngredient: viewedIngredientReducer,
    userInfo: userReducer,
    ws: wsReducer,
});

export default rootReducer;