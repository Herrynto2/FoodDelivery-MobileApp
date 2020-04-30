import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from '../Screens/Auth/StartScreen';
import LoginScreen from '../Screens/Auth/Login';
import RegisterScreen from '../Screens/Auth/Register';
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import VerifyScreen from '../Screens/Auth/Verify';

function PublicNavigation(props) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Verify" component={VerifyScreen} />
    </Stack.Navigator>
  );
}

export default PublicNavigation;
