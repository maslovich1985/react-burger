import {useDispatch as dispatchHook} from 'react-redux/es/hooks/useDispatch';
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppActions, AppThunk, RootState} from "./store";
import {ThunkDispatch} from "redux-thunk";

export type AppDispatch<TReturnType = void> = ThunkDispatch<
    RootState,
    unknown,
    AppActions
> & ((action: AppActions | AppThunk<TReturnType>) => TReturnType);


export const useAppDispatch: () => AppDispatch<void> = dispatchHook;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;