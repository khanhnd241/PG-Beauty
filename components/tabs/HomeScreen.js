import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput } from "react-native";
import { IMAGE } from '../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../constants/string'
class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <SafeAreaView>
                <View style={{ backgroundColor: '#BE1E2D', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.header}>
                        <View style={{ flex: 1, alignItems:'center' }}>
                            <SvgUri source={IMAGE.ICON_SEARCH} />

                        </View>
                        <TextInput style={{ flex: 5 }}></TextInput>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <SvgUri source={IMAGE.ICON_SCAN} />

                        </View>

                    </View>

                    <SvgUri source={IMAGE.ICON_BASKET} />

                </View>

            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 30,
        width: 310,
        height: 35,
        marginBottom: 5,
        marginRight: 20,
        alignItems: 'center',
        marginTop:10
    },
    basket: {
    }
})
export default HomeScreen;