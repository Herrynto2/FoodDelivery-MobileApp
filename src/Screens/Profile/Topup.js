import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import {Avatar, Input, Button, Overlay} from 'react-native-elements';
import Topups from '../../Helpers/Image/topup.png';
import formatRupiah from '../../Helpers/FormatRupiah';
import {useSelector, useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import CustomInputText from '../../Components/CustomInputText';
import * as Yup from 'yup';
import CustomAlert from '../../Components/CustomAlert';
import {topUp, getProfile} from '../../Redux/Action/userDataAction';

function Topup(props) {
  const {dataUser} = useSelector(state => state.userData);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const handleTopup = useFormik({
    initialValues: {
      saldo: '',
    },
    validationSchema: Yup.object({
      saldo: Yup.number()
        .required('Required Nominal')
        .min(10000, 'Nominal Topup Must be Greather than or equal 10.000'),
    }),
    onSubmit: async (values, form) => {
      setLoading(true);
      try {
        const response = await dispatch(topUp(values));
        if (response.msg && response.success) {
          dispatch(getProfile());
          form.setSubmitting(false);
          form.resetForm();
          CustomAlert(response.success, response.msg);
        } else {
          CustomAlert(response.success, response.msg);
        }
      } catch (err) {
        // if (!(err.message === 'Network Error')) {
        if (err.response) {
          CustomAlert(err.response.success, err.response.msg);
        }
      }
      setLoading(false);
    },
  });

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, paddingTop: 20, marginBottom: 10}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{width: 50, marginTop: 3}}
            onPress={() => props.navigation.goBack()}>
            <Icons
              name="chevron-left"
              size={20}
              style={{color: '#5b5b5b', marginLeft: 15, width: 20}}
            />
          </TouchableOpacity>

          <View style={{flex: 1}}>
            <Text style={style.textTopup}>Top up</Text>
          </View>
        </View>
        <View style={{flex: 9}}>
          <ScrollView>
            <View style={{alignItems: 'center', marginTop: 50}}>
              <Text style={style.textBalance}>Balance</Text>
            </View>
            <Text style={style.textValue}>
              Rp. {formatRupiah(dataUser.Saldo)}
            </Text>
            <Avatar
              rounded
              source={Topups}
              size={300}
              containerStyle={{marginLeft: 25, marginTop: 20, marginLeft: 30}}
            />

            <CustomInputText
              form={handleTopup}
              name="saldo"
              keyboardType={'numeric'}
              placeholder="Value ..."
              inputContainerStyle={style.input}
              inputStyle={{textAlign: 'center', fontSize: 17}}
              // onChangeText={saldo => this.setState({saldo})}
            />

            <Button
              title="Top Up"
              disabled={loading === true ? true : false}
              buttonStyle={style.button1}
              styleText={style.text1}
              loading={loading}
              onPress={handleTopup.handleSubmit}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
export default Topup;

const style = StyleSheet.create({
  textTopup: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5b5b5b',
    marginRight: 50,
  },
  textBalance: {
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#41b8ce',
    borderRadius: 10,
    width: 80,
    color: 'white',
    fontSize: 14,
  },
  textValue: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#727272',
  },
  button1: {
    marginHorizontal: 30,
    marginTop: 20,
    borderRadius: 10,
    width: 100,
    height: 40,
    backgroundColor: '#fbaf02',
    alignSelf: 'center',
  },
  text1: {color: 'white', fontWeight: 'bold'},
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
});
