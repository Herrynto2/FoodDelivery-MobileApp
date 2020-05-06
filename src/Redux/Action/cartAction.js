import {BROWSE_CART, DETAIL_CART, SAVE_ITEMS} from './actionTypes';
import {getData, patchData} from '../../Helpers/CRUD';

export const getCart = () => async dispatch => {
  try {
    const response = await getData('carts');
    if (response.data) {
      await dispatch({
        type: BROWSE_CART,
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

export const getCartID = id => async dispatch => {
  try {
    const response = await getData(`carts/${id}`);
    if (response.data && response.data.success) {
      await dispatch({
        type: DETAIL_ITEM,
        data: response.data,
      });
    }
    return response;
  } catch (err) {
    // if (!(err.message === 'Network Error')) {
    //   throw err;
    // }
  }
};
