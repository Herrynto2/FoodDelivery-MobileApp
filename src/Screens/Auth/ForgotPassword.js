import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import keys from '../../Helpers/Image/keys.png';
import {Input, Button} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Loader from '../../Components/Loader';

function ForgotPassword(props) {
  const [hidePassword, setHidePassword] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const handleChangePass = () => {
    setLoading(true);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {loading && <Loader loading={loading} setLoading={setLoading} />}
      <ScrollView>
        <Image source={keys} style={style.brand} />
        <Text style={style.textTitle}>Forgot</Text>
        <Text style={style.textTitle}>Your Password</Text>
        <View style={{marginTop: 14, marginBottom: 40}}>
          <Text style={style.textSmall}>
            Enter your new password and must be
          </Text>
          <Text style={style.textSmall}>same for confirm password</Text>
        </View>
        <Input
          placeholder="username"
          leftIcon={{type: 'font-awesome'}}
          inputContainerStyle={style.input}
          inputStyle={style.inputText}
          // onChangeText={username => this.setState({username})}
          // value={this.state.username}
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
          inputStyle={{...style.inputText, marginLeft: 15}}
        />
        <Input
          secureTextEntry={hidePassword ? true : false}
          placeholder="Confirm Password"
          leftIcon={{type: 'font-awesome'}}
          inputContainerStyle={style.input}
          inputStyle={style.inputText}
          labelStyle={style.inputLabel}
        />
        <Button
          title="Send"
          buttonStyle={style.button1}
          titleStyle={style.text1}
          onPress={handleChangePass}
          // onPress={() => props.navigation.navigate('Verify')}
        />
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  brand: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 40,
    marginTop: 80,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#737277',
  },
  textSmall: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#bababa',
  },
  input: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomWidth: 0,
    width: 250,
    alignSelf: 'center',
    backgroundColor: '#F5F5F5',
    marginBottom: 15,
    paddingLeft: 10,
  },
  button1: {
    marginHorizontal: 30,
    borderRadius: 50,
    width: 250,
    height: 50,
    backgroundColor: '#fbaf02',
    alignSelf: 'center',
  },
  text1: {color: 'white', fontWeight: 'bold'},
  inputLabel: {textAlign: 'center'},
  inputText: {paddingLeft: 10, fontSize: 15},
});

export default ForgotPassword;
