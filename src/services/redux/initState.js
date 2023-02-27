import {ingredientsListState} from "./reducers/ingredientsListReducer";
import {ingredientDetailsState} from "./reducers/viewedIngredientReducer";
import {orderState} from "./reducers/orderReducer";
import {burgerIngredientsState} from "./reducers/burgerIngredientsReducer";

const initState = {
    ingredients: ingredientsListState,
    burgerIngredients: burgerIngredientsState,
    orderInfo: orderState,
    viewedIngredient: ingredientDetailsState,
};

export default initState;