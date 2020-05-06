import {Alert, Input} from 'react-native';

const CustomAlertCode = (success, msg, pressOK) => {
  Alert.alert(success ? 'Success' : 'Error', msg, [
    {text: 'Ok', onPress: pressOK},
  ]);
  <Input />;
};

export default CustomAlertCode;
