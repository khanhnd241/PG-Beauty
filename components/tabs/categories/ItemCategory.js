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
class ItemCategory extends Component {
    constructor(props) {
        super(props);
        const { id, name, parent_id, listChild } = this.props
        this.state = {
            id: id,
            name: name,
            parent_id: parent_id,
            listChild: listChild,
            openChild: false,
            tool: false,
            fashion: false,
            cleansing: false,
            listSubCategory: []

        };
    }
    openChild = () => {
        this.setState({ openChild: !this.state.openChild }, this.getSubCategory)
    }
    getSubCategory = () => {
        console.log('chieu dai chuoi con' + this.state.listChild.length)
        let listSubCategory = []
        if (this.state.openChild == true) {
            for (let i = 0; i < this.state.listChild.length; i++) {
                if (this.state.id == this.state.listChild[i].id) {
                    listSubCategory.push(this.state.listChild[i]);
                }
            }
        }
        this.setState({ listSubCategory: listSubCategory });
    }
    render() {
        const { id, name, parent_id } = this.state
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <SvgUri svgXmlData={PG_BEAUTY} />
                    </View>
                    <View style={{ flex: 4, flexDirection: 'row' }}>
                        <Text style={styles.text}>{name}</Text>
                    </View>
                    <TouchableOpacity onPress={this.openChild} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        {this.state.openChild ? (
                            <SvgUri svgXmlData={SUB} width={15} height={20} />
                        ) : (
                                <SvgUri svgXmlData={PLUS} width={25} height={25} />
                            )}
                    </TouchableOpacity>
                </View>
                {this.state.openChild ? (
                    <FlatList
                        data={this.state.listSubCategory}
                        renderItem={({ item }) =>
                            <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                                <View style={{ flex: 1 }}></View>
                                <View style={{ flex: 4 }}>
                                    <Text style={styles.text}>{item.name}</Text>
                                </View>
                                <View style={{ flex: 1 }}></View>
                            </View>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : null}
            </View>


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
    header: {
        backgroundColor: COLOR.PRIMARY,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputHeader: {
        backgroundColor: COLOR.WHITE,
        flexDirection: 'row',
        borderRadius: 30,
        width: 310,
        height: 40,
        marginBottom: 5,
        marginRight: 20,
        alignItems: 'center',
        marginTop: 10
    },
    text: {
        fontSize: 14,
        color: COLOR.TEXTBODY,
    }
})
export default ItemCategory;