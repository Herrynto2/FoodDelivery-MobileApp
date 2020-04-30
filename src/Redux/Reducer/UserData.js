import {USER_LOGIN, USER_LOGOUT, UPDATE_PROFILE} from '../Action/ActionTypes';
const initialState = {
  token: '',
  isLogin: false,
  dataProfile: {},
};

export default function userData(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLogin: true,
        ...action.payload,
      };
    case USER_LOGOUT:
      return initialState;
    case UPDATE_PROFILE:
      return {
        ...state,
        dataProfile: action.payload,
      };
    default:
      return state;
  }
}
