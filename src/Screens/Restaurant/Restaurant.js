import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import {getRestaurant} from '../../Redux/Action/restaurantAction';
import {useSelector, useDispatch} from 'react-redux';
import pageEmpty from '../../Helpers/Image/RestoEmpty.png';

function Restaurant(props) {
  const {dataRestaurant} = useSelector(state => state.restaurantData);
  const dispatch = useDispatch();
  console.log('ok', dataRestaurant);

  React.useEffect(() => {
    dispatch(getRestaurant());
  }, []);

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
            <Text style={style.title}>Restaurants</Text>
          </View>
        </View>
      </View>

      <View style={{flex: 9, paddingHorizontal: 5, paddingLeft: 12}}>
        {dataRestaurant && dataRestaurant.length > 0 && (
          <FlatList
            numColumns={2}
            keyExtractor={(item, index) => index}
            data={dataRestaurant}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('RestaurantDetails', {
                    idResto: item.id_restaurant,
                    nameRestaurant: item.name_restaurant,
                    location: item.location,
                    desc: item.description,
                    owner: item.created_by,
                    picture: item.logo,
                  })
                }>
                <View style={style.card}>
                  <Image
                    // source={{uri: `${BASE_URL}${item.logo}`}}
                    style={style.ImageResto}
                  />
                  <Text style={style.textName}>
                    {item.name_restaurant.substring(0, 11)}
                  </Text>
                  <Text style={style.textLocation}>
                    {item.location.substring(0, 11)}
                  </Text>
                  <Text />
                </View>
              </TouchableOpacity>
            )}
          />
        )}
        {!dataRestaurant && dataRestaurant.length > 0 && (
          <View style={style.container}>
            <Image source={pageEmpty} style={style.emptyImg} />
            <Text style={{color: '#909090'}}>There is no restaurant</Text>
          </View>
        )}
      </View>
    </View>
  );
}
export default Restaurant;

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 70,
  },
  card: {paddingBottom: 14, paddingRight: 15},
  Image: {width: 20, height: 20, borderRadius: 10, marginRight: 20},
  search: {backgroundColor: 'blue', color: 'blue', marginTop: 10},
  Image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: 20,
    marginTop: -40,
  },
  nameItem: {fontWeight: 'bold', fontSize: 18, marginTop: -5},
  nameResto: {color: 'grey', marginBottom: 10},
  input: {
    borderRadius: 10,
    borderColor: 'grey',
    borderBottomWidth: 1,
    width: 260,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginBottom: 15,
    paddingLeft: 10,
  },
  inputText: {fontSize: 15},
  button1: {
    marginTop: -20,
    marginBottom: 20,
    marginHorizontal: 30,
    marginLeft: 270,
    borderRadius: 20,
    width: 80,
    height: 35,
    backgroundColor: '#fbaf02',
    alignSelf: 'center',
  },
  text1: {color: 'black', fontWeight: 'bold', fontSize: 13},
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5b5b5b',
    marginRight: 50,
  },
  ImageResto: {
    width: 160,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#d1d1d1',
  },
  textName: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginTop: -70,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  textLocation: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 1,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  emptyImg: {
    width: 250,
    height: 250,
  },
});
