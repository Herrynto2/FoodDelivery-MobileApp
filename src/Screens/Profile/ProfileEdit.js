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
import {useSelector} from 'react-redux';
import {Avatar, Input, Button} from 'react-native-elements';

function ProfileEdit(props) {
  const {dataProfile} = useSelector(state => state.userData);
  console.log(dataProfile);

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
                <TouchableOpacity>
                  <Avatar
                    rounded
                    icon={{name: 'home', type: 'font-awesome'}}
                    // source={
                    //   (dataProfile.image && {
                    //     uri: dataProfile.image,
                    //   }) ||
                    //   user
                    // }
                    size={120}
                    title="MD"
                    containerStyle={style.image}
                  />
                </TouchableOpacity>
              </View>
              <View style={{marginBottom: 10}}>
                <Input
                  placeholder="name user"
                  containerStyle={style.containerInput}
                  inputStyle={{fontSize: 14}}
                  labelStyle={{paddingRight: 50}}
                  inputContainerStyle={{
                    borderBottomWidth: 1,
                    borderColor: '#ececf2',
                  }}
                />
                <Text style={style.textInput}>
                  {dataProfile.name_user.substring(0, 15)}
                </Text>
              </View>
              <View>
                <Input
                  placeholder="email"
                  containerStyle={style.containerInput}
                  inputStyle={{fontSize: 14}}
                  labelStyle={{paddingRight: 50}}
                  inputContainerStyle={{
                    borderBottomWidth: 1,
                    borderColor: '#ececf2',
                  }}
                />
                <Text style={style.textInput}>
                  {dataProfile.email.substring(0, 16)}
                </Text>
              </View>
              <View>
                <Input
                  placeholder="work"
                  containerStyle={style.containerInput}
                  inputStyle={{fontSize: 14}}
                  labelStyle={{paddingRight: 50}}
                  inputContainerStyle={{
                    borderBottomWidth: 1,
                    borderColor: '#ececf2',
                  }}
                />
                <Text style={style.textInput}>
                  {dataProfile.work === null
                    ? 'null'
                    : dataProfile.work.substring(0, 16)}
                </Text>
              </View>
              <View>
                <Input
                  placeholder="gender"
                  containerStyle={style.containerInput}
                  inputStyle={{fontSize: 14}}
                  labelStyle={{paddingRight: 50}}
                  inputContainerStyle={{
                    borderBottomWidth: 1,
                    borderColor: '#ececf2',
                  }}
                />
                <Text style={style.textInput}>
                  {dataProfile.gender === null
                    ? 'null'
                    : dataProfile.gender.substring(0, 16)}
                </Text>
              </View>
              <View>
                <Input
                  placeholder="address"
                  containerStyle={style.containerInput}
                  inputStyle={{fontSize: 14}}
                  labelStyle={{paddingRight: 50}}
                  inputContainerStyle={{
                    borderBottomWidth: 1,
                    borderColor: '#ececf2',
                  }}
                />
                <Text style={style.textInput}>
                  {dataProfile.work === null
                    ? 'null'
                    : dataProfile.work.substring(0, 16)}
                </Text>
              </View>
              <Button
                title="Save"
                buttonStyle={style.button1} // onPress={this.handleSignIn}
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
