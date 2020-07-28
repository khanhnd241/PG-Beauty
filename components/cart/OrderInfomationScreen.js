import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Picker, ImageBackground, ScrollView, Dimensions, StatusBar, Image } from "react-native";
import { STRING } from '../../constants/string';
import { COLOR } from '../../constants/colors';
import { IMAGE } from '../../constants/images';
import { BACK_BLACK } from '../../constants/images/back_black';
import { PLUS } from '../../constants/images/plus';
import { SUB } from '../../constants/images/sub';
import { EDIT } from '../../constants/images/edit';
import SvgUri from 'react-native-svg-uri';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
class OrderInfomationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCity: ' Hà Nội'
        };
    }
    render() {
        return (
            <SafeAreaView style={styles.screen}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <SvgUri svgXmlData={BACK_BLACK} fill={COLOR.WHITE} />
                    </TouchableOpacity>
                    <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.header_title}>{STRING.ORDER_INFO}</Text>
                    </View>
                    <TouchableOpacity onPress={() => { this.props.navigation.pop(2) }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.btn_cancel}>{STRING.CANCEL}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.background}>
                    <View style={{ height: 5, backgroundColor: COLOR.GRAY, marginBottom: 15 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View style={styles.circle_red}>
                                <Text style={{ color: COLOR.WHITE, fontSize: 13 }}>{STRING.NUMBER_1}</Text>
                            </View>
                            <Text style={styles.text_step}>{STRING.ORDER_INFO}</Text>

                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View style={styles.circle_white}>
                                <Text style={{ color: COLOR.PLACEHODER, fontSize: 13 }}>{STRING.NUMBER_2}</Text>
                            </View>
                            <Text style={styles.text_step}>{STRING.PAY}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View style={styles.circle_white}>
                                <Text style={{ color: COLOR.PLACEHODER, fontSize: 13 }}>{STRING.NUMBER_3}</Text>
                            </View>
                            <Text style={styles.text_step}>{STRING.DONE}</Text>
                        </View>
                    </View>
                    <View style={{ height: 40, backgroundColor: COLOR.GRAY, marginTop: 15 }}></View>
                    <ScrollView style={styles.background}>
                        <KeyboardAwareScrollView style={styles.form}>
                            <TextInput style={styles.input} placeholderTextColor={COLOR.PLACEHODER} placeholder={STRING.ENTER_NAME} />
                            <View style={{ borderTopWidth: 0.5, borderColor: COLOR.LINE }} />
                            <TextInput style={styles.input} placeholderTextColor={COLOR.PLACEHODER} placeholder={STRING.PHONE} />
                            <View style={{ borderTopWidth: 0.5, borderColor: COLOR.LINE }} />
                            <TextInput style={styles.input} placeholderTextColor={COLOR.PLACEHODER} placeholder={STRING.CITY} />
                            <Picker
                                selectedValue={this.state.selectedCity}
                                style={{ marginBottom: 10 }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ selectedCity: itemValue })}
                            >
                                <Picker.Item label="Hà Nội" value="Hà Nội" />
                                <Picker.Item label="TP.Hồ Chí Minh" value="TP.Hồ Chí Minh" />
                                <Picker.Item label="Hà Nội" value="Hà Nội" />
                                <Picker.Item label="TP.Hồ Chí Minh" value="TP.Hồ Chí Minh" />
                                <Picker.Item label="Hà Nội" value="Hà Nội" />
                                <Picker.Item label="TP.Hồ Chí Minh" value="TP.Hồ Chí Minh" />
                                <Picker.Item label="Hà Nội" value="Hà Nội" />
                                <Picker.Item label="TP.Hồ Chí Minh" value="TP.Hồ Chí Minh" />
                                <Picker.Item label="Hà Nội" value="Hà Nội" />
                                <Picker.Item label="TP.Hồ Chí Minh" value="TP.Hồ Chí Minh" />
                                <Picker.Item label="Hà Nội" value="Hà Nội" />
                                <Picker.Item label="TP.Hồ Chí Minh" value="TP.Hồ Chí Minh" />
                            </Picker>
                            <View style={{ borderTopWidth: 0.5, borderColor: COLOR.LINE }} />
                            <View style={{ borderTopWidth: 0.5, borderColor: COLOR.LINE }} />
                            <TextInput style={styles.input} placeholderTextColor={COLOR.PLACEHODER} placeholder={STRING.DISTRICT} />
                            <View style={{ borderTopWidth: 0.5, borderColor: COLOR.LINE }} />
                            <TextInput style={styles.input} placeholderTextColor={COLOR.PLACEHODER} placeholder={STRING.WARD} />
                            <View style={{ borderTopWidth: 0.5, borderColor: COLOR.LINE }} />
                            <TextInput style={styles.input} placeholderTextColor={COLOR.PLACEHODER} placeholder={STRING.ADDRESS} />
                            <View style={{ borderTopWidth: 0.5, borderColor: COLOR.LINE }} />
                            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                <SvgUri svgXmlData={EDIT} />
                                <Text style={{ color: COLOR.LINK, marginLeft: 5 }}>{STRING.NOTE_ORDER}</Text>
                            </View>
                            <TextInput style={styles.input} placeholderTextColor={COLOR.PLACEHODER} placeholder={STRING.NOTE_ORDER} />
                            <View style={{ marginBottom: 70 }} />
                        </KeyboardAwareScrollView>
                    </ScrollView>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('PayScreen') }} style={{ backgroundColor: COLOR.PRIMARY, borderRadius: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: COLOR.WHITE, fontSize: 16, textTransform: 'uppercase' }}>{STRING.CONTINUE}</Text>
                    </TouchableOpacity>
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
    circle_red: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: COLOR.PRIMARY,
        alignItems: 'center',
        justifyContent: 'center'
    },
    circle_white: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: COLOR.WHITE,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 58,
        backgroundColor: COLOR.WHITE,
        elevation: 24,
        paddingHorizontal: 15,
        paddingVertical: 9,
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
        fontSize: 14,
        marginTop: 20
    }
})
export default OrderInfomationScreen;