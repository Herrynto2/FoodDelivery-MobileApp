import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Avatar,
  ListItem,
  Image,
  Overlay,
  Input,
  Button,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/Ionicons';
import Delete from '../../Helpers/Image/delete.png';
import user from '../../Helpers/Image/users.png';
import {profileRestoUser} from '../../Redux/Action/restaurantAction';
import {itemRestoUser} from '../../Redux/Action/ItemAction';
import {useSelector, useDispatch} from 'react-redux';
import pageEmpty from '../../Helpers/Image/RestoEmpty.png';
import cartEmpty from '../../Helpers/Image/cartEmpty.png';

function Admin(props) {
  const [available, setAvailable] = React.useState(false);
  const {dataProfileResto, dataItem} = useSelector(state => state.userData);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(profileRestoUser());
    dispatch(itemRestoUser());
    if (dataProfileResto.length !== 0) {
      setAvailable(true);
    } else {
      setAvailable(false);
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {available && (
          <Image
            // source={{uri: `${BASE_URL}${dataProfileResto[0].logo}`}}
            style={{width: null, height: 280, backgroundColor: '#d1d1d1'}}
          />
        )}

        <View
          style={{flexDirection: 'row', position: 'absolute', marginTop: 10}}>
          <TouchableOpacity
            style={{width: 50, marginTop: 12}}
            onPress={() => props.navigation.goBack()}>
            <Icon
              name="chevron-left"
              size={20}
              style={{
                color: available ? 'white' : 'black',
                marginLeft: 15,
                width: 20,
              }}
            />
          </TouchableOpacity>
          {!available && (
            <View style={{flex: 1}}>
              <Text style={style.textTopup}>Your Restaurant</Text>
            </View>
          )}
        </View>
      </View>

      <View
        style={{
          flex: available ? 2 : 5,
          borderRadius: available ? 40 : 0,
          backgroundColor: 'white',
          marginBottom: -100,
          paddingBottom: 140,
          postion: 'absolute',
          paddingTop: 20,
          paddingHorizontal: 0,
        }}>
        {available && (
          <ScrollView>
            <View style={{paddingHorizontal: 25}}>
              <Text style={style.textNameResto}>
                {dataProfileResto.name_restaurant}
              </Text>
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: 5,
                  flexDirection: 'row',
                }}>
                <Icons
                  name="ios-home"
                  size={20}
                  style={{color: '#afaaaa', marginRight: 10}}
                />
                <Text style={style.textLoc}>{dataProfileResto.location}</Text>
              </View>
              <View style={{alignItems: 'center', marginTop: 10}}>
                <Text style={style.textOwner}>
                  {dataProfileResto.created_by}
                </Text>
              </View>
            </View>

            <View style={style.line} />
            <View style={{alignItems: 'center', marginTop: -100}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity>
                  <Avatar
                    rounded
                    source={
                      // (dataProfile.image && {
                      //   uri: dataProfile.image,
                      // }) ||
                      user
                    }
                    size={100}
                    title="MD"
                    containerStyle={style.Avatar}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={style.containerDesc}>
              <Text style={style.textDesc}>Description</Text>
            </View>
            <View style={{paddingHorizontal: 20}}>
              <Text style={style.textDescr}>
                {dataProfileResto.description}
              </Text>
            </View>

            <View style={style.containerList}>
              <Text style={style.textList}>List items</Text>
            </View>
            <View style={{paddingHorizontal: 20}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={style.total}>{dataItem.length} Item</Text>
                <TouchableOpacity
                  // onPress={overlay}
                  style={style.touchIcon}>
                  <Icon
                    name="plus-circle"
                    size={25}
                    style={{color: '#b9b3b3'}}
                  />
                </TouchableOpacity>
              </View>
              {dataItem && dataItem.length !== 0 && (
                <>
                  {dataItem &&
                    dataItem.map((item, i) => (
                      <ListItem
                        key={i}
                        title={item.name_item}
                        titleStyle={{fontWeight: 'bold', color: '#383838'}}
                        subtitle={
                          <View>
                            <View>
                              <Text style={style.ratingText}>
                                Rp. {item.price}
                              </Text>
                            </View>
                            <View>
                              <Text style={style.desc}>{item.description}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                              <TouchableOpacity style={style.touchDel}>
                                <Icon
                                  name="trash"
                                  size={20}
                                  style={{color: '#b9b3b3'}}
                                  // onPress={() =>
                                  //   handleDelete(item.id_item, this.delete(true))
                                  // }
                                />
                              </TouchableOpacity>
                              <TouchableOpacity style={style.touchPen}>
                                <Icon
                                  name="pen-square"
                                  size={20}
                                  style={{color: '#b9b3b3'}}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        }
                        bottomDivider
                        leftAvatar={
                          {
                            // source: {uri: `${BASE_URL}${item.images}`}
                          }
                        }
                      />
                    ))}
                </>
              )}
              {dataItem && dataItem.length === 0 && (
                <View style={{alignItems: 'center', marginTop: 30}}>
                  <Image source={cartEmpty} style={{width: 120, height: 120}} />
                </View>
              )}
            </View>
          </ScrollView>
        )}

        {!available && (
          <View style={{alignItems: 'center', marginTop: 30}}>
            <Image source={pageEmpty} style={style.emptyImg} />
            <Text style={{color: '#909090'}}>
              You haven't restaurant, click here to join
            </Text>
            <Button
              title="Join us"
              buttonStyle={style.buttons}
              titleStyle={style.texts}
            />
          </View>
        )}
      </View>
    </View>
  );
}
const style = StyleSheet.create({
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
  emptyImg: {
    width: 250,
    height: 250,
  },
  card: {flexDirection: 'row'},
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
    fontWeight: 'bold',
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#fbaf02',
    borderRadius: 10,
    width: 80,
    color: 'white',
    fontSize: 12,
  },
  total: {
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#b2aeae',
    borderRadius: 6,
    width: 70,
    height: 25,
    marginTop: 7,
    color: 'white',
    marginLeft: 10,
    fontSize: 15,
    textAlign: 'center',
  },
  desc: {color: 'grey'},
  buttons: {
    marginTop: 40,
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
    marginTop: 40,
    marginRight: 10,
    marginLeft: 15,
    borderRadius: 10,
    width: 100,
    height: 35,
    backgroundColor: '#494949',
    alignSelf: 'center',
  },
  texts2: {color: 'white', fontWeight: 'bold', fontSize: 13},
  nameItems: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: -5,
    color: '#5b5b5b',
  },
  prices: {
    fontWeight: 'bold',
    backgroundColor: '#fbaf02',
    borderRadius: 8,
    width: 70,
    height: 20,
    color: 'white',
    textAlign: 'center',
  },
  inputs: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomWidth: 0,
    width: 130,
    height: 40,
    alignSelf: 'center',
    backgroundColor: '#F5F5F5',
    marginTop: 15,
    marginLeft: -13,
  },
  textNameResto: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    color: '#4d4b4b',
  },
  textLoc: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#afaaaa',
    fontSize: 15,
  },
  textOwner: {
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#41b8ce',
    borderRadius: 10,
    color: 'white',
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  line: {
    height: 10,
    backgroundColor: '#f6f6f8',
    marginHorizontal: -30,
    marginTop: 70,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  Avatar: {
    marginHorizontal: 20,
    marginBottom: 7,
    marginTop: 25,
    borderWidth: 6,
    borderColor: '#f6f6f8',
    elevation: 5,
  },
  containerDesc: {
    height: 50,
    backgroundColor: '#f6f6f8',
    marginHorizontal: -30,
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  textDesc: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#4d4b4b',
  },
  textDescr: {
    textAlign: 'center',
    color: 'grey',
    marginTop: 7,
    marginTop: 5,
  },
  containerDesc: {
    height: 50,
    backgroundColor: '#f6f6f8',
    marginHorizontal: -30,
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  textList: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#4d4b4b',
  },
  touchIcon: {
    width: 50,
    marginTop: 4,
    marginLeft: 210,
  },
  touchDel: {
    width: 50,
    // postion: 'relative',
    marginTop: 3,
  },
  touchPen: {
    width: 50,
    // postion: 'relative',
    marginTop: 4,
  },
  containerList: {
    marginTop: 40,
    marginBottom: 20,
  },
  textTopup: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5b5b5b',
    marginRight: 50,
    marginTop: 10,
  },
});
export default Admin;
