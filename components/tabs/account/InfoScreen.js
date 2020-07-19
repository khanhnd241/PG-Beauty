import React, { Component } from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet, StatusBar, ImageBackground, TouchableOpacity } from 'react-native';
import { IMAGE } from '../../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../../constants/string';
import { BACK_BLACK } from '../../../constants/images/back_black';
import { LOGO_RED } from '../../../constants/images/logo_red';
import { COLOR } from '../../../constants/colors';
class InfoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            version:'1.0'
        };
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor={COLOR.PRIMARY}/>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={styles.header_back}>
                        <SvgUri svgXmlData={BACK_BLACK} />
                    </TouchableOpacity>
                    <View style={styles.header_title}>
                        <Text style={{ color: COLOR.TEXTBODY, fontSize: 16 }}>{STRING.INFO}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <SvgUri svgXmlData={LOGO_RED} />
                </View>
                <View style={{ marginTop: 27, borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.item_text}>{STRING.USE_GUIDE}</Text>
                </TouchableOpacity>
                <View style={{ borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.item_text}>{STRING.SHOPPING_GUIDE}</Text>
                </TouchableOpacity>
                <View style={{ borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.item_text}>{STRING.PAYMENT_POLICY}</Text>
                </TouchableOpacity>
                <View style={{ borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.item_text}>{STRING.POLICY_DELIVERY}</Text>
                </TouchableOpacity>
                <View style={{ borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.item_text}>{STRING.RETURN_POLICY}</Text>
                </TouchableOpacity>
                <View style={{ borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.item_text}>{STRING.TERM_OF_USE_POLICY}</Text>
                </TouchableOpacity>
                <View style={{ borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.item_text}>{STRING.SHOPS}</Text>
                </TouchableOpacity>
                <View style={{ borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.item_text}>{STRING.INTRODUCE_PG_BEAUTY}</Text>
                </TouchableOpacity>
                <View style={{ borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 16, paddingVertical: 15 }}>
                    <View style={{ flex: 6 }}>
                        <Text style={styles.item_text}>{STRING.VERSION}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.item_text}>{this.state.version}</Text>

                    </View>
                </View>
                <View style={{ borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20
    },
    header_back: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header_title: {
        flex: 6,
        alignItems: 'center'
    },
    item: {
        paddingLeft: 16,
        paddingVertical: 15
    },
    item_text: {
        fontSize: 14,
        color: COLOR.TEXTBODY,
        textTransform: 'uppercase'
    }
})
export default InfoScreen;