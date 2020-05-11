import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import API_URL from '../../../Components/Dotenv';

function ImageCard(props) {
  return (
    <View style={style.container}>
      <View style={{flex: 2}}>
        <Image
          source={{uri: `${API_URL}${props.imageUri}`}}
          style={style.images}
        />
      </View>
      <View style={{flex: 1, paddingTop: 10}}>
        <Text
          style={{textAlign: 'center', color: '#5b5b5b', fontWeight: 'bold'}}>
          {props.name.substring(0, 11)}
        </Text>
        <Text style={{textAlign: 'center', color: 'grey', fontSize: 12}}>
          {props.nameResto.substring(0, 11)}
        </Text>
      </View>
    </View>
  );
}
export default ImageCard;
const style = StyleSheet.create({
  container: {
    height: 130,
    width: 130,
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dddddd',
  },
  images: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#d1d1d1',
  },
});
