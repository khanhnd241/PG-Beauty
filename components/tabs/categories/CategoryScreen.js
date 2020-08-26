import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, StatusBar, FlatList, ActivityIndicator, AsyncStorage } from "react-native";
import { IMAGE } from '../../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../../constants/string';
import { RECTANGLE } from '../../../constants/images/rectangle';
import { SEARCH } from '../../../constants/images/search';
import { STAR } from '../../../constants/images/star';
import { SCAN } from '../../../constants/images/scan';
import { BASKET } from '../../../constants/images/basket';
import { PG_BEAUTY } from '../../../constants/images/pg_beauty';
import { PG_FASHION } from '../../../constants/images/pg_fashion';
import { PG_TOOL } from '../../../constants/images/pg_tool';
import { PLUS } from '../../../constants/images/plus';
import { SUB } from '../../../constants/images/sub';
import { COLOR } from '../../../constants/colors';
import ItemCategory from './ItemCategory';
import { API } from '../../../constants/api';
import axios from 'axios';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
} from 'react-native-popup-dialog';
class CategoryScreen extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        navigation.addListener('focus', async () => {
            this.setState(this.loadOrder());
        })
        this.state = {
            beauty: false,
            tool: false,
            fashion: false,
            cleansing: false,
            page: 1,
            isLoading: false,
            listCategories: [],
            listChildCategories: [],
            end: false,
            loadingDialog: false,
            isHave: false,
            listUserOrder: []
        };
    }
    componentDidMount = () => {
        this.setState({ isLoading: true });
        this.loadCategories();
        this.loadOrder();
    }
    loadCategories = () => {
        console.log('gọi api' + this.state.page)
        axios.get(API.URL + API.CATEGORIES, {
            params: {
                page: this.state.page,
            }
        }).then(response => {
            console.log('chieu dai 1 api' + response.data.success.data.length);
            if (response.data.success.data.length == 0) {
                this.setState({ end: true })
            }
            for (let i = 0; i < response.data.success.data.length; i++) {
                if (response.data.success.data[i].parent_id == null) {
                    this.state.listCategories.push(response.data.success.data[i]);
                } else {
                    this.state.listChildCategories.push(response.data.success.data[i]);
                }
            }
            this.setState({
                isLoading: false
            });
            // console.log('mang con' +this.state.listChildCategories);
        }).catch(error => {
        })
    }
    loadMore = () => {
        if (this.state.end == false) {
            let page = this.state.page + 1
            console.log('goi api lan nua')
            this.setState({
                isLoading: true,
                page: page
            }, this.loadCategories);
        }

    }
    loadOrder = () => {
        AsyncStorage.getItem('id', (err, result) => {
            console.log('id day' + result);
            if (result == null || result == '') {
                AsyncStorage.getItem('deviceId', (err, deviceId) => {
                    console.log('device id' + deviceId);
                    AsyncStorage.getItem(deviceId, (err, listOrder) => {
                        this.setState({ listUserOrder: JSON.parse(listOrder) })
                        this.checkOrder();
                    })
                })
            } else {
                this.setState({ userId: result });
                AsyncStorage.getItem(result, (err, listOrder) => {
                    if (JSON.parse(listOrder) == null || JSON.parse(listOrder) == '') {
                        console.log('tao moi 1 list order')
                        var newListOrder = [];
                        AsyncStorage.setItem(result, JSON.stringify(newListOrder));
                        AsyncStorage.getItem(result, (err, listOrder) => {
                            this.setState({ listUserOrder: JSON.parse(listOrder) })
                            this.checkOrder();
                        })
                    } else {
                        // console.log('list order' + listOrder);
                        this.setState({ listUserOrder: JSON.parse(listOrder) })
                        console.log('length order hien tai' + this.state.listUserOrder.length);
                        this.checkOrder();
                    }

                })
            }
        });
    }
    checkOrder = () => {
        console.log('check length' + this.state.listUserOrder.length);
        if (this.state.listUserOrder.length > 0) {
            console.log('co data')
            this.setState({ isHave: true })
        } else {
            this.setState({ isHave: false })
        }
    }
    handleFooter = () => {
        // console.log('footer day');
        return (
            this.state.isLoading ?
                <View style={styles.loader}>
                    <ActivityIndicator color={COLOR.PRIMARY} size='large' />
                </View> :
                null
        )
    }
    render() {
        return (
            <SafeAreaView style={styles.screen}>
                <StatusBar backgroundColor={COLOR.PRIMARY} />
                <View style={styles.background}>
                    <View style={styles.header}>
                        <View style={{ flex: 0.5 }} />
                        <View style={styles.inputHeader}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <SvgUri svgXmlData={SEARCH} />
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('SearchProductsScreen', { amount: this.state.listUserOrder.length })} style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: COLOR.PLACEHODER, fontSize: 15, fontFamily: STRING.FONT_NORMAL }}>{STRING.SEARCH_INPUT}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }} />
                        </View>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('CartDetailScreen') }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 50 }}>
                            <View style={styles.basket}>
                                <SvgUri svgXmlData={BASKET} />
                                {this.state.isHave ? (
                                    <View style={styles.basket_number}>
                                        <Text style={{ color: COLOR.PRIMARY, fontSize: 11 }}>{this.state.listUserOrder.length}</Text>
                                    </View>
                                ) : null}
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <FlatList
                            style={{ marginBottom: 50 }}
                            data={this.state.listCategories}
                            renderItem={({ item }) =>
                                <ItemCategory
                                    listChild={this.state.listChildCategories}
                                    id={item.id}
                                    name={item.name}
                                    parent_id={item.parent_id}
                                    navigation={this.props.navigation}
                                />
                            }
                            onEndReached={this.loadMore}
                            onEndReachedThreshold={0.1}
                            ListFooterComponent={this.handleFooter}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        {/* PG Beauty */}
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <SvgUri svgXmlData={PG_BEAUTY} />
                            </View>
                            <View style={{ flex: 4, flexDirection: 'row' }}>
                                <Text style={styles.text}>{STRING.PG_BEAUTY}</Text>
                            </View>
                            <TouchableOpacity onPress={this.openBeauty} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                {this.state.beauty ? (
                                    <SvgUri svgXmlData={SUB} width={15} height={20} />
                                ) : (
                                        <SvgUri svgXmlData={PLUS} width={25} height={25} />
                                    )}
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderTopWidth: 0.5, borderTopColor: COLOR.LINE }} /> */}
                        {/* {this.state.beauty ? (
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                                    <View style={{ flex: 1 }} />
                                    <View style={{ flex: 4 }}>
                                        <Text style={styles.text}>{STRING.CLEANSING}</Text>
                                    </View>
                                    <TouchableOpacity onPress={this.openCleansing} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        {this.state.cleansing ? (
                                            <SvgUri svgXmlData={SUB} width={15} height={20} />
                                        ) : (
                                                <SvgUri svgXmlData={PLUS} width={25} height={25} />
                                            )}
                                    </TouchableOpacity>
                                </View>
                                <View style={{ borderTopWidth: 0.5, borderTopColor: COLOR.LINE }} />
                                {this.state.cleansing ? (
                                    <View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                                            <View style={{ flex: 1.5 }} />
                                            <View style={{ flex: 5 }}>
                                                <Text style={styles.text}>{STRING.CLEANSER}</Text>
                                            </View>
                                        </View>
                                        <View style={{ borderTopWidth: 0.5, borderTopColor: COLOR.LINE }} />
                                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                                            <View style={{ flex: 1.5 }} />
                                            <View style={{ flex: 5 }}>
                                                <Text style={styles.text}>{STRING.CLEANSING}</Text>
                                            </View>
                                        </View>
                                        <View style={{ borderTopWidth: 0.5, borderTopColor: COLOR.LINE }} />
                                    </View>
                                ) : null}
                            </View>

                        ) : null} */}
                        {/* PG Beauty Tool */}
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <SvgUri svgXmlData={PG_TOOL} />
                            </View>
                            <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.text}>{STRING.PG_BEAUTY_TOOL}</Text>
                            </View>
                            <TouchableOpacity onPress={this.openTool} style={{ flex: 1, alignItems: 'center' }}>
                                {this.state.tool ? (
                                    <SvgUri svgXmlData={SUB} width={15} height={20} />
                                ) : (
                                        <SvgUri svgXmlData={PLUS} width={25} height={25} />
                                    )}
                            </TouchableOpacity>
                        </View> */}
                        {/* PG Beauty Fashion */}
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
        backgroundColor: COLOR.PRIMARY,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputHeader: {
        flex: 5,
        backgroundColor: COLOR.WHITE,
        flexDirection: 'row',
        borderRadius: 30,
        height: 40,
        marginBottom: 5,
        alignItems: 'center',
        marginTop: 10
    },
    basket_number: {
        position: 'absolute',
        top: 8,
        right: -8,
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: COLOR.WHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 14,
        color: COLOR.TEXTBODY,
    }
})
export default CategoryScreen;