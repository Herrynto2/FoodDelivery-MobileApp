import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon, Avatar} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import user from '../../Helpers/Image/users.png';
import API_URL from '../../Components/Dotenv';

function Profile(props) {
  const {dataProfile} = useSelector(state => state.userData);
  console.log(API_URL + dataProfile.images);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={style.container}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ProfileEdit')}>
          <View style={{flexDirection: 'row'}}>
            <Avatar
              rounded
              source={
                (dataProfile.images && {
                  uri: API_URL + dataProfile.images,
                }) ||
                user
              }
              size={100}
              containerStyle={{marginRight: 20}}
            />
            <View>
              <Text style={style.nameUser}>
                {dataProfile.name_user.substring(0, 15)}
              </Text>
              <Text style={style.email}>
                {dataProfile.email.substring(0, 30)}
              </Text>
            </View>
            <Icons name="chevron-right" size={13} style={style.iconUser} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 9, margin: 80, marginLeft: 25, marginRight: 20}}>
        <View style={style.containerMenu} />
        <TouchableOpacity onPress={() => props.navigation.navigate('TopUp')}>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Icon
              reverse
              name="ios-chatbubbles"
              type="ionicon"
              color="#f14136"
              size={15}
            />
            <Text style={style.subMenu}>Topup Balance</Text>
            <Icons name="chevron-right" size={13} style={style.iconSubMenu} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate('Carts')}>
          <View style={{flexDirection: 'row', marginTop: 3}}>
            <Icon
              reverse
              name="ios-cart"
              type="ionicon"
              color="#5ecdec"
              size={15}
            />
            <Text style={style.subMenu}>Cart</Text>
            <Icons name="chevron-right" size={13} style={style.iconSubMenu} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('AdminsRestaurant')}>
          <View style={{flexDirection: 'row', marginTop: 3}}>
            <Icon
              reverse
              name="ios-restaurant"
              type="ionicon"
              color="#5956d0"
              size={15}
            />
            <Text style={style.subMenu}>Your restaurant</Text>
            <Icons name="chevron-right" size={13} style={style.iconSubMenu} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('OnProgress')}>
          <View style={{flexDirection: 'row', marginTop: 3}}>
            <Icon
              reverse
              name="ios-briefcase"
              type="ionicon"
              color="#54d46a"
              size={15}
            />
            <Text style={style.subMenu}>Transaction history</Text>
            <Icons name="chevron-right" size={13} style={style.iconSubMenu} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Settings')}>
          <View style={{flexDirection: 'row', marginTop: 30}}>
            <Icon
              reverse
              name="ios-settings"
              type="ionicon"
              color="#020101"
              size={15}
            />
            <Text style={style.subMenu}>Settings</Text>
            <Icons name="chevron-right" size={13} style={style.iconSubMenu} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('OnProgress')}>
          <View style={{flexDirection: 'row', marginTop: 3}}>
            <Icon
              reverse
              name="ios-settings"
              type="ionicon"
              color="#f69610"
              size={15}
            />
            <Text style={style.subMenu}>About us</Text>
            <Icons name="chevron-right" size={13} style={style.iconSubMenu} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Profile;

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    marginBottom: 10,
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 20,
  },
  nameUser: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#5a5a5a',
    marginTop: 22,
  },
  email: {
    fontSize: 12,
    color: '#c7c7c7',
    marginTop: 0,
    fontFamily: 'SourceSansPro',
  },
  iconUser: {
    color: '#c7c7c7',
    marginLeft: 16,
    width: 20,
    marginTop: 40,
    position: 'absolute',
    right: 0,
  },
  containerMenu: {
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
    width: 310,
    alignSelf: 'center',
  },
  subMenu: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#5a5a5a',
    marginLeft: 10,
    marginTop: 13,
  },
  iconSubMenu: {
    color: '#c7c7c7',
    right: 0,
    width: 20,
    marginTop: 18,
    position: 'absolute',
  },
});
