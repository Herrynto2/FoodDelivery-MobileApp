import {combineReducers} from 'redux';
import userData from './userDataReducers';
import restaurantData from './restaurantReducers';
import itemsData from './itemsReducers';
import cartData from './cartReducers';

export default combineReducers({userData, restaurantData, itemsData, cartData});
