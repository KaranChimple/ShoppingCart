import { ActionTypes, actionSubTypes } from "../actionTypes";

const {L, F} = actionSubTypes;

const initialState = {
    itemsList: [],
    loading: false,
    error: false
}

export default function itemsReducer(state = initialState, action = {}) {
    switch (action?.type) {
        case ActionTypes.FETCH_LIST + L: {
            return {...state, loading: true};
        }
        case ActionTypes.FETCH_LIST + F: {
            return {...state, loading: false, error: true, itemsList: []};
        }
        case ActionTypes.FETCH_LIST: {
            return {...state, loading: false, error: false, itemsList: action?.payload};
        }
        default:
            return state;
    }
}