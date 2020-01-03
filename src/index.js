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
    id: 1,
    source: 'error'
}
function reducer(state = initialState, action) {
    switch(action.type) {
        case "PURCHASE":
        return {
            name: action.name,
            price: action.price,
            id: action.id,
            source: action.source,
            externalId: action.externalId
        }
        default:
            return state;
    }
}
const store = createStore(reducer);
store.dispatch({type: "PURCHASE2"});
localStorage.setItem('currentUserId', '4b12111b-05dd-41c6-8659-08d78f8cba97');
const rootElement = document.getElementById('root');
console.log('env: ' + process.env.REACT_APP_ACCOUNT_URL);
console.log('xxx: ' + Object.keys(process.env));
document.body.style = 'background: #F5F5F5;';
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
