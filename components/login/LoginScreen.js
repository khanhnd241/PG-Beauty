import React, { Component } from "react";
import { View, Button, SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Alert } from "react-native";
import { IMAGE } from '../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../constants/string'
class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            showPassword: true,
        };
    }
    componentDidMount = () => {
    }
    showPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
        console.log(this.state.showPassword)
    }
    login = () => {
        if (this.state.phone.trim() == '' || this.state.password.trim() == '') {
            Alert.alert('Lỗi', 'Số điện thoại và mật khẩu không được bỏ trống!',[

                {
                    text: 'Đồng ý', onPress: () => {
                    }
                },
            ])
        } else {
            // call api login
            this.props.navigation.navigate('App');
        }
    }
    blurInput = () => {
       
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#BE1E2D' />
                <View style={styles.logo}>
                    <SvgUri
                        source={IMAGE.ICON_LOGO}
                    />

                </View>
                <Text style={styles.text}>{STRING.ENTER_PHONE}</Text>
                <View style={{ marginTop: 20 }}>
                    <TextInput keyboardType="numeric" maxLength={10} value={this.state.phone} name="phone" onChangeText={(value) => this.setState({ phone: value })} style={styles.phone_input}
                        placeholder={STRING.PH_ENTER_PHONE} placeholderTextColor="#6C7783" onBlur={this.blurInput}></TextInput>
                    <View style={styles.password_input}>
                        <TextInput style={{ flex: 5 }} secureTextEntry={this.state.showPassword} value={this.state.password} name="password" onChangeText={(value) => this.setState({ password: value })}
                            placeholder={STRING.PH_PASSWORD} placeholderTextColor="#6C7783" onBlur={this.blurInput}></TextInput>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={this.showPassword}>
                            {this.state.showPassword ? (<SvgUri source={IMAGE.ICON_EYE} />) : (<SvgUri source={IMAGE.ICON_EYE_ACTIVE} fill="#6C7783" />)}
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.btn_login} onPress={this.login}>
                    <Text style={{ textTransform: 'uppercase', color: 'white', fontSize: 16 }}>{STRING.LOGIN}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ color: 'white', fontSize: 15 }}>{STRING.FOGOT_PASSWORD}</Text>
                    <TouchableOpacity onPress={() =>{this.props.navigation.navigate('ForgotPassScreen')}}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>{STRING.GET_PASSWORD}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'white', fontSize: 15 }}>{STRING.NOT_HAVE_ACCOUNT}</Text>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('RegisterScreen')
                        }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>{STRING.SIGN_UP}</Text>
                        </TouchableOpacity>
                    </View>
                </View>



            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BE1E2D',
        alignItems: 'center',
    },
    logo: {
        marginTop: 63,
    },
    text: {
        fontFamily: 'Nunito',
        marginTop: 14,
        fontSize: 14,
        color: 'white'
    },
    phone_input: {
        borderRadius: 30,
        width: 320,
        height: 45,
        backgroundColor: 'white',
        paddingLeft: 15,
        marginBottom: 10
    },
    password_input: {
        borderRadius: 30,
        width: 320,
        height: 45,
        backgroundColor: 'white',
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
    }
})
export default SplashScreen;