import { ActionTypes, actionSubTypes } from "../actionTypes";
import {uniqBy} from 'lodash';

const {L, F} = actionSubTypes;

const initialState = {
    cartList: [],
    loading: false,
    error: false
}

export default function cartReducer(state = initialState, action = {}) {
    switch (action?.type) {
        case ActionTypes.ADD_TO_CART + L: {
            return {...state, loading: true};
        }
        case ActionTypes.ADD_TO_CART + F: {
            return {...state, loading: false, error: true, cartList: []};
        }
        case ActionTypes.ADD_TO_CART: {
            const currentListItem = action?.payload;
            const type = currentListItem?.type;
            const count = currentListItem?.count ? currentListItem.count + 1 : 1;
            const cartItem = {...currentListItem, count: count};
            let updatedList = null;
            const item = state.cartList.find(
                product => product.id === currentListItem.id,
              );
            
              if (item) {
                return {
                  ...state,
                  loading: false, error: false,
                  cartList: state.cartList.map(item => item.id === currentListItem.id
                    ? {
                      ...item,
                      count: type === 'ADD' ? item.count + 1 : Math.max(item.count - 1, 0),
                    }
                    : item
                  )
                };
              } else {
            updatedList = uniqBy([...state.cartList, cartItem], 'id');
            }
            return {...state, loading: false, error: false, cartList: updatedList};
        }
        default:
            return state;
    }
}