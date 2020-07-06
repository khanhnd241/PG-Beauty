import React, { Component } from "react";
import { View, Button, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { IMAGE } from '../constants/images';
import SvgUri from 'react-native-svg-uri';
class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount = () =>{
        setTimeout(() => {this.props.navigation.replace('LoginScreen')}, 2000);
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <SvgUri
                source={IMAGE.ICON_LOGO}
                 />
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor:'#BE1E2D', 
        alignItems:'center', 
        justifyContent:'center'
    }
})
export default SplashScreen;