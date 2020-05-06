import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  CHANGE_PASSWORD,
  UPDATE_PROFILE,
  USER_TOPUP,
  GET_PROFILE,
} from './actionTypes';
import {getData, submitData, patchData} from '../../Helpers/CRUD';

export const userLogin = data => async dispatch => {
  try {
    const response = await submitData('login', data);
    if (response.data && response.data.success) {
      await dispatch({
        type: USER_LOGIN,
        payload: response.data.data,
      });
    }
    return response;
  } catch (err) {
    // if (!(err.message === 'Network Error')) {
    //   throw err;
    // }
  }
};
export const userLogout = () => async dispatch => {
  await dispatch({
    type: USER_LOGOUT,
  });
  // await dispatch({
  //   type: CLEAR_HISTORY,
  // });
};

export const userRegister = data => async dispatch => {
  try {
    const response = await submitData('register', data);
    if (response.data && response.data.success) {
      await dispatch({
        type: USER_REGISTER,
        payload: response.data.data,
      });
    }
    return response;
  } catch (err) {
    // if (!(err.message === 'Network Error')) {
    //   throw err;
    // }
  }
};

export const changePassword = data => async dispatch => {
  try {
    console.log(data);
    const response = await patchData(`forgot-password`, data);
    console.log('res', response.data);
    if (response.data && response.data.success) {
      await dispatch({
        type: CHANGE_PASSWORD,
        payload: response.data.data,
      });
    }
    return response;
  } catch (err) {
    // if (!(err.message === 'Network Error')) {
    //   throw err;
    // }
  }
};

export const updateProfile = data => async dispatch => {
  try {
    const response = await patchData('profile', data);
    if (response.data && response.data.success) {
      await dispatch({
        type: UPDATE_PROFILE,
        payload: response.data.data,
      });
    }
    return response.data;
  } catch (err) {
    // if (!(err.message === 'Network Error')) {
    //   throw err;
    // }
  }
};

export const getProfile = () => async dispatch => {
  try {
    const response = await getData('profile');
    if (response.data && response.data.success) {
      await dispatch({
        type: GET_PROFILE,
        payload: response.data.data[0][0],
      });
    }
    return response.data;
  } catch (err) {
    // if (!(err.message === 'Network Error')) {
    //   throw err;
    // }
  }
};

export const topUp = data => async dispatch => {
  try {
    const response = await patchData('topup', data);
    if (response.data && response.data.success) {
      await dispatch({
        type: USER_TOPUP,
        payload: response.data.data,
      });
    }
    return response.data;
  } catch (err) {
    // if (!(err.message === 'Network Error')) {
    //   throw err;
    // }
  }
};
