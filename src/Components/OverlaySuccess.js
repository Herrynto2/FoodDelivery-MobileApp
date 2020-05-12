import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Success from '../Helpers/Image/success.png';
import {Overlay, Image, Button} from 'react-native-elements';

function OverlaySuccess(props) {
  return (
    <View>
      <Overlay
        isVisible={props.isVisible}
        windowBackgroundColor="rgba(46, 46, 46, .8)"
        overlayBackgroundColor="white"
        width={300}
        height={310}
        borderRadius={20}
        style={{padding: 20}}
        overlayStyle={{padding: 20, paddingTop: 40}}>
        <>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 17,
              color: '#545454',
              marginTop: -10,
            }}>
            {props.message}
          </Text>
          <View style={{alignSelf: 'center', marginTop: 20}}>
            <Image source={Success} style={{width: 150, height: 120}} />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Button
              title={'ok'}
              buttonStyle={style.buttons}
              titleStyle={style.texts}
              // onPress={hanldeSaveItem.handleSubmit}
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

const style = StyleSheet.create({
  confirm: {
    marginTop: 50,
    width: '50%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#fbaf02',
    elevation: 4,
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
export default OverlaySuccess;
