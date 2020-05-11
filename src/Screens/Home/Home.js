import React from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  YellowBox,
} from 'react-native';
import {Card, Button} from 'react-native-elements';
import {Input} from 'react-native-elements';
import BG from '../../Helpers/Image/bgg.jpg';
import Resto from '../../Helpers/Image/resto1.jpg';
import Icons from 'react-native-vector-icons/Ionicons';
import {
  getItems,
  getItemFood,
  getItemDrink,
} from '../../Redux/Action/ItemAction';
import {useSelector, useDispatch} from 'react-redux';
import ImageCard from './Components/ImageCard';
import formatRupiah from '../../Helpers/FormatRupiah';
import API_URL from '../../Components/Dotenv';

YellowBox.ignoreWarnings(['Warning: Failed child context type']);

function Home(props) {
  const {height, width} = Dimensions.get('window');
  const {dataItems, dataFood, dataDrink} = useSelector(
    state => state.itemsData,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getItems());
    dispatch(getItemFood());
    dispatch(getItemDrink());
  }, []);

  return (
    <View>
      {/* Search */}
      <ImageBackground source={BG} style={{width: '100%', height: '100%'}}>
        <View style={{flex: 1, marginBottom: 80}}>
          <View style={style.boxSearch}>
            <View style={style.bgSearch}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ItemSearch')}
                style={{width: '100%'}}>
                <Icons name="ios-search" size={25} style={style.iconSearch} />
                <Input placeholderTextColor="white" style={style.searchInput} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Food Category Scroll Hotizontal */}
        <View style={style.viewTop}>
          <ScrollView>
            <Text style={style.foodTitle}>Drink Category</Text>

            <View style={{height: 130, marginTop: 20, marginBottom: 30}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {dataDrink &&
                  dataDrink.map((val, idx) => (
                    <TouchableOpacity
                      key={idx}
                      onPress={() =>
                        props.navigation.navigate('DetailItem', {
                          idItems: val.id_item,
                          nameItems: val.name_item,
                          nameResto: val.name_restaurant,
                          desc: val.description,
                          price: val.price,
                          images: val.images,
                          date: val.date_created,
                        })
                      }>
                      <ImageCard
                        imageUri={val.images}
                        name={val.name_item}
                        nameResto={val.name_restaurant}
                      />
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>

            {/* Restaurant */}
            <View style={style.containerResto}>
              <Text style={style.textResto}>Create your restaurant</Text>

              <View style={{width: width - 40, height: 200, marginTop: 20}}>
                <Image style={style.imageResto} source={Resto} />
                <Button
                  title="Join us"
                  buttonStyle={style.buttonActive}
                  titleStyle={style.text1}
                  onPress={() => props.navigation.navigate('DetailItem')}
                />
              </View>
            </View>

            <View style={style.line} />
            <Text style={style.foodTitle}>Food Category</Text>
            <View style={style.containerFood}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {dataFood &&
                  dataFood.map((val, idx) => (
                    <TouchableOpacity
                      key={idx}
                      onPress={() =>
                        props.navigation.navigate('DetailItem', {
                          idItems: val.id_item,
                          nameItems: val.name_item,
                          nameResto: val.name_restaurant,
                          desc: val.description,
                          price: val.price,
                          images: val.images,
                          date: val.date_created,
                        })
                      }>
                      <ImageCard
                        imageUri={val.images}
                        name={val.name_item}
                        nameResto={val.name_restaurant}
                      />
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>

            <View style={style.line} />

            {/* List Items */}
            <Text style={style.itemsTitle}>List Items</Text>
            <FlatList
              keyExtractor={(item, index) => index}
              data={dataItems}
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
                  <Card containerStyle={style.containerCard}>
                    <View style={style.card}>
                      <View style={{elevation: 4, shadowColor: 'black'}}>
                        <Image
                          source={{uri: `${API_URL}${item.images}`}}
                          style={style.Images}
                        />
                      </View>
                      <View>
                        <Text style={style.nameItem}>
                          {item.name_item.substring(0, 15)}
                        </Text>
                        <Text style={style.nameResto}>
                          {item.name_restaurant.substring(0, 20)}
                        </Text>
                        <Text style={style.price}>
                          Rp. {formatRupiah(item.price)}
                        </Text>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}
export default Home;

const style = StyleSheet.create({
  searchInput: {
    flex: 1,
    fontWeight: '700',
    backgroundColor: 'transparent',
    height: 50,
    borderRadius: 30,
    borderColor: 'transparent',
  },
  card: {flexDirection: 'row'},
  search: {backgroundColor: 'blue', color: 'blue', marginTop: 10},
  Images: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: 20,
    marginTop: -40,
    shadowColor: 'black',
    backgroundColor: '#d1d1d1',
  },
  nameItem: {fontWeight: 'bold', fontSize: 16, marginTop: -5, color: '#5b5b5b'},
  nameResto: {color: 'grey', marginBottom: 10},
  price: {
    fontWeight: 'bold',
    fontSize: 12,
    backgroundColor: '#fbaf02',
    borderRadius: 8,
    width: 80,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 2,
    paddingHorizontal: 5,
  },

  //Search
  iconSearch: {marginRight: 10, padding: 12, color: 'white'},
  boxSearch: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderBottomColor: '#dddddd',
  },
  bgSearch: {
    flexDirection: 'row',
    padding: 5,
    height: 60,
    backgroundColor: 'white',
    marginHorizontal: 20,
    opacity: 0.4,
    shadowOffset: {width: 2, height: 0},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    marginTop: 20,
    elevation: 1,
    borderRadius: 25,
  },

  //Items List Scroll Horizontal
  itemsTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700',
    paddingHorizontal: 20,
    marginBottom: 15,
    color: '#5b5b5b',
  },

  //Categories Scroll Horizontal
  viewTop: {
    flex: 3,
    backgroundColor: 'white',
    borderRadius: 40,
    marginBottom: -40,
    padding: 10,
    paddingTop: 30,
    paddingBottom: 50,
  },
  foodTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700',
    paddingHorizontal: 20,
    color: 'black',
    marginTop: 10,
    color: '#5b5b5b',
  },

  //Join US
  buttonActive: {
    marginTop: -1,
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 5,
    width: 100,
    height: 30,
    backgroundColor: '#fbaf02',
    margin: 2,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 25,
    elevation: 3,
    borderBottomLeftRadius: 25,
  },
  text1: {color: 'black', fontWeight: 'bold', fontSize: 13},

  containerResto: {
    marginTop: 30,
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  textResto: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 20,
    color: '#5b5b5b',
  },
  imageResto: {
    flex: 1,
    height: null,
    width: '100%',
    marginRight: -0,
    resizeMode: 'cover',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  line: {
    height: 50,
    backgroundColor: '#f6f6f8',
    marginTop: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  containerFood: {
    height: 130,
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  containerCard: {
    borderRadius: 20,
    marginBottom: 5,
    marginTop: 25,
    height: 100,
  },
});
