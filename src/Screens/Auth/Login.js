import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import ImgLogin from '../../Helpers/Image/signins.png';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Loader from '../../Components/Loader';

function Login(props) {
  const [hidePassword, setHidePassword] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const handleLogin = () => {
    setLoading(true);
  };

  return (
    <View style={style.container}>
      {loading && <Loader loading={loading} setLoading={setLoading} />}
      <Image
        source={ImgLogin}
        style={{
          width: 180,
          height: 65,
          marginTop: 100,
          marginLeft: 15,
          marginBottom: 60,
        }}
      />
      <Input
        placeholder="username ..."
        inputContainerStyle={style.input}
        inputStyle={style.inputText}
      />
      <Input
        secureTextEntry={hidePassword ? true : false}
        placeholder="password ..."
        rightIcon={
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Icons
              name={hidePassword ? 'eye-slash' : 'eye'}
              size={15}
              color="grey"
            />
          </TouchableOpacity>
        }
        rightIconContainerStyle={{paddingRight: 20}}
        inputContainerStyle={style.input}
        inputStyle={style.inputText}
      />
      <TouchableOpacity style={style.touchForgot}>
        <Text
          style={style.textForgot}
          onPress={() => props.navigation.navigate('ForgotPassword')}>
          Forgot Your Password ?
        </Text>
      </TouchableOpacity>
      <Button
        title="Sign In"
        buttonStyle={style.button1}
        titleStyle={style.text1}
        onPress={handleLogin}
      />
    </View>
  );
}

const style = StyleSheet.create({
  textOverlay: {color: 'black', fontWeight: 'bold', fontSize: 15},
  buttonOverlay: {
    marginTop: 20,
    marginHorizontal: 80,
    borderRadius: 10,
    width: 100,
    height: 35,
    backgroundColor: '#fbaf02',
    alignSelf: 'center',
  },
  container: {flex: 1, backgroundColor: 'white'},
  textTitle: {flex: 1, backgroundColor: 'white'},
  textMargin: {marginHorizontal: 30, marginTop: 40},
  input: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomWidth: 0,
    width: 280,
    alignSelf: 'center',
    backgroundColor: '#F5F5F5',
    marginBottom: 15,
    paddingLeft: 10,
  },
  button1: {
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 35,
    width: 200,
    height: 50,
    backgroundColor: '#fbaf02',
    alignSelf: 'center',
    marginRight: -160,
    marginTop: 100,
  },
  buttons: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#d55749',
    width: 120,
    height: 40,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginRight: -160,
    marginTop: 35,
    marginLeft: 50,
  },
  buttons2: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#4b526f',
    width: 120,
    height: 40,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginRight: -160,
    marginTop: 35,
    marginLeft: 180,
  },
  text1: {color: 'black', fontWeight: 'bold', fontSize: 18},
  texts: {color: '#d55749', fontWeight: 'bold', fontSize: 15},
  texts2: {color: '#4b526f', fontWeight: 'bold', fontSize: 15},
  textForgot: {
    marginTop: 10,
    fontSize: 14,
    color: '#737277',
  },
  touchForgot: {marginLeft: 120, alignSelf: 'center'},
  inputText: {paddingLeft: 25, fontSize: 15},
  or: {textAlign: 'center', marginTop: 20, fontSize: 16},
  brand: {width: 70, height: 45, marginTop: 20, margin: 10},
});
export default Login;
