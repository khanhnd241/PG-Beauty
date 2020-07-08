import React, { Component } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text, TextInput, Alert, StatusBar } from "react-native";
import { IMAGE } from '../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../constants/string';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: true,
            showConfirmPassword: true,
            name: '',
            dateOfBirth: '',
            address: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        };
    }
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
    register = () => {
        if (this.state.name == '' || this.state.phone == '' || this.state.password == '' || this.state.confirmPassword == '') {
            Alert.alert('Lỗi', 'Các trường có dấu (*) không được bỏ trống!', [{
                text: 'Đồng ý',
                style: 'cancel'
            }])
        } else {
            //call api
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.background}>
                <StatusBar backgroundColor='#BE1E2D' />
                <TouchableOpacity style={styles.btn_close} onPress={() => this.props.navigation.goBack()}>
                    <SvgUri source={IMAGE.ICON_CLOSE} />
                </TouchableOpacity>
                <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        <View style={styles.logo}>
                            <SvgUri source={IMAGE.ICON_LOGO} />
                        </View>
                        <Text style={styles.title}>{STRING.ENTER_INFO}</Text>

                        <TextInput style={styles.textInput} placeholder={STRING.ENTER_NAME} placeholderTextColor='#6C7783' onChangeText={(value) => { this.setState({ name: value }) }}></TextInput>
                        <View style={styles.input_dob}>
                            <Text style={{ flex: 7, color: '#6C7783' }}>{STRING.ENTER_DATE_OF_BIRTH}</Text>
                            <TouchableOpacity style={{ flex: 1 }}>
                                <SvgUri source={IMAGE.ICON_DROPDOWN} />
                            </TouchableOpacity>
                        </View>
                        <TextInput style={styles.textInput} placeholder={STRING.ENTER_ADDRESS} placeholderTextColor='#6C7783' onChangeText={(value) => { this.setState({ address: value }) }}></TextInput>
                        <TextInput style={styles.textInput} placeholder={STRING.EMAIL} placeholderTextColor='#6C7783' onChangeText={(value) => { this.setState({ email: value }) }}></TextInput>
                        <TextInput style={styles.textInput} placeholder={STRING.ENTER_PHONE_INPUT} placeholderTextColor='#6C7783' onChangeText={(value) => { this.setState({ phone: value }) }}></TextInput>
                        <View style={styles.input_dob}>
                            <TextInput style={{ flex: 6 }} secureTextEntry={this.state.showPassword} placeholder={STRING.ENTER_PASSWORD} placeholderTextColor='#6C7783' onChangeText={(value) => { this.setState({ password: value }) }}></TextInput>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={this.showPassword}>
                                {this.state.showPassword ? (<SvgUri source={IMAGE.ICON_EYE} />) : (<SvgUri source={IMAGE.ICON_EYE_ACTIVE} fill="#6C7783" />)}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.input_dob}>
                            <TextInput style={{ flex: 6 }} secureTextEntry={this.state.showConfirmPassword} placeholderTextColor='#6C7783' placeholder={STRING.CONFIRM_PASSWORD} onChangeText={(value) => { this.setState({ confirmPassword: value }) }}></TextInput>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={this.showConfirmPassword}>
                                {this.state.showConfirmPassword ? (<SvgUri source={IMAGE.ICON_EYE} />) : (<SvgUri source={IMAGE.ICON_EYE_ACTIVE} fill="#6C7783" />)}
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.btn_register} onPress={this.register}>
                            <Text style={{ textTransform: 'uppercase', color: 'white', fontSize: 16 }}>{STRING.REGISTER}</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAwareScrollView>
                <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 5, alignItems:'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'white', fontSize:14 }}>{STRING.HAVE_ACCOUNT}</Text>
                        <TouchableOpacity>
                            <Text style={{ color: 'white',fontWeight:'bold', fontSize:14 }}>{STRING.LOGIN_NOW}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#BE1E2D',
    },
    btn_close: {
        marginLeft: 10,
        marginTop: 20
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        marginTop: 63,
    },
    title: {
        color: 'white',
        marginTop: 10,
        fontSize: 14,
        marginBottom: 20
    },
    textInput: {
        paddingLeft: 16,
        width: 320,
        height: 45,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        marginBottom: 10
    },
    input_dob: {
        paddingLeft: 16,
        width: 320,
        height: 45,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    btn_register: {
        width: 320,
        height: 45,
        borderRadius: 30,
        backgroundColor: '#981824',
        alignItems: 'center',
        justifyContent: 'center'
    }

})
export default RegisterScreen;