import React, { Component } from "react";
import { View, Button, SafeAreaView, StyleSheet, StatusBar, AsyncStorage } from "react-native";
import { IMAGE } from '../constants/images';
import {LOGO} from '../constants/images/logo'
import SvgUri from 'react-native-svg-uri';
import {COLOR} from '../constants/colors';
import DeviceInfo from 'react-native-device-info';
class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount = () =>{
        let newListOrder = []
        AsyncStorage.setItem('deviceId', DeviceInfo.getUniqueId(),(err) => {
            AsyncStorage.setItem(DeviceInfo.getUniqueId(),JSON.stringify(newListOrder) )
        });
        
        setTimeout(() => {this.props.navigation.replace('App')}, 2000);
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
    container:{
        flex:1, 
        backgroundColor:COLOR.PRIMARY, 
        alignItems:'center', 
        justifyContent:'center'
    }
})
export default SplashScreen;