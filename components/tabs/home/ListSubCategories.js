import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { IMAGE } from '../../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../../constants/string';
import { RECTANGLE } from '../../../constants/images/rectangle';
import { SEARCH } from '../../../constants/images/search';
import { STAR } from '../../../constants/images/star';
import { SCAN } from '../../../constants/images/scan';
import { BASKET } from '../../../constants/images/basket';
import { PG_BEAUTY } from '../../../constants/images/pg_beauty';
import { PG_FASHION } from '../../../constants/images/pg_fashion';
import { PG_TOOL } from '../../../constants/images/pg_tool';
import { PLUS } from '../../../constants/images/plus';
import { SUB } from '../../../constants/images/sub';
import { COLOR } from '../../../constants/colors';
class ListSubCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <SafeAreaView style={styles.screen}>
                <StatusBar backgroundColor={COLOR.PRIMARY} />
                <View style={styles.background}>
                    
                </View>
            <TouchableOpacity onPress={this.openChild} style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    {name == 'PG Beauty'?(
                    <SvgUri svgXmlData={PG_BEAUTY} />

                    ):null}
                    {name == 'PG Fashion'?(
                    <SvgUri svgXmlData={PG_FASHION} />

                    ):null}
                    {name == 'PG Beauty tool'?(
                    <SvgUri svgXmlData={PG_TOOL} />

                    ):null}
                </View>
                <View style={{ flex: 4, flexDirection: 'row' }}>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </TouchableOpacity>
           
        </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLOR.PRIMARY
    },
    background: {
        backgroundColor: COLOR.WHITE,
        flex: 1
    },
})
export default ListSubCategories;