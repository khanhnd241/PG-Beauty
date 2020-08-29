import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, AsyncStorage, ScrollView, Dimensions, StatusBar, Image } from "react-native";
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../constants/string';
import { COLOR } from '../../constants/colors';
import { BACK_BLACK } from '../../constants/images/back_black';
import { RadioButton } from 'react-native-paper';
class PaymentMethodsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: '0'
        };
    }
    render() {
        return (
            <SafeAreaView style={styles.screen}>
                <StatusBar barStyle='light-content' backgroundColor={COLOR.PRIMARY} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <SvgUri svgXmlData={BACK_BLACK} fill={COLOR.WHITE} />
                    </TouchableOpacity>
                    <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.header_title}>{STRING.PAYMENT_METHOD}</Text>
                    </View>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    </TouchableOpacity>
                </View>
                <View style={styles.background}>
                    <View style={{ backgroundColor: COLOR.GRAY, height: 5, marginBottom: 15 }} />
                    <View style={styles.form}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <RadioButton
                                    value="0"
                                    status={this.state.checked === '0' ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        console.log('chon 1');
                                        this.setState({ checked: '0' })
                                    }}
                                    color={COLOR.PRIMARY}
                                />
                            </View>
                            <View style={{ flex: 7 }}>
                                <Text style={styles.text_content}>Thanh toán tiền khi nhận hàng (COD)</Text>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <RadioButton
                                    value="1"
                                    status={this.state.checked === '1' ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        console.log('chon 2');
                                        this.setState({ checked: '1' })
                                    }}
                                    color={COLOR.PRIMARY}
                                />
                            </View>
                            <View style={{ flex: 7 }}>
                                <Text style={styles.text_content}>Thanh toán qua chuyển khoản ngân hàng</Text>
                            </View>

                        </View>
                        {/* Thong tin chuyen khoan */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <View style={{ flex: 1 }}>
                            </View>
                            <View style={{ flex: 7 }}>
                                <Text style={styles.text_content}>Chuyển tiền tại quầy chi nhánh ngân hàng vào tài khoản theo thông tin dưới đây:</Text>
                                <Text style={styles.text_content}>Họ và tên người hưởng: <Text style={styles.text_content, { fontWeight: 'bold' }}>{STRING.PG_BEAUTY}</Text></Text>
                                <Text style={styles.text_content}>Số tài khoản: <Text style={styles.text_content, { fontWeight: 'bold' }}>0681000011361</Text></Text>
                                <Text style={styles.text_content}>Tại: <Text style={styles.text_content, { fontWeight: 'bold' }}>Vietcombank - Hội Sở</Text></Text>
                                <Text style={styles.text_content}>Nội dung chuyển tiền: <Text style={styles.text_content}>Chuyển tiền vào tài khoản [Số tài khoản khách hàng]của [Họ và tên khách hàng].</Text></Text>
                            </View>
                        </View>
                    </View>
                </View>

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
    header: {
        backgroundColor: COLOR.PRIMARY,
        height: 45,
        flexDirection: 'row'
    },
    header_title: {
        fontSize: 16,
        color: COLOR.WHITE
    },
    form: {
        marginHorizontal: 15
    },
    text_content: {
        fontSize: 14,
        color: COLOR.TEXTBODY,
        lineHeight: 30
    }
})
export default PaymentMethodsScreen;