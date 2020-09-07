import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, FlatList, AsyncStorage, ScrollView, ActivityIndicator, StatusBar, Image } from "react-native";
import { STRING } from '../../constants/string';
import { COLOR } from '../../constants/colors';
import { IMAGE } from '../../constants/images';
import { ICON_CLOSE } from '../../constants/images/icon_close';
import { PLUS } from '../../constants/images/plus';
import { BASKET_RED } from '../../constants/images/basket_red';
import { INFO } from '../../constants/images/info';
import { BTN_SUB } from '../../constants/images/btn_sub';
import SvgUri from 'react-native-svg-uri';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
} from 'react-native-popup-dialog';
class CartDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProducts: [],
            refresh: false,
            codeInput: '',
            discount: 0,
            total: 0,
            loadingDialog: false,
            userId: '',
            deviceId: '',
            isHave: false
        };
    }
    componentDidMount = () => {
        this.loadOrder();

    }
    sumProduct = () => {
        let tong = 0;
        for (let i = 0; i < this.state.listProducts.length; i++) {
            tong = tong + this.state.listProducts[i].newPrice * this.state.listProducts[i].quantity;
        }
        this.setState({ total: tong - this.state.discount, loadingDialog: false });
        console.log('tong' + tong);
    }


    deleteProduct = (index) => {
        this.setState({ loadingDialog: true });
        // let listProducts = this.state.listProducts;
        this.state.listProducts.splice(index, 1);
        // listProducts.splice(index, 1);
        // this.reload();
        // this.rerenderList(listProducts);
        this.reload();
        // this.reloadFlatlist();
        // this.stopReloadFlatlist();
        this.sumProduct();
    }
    reloadFlatlist = () => {
        this.setState({ refresh: true })
    }
    stopReloadFlatlist = () => {
        this.setState({ refresh: false })
    }
    rerenderList = (listProducts) => {
        this.setState({ listProducts: listProducts }, () => {
            this.setState({ refresh: true })
        });
    }
    reload = () => {
        if (this.state.userId == '' || this.state.userId == null) {
            AsyncStorage.setItem(this.state.deviceId, JSON.stringify(this.state.listProducts));
        } else {
            AsyncStorage.setItem(this.state.userId, JSON.stringify(this.state.listProducts));

        }

    }
    goToOrderInfo = () => {
        this.props.navigation.navigate('OrderInfomationScreen', { total: this.state.total, discount: this.state.discount });
    }
    loadOrder = () => {
        AsyncStorage.getItem('id', (err, result) => {
            console.log('id day' + result);
            if (result == null || result == '') {
                AsyncStorage.getItem('deviceId', (err, deviceId) => {
                    this.setState({ deviceId: deviceId })
                    AsyncStorage.getItem(deviceId, (err, listOrder) => {
                        this.setState({ listProducts: JSON.parse(listOrder) })
                        console.log('length order hien tai' + this.state.listProducts.length);
                        if (this.state.listProducts.length > 0) {
                            this.setState({ isHave: true })
                        } else {
                            this.setState({ isHave: false })
                        }
                        this.sumProduct();
                    })
                })
            } else {
                this.setState({ userId: result });
                AsyncStorage.getItem(result, (err, listOrder) => {
                    this.setState({ listProducts: JSON.parse(listOrder) })
                    console.log('length order hien tai' + this.state.listProducts.length);
                    if (this.state.listProducts.length > 0) {
                        this.setState({ isHave: true })
                    } else {
                        this.setState({ isHave: false })
                    }
                    this.sumProduct();
                })
            }
        });
    }
    // loadOrder = () => {
    //     AsyncStorage.getItem('id', (err, result) => {
    //         console.log('id day' + result);
    //         this.setState({ userId: result });
    //         AsyncStorage.getItem(result, (err, listOrder) => {
    //             console.log('list order' + JSON.parse(listOrder));
    //             this.setState({ listProducts: JSON.parse(listOrder) })
    //             console.log('length order hien tai' + this.state.listProducts.length);
    //             this.sumProduct();
    //         })
    //     });
    // }
    format(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    sub = (index) => {
        if (this.state.listProducts[index].quantity > 1) {
            this.state.listProducts[index].quantity--;
            if (this.state.userId == null || this.state.userId == '') {
                AsyncStorage.setItem(this.state.deviceId, JSON.stringify(this.state.listProducts));
            } else {
                AsyncStorage.setItem(this.state.userId, JSON.stringify(this.state.listProducts));
            }

        };
        this.sumProduct()
    }
    sum = (index) => {
        if (this.state.listProducts[index].quantity < this.state.listProducts[index].on_hand) {
            this.state.listProducts[index].quantity++;
            if (this.state.userId == null || this.state.userId == '') {
                AsyncStorage.setItem(this.state.deviceId, JSON.stringify(this.state.listProducts));
            } else {
                AsyncStorage.setItem(this.state.userId, JSON.stringify(this.state.listProducts));
            }
            this.sumProduct()
        }

    }
    render() {
        return (
            <SafeAreaView style={styles.screen}>
                <StatusBar barStyle='light-content' backgroundColor={COLOR.PRIMARY} />
                <ScrollView style={styles.background}>
                    <View style={styles.header}>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.header_title}>{STRING.CART}</Text>
                        </View>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.btn_cancel}>{STRING.CANCEL}</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.isHave ? (
                        <View style={styles.content}>
                            {/* <FlatList
                                data={this.state.listProducts}
                                refreshing={this.state.refresh}
                                renderItem={({ item, index }) => {
                                    console.log('load' + index)
                                    const imageUri = item.primary_image != null ? item.primary_image : ""
                                    return (
                                        <View>
                                            <View style={styles.item_container}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 2 }}>
                                                        <Image style={{ width: 90, height: 60 }} source={imageUri.length != 0 ? { uri: imageUri } : null}></Image>

                                                    </View>
                                                    <View style={{ flex: 4 }}>
                                                        <Text>{item.full_name}</Text>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Text style={{ color: COLOR.PRIMARY, fontSize: 16 }}>{this.format(parseInt(item.base_price))} {STRING.CURRENCY}</Text>
                                                            <Text style={{ color: COLOR.PLACEHODER, fontSize: 12, textDecorationLine: 'line-through', marginLeft: 16 }}>{this.format(parseInt(item.base_price))} {STRING.CURRENCY}</Text>
                                                        </View>

                                                    </View>
                                                    <TouchableOpacity onPress={() => { this.deleteProduct(index) }} style={{ flex: 0.5, alignItems: 'center' }}>
                                                        <SvgUri svgXmlData={ICON_CLOSE} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                    <View style={{ flex: 2 }}></View>
                                                    <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                                                        <TouchableOpacity onPress={() => { this.sub(index) }}>
                                                            <SvgUri svgXmlData={BTN_SUB} />
                                                        </TouchableOpacity>
                                                        <Text style={{ marginHorizontal: 15 }}>{item.quantity}</Text>
                                                        <TouchableOpacity onPress={() => { this.sum(index) }} style={{ borderWidth: 0.5, borderColor: COLOR.PRIMARY, width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                                            <View style={{ width: 0.5, height: 13, backgroundColor: COLOR.PRIMARY, position: 'absolute', left: 9 }} />
                                                            <View style={{ height: 0.5, width: 13, backgroundColor: COLOR.PRIMARY, position: 'absolute', top: 9 }} />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{ flex: 0.5 }}></View>
                                                </View>
                                            </View>
                                            <View style={{ backgroundColor: COLOR.GRAY, height: 5, marginVertical: 10 }} />
                                        </View>
                                    )
                                }
                                }
                            /> */}
                            {this.state.listProducts.map((item, index) => {
                                const imageUri = item.primary_image != null ? item.primary_image : ""
                                return (
                                    <View>
                                        <View style={styles.item_container}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flex: 2 }}>
                                                    <Image style={{ width: 90, height: 60 }} source={imageUri.length != 0 ? { uri: imageUri } : null}></Image>

                                                </View>
                                                <View style={{ flex: 4 }}>
                                                    <Text>{item.full_name}</Text>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text style={{ color: COLOR.PRIMARY, fontSize: 16 }}>{this.format(parseInt(item.newPrice))} {STRING.CURRENCY}</Text>
                                                        {item.sale_percent !== 0 ? (
                                                            <Text style={{ color: COLOR.PLACEHODER, fontSize: 12, textDecorationLine: 'line-through', marginLeft: 16 }}>{this.format(parseInt(item.base_price))} {STRING.CURRENCY}</Text>
                                                        ) : null}
                                                    </View>

                                                </View>
                                                <TouchableOpacity onPress={() => { this.deleteProduct(index) }} style={{ flex: 0.5, alignItems: 'center' }}>
                                                    <SvgUri svgXmlData={ICON_CLOSE} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                <View style={{ flex: 2 }}></View>
                                                <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                                                    <TouchableOpacity onPress={() => { this.sub(index) }}>
                                                        <SvgUri svgXmlData={BTN_SUB} />
                                                    </TouchableOpacity>
                                                    <Text style={{ marginHorizontal: 15 }}>{item.quantity}</Text>
                                                    <TouchableOpacity onPress={() => { this.sum(index) }} style={{ borderWidth: 0.5, borderColor: COLOR.PRIMARY, width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                                        <View style={{ width: 0.5, height: 13, backgroundColor: COLOR.PRIMARY, position: 'absolute', left: 9 }} />
                                                        <View style={{ height: 0.5, width: 13, backgroundColor: COLOR.PRIMARY, position: 'absolute', top: 9 }} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ flex: 0.5 }}></View>
                                            </View>
                                        </View>
                                        <View style={{ backgroundColor: COLOR.GRAY, height: 5, marginVertical: 10 }} />
                                    </View>
                                )
                            })}
                            <View style={styles.item_container}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: COLOR.TEXTBODY, fontSize: 16, marginRight: 5, fontWeight: '600' }}>{STRING.ENTER_DISCOUNT_CODE}</Text>
                                    <View style={{ alignItems: 'center', marginTop: 5 }}>
                                        <SvgUri svgXmlData={INFO} fill={COLOR.BLACK} />
                                    </View>
                                </View>
                                <View style={styles.input}>
                                    <TextInput value={this.state.codeInput} onChangeText={(value) => { this.setState({ codeInput: value }) }} style={styles.text_input} placeholderTextColor={COLOR.PLACEHODER} placeholder={STRING.ENTER_DISCOUNT_CODE}></TextInput>
                                    <View style={styles.btn_apply}>
                                        <Text style={{ color: COLOR.WHITE, textTransform: 'uppercase', fontSize: 14 }}>{STRING.APPLY}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 14, color: COLOR.TEXTBODY }}>{STRING.DISCOUNT_LEVEL}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                        <Text style={{ fontSize: 14, color: COLOR.ORANGE }}>{this.state.discount} {STRING.CURRENCY}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ backgroundColor: COLOR.GRAY, height: 5, marginTop: 14, marginBottom: 9 }} />
                            <View style={styles.item_container}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 14, color: COLOR.TEXTBODY }}>{STRING.MONEY}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                        <Text style={{ fontSize: 14, color: COLOR.TEXTBODY }}>{this.format(parseInt(this.state.total))} {STRING.CURRENCY}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 14, color: COLOR.TEXTBODY }}>{STRING.DISCOUNT}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                        <Text style={{ fontSize: 14, color: COLOR.ORANGE }}>{this.state.discount} {STRING.CURRENCY}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 14, color: COLOR.TEXTBODY }}>{STRING.TOTAL}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse', marginBottom: 100 }}>
                                        <Text style={{ fontSize: 14, color: COLOR.TEXTBODY }}>{this.format(parseInt(this.state.total))} {STRING.CURRENCY}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ) : (
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                                <SvgUri svgXmlData={BASKET_RED} />
                                <Text style={{ fontSize: 14, fontFamily: STRING.FONT_NORMAL, color: COLOR.PLACEHODER, marginTop: 15 }}>{STRING.NO_ORDER}</Text>
                            </View>
                        )}

                </ScrollView>
                {this.state.isHave ? (
                    <View style={styles.footer}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: COLOR.TEXTBODY, fontSize: 14 }}>{STRING.TOTAL}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                <Text style={{ color: COLOR.PRIMARY, fontSize: 16 }}>{this.format(parseInt(this.state.total))} {STRING.CURRENCY}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={this.goToOrderInfo} style={{ backgroundColor: COLOR.PRIMARY, height: 40, borderRadius: 40, marginTop: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}>
                            <Text style={{ color: COLOR.WHITE, fontSize: 16, textTransform: 'uppercase' }}>{STRING.CONTINUE}</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}

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
        backgroundColor: COLOR.PRIMARY
    },
    background: {
        backgroundColor: COLOR.WHITE,
        flex: 1
    },
    header: {
        backgroundColor: COLOR.PRIMARY,
        height: 45,
        flexDirection: 'row',
    },
    header_title: {
        fontSize: 16,
        color: COLOR.WHITE
    },
    btn_cancel: {
        fontSize: 14,
        color: COLOR.WHITE
    },
    content: {
        backgroundColor: COLOR.WHITE,
        flex: 1

    },
    item_container: {
        marginTop: 10,
        marginHorizontal: 15,
    },
    text_input: {
        flex: 3,
        fontSize: 15,
        color: COLOR.TEXTBODY,
        paddingLeft: 5
    },
    input: {
        height: 40,
        borderWidth: 0.5,
        borderColor: COLOR.LINE,
        flexDirection: 'row',
        marginVertical: 8
    },
    btn_apply: {
        flex: 1,
        backgroundColor: COLOR.LINK,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 94,
        backgroundColor: COLOR.WHITE,
        shadowColor: "#000",
        elevation: 24,
        paddingHorizontal: 15,
    }
})
export default CartDetailScreen;