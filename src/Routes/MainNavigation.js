import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PrivateNavigator from './PrivateNavigation';
import PublicNavigator from './PublicNavigation';
// import Splash from '../Screens/Splash/Splash';
// import { useSelector, useDispatch } from 'react-redux';
// import { userLogout } from '../Redux/actions/userDataAction';
// import jwt_decode from 'jwt-decode';

function MainRoutes(props) {
  //   const {isLogin, token} = useSelector(state => state.userData);
  const [isLogin, setLogin] = React.useState(true);
  //   const dispatch = useDispatch();
  //   if (isLogin && token) {
  //     const payload = jwt_decode(token);
  //     if (new Date(payload.exp * 1000).getTime() - new Date().getTime() <= 0) {
  //       dispatch(userLogout());
  //     }
  if (isLogin === false) {
    return <PrivateNavigator />;
  } else {
    return <PublicNavigator />;
  }
}

function MainNavigation(props) {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {/* <Stack.Screen name="Splash" component={Splash} /> */}
        <Stack.Screen name="MainRoutes" component={MainRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MainNavigation;
