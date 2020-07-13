import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, ImageBackground } from "react-native";
import { IMAGE } from '../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../constants/string'
class FeedScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={{flex:1}} />
                    <View style={styles.title}>
                        <Text style={styles.title_text}>{STRING.PG_BEAUTY_FEED}</Text>
                    </View>
                    <View style={{ alignItems:'center', justifyContent:'center', flex:1}}>
                        <SvgUri source={IMAGE.ICON_BASKET} />
                    </View>
                </View>
                <View style={{flexDirection:'row', marginTop:8}}>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <ImageBackground source={IMAGE.TAB_ACTIVE_BG} style={{width:95, height:62}}></ImageBackground>
                    </View>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <ImageBackground source={IMAGE.TAB_ACTIVE_BG} style={{width:95, height:62}}></ImageBackground>
                    </View>
                    <View style={{flex:1}} />
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#BE1E2D',
        height: 46,
        flexDirection: 'row'
    },
    title: {
        flex:6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title_text: {
        fontSize: 16,
        color: '#FFFFFF'
    }
})
export default FeedScreen;