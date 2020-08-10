import React, { Component } from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet, StatusBar, ImageBackground, TouchableOpacity } from 'react-native';
import { IMAGE } from '../../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../../constants/string';
import { BACK_BLACK } from '../../../constants/images/back_black';
import { LOGO_RED } from '../../../constants/images/logo_red';
import { COLOR } from '../../../constants/colors';
class InfoDetailScreen extends Component {
    constructor(props) {
        super(props);
        const { title, content } = this.props.route.params;
        this.state = {
            version: '1.0',
            content: content,
            title: title
        };
    }
    render() {
        return (
            <SafeAreaView style={styles.screen}>
                <StatusBar backgroundColor={COLOR.PRIMARY} />
                <View style={styles.background}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={styles.header_back}>
                            <SvgUri svgXmlData={BACK_BLACK} />
                        </TouchableOpacity>
                        <View style={styles.header_title}>
                            <Text style={{ color: COLOR.TEXTBODY, fontSize: 16 }}>{this.state.title}</Text>
                        </View>
                        <View style={{ flex: 1 }}></View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <SvgUri svgXmlData={LOGO_RED} />
                    </View>
                    <View style={{ marginTop: 27, borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                    <View style={{marginHorizontal:10}}>
                    <Text style={{color:COLOR.TEXTBODY, lineHeight:30, fontSize:14, fontFamily:STRING.FONT_NORMAL}}>{this.state.content}</Text>
                    </View>
                    
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
        flex: 1
    },
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
export default InfoDetailScreen;