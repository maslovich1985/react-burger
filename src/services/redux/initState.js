import {ingredientsListState} from "./reducers/ingredientsListReducer";
import {ingredientDetailsState} from "./reducers/viewedIngredientReducer";
import {orderState} from "./reducers/orderReducer";
import {burgerIngredientsState} from "./reducers/burgerIngredientsReducer";
import {userState} from "./reducers/userReducer";

const initState = {
    ingredients: ingredientsListState,
    burgerIngredients: burgerIngredientsState,
    orderInfo: orderState,
    viewedIngredient: ingredientDetailsState,
    userInfo: userState
};

export default initState;