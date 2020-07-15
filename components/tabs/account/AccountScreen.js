import React, { Component } from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet, StatusBar, ImageBackground, TouchableOpacity } from 'react-native';
import { IMAGE } from '../../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../../constants/string';
import { SCAN } from '../../../constants/images/scan';
import { EDIT } from '../../../constants/images/edit';
import { WOMEN } from '../../../constants/images/women';
import { MAN } from '../../../constants/images/man';
import { CART } from '../../../constants/images/cart';
import { STAR } from '../../../constants/images/star';
import { SETTING } from '../../../constants/images/setting';
import { INFO } from '../../../constants/images/info';
import { NEXT } from '../../../constants/images/next';
let deviceWidth = Dimensions.get('window').width - 30;
let deviceHeight = Dimensions.get('window').height - 160
class AccountScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            man: false,
            user: {
                id: '123',
                name: 'NGUYEN THAO',
                phone: '0123456789',
                sex: '0',
                product: '20',
                poin: '5'
            }
        };
    }
    componentDidMount = () => {
        if (this.state.user.sex == '1') {
            this.setState({ man: true })
        } else {
            this.setState({ man: false })
        }
    }
    render() {
        const { user } = this.state
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                <StatusBar backgroundColor='#BE1E2D' />
                <View style={{ flex: 2, backgroundColor: '#BE1E2D' }} />
                <View style={{ flex: 8, backgroundColor: '#FFFFFF' }} />
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', marginTop: 16 }}>
                            <SvgUri svgXmlData={SCAN} />
                        </TouchableOpacity>
                        <View style={{ flex: 8, alignItems: 'center' }}>
                            <ImageBackground style={styles.bg_avatar} source={IMAGE.BG_AVATAR}>
                                {this.state.man ? (
                                    <SvgUri svgXmlData={MAN} />
                                ) : (
                                        <SvgUri svgXmlData={WOMEN} />
                                    )}

                            </ImageBackground>
                        </View>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', marginTop: 16 }}>
                            <SvgUri svgXmlData={EDIT} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ color: '#2E3E4E', fontSize: 14, padding: 5 }}>{user.name}</Text>
                        <Text style={{ color: '#42515F', fontSize: 14, padding: 5 }}>{user.phone}</Text>
                    </View>
                    <View style={{ borderTopWidth: 0.5, marginTop: 5 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View style={styles.circle}>
                                <Text style={styles.text_point}>{user.product}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View style={styles.circle}>
                                <Text style={styles.text_point}>{user.poin}{STRING.D}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.text_description}>{STRING.PRODUCTS_PURCHASED}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.text_description}>{STRING.REWARD_POINT}</Text>
                        </View>
                    </View>
                    <View style={{ height: 10, backgroundColor: '#F2F2F2' }} />
                    {/* cart */}
                    <TouchableOpacity style={styles.item}>
                        <View style={styles.item_icon}>
                            <SvgUri svgXmlData={CART} />
                        </View>
                        <View style={styles.item_title}>
                            <Text style={styles.item_title_text}>{STRING.PURCHASED_HISTORY}</Text>
                        </View>
                        <View style={styles.item_description}>
                            <Text style={styles.item_description_text}>chua co</Text>
                        </View>
                        <View style={styles.next}>
                            <SvgUri svgXmlData={NEXT} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ borderTopWidth: 0.5, borderColor: '#E5E5E5' }} />
                    {/* Đánh giá của tôi */}
                    <TouchableOpacity style={styles.item}>
                        <View style={styles.item_icon}>
                            <SvgUri svgXmlData={STAR} />
                        </View>
                        <View style={styles.item_title}>
                            <Text style={styles.item_title_text}>{STRING.MY_RATE}</Text>
                        </View>
                        <View style={styles.item_description}>
                        </View>
                        <View style={styles.next}>
                            <SvgUri svgXmlData={NEXT} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ borderTopWidth: 0.5, borderColor: '#E5E5E5' }} />
                    {/* Cài đặt */}
                    <TouchableOpacity style={styles.item}>
                        <View style={styles.item_icon}>
                            <SvgUri svgXmlData={SETTING} />
                        </View>
                        <View style={styles.item_title}>
                            <Text style={styles.item_title_text}>{STRING.SETTING}</Text>
                        </View>
                        <View style={styles.item_description}>
                        </View>
                        <View style={styles.next}>
                            <SvgUri svgXmlData={NEXT} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ borderTopWidth: 0.5, borderColor: '#E5E5E5' }} />
                    {/* Thông tin */}
                    <TouchableOpacity style={styles.item} onPress={() => {this.props.navigation.navigate('InfoScreen')}}>
                        <View style={styles.item_icon}>
                            <SvgUri svgXmlData={INFO} />
                        </View>
                        <View style={styles.item_title}>
                            <Text style={styles.item_title_text}>{STRING.INFO}</Text>
                        </View>
                        <View style={styles.item_description}>
                        </View>
                        <View style={styles.next}>
                            <SvgUri svgXmlData={NEXT} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ borderTopWidth: 0.5, borderColor: '#E5E5E5' }} />
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15, shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        top: 87,
        height: deviceHeight,
        width: deviceWidth
    },
    bg_avatar: {
        position: 'absolute',
        top: -39,
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    circle: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderColor: '#FF8A00',
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text_point: {
        color: '#FF8C04',
        fontWeight: 'bold',
        fontSize: 16
    },
    text_description: {
        textTransform: 'uppercase',
        fontSize: 12,
        fontWeight: '300'
    },
    item: {
        flexDirection: 'row',
        marginVertical: 15
    },
    item_icon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item_title: {
        flex: 4,
        justifyContent: 'center'
    },
    item_title_text: {
        fontSize: 14,
        color: '#2E3E4E'
    },
    item_description: {
        flex: 2,
        flexDirection: 'row-reverse'
    },
    item_description_text: {
        fontSize: 12,
        color: '#C0C5C9'
    },
    next: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default AccountScreen;