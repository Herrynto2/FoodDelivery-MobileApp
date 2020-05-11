import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import {Avatar, Button, Card} from 'react-native-elements';
import {getCart} from '../../Redux/Action/cartAction';
import {useSelector, useDispatch} from 'react-redux';
import pageEmpty from '../../Helpers/Image/RestoEmpty.png';
import formatRupiah from '../../Helpers/FormatRupiah';
import {deleteData} from '../../Helpers/CRUD';
import Loader from '../../Components/Loader';
import API_URL from '../../Components/Dotenv';

function Carts(props) {
  const [loading, setLoading] = React.useState(false);
  const {dataCart} = useSelector(state => state.cartData);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCart());
  }, []);

  const deleteItems = async id => {
    setLoading(true);
    try {
      const response = await deleteData(`carts/${id}`);
      console.log(response.data);
      if (response.data && response.data.success) {
        dispatch(getCart());
      } else {
        CustomAlert(response.data.success, response.data.msg);
      }
    } catch (err) {
      // if (!(err.message === 'Network Error')) {
      if (err.response) {
        CustomAlert(err.response.data.success, err.response.data.msg);
      }
    }
    setLoading(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {loading && <Loader loading={loading} setLoading={setLoading} />}
      <View style={style.containerHeader}>
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
            <Text style={style.textCart}>Cart</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 9}}>
        {dataCart && dataCart.length !== 0 && (
          <FlatList
            data={dataCart}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => (
              <Card containerStyle={style.containerCard}>
                <View style={style.card}>
                  <View>
                    <Avatar
                      rounded
                      icon={{name: 'home', type: 'font-awesome'}}
                      source={{uri: `${API_URL}${item.images}`}}
                      size={120}
                      title=" "
                      containerStyle={style.containerAvatar}
                    />
                  </View>

                  <View style={{position: 'relative'}}>
                    <Text style={style.nameItem}>{item.name_item}</Text>
                    <Text style={style.nameResto}>{item.name_restaurant}</Text>
                    <Text style={style.price}>
                      Rp.{formatRupiah(item.price)}
                    </Text>
                  </View>
                  <View style={{position: 'relative'}} />
                </View>
                <Text style={style.textTotal}>{item.total_item}x</Text>
                <TouchableOpacity
                  style={{width: 50}}
                  onPress={() => deleteItems(item.id_cart)}>
                  <Icons name="trash" size={20} style={style.icons} />
                </TouchableOpacity>
                <Button
                  iconRight
                  title="Order now"
                  buttonStyle={style.buttonActive}
                  titleStyle={style.text1}
                  onPress={() => props.navigation.navigate('Food')}
                  icon={<Icons name="arrow-right" size={14} color="black" />}
                  onPress={() =>
                    props.navigation.navigate('CartDetail', {
                      idItems: item.id_cart,
                      nameItems: item.name_item,
                      nameResto: item.name_restaurant,
                      desc: item.description,
                      price: item.price,
                      images: item.images,
                      date: item.date_created,
                      total: item.total_item,
                    })
                  }
                />
              </Card>
            )}
          />
        )}
        {dataCart && dataCart.length === 0 && (
          <View style={style.containerEmpty}>
            <Image source={pageEmpty} style={style.emptyImg} />
            <Text style={{color: '#909090'}}>There is no items</Text>
          </View>
        )}
      </View>
    </View>
  );
}
export default Carts;

const style = StyleSheet.create({
  containerHeader: {
    flex: 1,
    paddingTop: 20,
    marginBottom: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#fbaf02',
  },
  textCart: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5b5b5b',
    marginRight: 50,
  },
  containerCard: {
    borderWidth: 0,
    elevation: 3,
    borderRadius: 5,
    marginBottom: 18,
    marginTop: 25,
    height: 140,
  },
  containerAvatar: {
    marginRight: 20,
    borderWidth: 3,
    borderColor: 'white',
    elevation: 5,
    marginTop: -40,
  },
  card: {flexDirection: 'row'},
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
  nameItem: {fontWeight: 'bold', fontSize: 16, marginTop: -5, color: '#5b5b5b'},
  nameResto: {color: 'grey', marginBottom: 5},
  price: {
    fontWeight: 'bold',
    fontSize: 12,
    backgroundColor: '#111312',
    borderRadius: 8,
    width: 80,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  //Join US
  buttonActive: {
    marginTop: -46,
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 5,
    width: 120,
    height: 30,
    backgroundColor: '#fbaf02',
    marginLeft: 210,
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 25,
    elevation: 3,
    borderBottomLeftRadius: 25,
  },
  text1: {color: 'black', fontWeight: 'bold', fontSize: 13, marginRight: 7},
  textTotal: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 55,
    marginTop: 7,
  },
  icons: {
    color: '#b9b3b3',
    marginTop: -0,
    position: 'relative',
  },
  emptyImg: {
    width: 250,
    height: 250,
  },
  containerEmpty: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 70,
  },
});
