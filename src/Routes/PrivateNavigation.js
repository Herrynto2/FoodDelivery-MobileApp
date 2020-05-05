import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './Components/Main';
import TopUp from '../Screens/Profile/Topup';
import Carts from '../Screens/Carts/Cart';
import ProfileEdit from '../Screens/Profile/ProfileEdit';
import AdminsRestaurant from '../Screens/Profile/Admin';
import Settings from '../Screens/Profile/Setting';
import OnProgress from '../Components/OnProgress';
import RestaurantDetails from '../Screens/Restaurant/Detail';
import DetailItem from '../Screens/Home/Detail';
import ProductNavigation from './Components/ProductNavigation';

function PrivateNavigation(props) {
  const Stack = createStackNavigator();
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
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="AdminsRestaurant" component={AdminsRestaurant} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="OnProgress" component={OnProgress} />
      <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
    </Stack.Navigator>
  );
}

export default PrivateNavigation;
