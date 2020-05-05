import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import {Avatar, Input, Button} from 'react-native-elements';

function Setting(props) {
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
            <Text
              style={{
                fontSize: 19,
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#5b5b5b',
                marginRight: 50,
              }}>
              Settings
            </Text>
          </View>
        </View>
        <View style={{flex: 9, marginTop: 50}}>
          <View
            style={{
              height: 50,
              backgroundColor: '#f6f6f8',
              marginHorizontal: -30,
              marginTop: 30,
              paddingHorizontal: 20,
              marginBottom: 20,
            }}
          />
          <View style={{alignItems: 'center'}}>
            <Button
              title="LOGOUT"
              //   onPress={logoutUser}
              containerStyle={{width: 300}}
              buttonStyle={{borderRadius: 50, backgroundColor: '#bbbbc0'}}
              titleStyle={{fontSize: 18, color: '#2d2d2d', fontWeight: 'bold'}}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
export default Setting;

const style = StyleSheet.create({
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
