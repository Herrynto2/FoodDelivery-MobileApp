import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from '../../Screens/Home/Home';

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
        activeTintColor: '#50b5a6',
        inactiveTintColor: '#868989',
        showLabel: false,
        style: {
          position: 'relative',
          backgroundColor: '#fff',
        },
      }}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: true}} />
    </Tab.Navigator>
  );
}

export default Main;
