import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./reducers/rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {ViewedIngredientActionType} from "./types/viewedIngredientTypes";
import {BurgerIngredientsActionType} from "./types/burgerIngredientsTypes";
import {IngredientsListActionType} from "./types/ingredientsListTypes";
import {OrderActionType} from "./types/orderTypes";
import {UserActionType} from "./types/userTypes";


export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export type AppActions = {
    type:
        | ViewedIngredientActionType
        | BurgerIngredientsActionType
        | IngredientsListActionType
        | OrderActionType
        | UserActionType;
    payload?: any;
};

