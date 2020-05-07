import {
  BROWSE_ITEM,
  DETAIL_ITEM,
  BROWSE_DRINK,
  BROWSE_FOOD,
  USER_ITEM,
} from './actionTypes';
import {getData} from '../../Helpers/CRUD';

export const getItems = () => async dispatch => {
  try {
    const response = await getData('browse-items');
    if (response.data && response.data.success) {
      await dispatch({
        type: BROWSE_ITEM,
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

export const getItemID = id => async dispatch => {
  try {
    const response = await getData(`detail-items/${id}`);
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

export const getItemFood = () => async dispatch => {
  try {
    const response = await getData(`browse-category/1`);
    if (response.data && response.data.success) {
      await dispatch({
        type: BROWSE_FOOD,
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

export const getItemDrink = () => async dispatch => {
  try {
    const response = await getData(`browse-category/2`);
    if (response.data && response.data.success) {
      await dispatch({
        type: BROWSE_DRINK,
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

export const itemRestoUser = () => async dispatch => {
  try {
    const response = await getData(`items`);
    if (response.data) {
      await dispatch({
        type: USER_ITEM,
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
