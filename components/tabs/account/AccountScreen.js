import React, { Component } from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet, StatusBar, ImageBackground, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import { IMAGE } from '../../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../../constants/string';
import { SCAN } from '../../../constants/images/scan';
import { EDIT } from '../../../constants/images/edit';
import { WOMEN } from '../../../constants/images/women';
import { MAN } from '../../../constants/images/man';
import { CART } from '../../../constants/images/cart';
import { ICON_STAR } from '../../../constants/images/icon_star';
import { SETTING } from '../../../constants/images/setting';
import { INFO } from '../../../constants/images/info';
import { NEXT } from '../../../constants/images/next';
import { LOGOUT } from '../../../constants/images/logout';
import { COLOR } from '../../../constants/colors';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
} from 'react-native-popup-dialog';
let deviceWidth = Dimensions.get('window').width - 30;
let deviceHeight = Dimensions.get('window').height - 160;
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
                poin: '5',
            },
            token: '1',
            isLogin: false,
            loadingDialog: false,
            name: '',
            phone: '',
            id: ''
        };
    }
    componentDidMount = () => {
        this.loadData();
    }
    loadData = () => {
        AsyncStorage.getItem('token', (err, result) => {
            console.log('token user: ', result);
            if (result == null || result == '') {
                this.setState({ isLogin: false });
            } else {
                AsyncStorage.getItem('name', (err, result) => {
                    this.setState({ name: result });
                });
                AsyncStorage.getItem('phone', (err, result) => {
                    this.setState({ phone: result });
                });
                AsyncStorage.getItem('id', (err, result) => {
                    console.log('id cua user' + result);
                });
                this.setState({ isLogin: true, token: result });
            }
            this.setState({ id: result })

        })
        if (this.state.user.sex == '1') {
            this.setState({ man: true })
        } else {
            this.setState({ man: false })
        }
    }
    logout = () => {
        this.setState({ loadingDialog: true })
        AsyncStorage.multiRemove(['token', 'id', 'name', 'phone', 'code', 'password'], (err) => {
            if (err) {
            } else {
                this.loadData();
                this.setState({ loadingDialog: false })
            }
        })
    }
    render() {
        const { user } = this.state
        return (
            <SafeAreaView style={styles.screen}>
                <StatusBar backgroundColor={COLOR.PRIMARY} />
                <View style={{ flex: 2, backgroundColor: COLOR.PRIMARY }} />
                <View style={{ flex: 8, backgroundColor: COLOR.WHITE }} />

                {this.state.isLogin ? (
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
                            <Text style={{ color: COLOR.TEXTBODY, fontSize: 14, padding: 5 }}>{this.state.name}</Text>
                            <Text style={{ color: COLOR.DESCRIPTION, fontSize: 14, padding: 5 }}>{this.state.phone}</Text>
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
                        <View style={{ height: 10, backgroundColor: COLOR.GRAY }} />
                        {/* lich su mua hang */}
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HistoryScreen')} style={styles.item}>
                            <View style={styles.item_icon}>
                                <SvgUri svgXmlData={CART} />
                            </View>
                            <View style={styles.item_title}>
                                <Text style={styles.item_title_text}>{STRING.PURCHASED_HISTORY}</Text>
                            </View>
                            <View style={styles.item_description}>
                                {/* <Text style={styles.item_description_text}>chưa có</Text> */}
                            </View>
                            <View style={styles.next}>
                                <SvgUri svgXmlData={NEXT} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ borderTopWidth: 0.5, borderColor: COLOR.LINE }} />
                        {/* Đánh giá của tôi */}
                        <TouchableOpacity style={styles.item}>
                            <View style={styles.item_icon}>
                                <SvgUri svgXmlData={ICON_STAR} />
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
                        <View style={{ borderTopWidth: 0.5, borderColor: COLOR.LINE }} />
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
                        <View style={{ borderTopWidth: 0.5, borderColor: COLOR.LINE }} />
                        {/* Thông tin */}
                        <TouchableOpacity style={styles.item} onPress={() => { this.props.navigation.navigate('InfoScreen') }}>
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
                        <View style={{ borderTopWidth: 0.5, borderColor: COLOR.LINE }} />
                        {/* dang xuat */}
                        <TouchableOpacity style={styles.item} onPress={() => { this.logout() }}>
                            <View style={styles.item_icon}>
                                <SvgUri svgXmlData={LOGOUT} />
                            </View>
                            <View style={styles.item_title}>
                                <Text style={styles.item_title_text}>{STRING.LOGOUT}</Text>
                            </View>
                            <View style={styles.item_description}>
                            </View>
                            <View style={styles.next}>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                        <View style={styles.container}>
                            <View style={{ alignItems: 'center', marginTop: 32 }} >
                                <Text style={{ color: COLOR.PRIMARY, textTransform: 'uppercase', fontSize: 16 }}>{STRING.LOGIN}</Text>
                                <Text style={{ marginHorizontal: 35, marginTop: 10, color: COLOR.DESCRIPTION, fontSize: 16, lineHeight: 25, textAlign: 'center' }}>
                                    {STRING.LOGIN_INFO}
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 25 }}>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('RegisterScreen') }} style={styles.btn_register}>
                                            <Text style={styles.text_login}>{STRING.REGISTER}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('LoginScreen') }} style={styles.btn_login}>
                                            <Text style={styles.text_login}>{STRING.LOGIN}</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                            </View>
                            <View style={{ height: 5, backgroundColor: COLOR.GRAY, marginTop: 30 }} />
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
                            <View style={{ borderTopWidth: 0.5, borderColor: COLOR.LINE }} />
                            {/* Thông tin */}
                            <TouchableOpacity style={styles.item} onPress={() => { this.props.navigation.navigate('InfoScreen') }}>
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
                            <View style={{ borderTopWidth: 0.5, borderColor: COLOR.LINE }} />
                        </View>
                    )}
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
    screen: {
        flex: 1,
        backgroundColor: COLOR.PRIMARY,
        justifyContent: 'center'
    },
    background: {
        backgroundColor: COLOR.WHITE,
        flex: 1
    },
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
        backgroundColor: COLOR.WHITE,
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
        borderColor: COLOR.ORANGE,
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text_point: {
        color: COLOR.YELLOW,
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
        color: COLOR.TEXTBODY
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
    },
    btn_login: {
        alignItems: 'center',
        height: 40,
        width: 150,
        backgroundColor: COLOR.PRIMARY,
        justifyContent: 'center',
        borderRadius: 4
    },
    btn_register: {
        alignItems: 'center',
        height: 40,
        width: 150,
        backgroundColor: COLOR.DESCRIPTION,
        justifyContent: 'center',
        borderRadius: 4
    },
    text_login: {
        textTransform: 'uppercase',
        color: COLOR.WHITE,
        fontSize: 16
    }
})
export default AccountScreen;