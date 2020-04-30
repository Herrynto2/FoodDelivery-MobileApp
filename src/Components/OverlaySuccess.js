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
          <Button
            title="OK"
            onPress={() => {
              props.setHideVisible(false);
              props.onPressOk && props.onPressOk();
            }}
            buttonStyle={style.confirm}
          />
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
});
export default OverlaySuccess;
