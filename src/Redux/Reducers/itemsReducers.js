import {
  BROWSE_ITEM,
  DETAIL_ITEM,
  BROWSE_DRINK,
  BROWSE_FOOD,
} from '../Action/actionTypes';
const initialState = {
  dataItems: [],
  dataItemID: {},
  dataFood: [],
  dataDrink: [],
};

export default function itemsData(state = initialState, action) {
  switch (action.type) {
    case BROWSE_ITEM:
      return {
        ...state,
        dataItems: action.payload,
      };
    case DETAIL_ITEM:
      return {
        ...state,
        dataItemID: action.data,
      };
    case BROWSE_FOOD:
      return {
        ...state,
        dataFood: action.payload,
      };
    case BROWSE_DRINK:
      return {
        ...state,
        dataDrink: action.payload,
      };

    default:
      return state;
  }
}
