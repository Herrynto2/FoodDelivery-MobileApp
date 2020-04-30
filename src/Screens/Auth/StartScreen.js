import React from 'react';
import {View, Text, Image, ImageBackground, StyleSheet} from 'react-native';
import bg from '../../Helpers/Image/bg.jpg';
import logo from '../../Helpers/Image/brand.png';
import {Button} from 'react-native-elements';

function StartScreen(props) {
  return (
    <View>
      <ImageBackground source={bg} style={{width: '100%', height: '100%'}}>
        <View style={style.box} />
        <View style={style.box2}>
          <Image source={logo} style={style.brand} />
          <View style={style.shadow}>
            <Button
              title="SIGN UP"
              buttonStyle={style.button1}
              titleStyle={style.text1}
              onPress={() => props.navigation.navigate('Register')}
            />
          </View>
          <Button
            title="LOGIN"
            buttonStyle={style.button2}
            titleStyle={style.text2}
            onPress={() => props.navigation.navigate('Login')}
          />
        </View>
        <View style={style.box} />
      </ImageBackground>
    </View>
  );
}

const style = StyleSheet.create({
  brand: {
    width: 270,
    height: 110,
    alignSelf: 'center',
    marginBottom: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 50,
  },
  box: {flex: 1, backgroundColor: 'transparent'},

  box2: {flex: 2, backgroundColor: 'transparent'},
  button1: {
    marginHorizontal: 30,
    marginBottom: 10,
    borderRadius: 50,
    width: 250,
    height: 50,
    backgroundColor: '#f4f8f7',
    alignSelf: 'center',
    elevation: 4,
    borderWidth: 2,
    borderColor: '#d3a16c',
  },
  text1: {color: '#d3a16c', fontWeight: 'bold', fontSize: 14},
  button2: {
    marginHorizontal: 30,
    borderRadius: 50,
    width: 250,
    height: 50,
    backgroundColor: '#2a292f',
    alignSelf: 'center',
    elevation: 4,
    borderWidth: 2,
    borderColor: '#d3a16c',
  },
  text2: {
    color: '#d3a16c',
    fontWeight: 'bold',
    fontFamily: 'SourceSansPro-ExtraLight',
    fontSize: 14,
  },
  shadow: {shadowRadius: 100, shadowOpacity: 0.5},
});
export default StartScreen;
