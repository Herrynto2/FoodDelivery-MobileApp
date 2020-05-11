import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Button, Card} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import Resto from '../../Helpers/Image/resto1.jpg';
import OverlayItem from '../../Components/OverlayItem';
import {getItemID} from '../../Redux/Action/ItemAction';
import {useSelector, useDispatch} from 'react-redux';
import formatRupiah from '../../Helpers/FormatRupiah';
import {submitData} from '../../Helpers/CRUD';
import CustomAlert from '../../Components/CustomAlert';
import {useFormik} from 'formik';
import CustomInputText from '../../Components/CustomInputText';
import API_URL from '../../Components/Dotenv';
import user from '../../Helpers/Image/users.png';

function Detail(props) {
  const [isVisible, setHideVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const {height, width} = Dimensions.get('window');
  const {dataItemID} = useSelector(state => state.itemsData);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getItemID(props.route.params.idItems));
  }, []);

  const handleAddToCart = () => {
    setHideVisible(true);
  };

  const handleComment = useFormik({
    initialValues: {
      review: '',
    },
    onSubmit: async (values, form) => {
      console.log(values);
      if (values.review === '') {
        console.log('blank');
      } else {
        try {
          setLoading(true);
          const response = await submitData(
            `review/${props.route.params.idItems}`,
            values,
          );
          console.log(response.data);
          if (response.data && response.data.success) {
            dispatch(getItemID(props.route.params.idItems));
            form.setSubmitting(false);
            form.resetForm();
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
      }
    },
  });

  return (
    <View style={{flex: 1}}>
      {isVisible && (
        <OverlayItem
          isVisible={isVisible}
          setHideVisible={setHideVisible}
          nameItem={props.route.params.nameItems}
          imageItem={props.route.params.images}
          priceItem={props.route.params.price}
          idItem={props.route.params.idItems}
        />
      )}
      <View style={{flex: 1, marginBottom: -30}}>
        <Image
          source={{
            uri: `${API_URL}${props.route.params.images}`,
          }}
          style={{width: null, height: 250, backgroundColor: '#d1d1d1'}}
        />

        <View style={style.container}>
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
              style={{color: 'white', marginLeft: 15, width: 20}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Button
        title="Order now"
        buttonStyle={style.button1}
        titleStyle={style.text1}
        onPress={handleAddToCart}
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
            <Text style={style.titleNameItem}>
              {props.route.params.nameItems}
            </Text>
            <Text style={style.titleDescript}>{props.route.params.desc}</Text>
            <View style={{alignSelf: 'center', marginTop: 10}}>
              <Text style={style.titlePrice}>
                Rp.{formatRupiah(props.route.params.price)}
              </Text>
            </View>
          </View>

          <View style={style.line} />

          <View style={{paddingHorizontal: 25}}>
            <View style={{width: width - 40, height: 200, marginTop: 20}}>
              <Text style={style.titleNameResto}>
                {props.route.params.nameResto}
              </Text>
              <Image source={Resto} style={style.imageResto} />
            </View>
          </View>

          <View style={style.containerReview}>
            <Text style={style.titleReview}>Reviews</Text>
          </View>

          <View style={{marginBottom: 50}}>
            {dataItemID &&
              dataItemID.review.map((val, idx) => (
                <Card containerStyle={style.containerCard} key={idx}>
                  <View style={style.card}>
                    <Image
                      source={
                        (val.images && {
                          uri: API_URL + val.images,
                        }) ||
                        user
                      }
                      style={style.imageUserResview}
                    />
                    <View style={{paddingRight: 120}}>
                      <Text style={style.nameItem}>{val.name_user}</Text>
                      <Text style={style.review}>{val.review}</Text>
                    </View>
                  </View>
                </Card>
              ))}
            <CustomInputText
              form={handleComment}
              name="review"
              placeholder="comment ..."
              leftIcon={{type: 'font-awesome'}}
              inputContainerStyle={style.input}
            />
            <Button
              icon={<Icon name="paper-plane" size={20} color="grey" />}
              buttonStyle={style.buttonComment}
              onPress={handleComment.handleSubmit}
              loading={loading}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
export default Detail;

const style = StyleSheet.create({
  input: {
    width: 320,
    alignSelf: 'center',
  },
  container: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: 10,
    marginRight: 5,
  },
  titleNameItem: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    color: '#4d4b4b',
  },
  titleDescript: {textAlign: 'center', color: 'grey', marginTop: 7},
  titlePrice: {
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#41b8ce',
    borderRadius: 10,
    color: 'white',
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  line: {
    height: 50,
    backgroundColor: '#f6f6f8',
    marginHorizontal: -30,
    marginTop: 30,
    paddingHorizontal: 20,
  },
  titleNameResto: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  imageResto: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  containerReview: {
    height: 50,
    backgroundColor: '#f6f6f8',
    marginHorizontal: -30,
    marginTop: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  titleReview: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#4d4b4b',
  },
  containerCard: {
    borderRadius: 20,
    marginBottom: 5,
    marginTop: 25,
    height: 100,
  },
  imageUserResview: {
    width: 70,
    height: 70,
    borderRadius: 100,
    marginRight: 20,
    backgroundColor: '#d1d1d1',
  },
  buttonComment: {
    backgroundColor: 'transparent',
    width: 40,
    height: 30,
    marginTop: -40,
    marginLeft: 290,
    marginBottom: 50,
  },
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
  text1: {color: 'black', fontWeight: 'bold', fontSize: 11},
  card: {flexDirection: 'row'},
  nameItem: {fontWeight: 'bold', fontSize: 18, marginTop: -5, color: '#666666'},
  review: {fontSize: 12, marginTop: 4, color: 'grey'},
});
