import {
  USER_LOGIN,
  USER_LOGOUT,
  UPDATE_PROFILE,
  GET_PROFILE,
  USER_RESTAURANT,
  USER_ITEM,
} from '../Action/actionTypes';
const initialState = {
  token: '',
  isLogin: false,
  dataProfile: {},
  dataUser: {},
  dataProfileResto: [],
  dataItem: [],
};

export default function userData(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLogin: true,
        dataProfile: action.payload,
        ...action.payload,
      };
    case USER_LOGOUT:
      return initialState;
    case UPDATE_PROFILE:
      return {
        ...state,
        dataProfile: action.payload,
      };
    case GET_PROFILE:
      return {
        ...state,
        dataUser: action.payload,
      };
    case USER_RESTAURANT:
      return {
        ...state,
        dataProfileResto: action.payload,
      };
    case USER_ITEM:
      return {
        ...state,
        dataItem: action.payload,
      };
    default:
      return state;
  }
}
