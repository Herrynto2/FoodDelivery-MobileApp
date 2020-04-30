import React from 'react';
import Routes from './src/Routes/MainNavigation';
import {View, Text} from 'react-native';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './src/Redux/store';
// import SplashScreen from 'react-native-splash-screen';

function App(props) {
  return (
    <>
      <Routes />
    </>
    // <Provider store={store}>
    //   <PersistGate persistor={persistor}>

    //   </PersistGate>
    // </Provider>
  );
}
export default App;
