import {ingredientsListState} from "./reducers/ingredientsListReducer";
import {ingredientDetailsState} from "./reducers/viewedIngredientReducer";
import {orderState} from "./reducers/orderReducer";
import {burgerIngredientsState} from "./reducers/burgerIngredientsReducer";

const initState = {
    ingredientsList: ingredientsListState,
    burgerIngredients: burgerIngredientsState,
    orderObject: orderState,
    viewedIngredient: ingredientDetailsState,
};

export default initState;