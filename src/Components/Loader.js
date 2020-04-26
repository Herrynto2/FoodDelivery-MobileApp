import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Overlay} from 'react-native-elements';

function Loader(props) {
  return (
    <View>
      <Overlay
        isVisible={props.isVisible}
        windowBackgroundColor="rgba(46, 46, 46, .8)"
        overlayBackgroundColor="white"
        width={300}
        height={180}
        borderRadius={20}
        style={{padding: 20}}
        overlayStyle={{padding: 20, paddingTop: 40}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            color: '#545454',
            marginTop: -10,
          }}>
          {props.message}
        </Text>
        <Button
          title="Yes"
          onPress={() => props.setHideVisible(false)}
          buttonStyle={style.confirm}
        />
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
    backgroundColor: '#53C9BE',
    elevation: 4,
  },
});

export default Loader;
