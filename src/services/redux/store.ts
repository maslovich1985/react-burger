import thunk, {ThunkAction} from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./reducers/rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {ViewedIngredientActionType} from "./types/viewedIngredientTypes";
import {BurgerIngredientsActionType} from "./types/burgerIngredientsTypes";
import {IngredientsListActionType} from "./types/ingredientsListTypes";
import {OrderActionType} from "./types/orderTypes";
import {UserActionType} from "./types/userTypes";
import {WsActionType} from "./types/wsTypes";
import {socketMiddleware} from "./socketMiddleware";


export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, socketMiddleware()))
);

export type RootState = ReturnType<typeof rootReducer>;

export type AppActions = {
    type:
        | UserActionType
        | OrderActionType
        | IngredientsListActionType
        | BurgerIngredientsActionType
        | ViewedIngredientActionType
        | WsActionType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
};

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AppActions
>;

