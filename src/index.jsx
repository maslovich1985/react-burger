import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { Provider } from "react-redux";
import {configureStore} from "./services/redux/store";
import initState from "./services/redux/initState";

export const store = configureStore(initState);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><App /></Provider>);

