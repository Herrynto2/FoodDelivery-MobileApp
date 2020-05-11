import React from 'react';
import {View, Text, StyleSheet, YellowBox} from 'react-native';
import {Overlay, Avatar, Button, Input} from 'react-native-elements';
import {submitData} from '../Helpers/CRUD';
import CustomAlert from '../Components/CustomAlert';
import {useFormik} from 'formik';
import CustomInputText from '../Components/CustomInputText';
import * as Yup from 'yup';
import API_URL from './Dotenv';

YellowBox.ignoreWarnings(['Warning: componentWillReceiveProps']);

function OverlayItem(props) {
  const [loading, setLoading] = React.useState(false);

  const hanldeSaveItem = useFormik({
    initialValues: {
      total_item: '',
    },
    validationSchema: Yup.object({
      total_item: Yup.number()
        .required(' Is Required')
        .min(1, 'minimal 1 item'),
    }),
    onSubmit: async (values, form) => {
      setLoading(true);
      try {
        const response = await submitData(`carts/${props.idItem}`, values);
        console.log(response.data);
        if (response.data && response.data.success) {
          props.setHideVisible(false);
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
    <View>
      <Overlay
        isVisible={props.isVisible}
        windowBackgroundColor="rgba(36, 36, 36, .8)"
        overlayBackgroundColor="white"
        width={300}
        height={250}
        borderRadius={20}
        style={{padding: 20}}
        overlayStyle={{padding: 20, paddingTop: 30}}>
        <>
          <View style={{flexDirection: 'row'}}>
            <Avatar
              rounded
              title="MD"
              source={{
                uri: `${API_URL}${props.imageItem}`,
              }}
              containerStyle={style.containerAvatar}
              size={100}
              title="MD"
              containerStyle={{marginRight: 20}}
            />
            <View>
              <Text style={style.nameItems}>{props.nameItem}</Text>
              <Text style={style.prices}>Rp. {props.priceItem}</Text>
              <CustomInputText
                form={hanldeSaveItem}
                name="total_item"
                keyboardType={'numeric'}
                placeholder="Amount ..."
                inputContainerStyle={style.inputs}
                inputStyle={{fontSize: 15, marginLeft: 10}}
              />
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Button
              disabled={loading === true ? true : false}
              title={'Save'}
              buttonStyle={style.buttons}
              titleStyle={style.texts}
              onPress={hanldeSaveItem.handleSubmit}
              loading={loading}
            />
            <Button
              title="Close"
              buttonStyle={style.buttons2}
              titleStyle={style.texts2}
              onPress={() => {
                props.setHideVisible(false);
              }}
            />
          </View>
        </>
      </Overlay>
    </View>
  );
}
export default OverlayItem;

const style = StyleSheet.create({
  containerAvatar: {
    marginHorizontal: 20,
    marginLeft: 20,
    marginTop: 30,
    borderWidth: 6,
    borderColor: '#f6f6f8',
    elevation: 5,
  },
  nameItems: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: -5,
    color: '#5b5b5b',
  },
  prices: {
    marginTop: 4,
    fontWeight: 'bold',
    backgroundColor: '#fbaf02',
    borderRadius: 8,
    width: 90,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  inputs: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomWidth: 0,
    width: 130,
    height: 40,
    alignSelf: 'center',
    backgroundColor: '#F5F5F5',
    marginTop: 15,
    marginLeft: -13,
  },
  buttons: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: 10,
    borderRadius: 10,
    width: 100,
    height: 35,
    backgroundColor: '#fbaf02',
    alignSelf: 'center',
  },
  texts: {color: 'black', fontWeight: 'bold', fontSize: 13},
  buttons2: {
    marginTop: 50,
    marginRight: 10,
    marginLeft: 15,
    borderRadius: 10,
    width: 100,
    height: 35,
    backgroundColor: '#494949',
    alignSelf: 'center',
  },
  texts2: {color: 'white', fontWeight: 'bold', fontSize: 13},
});
