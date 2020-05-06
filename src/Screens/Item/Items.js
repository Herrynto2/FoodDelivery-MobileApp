import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Card, Input, Button} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import {getItems} from '../../Redux/Action/ItemAction';
import {useSelector, useDispatch} from 'react-redux';
import pageEmpty from '../../Helpers/Image/RestoEmpty.png';
import formatRupiah from '../../Helpers/FormatRupiah';

function Items(props) {
  const {dataItems} = useSelector(state => state.itemsData);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getItems());
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={style.containers}>
        <View style={{flexDirection: 'row'}}>
          <View style={style.boxSearch}>
            <View style={style.bgSearch}>
              <Icon name="ios-search" size={25} style={style.iconSearch} />
              <Input
                placeholder="Search ..."
                placeholderTextColor="grey"
                style={style.searchStyle}
                inputContainerStyle={{
                  borderBottomWidth: 0,
                  borderBottomColor: 'transparent',
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{width: 50, marginTop: 3}}
            onPress={() => props.navigation.goBack('')}>
            <Icons
              name="chevron-left"
              size={20}
              style={{color: '#5b5b5b', marginLeft: 15, width: 20}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={style.containerItems}>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Button
            title="All items"
            buttonStyle={style.buttonActive}
            titleStyle={style.text1}
            onPress={() => props.navigation.navigate('Items')}
          />
          <Button
            title="Food"
            buttonStyle={style.button1}
            titleStyle={style.text1}
            onPress={() => props.navigation.navigate('Food')}
          />
          <Button
            title="Drinks"
            buttonStyle={style.button1}
            titleStyle={style.text1}
            onPress={() => props.navigation.navigate('Drink')}
          />
        </View>

        <View style={style.containerFlatlist}>
          {dataItems && dataItems.length > 0 && (
            <FlatList
              numColumns={2}
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
                    <Image
                      // source={{uri: `${BASE_URL}${item.images}`}}
                      style={style.imageItem}
                    />
                    <Text style={style.titleName}>{item.name_item}</Text>
                    <View style={style.containerPrice}>
                      <Text style={style.titlePrice}>
                        Rp.{formatRupiah(item.price)}
                      </Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              )}
            />
          )}
          {!dataItems && dataItems.length > 0 && (
            <View style={style.container}>
              <Image source={pageEmpty} style={style.emptyImg} />
              <Text style={{color: '#909090'}}>There is no Food Available</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
export default Items;

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
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
    marginTop: -1,
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 5,
    width: 80,
    height: 30,
    backgroundColor: '#e5e2e2',
    margin: 2,
  },
  buttonActive: {
    marginTop: -1,
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 5,
    width: 80,
    height: 30,
    backgroundColor: '#fbaf02',
    margin: 2,
  },
  text1: {color: '#585858', fontWeight: 'bold', fontSize: 13},
  boxSearch: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
    marginTop: -20,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  iconSearch: {paddingTop: 3, color: 'grey'},
  bgSearch: {
    flexDirection: 'row',
    padding: 5,
    height: 50,
    width: 270,
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingTop: 10,
    opacity: 1,
    shadowOffset: {width: 2, height: 0},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    marginTop: 20,
    elevation: 1,
    borderRadius: 25,
  },
  searchStyle: {
    flex: 1,
    fontWeight: '700',
    backgroundColor: 'transparent',
    height: 50,
    borderRadius: 30,
    borderColor: 'transparent',
  },
  containers: {
    flex: 2,
    paddingTop: 20,
    paddingBottom: 30,
    marginBottom: 40,
    backgroundColor: '#fbaf02',
  },
  containerItems: {
    flex: 9,
    paddingHorizontal: 5,
    paddingTop: 30,
    paddingBottom: 5,
    paddingLeft: 12,
    borderRadius: 50,
    marginBottom: -20,
    backgroundColor: 'white',
    marginTop: -80,
  },
  containerFlatlist: {
    marginBottom: 20,
    paddingRight: 10,
    paddingLeft: 8,
    marginTop: 13,
  },
  containerCard: {
    borderRadius: 20,
    width: 150,
    borderWidth: 1,
    margin: 6,
    padding: 5,
    marginBottom: 15,
  },
  imageItem: {
    width: 130,
    height: 130,
    borderRadius: 100,
    marginBottom: 10,
    marginLeft: 5,
    backgroundColor: '#d1d1d1',
  },
  titleName: {
    fontSize: 15,
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
  containerPrice: {
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 3,
  },
  emptyImg: {
    width: 250,
    height: 250,
  },
});
