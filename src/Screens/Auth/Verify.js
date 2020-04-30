import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Dot from '../../Helpers/Image/dot.png';
import OverlaySuccess from '../../Components/OverlaySuccess';
import Loader from '../../Components/Loader';

function Verify(props) {
  const [isVisible, setHideVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleVerify = () => {
    setHideVisible(true);
    setLoading(false);
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {loading && <Loader loading={loading} setLoading={setLoading} />}
      {isVisible && (
        <OverlaySuccess
          message={'Success to changes password'}
          isVisible={isVisible}
          setHideVisible={setHideVisible}
          onPressOk={() => {
            props.navigation.navigate('Login');
          }}
        />
      )}
      <Input
        leftIcon={{type: 'font-awesome'}}
        inputContainerStyle={style.input}
        inputStyle={style.inputText}
        labelStyle={style.inputLabel}
      />
      <Text style={style.textSmall}>Enter the code you have received</Text>
      <Text style={style.textSmall}>by email in order to verify your</Text>
      <Text style={style.textSmall}>account</Text>
      <Image source={Dot} style={style.brand} />
      <Button
        title="Verify"
        buttonStyle={style.button1}
        titleStyle={style.text1}
        onPress={handleVerify}
      />
    </View>
  );
}

const style = StyleSheet.create({
  brand: {
    width: 170,
    height: 15,
    alignSelf: 'center',
    marginBottom: 40,
    marginTop: 40,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#737277',
  },
  textSmall: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#bababa',
  },
  input: {
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomWidth: 0,
    width: 250,
    height: 100,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    marginBottom: 15,
    marginTop: 70,
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
  inputLabel: {textAlign: 'center', fontSize: 50},
  inputText: {fontSize: 40, textAlign: 'center', marginRight: 20},
});

export default Verify;
