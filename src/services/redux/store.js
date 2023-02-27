import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

export const configureStore = (initState) => {
    const store = createStore(
        rootReducer,
        initState,
        composeWithDevTools(applyMiddleware(thunk))
    );

    return store;
}

