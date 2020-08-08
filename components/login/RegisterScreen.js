import React, { Component } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text, TextInput, Alert, StatusBar, ActivityIndicator, AsyncStorage } from "react-native";
import { IMAGE } from '../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../constants/string';
import { API } from '../../constants/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LOGO } from '../../constants/images/logo';
import { EYE } from '../../constants/images/eye'
import { EYE_ACTIVE } from '../../constants/images/eye_active';
import { DROPDOWN } from '../../constants/images/dropdown';
import { CLOSE } from '../../constants/images/close';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLOR } from '../../constants/colors'
import moment from 'moment';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
} from 'react-native-popup-dialog';
// import DatePicker from 'react-native-datepicker'
class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: true,
            showConfirmPassword: true,
            name: '',
            dateOfBirth: new Date(),
            address: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            datePicker: false,
            dateView: STRING.ENTER_DATE_OF_BIRTH,
            loadingDialog: false,
            date: "2016-05-15",
            calendarDialog: false,
            deviceId: '',
            id: null,
            token: ''
        };
    }
    // handlerDate = (date) => {
    //     console.log('ngay sinh', date);
    //     this.setState({
    //         dateOfBirth: date,
    //         datePicker: false,
    //         dateView: moment(date).format('DD/MM/YYYY')
    //     })

    // }
    onChange = (event, date) => {
        this.setState({
            dateView: moment(date).format('DD/MM/YYYY'),
            calendarDialog: false
        })
    };
    showPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }
    showConfirmPassword = () => {
        this.setState({
            showConfirmPassword: !this.state.showConfirmPassword
        })
    }
    // kiem tra cac truong nhap vao neu dung return true
    validate = () => {
        if (this.state.name.trim() == '' || this.state.phone.trim() == '' || this.state.password.trim() == '' || this.state.confirmPassword.trim() == '') {
            // this.setState({loadingDialog: false});
            Alert.alert(STRING.ERROR, STRING.REQUIRED_FIELD, [{
                text: STRING.ACCEPT,
                style: 'cancel'
            }])
            return false;
        }
        if (this.state.password != this.state.confirmPassword) {
            Alert.alert(STRING.ERROR, STRING.ERR_CONFIRM_PASS, [{
                text: STRING.ACCEPT,
                style: 'cancel'
            }])
            return false
        }
        if (this.state.password.length < 8) {
            this.setState({ loadingDialog: false });
            Alert.alert(STRING.ERROR, STRING.LESS_THAN_8, [{
                text: STRING.ACCEPT,
                style: 'cancel'
            }])
            return false;
        }
        return true;
    }
    connect = () => {
        // ket noi den kiot viet
        this.setState({ loadingDialog: true })
        var data = new FormData();
        data.append(API.SCOPES, API.SCOPES_DATA);
        data.append(API.GRANT_TYPE, API.GRANT_TYPE_DATA);
        data.append(API.CLIENT_ID, API.CLIENT_ID_DATA);
        data.append(API.CLIENT_SECRET, API.CLIENT_SECRET_DATA);

        axios.post(API.URL_CONNECT_KIOT, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            console.log(response.data.access_token);
            if (response.data.access_token == null || response.data.access_token == '') {
                Alert.alert(STRING.NOTIFICATION, STRING.REGISTRATION_FAILED, [{ text: STRING.ACCEPT }])
            } else {
                this.setState({ token: response.data.access_token })
                const config = {
                    headers: {
                        Authorization: `Bearer ${this.state.token}`,
                        Retailer: API.RETAILER,
                    }
                };
                // goi api tim kiem nguoi dung theo sdt
                axios.get(API.URL_API_KIOT + API.CUSTOMERS + '?contactNumber=' + this.state.phone, config).then(res => {
                    console.log(res.data.data.length);
                    if (res.data.data.length == 0) {
                        this.setState({ 
                            loadingDialog: false,
                            name: '',
                            address: '',
                            email: '',
                            dateView: STRING.ENTER_DATE_OF_BIRTH,
                            id: '' 
                        })

                    } else {
                        // neu co account roi, lay thong tin hien thi vao cac truong
                        this.setState({
                            loadingDialog: false,
                            name: res.data.data[0].name,
                            address: res.data.data[0].address,
                            email: res.data.data[0].email,
                            dateView: moment(res.data.data[0].birthDate).format('DD/MM/YYYY'),
                            id: res.data.data[0].id
                        })
                        
                    }

                }).catch(err => {
                    this.setState({ loadingDialog: false })
                    // Alert.alert(STRING.NOTIFICATION, STRING.REGISTRATION_FAILED, [{ text: STRING.ACCEPT }])
                    console.log('loi' + JSON.stringify(err))
                })
            }
        }).catch(err => {
            this.setState({ loadingDialog: false })
            console.log(JSON.stringify(err));
            Alert.alert(STRING.NOTIFICATION, STRING.REGISTRATION_FAILED, [{ text: STRING.ACCEPT }])
        })
    }
    register = (data) => {
        // goi api dang ki ben pg beauty
        axios.post(API.URL + API.REGISTER, data).then(response => {
            this.setState({ loadingDialog: false });
            if (response.data.success.token != null || response.data.success.token != '') {
                // neu thanh cong, set cac gia tri
                AsyncStorage.setItem('token', response.data.success.token);
                AsyncStorage.setItem('password', this.state.password);
                this.getInfo(response.data.success.token);
                this.setState({ loadingDialog: false });
                Alert.alert(STRING.NOTIFI, STRING.SIGN_UP_SUCCESS, [{
                    text: STRING.ACCEPT,
                    onPress: () => { this.props.navigation.replace('App') }
                }])
            }
        }).catch(error => {
            this.setState({ loadingDialog: false });
            Alert.alert(STRING.ERROR, JSON.stringify(error.response.data.error), [{ text: STRING.ACCEPT }]);
            console.log(JSON.stringify(error.response.data));
        }
        );
    }
    ClickRegister = () => {
        console.log('id nguoi dung' + this.state.id)
        let data = {};
        this.validate();
        console.log(this.validate());
        if (this.validate() == true) {
            this.setState({ loadingDialog: true });
            
            data.name = this.state.name;
            data.phone = this.state.phone;
            data.password = this.state.password;
            // data.device_id = this.state.deviceId;
            if (this.state.email.trim() != '') {
                data.email = this.state.email;
            }
            if (this.state.dateView.trim() != '' && this.state.dateView != STRING.ENTER_DATE_OF_BIRTH) {
                data.birthday = this.state.dateView;
                console.log('ngay sinh' + data.birthday);
            }
            if (this.state.address.trim() != '') {
                data.address = this.state.address;
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${this.state.token}`,
                    Retailer: API.RETAILER,
                }
            };
            // kiem tra neu chua co nguoi dung ben kiot viet thi tao moi 1 account, neu co roi thi update lai thong tin
            if (this.state.id == null || this.state.id == '') {
                console.log('tao moi nguoi dung')
                data.branchId = API.BRANDID;
                data.contactNumber = this.state.phone
                axios.post(API.URL_API_KIOT + API.CUSTOMERS, data, config).then(response => {
                    console.log('code moi' + response.data.data.code);
                    if(response.data.data.code == '' || response.data.data.code == '') {
                        Alert.alert(STRING.NOTIFICATION, STRING.REGISTRATION_FAILED, [{ text: STRING.ACCEPT }]);
                    } else {
                        AsyncStorage.setItem('code', response.data.data.code);
                        this.register(data);
                    }
                }).catch(err => {
                    console.log(JSON.stringify(err)); 
                    Alert.alert(STRING.NOTIFICATION, JSON.stringify(err.responseStatus) , [{ text: STRING.ACCEPT }]);
                    this.setState({ loadingDialog: false });
                })
            } else {
                console.log('update nguoi dung')
                axios.put(API.URL_API_KIOT + API.CUSTOMERS + '/' + this.state.id, data, config).then(response => {
                    console.log('khach hang kiot ' + response.data.data.code);
                    if(response.data.data.code == '' || response.data.data.code == '') {
                        Alert.alert(STRING.NOTIFICATION, STRING.REGISTRATION_FAILED, [{ text: STRING.ACCEPT }]);
                    } else {
                        AsyncStorage.setItem('code', response.data.data.code);
                        this.register(data)
                    }
                    
                }).catch(err => {
                    Alert.alert(STRING.NOTIFICATION, JSON.stringify(err.responseStatus.message), [{ text: STRING.ACCEPT }])
                })
            }
        }
    }
    componentDidMount = () => {
        AsyncStorage.getItem('deviceId', (err, deviceId) => {
            this.setState({ deviceId: deviceId });
        })
    }
    // lay thong tin nguoi dung
    getInfo = (token) => {
        var listOrder = [];
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.get(API.URL + API.USER, config).then(response => {
            console.log(response.data);
            AsyncStorage.setItem('id', JSON.stringify(response.data.success.id));
            AsyncStorage.setItem(JSON.stringify(response.data.success.id), JSON.stringify(listOrder));
            AsyncStorage.setItem('name', response.data.success.name);
            AsyncStorage.setItem('phone', response.data.success.phone);
        }).catch(error => {
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.background}>
                <StatusBar backgroundColor={COLOR.PRIMARY} />
                <TouchableOpacity style={styles.btn_close} onPress={() => this.props.navigation.goBack()}>
                    <SvgUri svgXmlData={CLOSE} />
                </TouchableOpacity>
                <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        <View style={styles.logo}>
                            <SvgUri svgXmlData={LOGO} />
                        </View>
                        <Text style={styles.title}>{STRING.ENTER_INFO}</Text>
                        <TextInput style={styles.textInput} onBlur={() => this.connect()} placeholder={STRING.ENTER_PHONE_INPUT} keyboardType='numeric' maxLength={10} placeholderTextColor={COLOR.PLACEHODER} onChangeText={(value) => { this.setState({ phone: value }) }}></TextInput>
                        <TextInput style={styles.textInput} value={this.state.name} placeholder={STRING.ENTER_NAME} placeholderTextColor={COLOR.PLACEHODER} onChangeText={(value) => { this.setState({ name: value }) }}></TextInput>
                        <TouchableOpacity onPress={() => { this.setState({ calendarDialog: true }) }} style={styles.input_dob}>
                            <Text style={{ flex: 7, color: COLOR.PLACEHODER }}>{this.state.dateView}</Text>
                            <View style={{ flex: 1 }}>
                                <SvgUri svgXmlData={DROPDOWN} />
                            </View>
                        </TouchableOpacity>
                        <TextInput style={styles.textInput} value={this.state.address} placeholder={STRING.ENTER_ADDRESS} placeholderTextColor={COLOR.PLACEHODER} onChangeText={(value) => { this.setState({ address: value }) }}></TextInput>
                        <TextInput style={styles.textInput} value={this.state.email} placeholder={STRING.EMAIL} placeholderTextColor={COLOR.PLACEHODER} onChangeText={(value) => { this.setState({ email: value }) }}></TextInput>

                        <View style={styles.input_dob}>
                            <TextInput style={{ flex: 6, fontFamily:STRING.FONT_NORMAL }} secureTextEntry={this.state.showPassword} placeholder={STRING.ENTER_PASSWORD} placeholderTextColor={COLOR.PLACEHODER} onChangeText={(value) => { this.setState({ password: value }) }}></TextInput>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={this.showPassword}>
                                {this.state.showPassword ? (<SvgUri svgXmlData={EYE} />) : (<SvgUri svgXmlData={EYE} fill={COLOR.PLACEHODER} />)}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.input_dob}>
                            <TextInput style={{ flex: 6,fontFamily:STRING.FONT_NORMAL }} secureTextEntry={this.state.showConfirmPassword} placeholderTextColor={COLOR.PLACEHODER} placeholder={STRING.CONFIRM_PASSWORD} onChangeText={(value) => { this.setState({ confirmPassword: value }) }}></TextInput>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={this.showConfirmPassword}>
                                {this.state.showConfirmPassword ? (<SvgUri svgXmlData={EYE} />) : (<SvgUri svgXmlData={EYE} fill={COLOR.PLACEHODER} />)}
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.btn_register} onPress={this.ClickRegister}>
                            <Text style={{ textTransform: 'uppercase', color: COLOR.WHITE, fontSize: 16,fontFamily:STRING.FONT_BOLD }}>{STRING.REGISTER}</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAwareScrollView>
                <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 5, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: COLOR.WHITE, fontSize: 14, fontFamily:STRING.FONT_NORMAL }}>{STRING.HAVE_ACCOUNT}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
                            <Text style={{ color: COLOR.WHITE, fontFamily:STRING.FONT_BOLD, fontSize: 14 }}>{STRING.LOGIN_NOW}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.state.calendarDialog ? (
                    <DateTimePicker
                        value={new Date()}
                        mode='date'
                        display="spinner"
                        onChange={this.onChange}
                    />
                ) : null}
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
    background: {
        flex: 1,
        backgroundColor: COLOR.PRIMARY,
    },
    btn_close: {
        marginLeft: 16,
        marginTop: 20
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        marginTop: 5,
    },
    title: {
        fontFamily:STRING.FONT_NORMAL,
        color: COLOR.WHITE,
        marginTop: 10,
        fontSize: 14,
        marginBottom: 20
    },
    textInput: {
        fontFamily:STRING.FONT_NORMAL,
        paddingLeft: 16,
        width: 320,
        height: 45,
        borderRadius: 30,
        backgroundColor: COLOR.WHITE,
        marginBottom: 10
    },
    input_dob: {
        paddingLeft: 16,
        width: 320,
        height: 45,
        borderRadius: 30,
        backgroundColor: COLOR.WHITE,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    btn_register: {
        fontFamily:STRING.FONT_BOLD,
        width: 320,
        height: 45,
        borderRadius: 30,
        backgroundColor: '#981824',
        alignItems: 'center',
        justifyContent: 'center'
    }

})
export default RegisterScreen;