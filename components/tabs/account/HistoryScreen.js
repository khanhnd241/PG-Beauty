import React, { Component, useState, useEffect  } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, FlatList, AsyncStorage, ScrollView, Dimensions, StatusBar, ActivityIndicator, Alert } from "react-native";
import { BACK_BLACK } from '../../../constants/images/back_black';
import { STRING } from '../../../constants/string';
import { COLOR } from '../../../constants/colors';
import { IMAGE } from '../../../constants/images';
import { API } from '../../../constants/api';
import { BASKET_RED } from '../../../constants/images/basket_red'
import SvgUri from 'react-native-svg-uri';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
} from 'react-native-popup-dialog';
import axios from 'axios';
import moment from 'moment';
function Item({ total, statusValue, orderDetail, purchaseDate }) {
    const [title, setTitle] = useState('');
    useEffect(() =>{
        let title = '';
        for(let i = 0; i < orderDetail.length; i ++) {
            title = title  + orderDetail[i].productName +  ' + ';
        }
        setTitle(title.slice(0,-3))
    })
    return (
        <View style={{ marginHorizontal: 15, marginTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <SvgUri svgXmlData={BASKET_RED} />
                </View>
                <View style={{ flex: 4 }}>
                    <Text style={{ lineHeight: 25 }} numberOfLines={2}>{title}</Text>
                    <Text style={{ lineHeight: 25, marginTop: 5, color: COLOR.PRIMARY, fontFamily: STRING.FONT_BOLD }}>{total} {STRING.CURRENCY}</Text>
                </View>
            </View>
            <Text style={{ marginTop: 5 }}>{statusValue} lúc {moment(purchaseDate).format('DD/MM/YYYY') }</Text>
            <View style={{ borderBottomColor: COLOR.GRAY, borderBottomWidth: 1, marginVertical: 10 }} />
        </View>
    )
}
class HistoryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buyOnlineBG: COLOR.GRAY,
            buyOnlineText: COLOR.PRIMARY,
            buyAtStoreBG: COLOR.WHITE,
            buyAtStoreText: COLOR.TEXTBODY,
            buyOnline: true,
            colorAll: COLOR.PRIMARY,
            lineAll: COLOR.PRIMARY,

            colorNew: COLOR.TEXTBODY,
            lineNew: COLOR.WHITE,

            colorProcess: COLOR.TEXTBODY,
            lineProcess: COLOR.WHITE,

            colorSuccess: COLOR.TEXTBODY,
            lineSuccess: COLOR.WHITE,

            colorCancel: COLOR.TEXTBODY,
            lineCancel: COLOR.WHITE,
            token: '',
            listOrder: [],
            loadingDialog: false
        };
    }
    componentDidMount = () => {
        this.connect();
    }
    connect = () => {
        this.setState({ loadingDialog: true })
        var data = new FormData();
        data.append(API.SCOPES, API.SCOPES_DATA);
        data.append(API.GRANT_TYPE, API.GRANT_TYPE_DATA);
        data.append(API.CLIENT_ID, API.CLIENT_ID_DATA);
        data.append(API.CLIENT_SECRET, API.CLIENT_SECRET_DATA);
        // goi api connect
        axios.post(API.URL_CONNECT_KIOT, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            console.log(response.data.access_token);
            if (response.data.access_token == null || response.data.access_token == '') {
                Alert.alert(STRING.NOTIFICATION, STRING.ERROR, [{ text: STRING.ACCEPT }])
            } else {
                console.log('connect thanh cong')
                this.setState({ token: response.data.access_token });
                AsyncStorage.getItem('code', (err, code) => {
                    console.log('code' + code)
                    const config = {
                        headers: {
                            Authorization: `Bearer ${this.state.token}`,
                            Retailer: API.RETAILER,
                        }
                    };
                    axios.get(API.URL_API_KIOT + API.ORDERS + '?customerCode=' + code, config).then(res => {
                        console.log(res.data.data.length);
                        if (res.data.data.length > 0) {
                            this.setState({
                                loadingDialog: false,
                                listOrder: res.data.data
                            })

                        } else {
                            this.setState({ loadingDialog: false })
                        }

                    }).catch(err => {
                        this.setState({ loadingDialog: false })
                        // Alert.alert(STRING.NOTIFICATION, STRING.REGISTRATION_FAILED, [{ text: STRING.ACCEPT }])
                        console.log('loi' + JSON.stringify(err))
                    })
                })
            }
        })
    }
    openbuyOnline = () => {
        this.setState({
            buyOnlineBG: COLOR.GRAY,
            buyOnlineText: COLOR.PRIMARY,
            buyAtStoreBG: COLOR.WHITE,
            buyAtStoreText: COLOR.TEXTBODY,
            buyOnline: true
        });
        // if (this.state.listbuyOnline.length == 0) {
        //     this.setState({
        //         noNotibuyOnline: true
        //     })
        // }
    }
    openbuyAtStore = () => {
        this.setState({
            buyOnlineBG: COLOR.WHITE,
            buyAtStoreBG: COLOR.GRAY,
            buyOnlineText: COLOR.TEXTBODY,
            buyAtStoreText: COLOR.PRIMARY,
            buyOnline: false
        });
        // if (this.state.listbuyAtStore.length == 0) {
        //     this.setState({
        //         noNotibuyAtStore: true
        //     })
        // }
    }
    openAll = () => {
        this.setState({
            colorAll: COLOR.PRIMARY,
            lineAll: COLOR.PRIMARY,

            colorNew: COLOR.TEXTBODY,
            lineNew: COLOR.WHITE,

            colorProcess: COLOR.TEXTBODY,
            lineProcess: COLOR.WHITE,

            colorSuccess: COLOR.TEXTBODY,
            lineSuccess: COLOR.WHITE,

            colorCancel: COLOR.TEXTBODY,
            lineCancel: COLOR.WHITE,
        })
    }
    openNew = () => {
        this.setState({
            colorAll: COLOR.TEXTBODY,
            lineAll: COLOR.WHITE,

            colorNew: COLOR.PRIMARY,
            lineNew: COLOR.PRIMARY,

            colorProcess: COLOR.TEXTBODY,
            lineProcess: COLOR.WHITE,

            colorSuccess: COLOR.TEXTBODY,
            lineSuccess: COLOR.WHITE,

            colorCancel: COLOR.TEXTBODY,
            lineCancel: COLOR.WHITE,
        })
    }
    openProcess = () => {
        this.setState({
            colorAll: COLOR.TEXTBODY,
            lineAll: COLOR.WHITE,

            colorNew: COLOR.TEXTBODY,
            lineNew: COLOR.WHITE,

            colorProcess: COLOR.PRIMARY,
            lineProcess: COLOR.PRIMARY,

            colorSuccess: COLOR.TEXTBODY,
            lineSuccess: COLOR.WHITE,

            colorCancel: COLOR.TEXTBODY,
            lineCancel: COLOR.WHITE,
        })
    }
    openSuccess = () => {
        this.setState({
            colorAll: COLOR.TEXTBODY,
            lineAll: COLOR.WHITE,

            colorNew: COLOR.TEXTBODY,
            lineNew: COLOR.WHITE,

            colorProcess: COLOR.TEXTBODY,
            lineProcess: COLOR.WHITE,

            colorSuccess: COLOR.PRIMARY,
            lineSuccess: COLOR.PRIMARY,

            colorCancel: COLOR.TEXTBODY,
            lineCancel: COLOR.WHITE,
        })
    }
    openCancel = () => {
        this.setState({
            colorAll: COLOR.TEXTBODY,
            lineAll: COLOR.WHITE,

            colorNew: COLOR.TEXTBODY,
            lineNew: COLOR.WHITE,

            colorProcess: COLOR.TEXTBODY,
            lineProcess: COLOR.WHITE,

            colorSuccess: COLOR.TEXTBODY,
            lineSuccess: COLOR.WHITE,

            colorCancel: COLOR.PRIMARY,
            lineCancel: COLOR.PRIMARY,
        })
    }
    format(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    render() {
        return (
            <SafeAreaView style={styles.screen}>
                <StatusBar backgroundColor={COLOR.PRIMARY} />
                <View style={styles.background}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <SvgUri svgXmlData={BACK_BLACK} />
                        </TouchableOpacity>
                        <View style={{ flex: 6, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: COLOR.TEXTBODY, fontFamily: STRING.FONT_BOLD, fontSize: 16 }}>{STRING.HISTORY}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }} />
                    </View>
                    <View style={styles.option}>
                        <TouchableOpacity onPress={this.openbuyOnline} style={[styles.tab, { backgroundColor: this.state.buyOnlineBG }]}>
                            <Text style={{ fontSize: 14, color: this.state.buyOnlineText }}>{STRING.BUY_ONLINE}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.openbuyAtStore} style={[styles.tab, { backgroundColor: this.state.buyAtStoreBG }]}>
                            <Text style={{ fontSize: 14, color: this.state.buyAtStoreText }}>{STRING.BUY_AT_STORE}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 40, marginHorizontal: 15 }}>
                        <ScrollView horizontal={true}>
                            <TouchableOpacity onPress={this.openAll} style={[styles.btn_tab, { borderBottomColor: this.state.lineAll }]}>
                                <Text style={[styles.tab_view_text, { color: this.state.colorAll }]}>{STRING.ALL}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.openNew} style={[styles.btn_tab, { borderBottomColor: this.state.lineNew }]}>
                                <Text style={[styles.tab_view_text, { color: this.state.colorNew }]}>{STRING.NEW_ORDER}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.openProcess} style={[styles.btn_tab, { borderBottomColor: this.state.lineProcess }]}>
                                <Text style={[styles.tab_view_text, { color: this.state.colorProcess }]}>{STRING.PROCESSING}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.openSuccess} style={[styles.btn_tab, { borderBottomColor: this.state.lineSuccess }]}>
                                <Text style={[styles.tab_view_text, { color: this.state.colorSuccess }]}>{STRING.SUCCESS}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.openCancel} style={[styles.btn_tab, { borderBottomColor: this.state.lineCancel }]}>
                                <Text style={[styles.tab_view_text, { color: this.state.colorCancel }]}>{STRING.CANCELED}</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <View style={{ height: 5, backgroundColor: COLOR.GRAY, marginTop: 5 }} />
                    <FlatList
                        data={this.state.listOrder}
                        renderItem={({ item }) =>
                            <Item
                                total={this.format(parseInt(item.total))}
                                statusValue={item.statusValue}
                                orderDetail={item.orderDetails}
                                purchaseDate={item.purchaseDate} />
                        }
                    />
                </View>
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
    header: {
        flexDirection: 'row',
        height: 46,
    },
    option: {
        flexDirection: 'row',
        marginVertical: 27,
        marginHorizontal: 15,
        borderWidth: 0.5,
        borderColor: COLOR.LINE
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6
    },
    tab_view_text: {
        fontSize: 14,
        fontFamily: STRING.FONT_NORMAL
    },
    btn_tab: {
        marginRight: 27,
        borderBottomWidth: 2,
        height: 30
    }
})
export default HistoryScreen;