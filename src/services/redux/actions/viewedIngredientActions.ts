import {VIEW_DETAILS} from "../types/viewedIngredientTypes";
import {AppActions} from "../store";
import {IngredientWithCount} from "../../../components/BurgerIngredients/IngredientsType/IngredientCard/IngredientCard";

export const getIngredientDetails = (ingredient: IngredientWithCount | undefined): AppActions => {
    return {
        type: VIEW_DETAILS,
        payload: ingredient,
    };
};