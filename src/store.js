import itemsReducer from './reducers/itemsReducer';
import {applyMiddleware, compose, legacy_createStore as createStore, combineReducers} from 'redux';
import ReduxThunk from 'redux-thunk';
import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
    items: itemsReducer,
    cart: cartReducer
});

let store = compose(applyMiddleware(ReduxThunk))(createStore)(rootReducer);

export default store;