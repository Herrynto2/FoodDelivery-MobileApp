import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {deleteData} from '../Helpers/CRUD';
import {Overlay, Button} from 'react-native-elements';
import {getCart} from '../Redux/Action/cartAction';
import {useDispatch} from 'react-redux';
import CustomAlert from './CustomAlert';

function OverlayDelete(props) {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const deleteItems = async id => {
    setLoading(true);
    try {
      const response = await deleteData(`carts/${id}`);
      console.log(response.data);
      if (response.data && response.data.success) {
        dispatch(getCart());
        props.setHideVisible(false);
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
    <View>
      <Overlay
        isVisible={props.isVisible}
        windowBackgroundColor="rgba(46, 46, 46, .8)"
        overlayBackgroundColor="white"
        width={300}
        height={180}
        borderRadius={20}
        style={{padding: 20}}
        overlayStyle={{padding: 20, paddingTop: 40}}>
        <>
          <Text style={style.title1}>Are you sure want to delete</Text>
          <Text style={style.title2}>{props.setNameItem} ?</Text>

          <View style={{flexDirection: 'row'}}>
            <Button
              disabled={loading === true ? true : false}
              title={'Delete'}
              buttonStyle={style.buttons}
              titleStyle={style.texts}
              onPress={() => deleteItems(props.setIdItem)}
              loading={loading}
            />
            <Button
              title="Cancel"
              buttonStyle={style.buttons2}
              titleStyle={style.texts2}
              onPress={() => {
                props.setHideVisible(false);
              }}
            />
          </View>
        </>
      </Overlay>
    </View>
  );
}

const style = StyleSheet.create({
  title2: {
    textAlign: 'center',
    fontSize: 17,
    color: '#545454',
    marginTop: -4,
  },
  title1: {
    textAlign: 'center',
    fontSize: 17,
    color: '#545454',
    marginTop: -10,
  },
  confirm: {
    marginTop: 50,
    width: '50%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#fbaf02',
    elevation: 4,
  },
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
  buttons2: {
    marginTop: 50,
    marginRight: 10,
    marginLeft: 15,
    borderRadius: 10,
    width: 100,
    height: 35,
    backgroundColor: '#494949',
    alignSelf: 'center',
  },
  texts2: {color: 'white', fontWeight: 'bold', fontSize: 13},
});
export default OverlayDelete;
