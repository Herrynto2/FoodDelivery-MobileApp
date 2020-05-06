import {BROWSE_RESTAURANT, DETAIL_RESTAURANT} from '../Action/actionTypes';
const initialState = {
  dataRestaurant: [],
  dataRestaurantID: {},
};

export default function restaurantData(state = initialState, action) {
  switch (action.type) {
    case BROWSE_RESTAURANT:
      return {
        ...state,
        dataRestaurant: action.payload,
      };
    case DETAIL_RESTAURANT:
      return {
        ...state,
        dataRestaurantID: action.data,
      };

    default:
      return state;
  }
}
