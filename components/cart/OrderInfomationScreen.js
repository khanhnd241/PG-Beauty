import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Picker, AsyncStorage, ScrollView, Dimensions, StatusBar, ActivityIndicator, Alert, KeyboardAvoidingView } from "react-native";
import { STRING } from '../../constants/string';
import { COLOR } from '../../constants/colors';
import { IMAGE } from '../../constants/images';
import { BACK_BLACK } from '../../constants/images/back_black';
import { PLUS } from '../../constants/images/plus';
import { SUB } from '../../constants/images/sub';
import { EDIT } from '../../constants/images/edit';
import SvgUri from 'react-native-svg-uri';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API } from '../../constants/api';
import axios from 'axios';
import { Dropdown } from 'react-native-material-dropdown';
import Dialog, {
    DialogContent
} from 'react-native-popup-dialog';
class OrderInfomationScreen extends Component {
    constructor(props) {
        super(props);
        const { total, discount } = this.props.route.params
        this.state = {
            selectedCity: 'Chọn tỉnh/ thành phố',
            total: total,
            discount: discount,
            name: '',
            phone: '',
            district: 'Chọn quận/ huyện',
            ward: 'Chọn phường/ xã',
            address: '',
            comment: '',
            isEdit: true,
            listProvinces: [],
            listDistricts: [],
            listWards: [],
            listCity: [],
            loadingDialog: false
        };
    }
    componentDidMount = () => {
        this.setState({ loadingDialog: true })
        AsyncStorage.getItem('name', (err, result) => {
            if (result != null) {
                this.setState({ name: result, isEdit: false });

            } else {
                this.setState({ isEdit: true });
            }
        });
        AsyncStorage.getItem('phone', (err, result) => {
            if (result != null) {
                this.setState({ phone: result, isEdit: false });
            } else {
                this.setState({ isEdit: true });
            }
        });
        axios.get(API.URL + API.PROVINCES).then(res => {
            console.log(res.data);
            this.setState({ listProvinces: res.data.success, loadingDialog: false },()=>{
                for(let i = 0; i < this.state.listProvinces.length; i++) {
                    let city = {};
                    city.value = this.state.listProvinces[i].name
                    this.state.listCity.push(city);
                }
            })
        }).catch(err => {
            console.log(err)
            this.setState({ loadingDialog: false })
        })
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
                    <KeyboardAwareScrollView style={styles.background}>
                        <View style={styles.form}>
                            <TextInput value={this.state.name} editable={this.state.isEdit} onChangeText={(value) => this.setState({ name: value })} style={styles.input} placeholderTextColor={COLOR.PLACEHODER} placeholder={STRING.ENTER_NAME} />
                            <View style={{ borderTopWidth: 0.5, borderColor: COLOR.LINE }} />
                            <TextInput value={this.state.phone} editable={this.state.isEdit} onChangeText={(value) => this.setState({ phone: value })} style={styles.input} placeholderTextColor={COLOR.PLACEHODER} placeholder={STRING.PHONE} />
                            <View style={{ borderTopWidth: 0.5, borderColor: COLOR.LINE }} />
                            {/* <Text style={styles.city}>{STRING.CITY}</Text> */}
                            {/* <Picker
                                selectedValue={this.state.selectedCity}
                                style={{ marginBottom: 10 }}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({ selectedCity: itemValue, listDistricts: this.state.listProvinces[itemIndex].districts })
                                }
                                }
                            >
                                {this.state.listProvinces.map((item, index) => {
                                    return (<Picker.Item label={item.name} value={item.name} key={index} />)
                                })}
                            </Picker> */}
                            <Dropdown
                                label={STRING.CITY}
                                data={this.state.listCity}
                            />
                            <Text style={styles.city}>{STRING.DISTRICT}</Text>
                            <Picker
                                selectedValue={this.state.district}
                                style={{ marginBottom: 10 }}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({ district: itemValue, listWards: this.state.listDistricts[itemIndex].wards })
                                    console.log('danh sach phuong ' + this.state.listWards)
                                }
                                }
                            >
                                {this.state.listDistricts.map((item, index) => {
                                    return (<Picker.Item label={item.name} value={item.name} key={index} />)
                                })}
                            </Picker>
                            <View style={{ borderTopWidth: 0.5, borderColor: COLOR.LINE }} />
                            <Text style={styles.city}>{STRING.WARD}</Text>
                            <Picker
                                selectedValue={this.state.ward}
                                style={{ marginBottom: 10 }}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({ ward: itemValue })
                                }
                                }
                            >
                                {this.state.listWards.map((item, index) => {
                                    return (<Picker.Item label={item.name} value={item.name} key={index} />)
                                })}
                            </Picker>
                            <View style={{ borderTopWidth: 0.5, borderColor: COLOR.LINE }} />
                            <TextInput onChangeText={(value) => this.setState({ address: value })} style={styles.input} placeholderTextColor={COLOR.PLACEHODER} placeholder={STRING.ADDRESS} />
                            <View style={{ borderTopWidth: 0.5, borderColor: COLOR.LINE }} />
                            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                <SvgUri svgXmlData={EDIT} />
                                <Text style={{ color: COLOR.LINK, marginLeft: 5 }}>{STRING.NOTE_ORDER}</Text>
                            </View>
                            <TextInput onChangeText={(value) => this.setState({ comment: value })} style={styles.input} placeholderTextColor={COLOR.PLACEHODER} placeholder={STRING.NOTE_ORDER} />
                            <View style={{ marginBottom: 250 }} />
                        </View>
                    </KeyboardAwareScrollView>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => {
                        if (this.state.selectedCity.trim() == '' || this.state.name.trim() == '' || this.state.phone.trim() == '' || this.state.district.trim() == '' || this.state.ward.trim() == '' || this.state.address.trim() == '') {
                            Alert.alert(STRING.NOTIFICATION, STRING.REQUIRED_FIELD, [{ text: STRING.ACCEPT }])
                        } else {
                            this.props.navigation.navigate('PayScreen', {
                                selectedCity: this.state.selectedCity,
                                total: this.state.total,
                                discount: this.state.discount,
                                name: this.state.name,
                                phone: this.state.phone,
                                district: this.state.district,
                                ward: this.state.ward,
                                address: this.state.address,
                                comment: this.state.comment
                            })
                        }

                    }} style={{ backgroundColor: COLOR.PRIMARY, borderRadius: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: COLOR.WHITE, fontSize: 16, textTransform: 'uppercase' }}>{STRING.CONTINUE}</Text>
                    </TouchableOpacity>
                </View>
                <Dialog
                    dialogStyle={{ backgroundColor: 'transparent' }}
                    onDismiss={() => {
                        this.setState({ loadingDialog: false });
                    }}
                    height={400}
                    width={0.9}
                    visible={this.state.loadingDialog}
                >
                    <DialogContent style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator color={COLOR.PRIMARY} size='large' />
                    </DialogContent>
                </Dialog>
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
        marginTop: 20,
        color: COLOR.BLACK
    },
    city: {
        fontSize: 14,
        marginTop: 20,
        color: COLOR.PLACEHODER
    }
})
export default OrderInfomationScreen;