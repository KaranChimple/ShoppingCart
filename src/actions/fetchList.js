import { ActionTypes, actionSubTypes } from '../actionTypes';

const { L, F } = actionSubTypes;

export const getItemList = () => (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_LIST + L })
    try {
        fetch('https://my-json-server.typicode.com/benirvingplt/products/products')
        .then(res => res.json())
        .then(json => {
            dispatch({ type: ActionTypes.FETCH_LIST, payload: json });
        });
    } catch (err) {
        dispatch({ type: ActionTypes.FETCH_LIST + F, error: true });
    }
}