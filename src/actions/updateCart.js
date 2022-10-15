import { ActionTypes, actionSubTypes } from '../actionTypes';

const { L, F } = actionSubTypes;

export const updateCart = (item = {}, type = '') => (dispatch) => {
    dispatch({ type: ActionTypes.ADD_TO_CART + L });

    try {
        dispatch({ type: ActionTypes.ADD_TO_CART, payload: {...item, type} });
    } catch (e) {
        dispatch({ type: ActionTypes.ADD_TO_CART + F, error: true });
    }
}