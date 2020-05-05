import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from '../../Screens/Home/Home';
import Profile from '../../Screens/Profile/Profile';
import Restaurant from '../../Screens/Restaurant/Restaurant';
import Product from '../../Screens/Item/Items';

function Main(props) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Product':
              iconName = 'utensils';
              break;
            case 'Restaurant':
              iconName = 'store';
              break;
            case 'Profile':
              iconName = 'portrait';
              break;
            default:
              iconName = 'opencart';
              break;
          }
          return <Icon name={iconName} size={22} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#868989',
        inactiveTintColor: '#eae8e8',

        showLabel: false,
        style: {
          position: 'relative',
          backgroundColor: '#fff',
        },
      }}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: true}} />
      <Tab.Screen name="Product" component={Product} />
      <Tab.Screen name="Restaurant" component={Restaurant} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default Main;
