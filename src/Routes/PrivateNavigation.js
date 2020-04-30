import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './Components/Main';

function PrivateNavigation(props) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
}

export default PrivateNavigation;
