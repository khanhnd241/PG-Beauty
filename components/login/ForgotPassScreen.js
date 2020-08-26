import React, { Component } from "react";
import { SafeAreaView, View, StyleSheet, Text, TextInput, TouchableOpacity, StatusBar } from "react-native";
import SvgUri from 'react-native-svg-uri';
import { IMAGE } from '../../constants/images'
import { STRING } from '../../constants/string';
import {BACK} from '../../constants/images/back'
class ForgotPassScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnGetPassword: false
        };
    }
    render() {
        return (
            <SafeAreaView>
                <StatusBar backgroundColor='#BE1E2D' />
                <TouchableOpacity style={{ padding: 16 }} onPress={() => this.props.navigation.goBack()}>
                    <SvgUri svgXmlData={BACK} />
                </TouchableOpacity>
                <View style={styles.container}>
                    <Text style={styles.text}>{STRING.FORGOT_PASSWORD_TITLE}</Text>
                    <Text style={styles.message}>{STRING.SUBMESS1}<Text style={{ fontWeight: 'bold' }}>{STRING.EMAIL_PHONE}</Text>{STRING.SUBMESS2F}</Text>
                    <TextInput style={styles.phone_input} placeholder={STRING.EMAIL_PHONE} onChangeText={(value) => {
                        if (value == '') {
                            this.setState({ btnGetPassword: false })
                        } else {
                            this.setState({ btnGetPassword: true })
                        }
                        this.setState({ phone: value })
                    }}></TextInput>
                    {this.state.btnGetPassword? ( <TouchableOpacity style={styles.btn_get_password}>
                        <Text style={{ color: 'white', textTransform: 'uppercase', }}>{STRING.SEND_PASSWORD}</Text>
                    </TouchableOpacity>):( <TouchableOpacity style={styles.btn_get_password_disable} disabled={true}>
                        <Text style={{ color: 'white', textTransform: 'uppercase', }}>{STRING.SEND_PASSWORD}</Text>
                    </TouchableOpacity>)}
                   

                </View>

            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        marginLeft: 24,
        marginRight: 24
    },
    message: {
        marginTop: 10,
        fontSize: 15
    },
    text: {
        fontSize: 28,
        marginTop: 40,
        fontWeight: 'bold'
    },
    phone_input: {
        height: 50,
        borderBottomWidth: 0.5,
        fontSize: 15,
        marginTop: 30
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
    btn_get_password: {
        borderRadius: 30,
        backgroundColor: '#BE1E2D',
        height: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_get_password_disable: {
        backgroundColor:'#C0C5C9',
        borderRadius: 30,
        height: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default ForgotPassScreen;