import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux';

const initialState = {
    name: 'none',
    price: '0.00',
    id: 1
}
function reducer(state = initialState, action) {
    switch(action.type) {
        case "PURCHASE":
        return {
            name: action.name,
            price: action.price,
            id: action.id,
        }
        default:
            return state;
    }
}
const store = createStore(reducer);
store.dispatch({type: "PURCHASE2"});
const rootElement = document.getElementById('root')
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
