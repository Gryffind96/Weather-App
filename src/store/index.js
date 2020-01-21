

import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const initialState = {
    city: 'Barranquilla,co'
};

//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
);
