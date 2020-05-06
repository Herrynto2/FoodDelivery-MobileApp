import axios from 'axios';
// import {BASE_URL} from 'react-native-dotenv';
import {store} from '../Redux/store';
// import NetInfo from '@react-native-community/netinfo';
// import { Toast } from 'native-base'

// function checkConnection() {
//   NetInfo.fetch().then(state => {
//     if (!state.isConnected) {
//       Toast.show({
//         text: 'No Internet Connection',
//         buttonText: 'Ok',
//         duration: 15000,
//         position: 'bottom',
//         type: "warning"
//       })
//     }
//   });
// }

function getConfig() {
  const config = {};
  const token = store.getState().userData.token;
  if (token) {
    config.headers = {Authorization: `Bearer ${token}`};
  }
  return config;
}

export const getData = async (dataUrl, formData) => {
  try {
    // checkConnection();
    const url = `http://192.168.43.51:3005/` + dataUrl;
    const response = await axios.get(url, getConfig());
    return response;
  } catch (err) {
    throw err;
  }
};
export const submitData = async (dataUrl, formData) => {
  try {
    // checkConnection();
    const url = `http://192.168.43.51:3005/` + dataUrl;
    const response = await axios.post(url, formData, getConfig());
    return response;
  } catch (err) {
    throw err;
  }
};

export const patchData = async (dataUrl, formData) => {
  try {
    // checkConnection();
    const url = `http://192.168.43.51:3005/` + dataUrl;
    const response = await axios.patch(url, formData, getConfig());
    return response;
  } catch (err) {
    throw err;
  }
};
