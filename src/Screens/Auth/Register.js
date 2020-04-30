import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Regist from '../../Helpers/Image/signup.png';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Loader from '../../Components/Loader';

function Register(props) {
  const [hidePassword, setHidePassword] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const handleRegister = () => {
    setLoading(true);
  };

  return (
    <View style={style.container}>
      {loading && <Loader loading={loading} setLoading={setLoading} />}
      <ScrollView>
        <Image
          source={Regist}
          style={{
            width: 190,
            height: 65,
            marginTop: 80,
            marginLeft: 15,
            marginBottom: 60,
          }}
        />
        <Input
          placeholder="name"
          leftIcon={{type: 'font-awesome'}}
          inputContainerStyle={style.input}
          onChangeText={name => this.setState({name})}
          inputStyle={style.inputText}
          // value={this.state.name}
        />
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
          placeholder="password"
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
          placeholder="email"
          leftIcon={{type: 'font-awesome'}}
          inputContainerStyle={style.input}
          inputStyle={style.inputText}
          // onChangeText={email => this.setState({email})}
          // value={this.state.email}
        />
        <Button
          title="Sign Up"
          buttonStyle={style.button1}
          titleStyle={style.text1}
          onPress={handleRegister}
        />
        {/* <View style={{flexDirection: 'row'}}>
          <Button
            title="Google"
            buttonStyle={style.buttons}
            titleStyle={style.texts}
          />
          <Button
            title="Facebook"
            buttonStyle={style.buttons2}
            titleStyle={style.texts2}
          />
        </View> */}
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  textTitle: {flex: 1, backgroundColor: 'white'},
  textMargin: {marginHorizontal: 30, marginTop: 40},
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
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 35,
    width: 200,
    height: 50,
    backgroundColor: '#fbaf02',
    alignSelf: 'center',
    marginRight: -160,
    marginTop: 30,
  },
  text1: {color: 'black', fontWeight: 'bold', fontSize: 18},
  textForgot: {marginTop: 10, textAlign: 'center', fontSize: 15},
  inputText: {fontSize: 15},
  or: {textAlign: 'center', marginTop: 20, fontSize: 16},
  brand: {width: 70, height: 45, marginTop: 20, margin: 10},
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
  texts: {color: '#d55749', fontWeight: 'bold', fontSize: 15},
  texts2: {color: '#4b526f', fontWeight: 'bold', fontSize: 15},
});

export default Register;
