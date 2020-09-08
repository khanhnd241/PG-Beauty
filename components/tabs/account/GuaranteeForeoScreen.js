import React, { Component } from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet, StatusBar, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native';
import { IMAGE } from '../../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../../constants/string';
import { BACK_BLACK } from '../../../constants/images/back_black';
import { LOGO_RED } from '../../../constants/images/logo_red';
import { COLOR } from '../../../constants/colors';
const deviceWidth = Dimensions.get('screen').width;
class GuaranteeForeoScreen extends Component {
    constructor(props) {
        super(props);
        const { title } = this.props.route.params;
        this.state = {
            content: '',
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
                            <Text style={{ color: COLOR.TEXTBODY, fontSize: 14 }}>{this.state.title}</Text>
                        </View>
                        <View style={{ flex: 1 }}></View>
                    </View>
                    <ScrollView style={{marginHorizontal:10}}>
                        <View style={{ alignItems: 'center' }}>
                            <SvgUri svgXmlData={LOGO_RED} />
                        </View>
                        <View style={{ marginTop: 27, borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                        <View style={{ marginHorizontal: 10 }}>
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_NORMAL }}>
                                {STRING.INTRO_FOREO}
                            </Text>
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_BOLD }}>
                                {STRING.STEP_1}
                            </Text>
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_BOLD }}>
                                {STRING.STEP_2}
                            </Text>
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_NORMAL }}>
                                {STRING.STEP_2_DETAIL}
                            </Text>
                            <Image source={IMAGE.FOREN_1} resizeMode='contain' style={styles.image} />
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_NORMAL }}>
                                {STRING.STEP_2_1}
                            </Text>
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_NORMAL }}>
                                {STRING.STEP_2_2}
                            </Text>
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_NORMAL }}>
                                {STRING.STEP_2_3}
                            </Text>
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_NORMAL }}>
                                {STRING.STEP_2_4}
                            </Text>
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_BOLD }}>
                                {STRING.STEP_3}
                            </Text>
                            <Image source={IMAGE.FOREN_2} resizeMode='contain' style={styles.image} />
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_NORMAL }}>
                                {STRING.STEP_3_1}
                            </Text>
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_NORMAL }}>
                                {STRING.STEP_3_2}
                            </Text>
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_BOLD }}>
                                {STRING.STEP_4}
                            </Text>
                            <Image source={IMAGE.FOREN_3} resizeMode='contain' style={styles.image} />
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_NORMAL }}>
                                {STRING.STEP_4_1}
                            </Text>
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_NORMAL }}>
                                {STRING.STEP_4_2}
                            </Text>
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_NORMAL }}>
                                {STRING.STEP_4_3}
                            </Text>
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_NORMAL }}>
                                {STRING.STEP_4_4}
                            </Text>
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_NORMAL }}>
                                {STRING.FOREO_AFTER_ACTIVE}
                            </Text>
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_NORMAL }}>
                                {STRING.FOREO_NOTE}
                            </Text>
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_BOLD }}>
                                {STRING.LUNA_3}
                            </Text>
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_NORMAL }}>
                                {STRING.LUNA_3_1}
                            </Text>
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_NORMAL }}>
                                {STRING.LUNA_3_2}
                            </Text>
                            <Image source={IMAGE.FOREN_4} resizeMode='contain' style={styles.image} />
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_BOLD }}>
                                {STRING.LUNA_2}
                            </Text>
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_NORMAL }}>
                                {STRING.LUNA_2_1}
                            </Text>
                            <Image source={IMAGE.FOREN_5} resizeMode='contain' style={styles.image} />
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_NORMAL }}>
                                {STRING.LUNA_2_2}
                            </Text>
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_NORMAL }}>
                                {STRING.LUNA_2_3}
                            </Text>
                            <Text style={{ color: COLOR.TEXTBODY, lineHeight: 30, fontSize: 14, fontFamily: STRING.FONT_NORMAL }}>
                                {STRING.LUNA_2_4}
                            </Text>
                        </View>
                    </ScrollView>

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
        flex: 1,
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
    },
    image: {
        width:deviceWidth, 
        alignSelf:'center'
    }
})
export default GuaranteeForeoScreen;