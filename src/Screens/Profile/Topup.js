import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import {Avatar, Input, Button, Overlay} from 'react-native-elements';
import Topups from '../../Helpers/Image/topup.png';

function Topup(props) {
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
            <Text style={style.textTopup}>Top up</Text>
          </View>
        </View>
        <View style={{flex: 9}}>
          <ScrollView>
            <View style={{alignItems: 'center', marginTop: 50}}>
              <Text style={style.textBalance}>Balance</Text>
            </View>
            <Text style={style.textValue}>Rp. 20.000</Text>
            <Avatar
              rounded
              source={Topups}
              size={300}
              containerStyle={{marginLeft: 25, marginTop: 20, marginLeft: 30}}
            />

            <Input
              keyboardType={'numeric'}
              placeholder="Value ..."
              inputContainerStyle={style.input}
              inputStyle={{textAlign: 'center', fontSize: 17}}
              // onChangeText={saldo => this.setState({saldo})}
            />

            <Button
              title="Topup"
              buttonStyle={style.button1}
              titleStyle={style.text1}
              // onPress={this.handleTopup}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
export default Topup;

const style = StyleSheet.create({
  textTopup: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5b5b5b',
    marginRight: 50,
  },
  textBalance: {
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#41b8ce',
    borderRadius: 10,
    width: 80,
    color: 'white',
    fontSize: 14,
  },
  textValue: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#727272',
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
  input: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomWidth: 0,
    width: 250,
    alignSelf: 'center',
    backgroundColor: '#F5F5F5',
    marginBottom: 15,
    paddingLeft: 10,
  },
});
