import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import formatRupiah from '../../Helpers/FormatRupiah';
import Loader from '../../Components/Loader';
import {submitData} from '../../Helpers/CRUD';
import API_URL from '../../Components/Dotenv';
import CustomAlert from '../../Components/CustomAlert';
import {getCart} from '../../Redux/Action/cartAction';
import {getProfile} from '../../Redux/Action/userDataAction';
import {useSelector, useDispatch} from 'react-redux';

function CartDetail(props) {
  const [amount, setAmount] = React.useState(props.route.params.total);
  const [checkout, setCheckout] = React.useState(
    amount * props.route.params.price,
  );
  const [price, setPrice] = React.useState(props.route.params.price);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const handleAdd = () => {
    const addValue = amount + 1;
    const total = price;
    const result = parseInt(checkout) + parseInt(total);
    setAmount(addValue);
    setCheckout(result);
  };
  const handleMinus = () => {
    const addValue = amount - 1;
    const total = price;
    const result = parseInt(checkout) - parseInt(total);
    setAmount(addValue);
    setCheckout(result);
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const values = {
        total_item: amount,
      };
      const response = await submitData(
        `checkout/${props.route.params.idItems}`,
        values,
      );
      if (response.data && response.data.success) {
        dispatch(getCart());
        dispatch(getProfile());
        CustomAlert(response.data.success, response.data.msg, () =>
          props.navigation.navigate('Carts'),
        );
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
    <View style={{flex: 1}}>
      {loading && <Loader loading={loading} setLoading={setLoading} />}
      <View style={{flex: 1, marginBottom: -30}}>
        <Image
          source={{
            uri: `${API_URL}${props.route.params.images}`,
          }}
          style={style.imageItem}
        />

        <View style={style.containerIcon}>
          <TouchableOpacity style={{width: 60, marginTop: 12}}>
            <Icon
              name="cart-plus"
              size={26}
              style={{color: 'white', marginLeft: 15, width: 24}}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{flexDirection: 'row', position: 'absolute', marginTop: 10}}>
          <TouchableOpacity
            style={{width: 50, marginTop: 12}}
            onPress={() => props.navigation.goBack()}>
            <Icons
              name="chevron-left"
              size={20}
              style={{color: 'white', marginLeft: 20, width: 20}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Button
        title={props.route.params.nameResto.substring(0.1)}
        buttonStyle={style.button1}
        titleStyle={style.text2}
      />

      <View
        style={{
          flex: 2,
          borderRadius: 40,
          backgroundColor: 'white',
          marginBottom: -50,
          postion: 'absolute',
          paddingTop: 30,
          paddingHorizontal: 0,
        }}>
        <ScrollView>
          <View style={{paddingHorizontal: 25}}>
            <Text style={style.textItem}>{props.route.params.nameItems}</Text>
            <Text style={{textAlign: 'center', color: 'grey', marginTop: 7}}>
              {props.route.params.desc}
            </Text>
            <View style={{alignSelf: 'center', marginTop: 10}}>
              <Text style={style.textPrice}>
                Rp. {props.route.params.price}
              </Text>
            </View>
          </View>

          <View style={style.containerAmount}>
            <Text style={style.textAmount}>Choose Amount</Text>
          </View>

          <View style={style.containerAdd}>
            <TouchableOpacity
              style={style.touchPlus}
              onPress={() => handleAdd()}>
              <Icons name="plus" size={20} style={style.iconPlus} />
            </TouchableOpacity>

            <Text style={style.textTotal}>{amount}</Text>
            <TouchableOpacity style={style.touchMinus}>
              <Icons
                name="minus"
                size={20}
                style={style.iconMinus}
                onPress={() => handleMinus()}
              />
            </TouchableOpacity>
          </View>

          <View style={style.containerCheckout}>
            <Text style={style.textCheckout}>Checkout</Text>
          </View>

          <View style={{marginBottom: 100, paddingTop: 20}}>
            <View style={style.containerPayment} />
            <Text style={style.textPayment}>Rp. {formatRupiah(checkout)}</Text>
            <Button
              iconRight
              title="Pay now"
              titleStyle={style.text1}
              buttonStyle={style.buttonActive}
              onPress={handleCheckout}
              icon={<Icons name="arrow-right" size={15} color="#1e1e1e" />}
            />
            <View style={style.line} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
export default CartDetail;

const style = StyleSheet.create({
  imageItem: {width: null, height: 250, backgroundColor: '#d1d1d1'},
  containerIcon: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: 10,
    marginRight: 5,
  },
  textItem: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    color: '#4d4b4b',
  },
  textPrice: {
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#41b8ce',
    borderRadius: 10,
    width: 90,
    color: 'white',
    fontSize: 15,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  containerAmount: {
    height: 50,
    backgroundColor: '#f6f6f8',
    marginHorizontal: -30,
    marginTop: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  textAmount: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#4d4b4b',
  },
  containerAdd: {
    flexDirection: 'row',
    height: 20,
    backgroundColor: 'transparent',
    marginTop: 10,
    paddingBottom: 30,
    alignItems: 'center',
  },
  touchPlus: {
    width: 25,
    // alignitem: 'center',
    left: 0,
    position: 'absolute',
    marginLeft: 100,
  },
  iconPlus: {
    color: '#6d6d6d',
    borderWidth: 3,
    borderColor: '#6d6d6d',
    borderRadius: 100,
    paddingHorizontal: 3,
    paddingLeft: 9,
    paddingTop: 6,
    height: 35,
    width: 35,
    marginRight: 10,
  },
  textTotal: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 30,
    marginHorizontal: 160,
    marginLeft: 170,
    color: '#6d6d6d',
  },
  touchMinus: {
    width: 25,
    // alignitem: 'center',
    position: 'absolute',
    right: 0,
    marginRight: 100,
  },
  iconMinus: {
    color: '#6d6d6d',
    borderWidth: 3,
    borderColor: '#6d6d6d',
    borderRadius: 100,
    paddingHorizontal: 3,
    paddingLeft: 9,
    paddingTop: 6,
    height: 35,
    width: 35,
  },
  containerCheckout: {
    height: 50,
    backgroundColor: '#f6f6f8',
    marginHorizontal: -30,
    marginTop: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  textCheckout: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#4d4b4b',
  },
  containerPayment: {
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
    width: 310,
    alignSelf: 'center',
  },
  textPayment: {
    fontWeight: 'bold',
    marginVertical: 20,
    marginLeft: 30,
    fontSize: 23,
    color: '#4d4b4b',
  },
  line: {
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
    width: 310,
    alignSelf: 'center',
  },

  review: {fontSize: 12, marginTop: 4, color: 'grey'},
  card: {flexDirection: 'row'},
  Image: {width: 20, height: 20, borderRadius: 10, marginRight: 20},
  search: {backgroundColor: 'blue', color: 'blue', marginTop: 10},
  Image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: 20,
    marginTop: -40,
  },
  nameItem: {fontWeight: 'bold', fontSize: 18, marginTop: -5, color: '#666666'},
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
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: 120,
    height: 35,
    backgroundColor: '#fbaf02',
    alignSelf: 'center',
  },
  buttonActive: {
    marginTop: -56,
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 5,
    width: 150,
    height: 40,
    backgroundColor: '#fbaf02',
    marginLeft: 210,
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 25,
    elevation: 3,
    borderBottomLeftRadius: 25,
  },
  text1: {
    color: '#1e1e1e',
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 20,
    marginTop: -2,
  },
  text2: {
    color: '#1e1e1e',
    fontWeight: 'bold',
    fontSize: 13,
    marginRight: 20,
    marginTop: -2,
  },
});
