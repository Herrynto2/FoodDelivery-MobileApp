import {USER_LOGIN, USER_LOGOUT, UPDATE_PROFILE} from './actionTypes';
import {getData, submitData, patchData} from '../../Helpers/CRUD';

export const userLogin = data => async dispatch => {
  try {
    console.log('data', data);
    const response = await submitData('login', data);
    console.log('res', response);
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
// export const userLogout = () => async dispatch => {
//   await dispatch({
//     type: USER_LOGOUT,
//   });
//   await dispatch({
//     type: CLEAR_HISTORY,
//   });
// };
// export const updateProfile = () => async dispatch => {
//   try {
//     const response = await getData('profile');
//     if (response.data && response.data.success) {
//       await dispatch({
//         type: UPDATE_PROFILE,
//         payload: response.data.data,
//       });
//     }
//     return response.data;
//   } catch (err) {
//     if (!(err.message === 'Network Error')) {
//       throw err;
//     }
//   }
// };

// export const changePassword = data => async dispatch => {
//   try {
//     const response = await patchData('profile', data);
//     if (response.data && response.data.success) {
//       await dispatch({
//         type: USER_CHANGE_PASSWORD,
//         payload: response.data,
//       });
//     }
//     return response;
//   } catch (err) {
//     if (!(err.message === 'Network Error')) {
//       throw err;
//     }
//   }
// };
