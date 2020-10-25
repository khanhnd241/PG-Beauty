import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import { API } from '../constants/api';
import {
    AsyncStorage
  
  } from 'react-native';
export const SendToken = ({token}) => {
    let data = {
        device_token: token,
        device_id: DeviceInfo.getUniqueId(),
      };
      axios
        .post(API.URL + API.DEVICE_TOKEN, data)
        .then((res) => {
            AsyncStorage.setItem('device_token', token);
          if (__DEV__) {
            console.log(res.data);
          }
        })
        .catch((err) => console.log(err));
}