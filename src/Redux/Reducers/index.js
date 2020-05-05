import {combineReducers} from 'redux';
import userData from './userDataReducers';
import restaurantData from './restaurantReducers';

export default combineReducers({userData, restaurantData});
