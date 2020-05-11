import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Overlay, Input, Button, Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import CustomInputText from '../../../Components/CustomInputText';
import CustomAlert from '../../../Components/CustomAlert';
import {submitData} from '../../../Helpers/CRUD';
import {itemRestoUser} from '../../../Redux/Action/ItemAction';

function ItemCreate(props) {
  const [srcImageUpdate, setSrcImageUpdate] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const handleAddItem = useFormik({
    initialValues: {
      name_item: '',
      price: '',
      category: '',
      description: '',
    },
    onSubmit: async (values, form) => {
      setLoading(true);
      try {
        const formData = new FormData();
        const fillAble = ['name_item', 'price', 'category', 'description'];

        const response = await submitData('items', values);
        if (response.data && !response.data.success) {
          CustomAlert(response.data.success, response.data.msg);
          dispatch(itemRestoUser());
          props.setHideVisible(false);
        }
      } catch (err) {
        // console.log('er', err);
        // if (!(err.message === 'Network Error')) {
        if (err.response) {
          CustomAlert(err.response.data.success, err.response.data.msg);
        }
      }
      setLoading(false);
    },
  });

  const handleChangePicture = () => {
    const options = {
      noData: true,
      quality: 0.6,
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        console.log(response);
        setSrcImageUpdate(response.uri);
        // handleAddItem.setFieldValue('picture', response);
      }
    });
  };

  return (
    <View>
      <Overlay
        isVisible={props.isVisible}
        windowBackgroundColor="rgba(46, 46, 46, .8)"
        overlayBackgroundColor="white"
        width={300}
        height={380}
        borderRadius={20}
        style={{padding: 20}}
        overlayStyle={{padding: 20, paddingTop: 30}}>
        <View style={{alignItems: 'center', marginLeft: 15}}>
          <View style={{position: 'relative'}}>
            <Image
              source={
                srcImageUpdate && {
                  //  || dataProfile.picture
                  uri: srcImageUpdate,
                  // || API_URL + dataProfile.picture,
                }
              }
              style={style.images}
            />
            <TouchableOpacity
              style={{marginTop: -40, marginLeft: 60}}
              onPress={handleChangePicture}>
              <Icon
                reverse
                name="ios-camera"
                type="ionicon"
                color="#494949"
                size={14}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 10}}>
            <CustomInputText
              form={handleAddItem}
              name="name_item"
              placeholder="Items name"
              containerStyle={{marginHorizontal: 10, width: 250}}
              inputStyle={{fontSize: 14}}
              labelStyle={{paddingRight: 50}}
              inputContainerStyle={style.containerInput}
            />
          </View>
          <View>
            <CustomInputText
              form={handleAddItem}
              name="price"
              placeholder="price"
              keyboardType={'numeric'}
              containerStyle={{
                marginHorizontal: 10,
                width: 250,
                marginTop: -5,
              }}
              inputStyle={{fontSize: 14}}
              labelStyle={{paddingRight: 50}}
              inputContainerStyle={style.containerInput}
            />
          </View>
          <View>
            <CustomInputText
              form={handleAddItem}
              name="category"
              placeholder="category"
              containerStyle={{marginHorizontal: 10, width: 250}}
              inputStyle={{fontSize: 14}}
              labelStyle={{paddingRight: 50}}
              inputContainerStyle={style.containerInput}
            />
          </View>
          <View>
            <CustomInputText
              form={handleAddItem}
              name="description"
              placeholder="description"
              containerStyle={{marginHorizontal: 10, width: 250}}
              inputStyle={{fontSize: 14}}
              labelStyle={{paddingRight: 50}}
              inputContainerStyle={style.containerInput}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Button
              disabled={loading === true ? true : false}
              title="Save"
              buttonStyle={style.buttons}
              titleStyle={style.texts}
              onPress={handleAddItem.handleSubmit}
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
        </View>
      </Overlay>
    </View>
  );
}

export default ItemCreate;

const style = StyleSheet.create({
  images: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#d1d1d1',
    borderWidth: 3,
    borderColor: 'white',
    marginRight: 20,
    marginTop: -80,
  },
  buttons: {
    marginTop: 40,
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
    marginTop: 40,
    marginRight: 10,
    marginLeft: 15,
    borderRadius: 10,
    width: 100,
    height: 35,
    backgroundColor: '#494949',
    alignSelf: 'center',
  },
  texts2: {color: 'white', fontWeight: 'bold', fontSize: 13},
  containerInput: {
    borderBottomWidth: 1,
    borderColor: '#ececf2',
  },
});
