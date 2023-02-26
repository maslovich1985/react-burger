import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { Provider } from "react-redux";
import {configureStore} from "./utils/services/redux/store";
import initState from "./utils/services/redux/initState";

export const store = configureStore(initState);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><App /></Provider>);

