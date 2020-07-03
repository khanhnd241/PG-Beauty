import React, { Component } from "react";
import { View, Button, SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { IMAGE } from '../../constants/images';
import SvgUri from 'react-native-svg-uri';

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            showPassword: false
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
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.logo}>
                    <SvgUri
                        source={IMAGE.ICON_LOGO}
                    />

                </View>
                <Text style={styles.text}>Nhập số di động của bạn để đăng nhập</Text>
                <View style={{ marginTop: 20 }}>
                    <TextInput value={this.state.phone} name="phone" onChangeText={(value) => this.setState({ phone: value })} style={styles.phone_input}
                        placeholder="Nhập số điện thoại" defaultValue="123123" placeholderTextColor="#6C7783"></TextInput>
                    <View style={styles.password_input}>
                        <TextInput style={{ flex: 5 }} secureTextEntry={this.state.showPassword} value={this.state.password} name="password" onChangeText={(value) => this.setState({ password: value })}
                            placeholder="Mật khẩu" placeholderTextColor="#6C7783"></TextInput>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={this.showPassword}>
                            {this.state.showPassword ? (<SvgUri source={IMAGE.ICON_EYE} />) : (<Image source={IMAGE.ICON_EYE_ACTIVE} />)}
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.btn_login}>
                    <Text style={{ textTransform: 'uppercase', color: 'white', fontSize: 16 }}>đăng nhập</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ color: 'white', fontSize: 15 }}>Bạn quên mật khẩu? </Text>
                    <TouchableOpacity>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Nhận lại mật khẩu</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1, justifyContent:'flex-end', marginBottom:20}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'white', fontSize: 15 }}>Bạn chưa có tài khoản? </Text>
                        <TouchableOpacity>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Đăng kí ngay</Text>
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
        marginBottom: 5
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