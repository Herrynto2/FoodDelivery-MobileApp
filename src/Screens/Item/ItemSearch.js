import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Button, SearchBar, Card} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome5';
import cartEmpty from '../../Helpers/Image/cartEmpty.png';
import {getData} from '../../Helpers/CRUD';
import API_URL from '../../Components/Dotenv';
import formatRupiah from '../../Helpers/FormatRupiah';

function ItemSearch(props) {
  const [textSearch, setSearch] = React.useState('');
  const [dataSearch, setDataSearch] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleSearch = async () => {
    if (textSearch === '') {
      setDataSearch([]);
    } else {
      setLoading(true);
      try {
        const response = await getData(
          'browse-items?search[name_item]=' + textSearch,
        );
        if (response.data && response.data.success) {
          setDataSearch(response.data.data);
        } else {
          console.log(response.data.success, response.data.msg);
        }
      } catch (err) {
        // if (!(err.Search === 'Network Error')) {
        if (err.response) {
          console.log(err.response);
        }
      }
      setLoading(false);
    }
  };

  return (
    <>
      <View style={{backgroundColor: '#fbaf02', height: 70}}>
        <TouchableOpacity
          style={{width: 50, marginTop: 35}}
          onPress={() => props.navigation.goBack()}>
          <Icons name="chevron-left" size={20} style={style.backIcon} />
        </TouchableOpacity>
        <Text style={style.titleHeader}>Search Item</Text>
      </View>

      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
        }}>
        <View style={style.container}>
          <SearchBar
            placeholder="Type Here..."
            value={textSearch}
            onChangeText={textSearch => setSearch(textSearch)}
            containerStyle={style.seacrhContainer}
            inputContainerStyle={{...style.seacrhInput, paddingRight: 60}}
            inputStyle={{fontSize: 14}}
            clearIcon={true}
          />
          <Button
            onPress={handleSearch}
            icon={<Icons name="search" size={16} color="white" />}
            buttonStyle={{
              ...style.anotherLogin,
              backgroundColor: '#fbaf02',
            }}
          />
          {loading && (
            <ActivityIndicator
              size={40}
              color="grey"
              style={{marginVertical: 200}}
            />
          )}
          {!loading && (
            <>
              {dataSearch.length !== 0 && (
                <View style={style.dataContainer}>
                  <FlatList
                    keyExtractor={(item, index) => index}
                    data={dataSearch}
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
                </View>
              )}
            </>
          )}
          {!loading && (
            <>
              {dataSearch && dataSearch.length === 0 && (
                <View style={style.emptyContainer}>
                  <Text style={{fontSize: 17, color: 'grey'}}>
                    There is no item
                  </Text>
                  <Image
                    source={cartEmpty}
                    style={{
                      width: 250,
                      height: 250,
                    }}
                  />
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </>
  );
}

export default ItemSearch;

const style = StyleSheet.create({
  container: {
    flex: 8,
    alignSelf: 'center',
    paddingTop: 40,
    paddingBottom: 80,
  },
  backIcon: {
    color: 'white',
    marginLeft: 20,
    width: 20,
    marginTop: -10,
  },
  textInput: {
    fontSize: 14,
    marginLeft: 20,
    color: '#707070',
  },
  inputContainer: {
    width: 270,
  },
  button: {
    backgroundColor: '#1d57b6',
    width: 160,
    borderRadius: 20,
    marginTop: 130,
  },
  titleHeader: {
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: -24,
    fontWeight: 'bold',
    color: 'white',
    width: 150,
  },
  seacrhContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderWidth: 0,
  },
  seacrhInput: {
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: 20,
    marginTop: -20,
    height: 50,
    width: 270,
    paddingRight: 20,
  },
  name: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
    marginTop: 10,
    fontWeight: 'bold',
    backgroundColor: '#888888',
    borderRadius: 10,
    paddingHorizontal: 10,
    padding: 2,
  },
  anotherLogin: {
    borderRadius: 100,
    width: 50,
    height: 50,
    position: 'absolute',
    right: 0,
    marginTop: -58,
    marginHorizontal: 8,
  },
  emptyContainer: {
    alignSelf: 'center',
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  dataContainer: {
    marginBottom: 0,
    marginTop: 30,
  },
  containerCard: {
    borderRadius: 20,
    marginBottom: 5,
    marginTop: 25,
    height: 100,
  },
  card: {flexDirection: 'row'},
  Images: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginRight: 20,
    marginTop: -6,
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
});
