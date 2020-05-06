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
import {useDispatch} from 'react-redux';
import {userRegister} from '../../Redux/Action/userDataAction';
import {useFormik} from 'formik';
import CustomInputText from '../../Components/CustomInputText';
import * as Yup from 'yup';
import CustomAlert from '../../Components/CustomAlert';

function Register(props) {
  const [hidePassword, setHidePassword] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const FormRegister = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(6, 'name Must have More Than 6 character')
        .required('name Is Required'),
      username: Yup.string()
        .min(8, 'Username Must have More Than 8 character')
        .required('Username Is Required'),
      email: Yup.string()
        .email('Enter Valid Email')
        .required('Email is Required'),
      password: Yup.string()
        .min(6, 'Password Must have More Than 6 Character')
        .required('Passoword Is Required'),
    }),
    onSubmit: async (values, form) => {
      setLoading(true);
      try {
        const response = await dispatch(userRegister(values));
        if (response.data && response.data.success) {
          form.setSubmitting(false);
          form.resetForm();
          CustomAlert(response.data.success, response.data.msg, () =>
            props.navigation.navigate('Verify', {email: values.email}),
          );
        } else {
          CustomAlert(response.data.success, response.data.msg);
        }
      } catch (err) {
        // if (!(err.message === 'Network Error')) {
        if (err.response) {
          CustomAlert(err.response.data.success, err.response.data.msg);
        }
      }
      setLoading(false);
    },
  });

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
        <CustomInputText
          form={FormRegister}
          name="name"
          placeholder="name"
          leftIcon={{type: 'font-awesome'}}
          inputContainerStyle={style.input}
          inputStyle={style.inputText}
        />
        <CustomInputText
          form={FormRegister}
          name="username"
          placeholder="username"
          leftIcon={{type: 'font-awesome'}}
          inputContainerStyle={style.input}
          inputStyle={style.inputText}
        />

        <CustomInputText
          form={FormRegister}
          name="password"
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

        <CustomInputText
          form={FormRegister}
          name="email"
          placeholder="email"
          leftIcon={{type: 'font-awesome'}}
          inputContainerStyle={style.input}
          inputStyle={style.inputText}
        />
        <Button
          title="Sign Up"
          buttonStyle={style.button1}
          titleStyle={style.text1}
          onPress={FormRegister.handleSubmit}
        />
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
