import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, FlatList, AsyncStorage, ScrollView, Dimensions, StatusBar, Image } from "react-native";
import { STRING } from '../../constants/string';
import { COLOR } from '../../constants/colors';
import { IMAGE } from '../../constants/images';
import { BACK_BLACK } from '../../constants/images/back_black';
import { NEXT } from '../../constants/images/next';
import { INFO } from '../../constants/images/info';
import SvgUri from 'react-native-svg-uri';
class PayScreen extends Component {
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
            discount: '0'
        };
    }
    componentDidMount = () => {
        
    }
    render() {
        return (
            <SafeAreaView style={styles.screen}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <SvgUri svgXmlData={BACK_BLACK} fill={COLOR.WHITE} />
                    </TouchableOpacity>
                    <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.header_title}>{STRING.PAY}</Text>
                    </View>
                    <TouchableOpacity onPress={() => { this.props.navigation.pop(3) }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.btn_cancel}>{STRING.CANCEL}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.background}>
                    <View style={{ height: 5, backgroundColor: COLOR.GRAY, marginBottom: 15 }} />
                    <View style={styles.form}>
                        <Text style={{ fontSize: 16, color: COLOR.TEXTBODY, fontWeight: 'bold', marginBottom: 5 }}>{STRING.SHIPPING_ADDRESS}</Text>
                        <Text style={styles.text_info}>Nguyễn Văn A - 0365004789</Text>
                        <Text style={styles.text_info}>Hồ Chí Minh 16A Lê Hồng Phong, Phường 12, Quận 10.</Text>
                        <Text style={styles.text_info}>{STRING.NOTE}Giao vào giờ hành chính, giao đúng màu</Text>
                    </View>
                    <View style={{ height: 5, backgroundColor: COLOR.GRAY, marginVertical: 20 }} />

                    <FlatList
                        data={this.state.listProducts}
                        renderItem={({ item, index }) =>
                            <View>
                                <View style={styles.form}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 2 }}>
                                            <Image style={{ width: 90, height: 60 }} source={item.image}></Image>

                                        </View>
                                        <View style={{ flex: 4 }}>
                                            <Text>{item.name}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ color: COLOR.PRIMARY, fontSize: 16 }}>{item.newPrice}</Text>
                                                <Text style={{ color: COLOR.TEXTBODY, fontSize: 14, marginLeft: 16 }}>x{item.amount}</Text>
                                            </View>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ backgroundColor: COLOR.GRAY, height: 5, marginVertical: 20 }} />
                            </View>
                        }
                    />
                    <View style={styles.form}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.title}>{STRING.ENTER_DISCOUNT_CODE}</Text>
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
                    <View style={{ backgroundColor: COLOR.GRAY, height: 5, marginVertical: 20 }} />
                    <View style={styles.form}>
                        <Text style={styles.title}>{STRING.TRANSPORTATION}</Text>
                        <Text style={{ color: COLOR.DESCRIPTION, fontSize: 13, marginTop: 5 }}>Vận chuyển giao hàng nhanh : 25,000đ</Text>
                    </View>
                    <View style={{ backgroundColor: COLOR.GRAY, height: 5, marginVertical: 20 }} />
                    <View style={{ marginHorizontal: 15, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 6 }}>
                            <Text style={styles.title}>{STRING.PAYMENT_METHOD}</Text>
                            <Text style={{ color: COLOR.DESCRIPTION, fontSize: 13, marginTop: 5 }}>Thanh toán tiền khi nhận hàng (COD)</Text>
                        </View>
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('PaymentMethodsScreen')}} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <SvgUri svgXmlData={NEXT} fill={COLOR.PLACEHODER} width={20} height={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: COLOR.GRAY, height: 5, marginVertical: 20 }} />
                    <View style={styles.form}>
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
                    <View style={{marginBottom:100}} />
                </ScrollView>

                <View style={styles.footer}>
                    <View style={{ flexDirection: 'row', marginTop:15 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: COLOR.TEXTBODY, fontSize: 14 }}>{STRING.TOTAL}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection:'row-reverse' }}>
                            <Text style={{color:COLOR.PRIMARY, fontSize:16}}>890.000 đ</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.goToOrderInfo} style={styles.btn_footer}>
                    <Text style={{color:COLOR.WHITE, fontSize:16, textTransform:'uppercase'}}>{STRING.ORDER}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    screen: {
        flex:1, 
        backgroundColor:COLOR.PRIMARY
    },
    background: {
        backgroundColor: COLOR.WHITE,
        flex:1
    },
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
    text_info: {
        fontSize: 13,
        color: COLOR.DESCRIPTION
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 94,
        backgroundColor: COLOR.WHITE,
        elevation: 24,
        paddingHorizontal: 15,
    },
    text_step: {
        color: COLOR.PLACEHODER,
        fontSize: 10,
        marginTop: 3
    },
    form: {
        marginHorizontal: 15
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
    text_input: {
        flex: 3,
        fontSize: 16,
        color: COLOR.TEXTBODY
    },
    title: {
        color: COLOR.TEXTBODY,
        fontSize: 16,
        marginRight: 5,
        fontWeight: '600'
    },
    btn_footer:{
        backgroundColor:COLOR.PRIMARY, 
        height:40, 
        borderRadius:40, 
        marginTop:10, 
        alignItems:'center', 
        justifyContent:'center', 
        marginHorizontal:5
    }
})
export default PayScreen;