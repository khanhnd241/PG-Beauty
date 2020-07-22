import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, FlatList, ImageBackground, ScrollView, Dimensions, StatusBar, Image } from "react-native";
import { STRING } from '../../constants/string';
import { COLOR } from '../../constants/colors';
import { IMAGE } from '../../constants/images';
import { ICON_CLOSE } from '../../constants/images/icon_close';
import { PLUS } from '../../constants/images/plus';
import { SUB } from '../../constants/images/sub';
import { INFO } from '../../constants/images/info';
import SvgUri from 'react-native-svg-uri';
class CartDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProducts: [
                {
                    name: 'Son Chanel mới nhất Intense Matte Lip Color',
                    color: 'Màu 116',
                    image: IMAGE.ANH_DEMO_6,
                    newPrice: ' 100000 đ',
                    oldPrice: '₫980.000',
                    amount: '1'
                },
                {
                    name: 'Son Chanel mới nhất Intense Matte Lip Color',
                    color: 'Màu 116',
                    image: IMAGE.ANH_DEMO_6,
                    newPrice: ' 100000 đ',
                    oldPrice: '₫980.000',
                    amount: '2'
                }, {
                    name: 'Son Chanel mới nhất Intense Matte Lip Color',
                    color: 'Màu 116',
                    image: IMAGE.ANH_DEMO_6,
                    newPrice: ' 100000 đ',
                    oldPrice: '₫980.000',
                    amount: '3'
                }
            ],
            refresh: true,
            codeInput: '',
            discount: '0 đ'
        };
    }
    componentDidMount = () => {
        this.sumProduct();
    }
    sumProduct = () => {
        let tong = 0;
        for (let i = 0; i < this.state.listProducts.length; i++) {
            let newPrice = parseInt(this.state.listProducts[i].newPrice);
            let amount = parseInt(this.state.listProducts[i].amount);
            console.log(newPrice, amount);
            tong = tong + newPrice * amount;
        }
        console.log(tong);
    }

    reload = () => {
        this.setState({ refresh: false })
    }
    deleteProduct = (index) => {
        this.state.listProducts.splice(index, 1);
        this.setState({ listProducts: this.state.listProducts });
        this.setState({ refresh: true });
        this.reload();
        this.sumProduct();
    }
    goToOrderInfo = () =>{
        this.props.navigation.navigate('OrderInfomationScreen');
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
                <View style={styles.header}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.header_title}>{STRING.CART}</Text>
                    </View>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.btn_cancel}>{STRING.CANCEL}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <FlatList
                        extraData={this.state.refresh}
                        data={this.state.listProducts}
                        renderItem={({ item, index }) =>
                            <View>
                                <View style={styles.item_container}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 2 }}>
                                            <Image style={{ width: 90, height: 60 }} source={item.image}></Image>

                                        </View>
                                        <View style={{ flex: 4 }}>
                                            <Text>{item.name}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ color: COLOR.PRIMARY, fontSize: 16 }}>{item.newPrice}</Text>
                                                <Text style={{ color: COLOR.PLACEHODER, fontSize: 12, textDecorationLine: 'line-through', marginLeft: 16 }}>{item.oldPrice}</Text>
                                            </View>

                                        </View>
                                        <TouchableOpacity onPress={() => { this.deleteProduct(index) }} style={{ flex: 0.5, alignItems: 'center' }}>
                                            <SvgUri svgXmlData={ICON_CLOSE} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <View style={{ flex: 2 }}></View>
                                        <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableOpacity>
                                                <SvgUri svgXmlData={SUB} />
                                            </TouchableOpacity>
                                            <Text style={{ marginHorizontal: 15 }}>{item.amount}</Text>
                                            <TouchableOpacity>
                                                <SvgUri svgXmlData={SUB} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 0.5 }}></View>
                                    </View>
                                </View>
                                <View style={{ backgroundColor: COLOR.GRAY, height: 5 }} />
                            </View>
                        }
                    />
                    <View style={styles.item_container}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: COLOR.TEXTBODY, fontSize: 16, marginRight: 5, fontWeight: '600' }}>{STRING.ENTER_DISCOUNT_CODE}</Text>
                            <View style={{ alignItems: 'center', marginTop: 5 }}>
                                <SvgUri svgXmlData={INFO} fill={COLOR.BLACK} />
                            </View>
                        </View>
                        <View style={styles.input}>
                            <TextInput value={this.state.codeInput} onChangeText={(value) => { this.setState({ codeInput: value }) }} style={styles.text_input} placeholderTextColor={COLOR.PLACEHODER} placeholder={STRING.ENTER_DISCOUNT_CODE}></TextInput>
                            <View style={styles.btn_apply}>
                                <Text style={{ color: COLOR.WHITE, textTransform: 'uppercase', fontSize: 14 }}>{STRING.APPLY}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 14, color: COLOR.TEXTBODY }}>{STRING.DISCOUNT_LEVEL}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                <Text style={{ fontSize: 14, color: COLOR.ORANGE }}>{this.state.discount}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: COLOR.GRAY, height: 5, marginTop: 14, marginBottom: 9 }} />
                    <View style={styles.item_container}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 14, color: COLOR.TEXTBODY }}>{STRING.MONEY}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                <Text style={{ fontSize: 14, color: COLOR.TEXTBODY }}>890.000 đ</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 14, color: COLOR.TEXTBODY }}>{STRING.DISCOUNT}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                <Text style={{ fontSize: 14, color: COLOR.ORANGE }}>{this.state.discount}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 14, color: COLOR.TEXTBODY }}>{STRING.TOTAL}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                <Text style={{ fontSize: 14, color: COLOR.TEXTBODY }}>890.000 đ</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.footer}>
                    <View style={{ flexDirection: 'row', marginTop:15 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: COLOR.TEXTBODY, fontSize: 14 }}>{STRING.TOTAL}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection:'row-reverse' }}>
                            <Text style={{color:COLOR.PRIMARY, fontSize:16}}>890.000 đ</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.goToOrderInfo} style={{backgroundColor:COLOR.PRIMARY, height:40, borderRadius:40, marginTop:10, alignItems:'center', justifyContent:'center', marginHorizontal:5}}>
                    <Text style={{color:COLOR.WHITE, fontSize:16, textTransform:'uppercase'}}>{STRING.CONTINUE}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLOR.PRIMARY,
        height: 45,
        flexDirection: 'row'
    },
    header_title: {
        fontSize: 16,
        color: COLOR.WHITE
    },
    btn_cancel: {
        fontSize: 14,
        color: COLOR.WHITE
    },
    content: {
        backgroundColor: COLOR.WHITE,

    },
    item_container: {
        marginTop: 10,
        marginHorizontal: 15,
    },
    text_input: {
        flex: 3,
        fontSize: 16,
        color: COLOR.TEXTBODY
    },
    input: {
        height: 40,
        borderWidth: 0.5,
        borderColor: COLOR.LINE,
        flexDirection: 'row',
        marginVertical: 8
    },
    btn_apply: {
        flex: 1,
        backgroundColor: COLOR.LINK,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 94,
        backgroundColor: COLOR.WHITE,
        shadowColor: "#000",
        elevation: 24,
        paddingHorizontal: 15,
    }
})
export default CartDetailScreen;