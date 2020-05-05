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
import {Input, Overlay, Button, Avatar, Card} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import Resto from '../../Helpers/Image/resto1.jpg';

function Detail(props) {
  const {height, width} = Dimensions.get('window');
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, marginBottom: -30}}>
        <Image
          // source={{
          //   uri: `${BASE_URL}${this.props.navigation.state.params.images}`,
          // }}
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
        // onPress={this.overlay}
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
                Rp. {props.route.params.price}
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
            {/* {this.props.data_review &&
              this.props.data_review.map((val, idx) => (
                <Card containerStyle={style.containerCard}>
                  <View style={style.card}>
                    <Image
                      source={{uri: `${BASE_URL}${val.images}`}}
                      style={style.imageUserResview}
                    />
                    <View style={{paddingRight: 120}}>
                      <Text style={style.nameItem}>{val.name_user}</Text>
                      <Text style={style.review}>{val.review}</Text>
                    </View>
                  </View>
                </Card>
              ))} */}
            <Input
              placeholder="comment ..."
              leftIcon={{type: 'font-awesome'}}
              inputContainerStyle={style.input}
            />
            <Button
              // onPress={this.handleComment}
              icon={<Icon name="paper-plane" size={16} color="grey" />}
              buttonStyle={style.buttonComment}
            />
          </View>
        </ScrollView>
      </View>

      {/* <Overlay
        isVisible={this.state.isVisible}
        windowBackgroundColor="rgba(36, 36, 36, .8)"
        overlayBackgroundColor="white"
        width={300}
        height={250}
        borderRadius={20}
        style={{padding: 20}}
        overlayStyle={{padding: 20, paddingTop: 30}}>
        <View style={{flexDirection: 'row'}}>
          <Avatar
            rounded
            title="MD"
            source={{
              uri: `${BASE_URL}${this.props.navigation.state.params.images}`,
            }}
            containerStyle={{
              marginHorizontal: 20,
              marginLeft: 20,
              marginTop: 30,
              borderWidth: 6,
              borderColor: '#f6f6f8',
              elevation: 5,
            }}
            size={100}
            title="MD"
            containerStyle={{marginRight: 20}}
          />
          <View>
            <Text style={style.nameItems}>
              {this.props.navigation.state.params.nameItems}
            </Text>
            <Text style={style.prices}>
              Rp.{this.props.navigation.state.params.price}
            </Text>
            <Input
              keyboardType={'numeric'}
              placeholder="Amount ..."
              inputContainerStyle={style.inputs}
              inputStyle={{fontSize: 15, marginLeft: 10}}
              onChangeText={total_item => this.setState({total_item})}
              value={this.state.total_item}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Button
            title="Save"
            buttonStyle={style.buttons}
            titleStyle={style.texts}
            onPress={this.handleSaveTocart}
          />
          <Button
            title="Close"
            buttonStyle={style.buttons2}
            titleStyle={style.texts2}
            onPress={this.OnHide}
          />
        </View>
      </Overlay> */}
    </View>
  );
}
export default Detail;

const style = StyleSheet.create({
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
  },
  buttonComment: {
    backgroundColor: 'transparent',
    width: 30,
    height: 30,
    marginTop: -50,
    marginLeft: 300,
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
  text1: {color: 'black', fontWeight: 'bold', fontSize: 13},
});
