import React, { Component } from "react";
import { View, Button, SafeAreaView, StyleSheet, StatusBar, AsyncStorage } from "react-native";
import { IMAGE } from '../constants/images';
import { LOGO } from '../constants/images/logo'
import SvgUri from 'react-native-svg-uri';
import { COLOR } from '../constants/colors';
import DeviceInfo from 'react-native-device-info';
import { API } from '../constants/api';
import axios from 'axios'
class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount = () => {
        let newListOrder = []
        AsyncStorage.setItem('deviceId', DeviceInfo.getUniqueId(), (err) => {
            console.log('id device' + DeviceInfo.getUniqueId());
            AsyncStorage.setItem(DeviceInfo.getUniqueId(), JSON.stringify(newListOrder))
        });
        AsyncStorage.getItem('token', (err, token) => {
            if (token != null && token != '') {
                this.getInfo(token);
            }
        })
        AsyncStorage.getItem('history', (err, history) => {
            if (history == null || history == '') {
                console.log('chua co lich su')
                let history = [];
                AsyncStorage.setItem('history', JSON.stringify(history));
            }
            console.log(' co lich su roi')
            // this.navigateHome()
        })
        setTimeout(() => { this.props.navigation.replace('App') }, 2000);
    }
    // navigateHome = () => {
    //     this.props.navigation.replace('App')
    // }
    getInfo = (token) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.get(API.URL + API.USER, config).then(response => {
            console.log(response.data);

        }).catch(error => {
            AsyncStorage.getItem('phone', (err, phone) => {
                if (phone != '' && phone != null) {
                    AsyncStorage.getItem('password', (err, password) => {
                        if (password != '' && password != null) {
                            axios.post(API.URL + API.LOGIN, {
                                phone: phone,
                                password: password,
                            }).then(response => {
                                console.log(response.data);
                                if (response.data.success.token != null || response.data.success.token != '') {
                                    AsyncStorage.setItem('token', response.data.success.token);
                                }
                            }).catch(error => {
                            }
                            );
                        }
                    })
                }
            })
        });
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={COLOR.PRIMARY} />
                <SvgUri
                    svgXmlData={LOGO}
                />
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.PRIMARY,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default SplashScreen;