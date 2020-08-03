import React, { Component } from "react";
import { View, Button, SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Alert, AsyncStorage, ActivityIndicator } from "react-native";
import { IMAGE } from '../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../constants/string';
import { API } from '../../constants/api';
import { LOGO } from '../../constants/images/logo';
import { EYE } from '../../constants/images/eye'
import { CLOSE } from '../../constants/images/close'
import { EYE_ACTIVE } from '../../constants/images/eye_active';
import { COLOR } from '../../constants/colors';
import axios from 'axios';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
} from 'react-native-popup-dialog';
class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            showPassword: true,
            loadingDialog: false,
            code: ''
        };
    }
    componentDidMount = () => {
    }
    showPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }
    validate = () => {
        if (this.state.phone.trim() == '' || this.state.password.trim() == '') {
            Alert.alert(STRING.ERROR, STRING.ERR_NULL_PHONE_PASS, [
                {
                    text: STRING.ACCEPT, onPress: () => {
                    }
                },
            ])
            return false;
        };
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
                axios.get(API.URL_API_KIOT + API.CUSTOMERS + '?contactNumber=' + this.state.phone, config).then(res => {
                    if (res.data.data[0].code == '' || res.data.data[0].code == null) {
                        this.setState({ loadingDialog: false })
                    } else {
                        console.log('code dang nhap' + res.data.data[0].code);
                        this.setState({
                            loadingDialog: false,
                            code: res.data.data[0].code
                        })
                        
                        this.login();
                    }

                }).catch(err => {
                    this.setState({ loadingDialog: false })
                    Alert.alert(STRING.NOTIFICATION, STRING.LOGIN_FAILED, [{ text: STRING.ACCEPT }])
                    console.log('loi' + JSON.stringify(err))
                })
            }
        }).catch(err => {
            this.setState({ loadingDialog: false })
            console.log(JSON.stringify(err));
            Alert.alert(STRING.NOTIFICATION, STRING.LOGIN_FAILED, [{ text: STRING.ACCEPT }])
        })
    }
    login = () => {
        console.log(this.validate())
        if (this.validate() == true) {
            this.setState({ loadingDialog: true });
            axios.post(API.URL + API.LOGIN, {
                phone: this.state.phone,
                password: this.state.password,
            }).then(response => {
                console.log(response.data);
                if (response.data.success.token != null || response.data.success.token != '') {
                    AsyncStorage.setItem('token', response.data.success.token);
                    AsyncStorage.setItem('phone', this.state.phone);
                    AsyncStorage.setItem('password', this.state.password);
                    AsyncStorage.setItem('code', this.state.code);
                    this.getInfo(response.data.success.token);
                    this.props.navigation.replace('App')
                    this.setState({ loadingDialog: false })
                }
            }).catch(error => {
                this.setState({ loadingDialog: false });
                Alert.alert(STRING.ERROR, JSON.stringify(error.response.data.error), [{ text: STRING.ACCEPT }])
            }
            );
        }
    }
    getInfo = (token) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.get(API.URL + API.USER, config).then(response => {
            console.log(response.data);
            AsyncStorage.setItem('id', JSON.stringify(response.data.success.id));
            AsyncStorage.setItem('name', response.data.success.name);
            AsyncStorage.setItem('phone', response.data.success.phone);
        }).catch(error => {
        });
    }
    blurInput = () => {

    }
    render() {
        return (
            <SafeAreaView style={styles.background}>
                <StatusBar backgroundColor={COLOR.PRIMARY} />
                <TouchableOpacity style={styles.btn_close} onPress={() => this.props.navigation.goBack()}>
                    <SvgUri svgXmlData={CLOSE} />
                </TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.logo}>
                        <SvgUri
                            svgXmlData={LOGO}
                        />

                    </View>
                    <Text style={styles.text}>{STRING.ENTER_PHONE}</Text>
                    <View style={{ marginTop: 20 }}>
                        <TextInput keyboardType="numeric" maxLength={10} value={this.state.phone} name="phone" onChangeText={(value) => this.setState({ phone: value })} style={styles.phone_input}
                            placeholder={STRING.PH_ENTER_PHONE} placeholderTextColor={COLOR.PLACEHODER} onBlur={this.blurInput}></TextInput>
                        <View style={styles.password_input}>
                            <TextInput style={{ flex: 5 }} secureTextEntry={this.state.showPassword} value={this.state.password} name="password" onChangeText={(value) => this.setState({ password: value })}
                                placeholder={STRING.PH_PASSWORD} placeholderTextColor={COLOR.PLACEHODER} onBlur={this.blurInput}></TextInput>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={this.showPassword}>
                                {this.state.showPassword ? (<SvgUri svgXmlData={EYE} />) : (<SvgUri svgXmlData={EYE_ACTIVE} fill={COLOR.PLACEHODER} />)}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.btn_login} onPress={this.connect}>
                        <Text style={{ textTransform: 'uppercase', color: COLOR.WHITE, fontSize: 16 }}>{STRING.LOGIN}</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={{ color: COLOR.WHITE, fontSize: 15 }}>{STRING.FOGOT_PASSWORD}</Text>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('ForgotPassScreen') }}>
                            <Text style={{ color: COLOR.WHITE, fontWeight: 'bold', fontSize: 15 }}>{STRING.GET_PASSWORD}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: COLOR.WHITE, fontSize: 15, fontFamily: 'Nunito-Regular' }}>{STRING.NOT_HAVE_ACCOUNT}</Text>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('RegisterScreen')
                            }}>
                                <Text style={{ color: COLOR.WHITE, fontSize: 15, fontFamily: 'Nunito-Bold' }}>{STRING.SIGN_UP}</Text>
                            </TouchableOpacity>
                        </View>
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
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: COLOR.PRIMARY,
    },
    container: {
        flex: 1,
        backgroundColor: COLOR.PRIMARY,
        alignItems: 'center',
    },
    logo: {
        marginTop: 12,
    },
    text: {
        fontFamily: 'Nunito-Regular',
        marginTop: 14,
        fontSize: 14,
        color: COLOR.WHITE
    },
    phone_input: {
        borderRadius: 30,
        width: 320,
        height: 45,
        backgroundColor: COLOR.WHITE,
        paddingLeft: 15,
        marginBottom: 10
    },
    password_input: {
        borderRadius: 30,
        width: 320,
        height: 45,
        backgroundColor: COLOR.WHITE,
        paddingLeft: 15,
        marginBottom: 5,
        flexDirection: 'row'
    },
    btn_login: {
        borderRadius: 30,
        backgroundColor: '#981824',
        width: 320,
        height: 45,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_close: {
        marginLeft: 16,
        marginTop: 20
    }

})
export default LoginScreen;