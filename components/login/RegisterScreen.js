import React, { Component } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text, TextInput, Alert, StatusBar, ActivityIndicator } from "react-native";
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { COLOR } from '../../constants/colors'
import moment from 'moment';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
} from 'react-native-popup-dialog';
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
            loadingDialog: false
        };
    }
    handlerDate = (date) => {
        console.log('ngay sinh', date);
        this.setState({
            dateOfBirth: date,
            datePicker: false,
            dateView: moment(date).format('DD/MM/YYYY')
        })

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
    register = () => {
        let data = {};
        this.validate();
        console.log(this.validate());
        if (this.validate() == true) {
            this.setState({ loadingDialog: true });

            data.name = this.state.name;
            data.phone = this.state.phone;
            data.password = this.state.password;
            if (this.state.email.trim() != '') {
                data.email = this.state.email;
            }
            if (this.state.dateView.trim() != '' && this.state.dateView != STRING.ENTER_DATE_OF_BIRTH) {
                data.birthday = this.state.dateView;
            }
            if (this.state.address.trim() != '') {
                data.address = this.state.address;
            }
            axios.post(API.URL + API.REGISTER, data).then(response => {
                this.setState({ loadingDialog: false });
                if (response.data.success.token != null || response.data.success.token != '') {
                    this.setState({ loadingDialog: false });
                    Alert.alert(STRING.NOTIFI, STRING.SIGN_UP_SUCCESS, [{
                        text: STRING.ACCEPT,
                        onPress: () => { this.props.navigation.replace('LoginScreen') }
                    }])
                }
            }).catch(error => {
                this.setState({ loadingDialog: false });
                Alert.alert(STRING.ERROR, JSON.stringify(error.response.data.error), [{ text: STRING.ACCEPT }])
            }
            );
        }
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

                        <TextInput style={styles.textInput} placeholder={STRING.ENTER_NAME} placeholderTextColor={COLOR.PLACEHODER} onChangeText={(value) => { this.setState({ name: value }) }}></TextInput>
                        <View style={styles.input_dob}>
                            <Text style={{ flex: 7, color: COLOR.PLACEHODER }}>{this.state.dateView}</Text>
                            <TouchableOpacity onPress={() => { this.setState({ datePicker: true }) }} style={{ flex: 1 }}>
                                <SvgUri svgXmlData={DROPDOWN} />
                            </TouchableOpacity>
                        </View>
                        <TextInput style={styles.textInput} placeholder={STRING.ENTER_ADDRESS} placeholderTextColor={COLOR.PLACEHODER} onChangeText={(value) => { this.setState({ address: value }) }}></TextInput>
                        <TextInput style={styles.textInput} placeholder={STRING.EMAIL} placeholderTextColor={COLOR.PLACEHODER} onChangeText={(value) => { this.setState({ email: value }) }}></TextInput>
                        <TextInput style={styles.textInput} placeholder={STRING.ENTER_PHONE_INPUT} keyboardType='numeric' maxLength={10} placeholderTextColor={COLOR.PLACEHODER} onChangeText={(value) => { this.setState({ phone: value }) }}></TextInput>
                        <View style={styles.input_dob}>
                            <TextInput style={{ flex: 6 }} secureTextEntry={this.state.showPassword} placeholder={STRING.ENTER_PASSWORD} placeholderTextColor={COLOR.PLACEHODER} onChangeText={(value) => { this.setState({ password: value }) }}></TextInput>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={this.showPassword}>
                                {this.state.showPassword ? (<SvgUri svgXmlData={EYE} />) : (<SvgUri svgXmlData={EYE} fill={COLOR.PLACEHODER} />)}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.input_dob}>
                            <TextInput style={{ flex: 6 }} secureTextEntry={this.state.showConfirmPassword} placeholderTextColor={COLOR.PLACEHODER} placeholder={STRING.CONFIRM_PASSWORD} onChangeText={(value) => { this.setState({ confirmPassword: value }) }}></TextInput>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={this.showConfirmPassword}>
                                {this.state.showConfirmPassword ? (<SvgUri svgXmlData={EYE} />) : (<SvgUri svgXmlData={EYE} fill={COLOR.PLACEHODER} />)}
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.btn_register} onPress={this.register}>
                            <Text style={{ textTransform: 'uppercase', color: COLOR.WHITE, fontSize: 16 }}>{STRING.REGISTER}</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAwareScrollView>
                <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 5, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: COLOR.WHITE, fontSize: 14 }}>{STRING.HAVE_ACCOUNT}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
                            <Text style={{ color: COLOR.WHITE, fontWeight: 'bold', fontSize: 14 }}>{STRING.LOGIN_NOW}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <DateTimePickerModal
                    isVisible={this.state.datePicker}
                    mode="date"
                    date={new Date()}
                    onConfirm={this.handlerDate}
                    onCancel={() => {
                        this.setState({ datePicker: false })
                    }}
                />
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
        color: COLOR.WHITE,
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