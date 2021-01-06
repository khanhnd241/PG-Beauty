import React, { Component } from 'react';
import {
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import { IMAGE } from '../constants/images';
import { LOGO } from '../constants/images/logo';
import SvgUri from 'react-native-svg-uri';
import { COLOR } from '../constants/colors';
import DeviceInfo from 'react-native-device-info';
import { API } from '../constants/api';
import axios from 'axios';
class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    let newListOrder = [];
    AsyncStorage.setItem('deviceId', DeviceInfo.getUniqueId(), (err) => {
      AsyncStorage.setItem(
        DeviceInfo.getUniqueId(),
        JSON.stringify(newListOrder),
      );
    });
    AsyncStorage.getItem('token', (err, token) => {
      if (token) {
        this.getInfo(token);
      }
    });
    AsyncStorage.getItem('history', (err, history) => {
      if (history == null || history == '') {
        let history = [];
        AsyncStorage.setItem('history', JSON.stringify(history));
      }
      // this.navigateHome()
    });
    setTimeout(() => {
      this.props.navigation.replace('App');
    }, 2000);
  };
  // navigateHome = () => {
  //     this.props.navigation.replace('App')
  // }
  getInfo = (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(API.URL + API.USER, config)
      .then((response) => {
        if (__DEV__) {
          console.log(response.data);
        }
      })
      .catch((error) => {
        AsyncStorage.multiRemove(
          ['token', 'id', 'name', 'phone', 'code', 'password', 'address'],
          (err) => {
            if (__DEV__) {
              console.log(err);
            }
          },
        );
      });
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLOR.PRIMARY} />
        <SvgUri svgXmlData={LOGO} />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SplashScreen;
