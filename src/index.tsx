import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter as Router} from 'react-router-dom';
import App from './components/App/App';
import {Provider} from "react-redux";
import {store} from "./services/redux/store";


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
);

