import {BROWSE_CART, DETAIL_CART} from '../Action/actionTypes';
const initialState = {
  dataCart: [],
  dataCartID: {},
};

export default function cartData(state = initialState, action) {
  switch (action.type) {
    case BROWSE_CART:
      return {
        ...state,
        dataCart: action.payload,
      };
    case DETAIL_CART:
      return {
        ...state,
        dataCartID: action.data,
      };
    default:
      return state;
  }
}
