import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import user from '../../Helpers/Image/users.png';
import {Avatar, Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '../../Redux/Action/userDataAction';
import {useFormik} from 'formik';
import CustomInputText from '../../Components/CustomInputText';
import CustomAlert from '../../Components/CustomAlert';
import {patchData} from '../../Helpers/CRUD';
import API_URL from '../../Components/Dotenv';

function ProfileEdit(props) {
  const [srcImageUpdate, setSrcImageUpdate] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const {dataProfile} = useSelector(state => state.userData);

  const dispatch = useDispatch();
  const handleSave = useFormik({
    enableReinitialize: true,
    initialValues: {...dataProfile} || {},
    onSubmit: async (values, form) => {
      setLoading(true);
      try {
        const formData = new FormData();
        const fillAble = [
          'name_user',
          'email',
          'gender',
          'address',
          'work',
          'images',
        ];
        fillAble
          .filter(
            keyUpdate =>
              values[keyUpdate] && values[keyUpdate] !== dataProfile[keyUpdate],
          )
          .forEach(keyUpdate => {
            if (keyUpdate !== 'images') {
              formData.append(keyUpdate, values[keyUpdate]);
            } else {
              formData.append('images', {
                name: values.images.fileName,
                type: values.images.type,
                uri:
                  Platform.OS === 'android'
                    ? values.images.uri
                    : values.images.uri.replace('file://', ''),
              });
            }
          });
        console.log(formData);
        const response = await patchData('profile', formData);
        console.log('ok', response.data);
        // if (response.data && response.data.success) {
        //   await dispatch(updateProfile());
        //   CustomAlert(response.data.success, response.data.msg);
        // } else {
        //   CustomAlert(response.data.success, response.data.msg);
        // }
      } catch (err) {
        console.log(err);
        // if (!(err.message === 'Network Error')) {
        //   if (err.response) {
        //     CustomAlert(err.response.data.success, err.response.data.msg);
        //   }
        // }
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
        handleSave.setFieldValue('images', response);
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, paddingTop: 20, paddingBottom: 50}}>
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
            <Text style={style.textEdit}>Edit profile</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={style.containerForm}>
          <View style={{backgroundColor: 'white', padding: 20, elevation: 4}}>
            <View style={{alignItems: 'center'}}>
              <View style={{position: 'relative'}}>
                <TouchableOpacity onPress={handleChangePicture}>
                  <Avatar
                    rounded
                    icon={{name: 'home', type: 'font-awesome'}}
                    source={
                      ((srcImageUpdate || dataProfile.images) && {
                        uri: srcImageUpdate || API_URL + dataProfile.images,
                      }) ||
                      user
                    }
                    size={120}
                    containerStyle={style.image}
                  />
                </TouchableOpacity>
              </View>
              <View style={{marginBottom: 10}}>
                <CustomInputText
                  form={handleSave}
                  name="name_user"
                  placeholder="name user"
                  containerStyle={style.containerInput}
                  inputStyle={{fontSize: 14}}
                  labelStyle={{paddingRight: 50}}
                  inputContainerStyle={{
                    borderBottomWidth: 1,
                    borderColor: '#ececf2',
                  }}
                />
              </View>
              <View>
                <CustomInputText
                  form={handleSave}
                  name="email"
                  placeholder="email"
                  containerStyle={style.containerInput}
                  inputStyle={{fontSize: 14}}
                  labelStyle={{paddingRight: 50}}
                  inputContainerStyle={{
                    borderBottomWidth: 1,
                    borderColor: '#ececf2',
                  }}
                />
              </View>
              <View>
                <CustomInputText
                  form={handleSave}
                  name="work"
                  placeholder="work"
                  containerStyle={style.containerInput}
                  inputStyle={{fontSize: 14}}
                  labelStyle={{paddingRight: 50}}
                  inputContainerStyle={{
                    borderBottomWidth: 1,
                    borderColor: '#ececf2',
                  }}
                />
              </View>
              <View>
                <CustomInputText
                  form={handleSave}
                  name="gender"
                  placeholder="gender"
                  containerStyle={style.containerInput}
                  inputStyle={{fontSize: 14}}
                  labelStyle={{paddingRight: 50}}
                  inputContainerStyle={{
                    borderBottomWidth: 1,
                    borderColor: '#ececf2',
                  }}
                />
                {/* <Text style={style.textInput}>
                  {dataProfile.gender === null
                    ? 'null'
                    : dataProfile.gender.substring(0, 16)}
                </Text> */}
              </View>
              <View>
                <CustomInputText
                  form={handleSave}
                  name="address"
                  placeholder="address"
                  containerStyle={style.containerInput}
                  inputStyle={{fontSize: 14}}
                  labelStyle={{paddingRight: 50}}
                  inputContainerStyle={{
                    borderBottomWidth: 1,
                    borderColor: '#ececf2',
                  }}
                />
              </View>
              <Button
                disabled={loading === true ? true : false}
                loading={loading}
                title="Save"
                buttonStyle={style.button1}
                onPress={handleSave.handleSubmit}
                titleStyle={style.text1}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
export default ProfileEdit;

const style = StyleSheet.create({
  textEdit: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5b5b5b',
    marginRight: 50,
  },
  containerForm: {
    flex: 9,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
    marginTop: 10,
  },
  image: {
    marginRight: 20,
    marginBottom: 30,
    borderWidth: 3,
    borderColor: 'white',
    elevation: 4,
  },
  containerInput: {
    marginLeft: -50,
    marginRight: -50,
    width: 300,
  },
  textInput: {
    fontWeight: 'bold',
    fontSize: 13,
    position: 'absolute',
    bottom: 0,
    right: 0,
    color: '#5b5b5b',
    marginBottom: 15,
    marginRight: -35,
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
});
