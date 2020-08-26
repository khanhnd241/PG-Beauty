import React, { Component, useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, ScrollView, Dimensions, StatusBar, ActivityIndicator, Alert } from "react-native";
import { BACK_BLACK } from '../../../constants/images/back_black';
import { STRING } from '../../../constants/string';
import { COLOR } from '../../../constants/colors';
import { IMAGE } from '../../../constants/images';
import { API } from '../../../constants/api';
import { BASKET_RED } from '../../../constants/images/basket_red'
import SvgUri from 'react-native-svg-uri';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
} from 'react-native-popup-dialog';
import axios from 'axios';
import moment from 'moment';

class OrderDetailScreen extends Component {
    constructor(props) {
        super(props);
        let { id, total, statusValue, orderDetails, purchaseDate, status } = this.props.route.params;
        this.state = {
            id: id,
            total: total,
            statusValue: statusValue,
            orderDetails: orderDetails,
            purchaseDate: purchaseDate,
            status: status,
            listProducts: []
        };
    }
    componentDidMount = () => {
        this.getListProducts();
    }
    getListProducts = () => {
        let listProducts = []
        for (let i = 0; i < this.state.orderDetails.length; i++) {
            let product = {}
            axios.get(API.URL + API.PRODUCTS + '/' + this.state.orderDetails[i].productId).then(response => {
                product = response.data.success;
                product.quantity = this.state.orderDetails[i].quantity;
                listProducts.push(product);
                this.setState({ listProducts: listProducts })
            }).catch(err => {
            })
        }

    }
    format(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    render() {
        return (
            <SafeAreaView style={styles.screen}>
                <StatusBar backgroundColor={COLOR.PRIMARY} />
                <View style={styles.background}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <SvgUri svgXmlData={BACK_BLACK} />
                        </TouchableOpacity>
                        <View style={{ flex: 6, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: COLOR.TEXTBODY, fontFamily: STRING.FONT_BOLD, fontSize: 16 }}>{STRING.DETAIL_ORDER}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }} />
                    </View>
                    <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                        <Text style={{ lineHeight: 25, fontFamily: STRING.FONT_BOLD, fontSize: 16, color: COLOR.TEXTBODY }}>{STRING.LIST_PRODUCTS}</Text>

                        <FlatList
                            style={{ marginVertical: 10 }}
                            data={this.state.listProducts}
                            renderItem={({ item, index }) => {
                                console.log('length' + index)
                                const imageUri = item.primary_image != null ? item.primary_image : ""
                                return (
                                    <View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 2 }}>
                                                <Image resizeMode='contain' style={{ width: 90, height: 70 }} source={imageUri.length != 0 ? { uri: imageUri } : null}></Image>
                                            </View>
                                            <View style={{ flex: 4 }}>
                                                <Text style={{ color: COLOR.TEXTBODY, fontSize: 14, fontFamily: STRING.FONT_NORMAL, marginBottom: 10 }}>{item.full_name}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ color: COLOR.PRIMARY, fontSize: 16, marginRight: 18 }}>{this.format(parseInt(item.base_price))} {STRING.CURRENCY}</Text>
                                                    <Text style={{ color: COLOR.PLACEHODER, fontSize: 16 }}>x{item.quantity}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ borderBottomColor: COLOR.GRAY, borderBottomWidth: 1, marginVertical: 10 }} />
                                    </View>
                                )
                            }

                            }
                        />
                        <Text style={{marginBottom:10, fontFamily:STRING.FONT_NORMAL, fontSize:14, color:COLOR.TEXTBODY}}>{STRING.TOTAL} <Text style={{color:COLOR.PRIMARY}}>{this.state.total} {STRING.CURRENCY}</Text> </Text>

                        <Text style={{marginBottom:10, fontFamily:STRING.FONT_NORMAL, fontSize:14, color:COLOR.TEXTBODY}}>{STRING.STATUS}</Text>
                        {this.state.status == 1 ? (
                            <Text style={{ marginTop: 5, color: COLOR.YELLOW }}>{this.state.statusValue} {STRING.AT} {moment(this.state.purchaseDate).format('DD/MM/YYYY')}</Text>
                        ) : null}
                        {this.state.status == 3 ? (
                            <Text style={{ marginTop: 5, color: COLOR.GREEN }}>{this.state.statusValue} {STRING.AT} {moment(this.state.purchaseDate).format('DD/MM/YYYY')}</Text>
                        ) : null}
                        {this.state.status == 4 ? (
                            <Text style={{ marginTop: 5, color: COLOR.PRIMARY }}>{this.state.statusValue} {STRING.AT} {moment(this.state.purchaseDate).format('DD/MM/YYYY')}</Text>
                        ) : null}
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLOR.PRIMARY,
        justifyContent: 'center'
    },
    background: {
        backgroundColor: COLOR.WHITE,
        flex: 1
    },
    header: {
        flexDirection: 'row',
        height: 46,
    },
    option: {
        flexDirection: 'row',
        marginVertical: 27,
        marginHorizontal: 15,
        borderWidth: 0.5,
        borderColor: COLOR.LINE
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6
    },
    tab_view_text: {
        fontSize: 14,
        fontFamily: STRING.FONT_NORMAL
    },
    btn_tab: {
        marginRight: 27,
        borderBottomWidth: 2,
        height: 30
    }
})
export default OrderDetailScreen;