import {BROWSE_RESTAURANT, DETAIL_RESTAURANT} from './actionTypes';
import {getData} from '../../Helpers/CRUD';

export const getRestaurant = () => async dispatch => {
  try {
    const response = await getData('browse-restaurant');
    if (response.data && response.data.success) {
      await dispatch({
        type: BROWSE_RESTAURANT,
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

export const getRestaurantID = id => async dispatch => {
  try {
    const response = await getData(`detail-restaurant/${id}`);
    if (response.data && response.data.success) {
      await dispatch({
        type: DETAIL_RESTAURANT,
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

export const restaurantAdmin = () => async dispatch => {
  try {
    const response = await getData('restaurant');
    if (response.data && response.data.success) {
      await dispatch({
        type: BROWSE_RESTAURANT,
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
