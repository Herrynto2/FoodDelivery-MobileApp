import React from 'react';
import {View, Text} from 'react-native';
import {Image} from 'react-native-elements';
import Progress from '../Helpers/Image/progress.png';

function OnProgress(props) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{alignItems: 'center', marginVertical: 180}}>
        <View style={{marginHorizontal: 50}}>
          <Text
            style={{
              marginBottom: 20,
              fontSize: 20,
              color: '#424242',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            This page's still on progress wait in other time
          </Text>
        </View>
        <Image source={Progress} style={{width: 350, height: 250}} />
      </View>
    </View>
  );
}

export default OnProgress;
