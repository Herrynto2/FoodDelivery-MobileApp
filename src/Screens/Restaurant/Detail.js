import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  YellowBox,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getRestaurantID} from '../../Redux/Action/restaurantAction';
import {useSelector, useDispatch} from 'react-redux';
YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

function RestaurantDetail(props) {
  const {dataRestaurantID} = useSelector(state => state.restaurantData);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getRestaurantID(props.route.params.idResto));
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, marginBottom: -10}}>
        <Image
          // source={{
          //   uri: `${BASE_URL}${ props.route.params.picture}`,
          // }}
          style={style.imageResto}
        />

        <View style={style.containerBack}>
          <TouchableOpacity
            style={{width: 50, marginTop: 12}}
            onPress={() => props.navigation.goBack()}>
            <Icon
              name="chevron-left"
              size={20}
              style={{color: 'white', marginLeft: 15, width: 20}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 2,
          borderRadius: 40,
          backgroundColor: 'white',
          marginBottom: -50,
          postion: 'absolute',
          paddingTop: 20,
          paddingHorizontal: 0,
        }}>
        <ScrollView>
          <View style={{paddingHorizontal: 25}}>
            <Text style={style.titleNameResto}>
              {props.route.params.nameRestaurant}
            </Text>
            <View
              style={{alignSelf: 'center', marginTop: 5, flexDirection: 'row'}}>
              <Icons
                name="ios-home"
                size={20}
                style={{color: '#afaaaa', marginRight: 10}}
              />
              <Text style={style.titleLocation}>
                {props.route.params.location}
              </Text>
            </View>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <Text style={style.titleOwner}>{props.route.params.owner}</Text>
            </View>
          </View>

          <View style={style.line} />

          <View style={{paddingHorizontal: 25}}>
            <Text style={style.titleDesc}>{props.route.params.desc}</Text>
          </View>
          <Text style={style.titleFeature}>Featured Items</Text>

          <View style={style.containerItems}>
            <FlatList
              keyExtractor={(item, index) => index}
              numColumns={2}
              data={dataRestaurantID && dataRestaurantID.items}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('DetailItem', {
                      idItems: item.id_item,
                      nameItems: item.name_item,
                      nameResto: item.name_restaurant,
                      desc: item.description,
                      price: item.price,
                      images: item.images,
                      date: item.date_created,
                    })
                  }>
                  <Card containerStyle={style.card}>
                    <Image
                      // source={{uri: `${BASE_URL}${item.images}`}}
                      style={style.imageItems}
                    />
                    <Text style={style.titleNameItem}>{item.name_item}</Text>
                    <View
                      style={{
                        alignSelf: 'center',
                        marginTop: 5,
                        marginBottom: 3,
                      }}>
                      <Text style={style.titlePrice}>Rp. {item.price}</Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  line: {
    height: 50,
    backgroundColor: '#f6f6f8',
    marginHorizontal: -30,
    marginTop: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  card: {flexDirection: 'row'},
  containerBack: {
    flexDirection: 'row',
    position: 'absolute',
    marginTop: 10,
  },
  imageResto: {
    width: null,
    height: 250,
    backgroundColor: '#d1d1d1',
  },
  titleNameResto: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    color: '#4d4b4b',
  },
  titleLocation: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#afaaaa',
    fontSize: 15,
  },
  titleOwner: {
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#41b8ce',
    borderRadius: 10,
    color: 'white',
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  titleDesc: {
    textAlign: 'center',
    color: 'grey',
    marginTop: 7,
    marginTop: 20,
  },
  titleFeature: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 25,
    color: '#4d4b4b',
  },
  containerItems: {
    marginBottom: 100,
    paddingRight: 10,
    paddingLeft: 20,
    marginTop: 13,
  },
  card: {
    borderRadius: 10,
    width: 150,
    borderWidth: 1,
    margin: 6,
    padding: 10,
    marginBottom: 15,
  },
  imageItems: {
    width: 130,
    height: 130,
    borderRadius: 100,
    marginBottom: 10,
    backgroundColor: '#d1d1d1',
  },
  titleNameItem: {
    fontSize: 13,
    color: '#5b5b5b',
    fontWeight: 'bold',
    marginHorizontal: 20,
    textAlign: 'center',
  },
  titlePrice: {
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#41b8ce',
    borderRadius: 10,
    width: 80,
    color: 'white',
    fontSize: 12,
  },
});

export default RestaurantDetail;
