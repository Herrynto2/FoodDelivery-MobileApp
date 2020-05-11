import React from 'react';
import {YellowBox} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './Components/Main';
import TopUp from '../Screens/Profile/Topup';
import Carts from '../Screens/Carts/Cart';
import CartDetail from '../Screens/Carts/CartDetail';
import ProfileEdit from '../Screens/Profile/ProfileEdit';
import AdminsRestaurant from '../Screens/Profile/Admin';
import Settings from '../Screens/Profile/Setting';
import OnProgress from '../Components/OnProgress';
import RestaurantDetails from '../Screens/Restaurant/Detail';
import DetailItem from '../Screens/Home/Detail';
import ProductNavigation from './Components/ProductNavigation';
import Food from '../Screens/Item/Food';
import Drink from '../Screens/Item/Drink';
import Items from '../Screens/Item/Items';
import ItemCreate from '../Screens/Profile/Components/ItemCreate';
import RestaurantCreate from '../Screens/Profile/Components/RestaurantCreate';
import ItemSearch from '../Screens/Item/ItemSearch';
import {itemRestoUser} from '../Redux/Action/ItemAction';
import {profileRestoUser} from '../Redux/Action/restaurantAction';
import {getProfile} from '../Redux/Action/userDataAction';
import {getCart} from '../Redux/Action/cartAction';
import {useDispatch} from 'react-redux';

YellowBox.ignoreWarnings([`Warning: Can't perform a React state`]);

function PrivateNavigation(props) {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(profileRestoUser());
    dispatch(itemRestoUser());
    dispatch(getProfile());
    dispatch(getCart());
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="ProductNavigation" component={ProductNavigation} />
      <Stack.Screen name="DetailItem" component={DetailItem} />
      <Stack.Screen name="TopUp" component={TopUp} />
      <Stack.Screen name="Carts" component={Carts} />
      <Stack.Screen name="CartDetail" component={CartDetail} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="AdminsRestaurant" component={AdminsRestaurant} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="OnProgress" component={OnProgress} />
      <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
      <Stack.Screen name="Food" component={Food} />
      <Stack.Screen name="Drink" component={Drink} />
      <Stack.Screen name="Items" component={Items} />
      <Stack.Screen name="RestaurantCreate" component={RestaurantCreate} />
      <Stack.Screen name="ItemCreate" component={ItemCreate} />
      <Stack.Screen name="ItemSearch" component={ItemSearch} />
    </Stack.Navigator>
  );
}

export default PrivateNavigation;
