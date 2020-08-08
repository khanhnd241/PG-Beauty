import React, { Component, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, FlatList, ImageBackground, ScrollView, Dimensions, StatusBar, AsyncStorage, Image, ActivityIndicator, Alert } from "react-native";
import { IMAGE } from '../../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../../constants/string';
import { COLOR } from '../../../constants/colors';
import { BACK_BLACK } from '../../../constants/images/back_black';
import { SliderBox } from "react-native-image-slider-box";
import { BTN_SUB } from '../../../constants/images/btn_sub';
import { RECTANGLE } from '../../../constants/images/rectangle';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { STAR } from '../../../constants/images/star';
import { BASKET } from '../../../constants/images/basket';
import { BTN_ADD } from '../../../constants/images/btn_add';
import { CAR } from '../../../constants/images/car';
import axios from 'axios';
import { API } from '../../../constants/api';
import { ORDER } from '../../../constants/images/order';
import HTMLView from 'react-native-htmlview';
import ItemRow from '../../products/ItemRow';
import { PLUS } from '../../../constants/images/plus';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
} from 'react-native-popup-dialog';
const deviceWidth = Dimensions.get('window').width;

class ProductDetailScreen extends Component {
    constructor(props) {
        super(props);
        let { id } = this.props.route.params;
        this.state = {
            images: [
                IMAGE.ANH_DEMO_3,
                IMAGE.ANH_DEMO_6,
                IMAGE.ANH_DEMO_2,
                IMAGE.ANH_DEMO_1
            ],
            product: {},
            tag: '',
            title: '',
            sale: '-30%',
            newPrice: '',
            oldPrice: '',
            rate: '5',
            review: '26',
            sold: '74',
            color: ['#FF3358', '#FB4911', '#C80078'],
            status: '1',
            ammount: '5',
            delivery: 'Miễn Phí Vận Chuyển khi đơn đạt giá trị tối thiểu hoặc bán kính <3km. Bán kính >3km nội thành HN 25k',
            description: '',
            tradeMark: '',
            madeIn: 'Pháp',
            species: 'son lì',
            basketNumber: '3',
            index: null,
            colorSelect: '',
            listSameType: [],
            idProduct: id,
            categoryId: '',
            amountOrder: 1,
            product: {},
            isHave: false,
            warningLoginDialog: false,
            warningAmountDialog: false,
            category: {},
            listUserOrder: [],
            userId: '',
            loadingDialog: false,
            deviceId: '',
            total: ''
        };
    }
    componentDidMount = () => {
        const { navigation } = this.props;
        navigation.addListener('focus', async () => {
            this.setState({ idProduct: this.props.route.params.id, loadingDialog: true })
            console.log('load screen' + this.props.route.params.id);
            this.loadDetail();
            this.loadOrder();
            this.getlistSameType();
        })

    }
    loadDetail = () => {
        let imagesProduct = []
        axios.get(API.URL + API.PRODUCTS + '/' + this.props.route.params.id).then(response => {
            console.log(response.data.success.category_id);
            console.log(parseInt(response.data.success.base_price));
            console.log(response.data.success.images.length);
            for (let i = 0; i < response.data.success.images.length; i++) {
                imagesProduct.push(response.data.success.images[i].url);
            }
            this.setState({
                total: response.data.success.base_price,
                product: response.data.success,
                category: response.data.success.category,
                images: imagesProduct
            });
        }).catch(error => {
            console.log(JSON.stringify(error.response.data.error));
        })
    }
    getlistSameType = () => {
        console.log('getlistSameType');
        axios.get(API.URL + API.PRODUCTS, {
            params: {
                category_id: this.state.categoryId
            }
        }).then(response => {
            // console.log(response.data.success);
            this.setState({
                listSameType: response.data.success.data,
                loadingDialog: false
            })
        }).catch(error => {
            console.log(JSON.stringify(error.response.data.error));
        })
    }
    plus = () => {
        this.setState({loadingDialog: true})
        let quantity = this.state.amountOrder + 1;
        let total = this.state.product.base_price * quantity;
        this.setState({ amountOrder: quantity, total: total, loadingDialog: false });
    }
    sub = () => {
        this.setState({loadingDialog: true})
        if (this.state.amountOrder > 1) {
            let quantity = this.state.amountOrder - 1;
            let total = this.state.product.base_price * quantity;
            this.setState({ amountOrder: quantity, total: total});
        } 
            this.setState({loadingDialog: false})
        
    }
    checkOrder = () => {
        console.log('check length' + this.state.listUserOrder.length);
        if (this.state.listUserOrder.length >= 1) {
            this.setState({ isHave: true, loadingDialog: false })
        } else {
            this.setState({ isHave: false })
        }
        this.setState({ loadingDialog: false })
    }
    order = () => {
        let productOrder = this.state.product;
        if (this.state.amountOrder == 0) {
            this.setState({ warningAmountDialog: true, loadingDialog: false })
        } else {
            productOrder.quantity = this.state.amountOrder;
            this.state.listUserOrder.push(productOrder);
            this.setState({ loadingDialog: true }, () => {
                AsyncStorage.getItem('id', (err, result) => {
                    if (result == null || result == '') {
                        console.log('chua dang nhap ' + this.state.listUserOrder)
                        this.setState({ loadingDialog: false });
                        AsyncStorage.setItem(this.state.deviceId, JSON.stringify(this.state.listUserOrder));
                        this.loadOrder();

                    } else {
                        console.log(' dang nhap roi')
                        console.log('length order sau do' + this.state.listUserOrder.length);
                        AsyncStorage.setItem(this.state.userId, JSON.stringify(this.state.listUserOrder));
                        this.loadOrder();

                    }
                })
            })
            Alert.alert('Thông báo', 'Đã thêm sản phẩm vào giỏ hàng', [{ text: STRING.ACCEPT }])
        }




    }
    loadOrder = () => {
        this.setState({ loadingDialog: true })
        AsyncStorage.getItem('id', (err, result) => {
            console.log('id day' + result);
            if (result == null || result == '') {
                console.log('chua dang nhap')
                AsyncStorage.getItem('deviceId', (err, deviceId) => {
                    this.setState({ deviceId: deviceId })
                    AsyncStorage.getItem(deviceId, (err, listOrder) => {
                        this.setState({ listUserOrder: JSON.parse(listOrder) }, () => {
                            this.checkOrder();
                        })
                    })
                })
            } else {
                console.log('da dang nhap')
                this.setState({ userId: result });
                AsyncStorage.getItem(result, (err, listOrder) => {
                    if (JSON.parse(listOrder) == null || JSON.parse(listOrder) == '') {
                        var newListOrder = [];
                        AsyncStorage.setItem(result, JSON.stringify(newListOrder));
                        AsyncStorage.getItem(result, (err, listOrder) => {
                            this.setState({ listUserOrder: JSON.parse(listOrder) })
                            this.checkOrder();
                        })
                    } else {
                        console.log('list order' + JSON.parse(listOrder));
                        this.setState({ listUserOrder: JSON.parse(listOrder) })
                        console.log('length order hien tai' + this.state.listUserOrder.length);
                        this.checkOrder();
                    }
                    
                })
            }
            this.setState({ loadingDialog: false })
        });
    }
    format(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    render() {
        return (
            <SafeAreaView style={styles.screen}>
                <StatusBar barStyle='light-content' backgroundColor={COLOR.PRIMARY} />
                <ScrollView style={styles.background}>
                    <View style={{ height: 250 }}>
                        <SliderBox
                            sliderBoxHeight={250}
                            autoplay={true}
                            images={this.state.images}
                        />
                    </View>

                    <View style={{ position: 'absolute', top: 0 }}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ alignItems:'center',justifyContent:'center', height:45, width:45 }}>
                                <SvgUri svgXmlData={BACK_BLACK} fill={COLOR.WHITE} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('CartDetailScreen') }} style={{height:45, width:45, position:'absolute', right:15}}>
                            <View  style={styles.basket}>
                                <SvgUri svgXmlData={BASKET} />
                                {this.state.isHave ? (
                                <View style={styles.basket_number}>
                                    <Text style={{ color: COLOR.PRIMARY, fontSize: 11 }}>{this.state.listUserOrder.length}</Text>
                                </View>
                            ) : null}
                            </View>
                            
                            </TouchableOpacity>
                            

                        </View>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.tag}>{STRING.TAG} {this.state.category.name}</Text>
                        <View style={styles.title}>
                            <View style={{ flex: 6 }}>
                                <Text style={styles.title_text}>{this.state.product.full_name}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <ImageBackground style={{ width: 30, height: 30.5, alignItems: 'center', justifyContent: 'center' }} source={IMAGE.ICON_SALE_BG}>
                                    <Text style={{ color: COLOR.WHITE, fontSize: 10 }}>{this.state.sale}</Text>
                                </ImageBackground>
                            </View>
                        </View>
                        <View style={styles.title}>
                            <Text style={styles.price_text}>{this.format(parseInt(this.state.product.base_price))} {STRING.CURRENCY}</Text>
                            <Text style={{ color: COLOR.PLACEHODER, fontSize: 12, textDecorationLine: 'line-through', marginLeft: 16 }}>{this.format(parseInt(this.state.product.base_price))} {STRING.CURRENCY}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 4, flexDirection: 'row' }}>
                                <Rating
                                    readonly
                                    type='custom'
                                    startingValue={this.state.rate}
                                    ratingCount={5}
                                    imageSize={15}
                                    tintColor={COLOR.WHITE}
                                    ratingColor={COLOR.PRIMARY}
                                    style={{ backgroundColor: COLOR.WHITE, marginLeft: -1 }}
                                />
                                <Text style={{ color: COLOR.PLACEHOLDER, fontSize: 11, marginLeft: 8 }}>({this.state.review} {STRING.REVIEW} )</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: COLOR.PLACEHOLDER, fontSize: 11 }}>{STRING.SOLD} {this.state.sold}</Text>
                            </View>
                        </View>
                        <View style={{ borderColor: COLOR.LINE, borderTopWidth: 0.5, marginVertical: 8 }}></View>
                        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                            <Text style={{ color: COLOR.DESCRIPTION }}>{STRING.COLOR} </Text>
                            <Text style={{ color: COLOR.DESCRIPTION, fontWeight: 'bold' }}>{this.state.color.length} </Text>
                            {this.state.ammount == '0' ? (
                                <Text style={{ color: COLOR.PRIMARY }}>({STRING.OUT_OF_STOCK})</Text>
                            ) : (
                                    <Text style={{ color: COLOR.GREEN }}>({STRING.AVAILABLE})</Text>

                                )}
                        </View>
                        <FlatList
                            horizontal={true}
                            data={this.state.color}
                            renderItem={({ item, index }) =>
                                this.state.index == index ? (
                                    <View style={{ borderColor: COLOR.BLACK, borderWidth: 1, width: 35, height: 35, borderRadius: 17.5, alignItems: 'center', marginRight: 10, justifyContent: 'center' }}>
                                        <View onPress={(index) => { this.setState({ index: index }) }} style={{ backgroundColor: item, width: 30, height: 30, borderRadius: 15 }}></View>
                                    </View>
                                ) : (
                                        <TouchableOpacity onPress={() => { this.setState({ index: index, colorSelect: item }) }} style={{ backgroundColor: item, width: 30, height: 30, borderRadius: 15, marginRight: 15, marginVertical: 5 }}></TouchableOpacity>
                                    )
                            }
                        />
                        {/* kiểm tra còn hàng không */}
                        {this.state.ammount == '0' ? (
                            null
                        ) : (<View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 3 }}>
                                <Text style={{ fontSize: 14 }}>{STRING.AMOUNT} <Text style={{ color: COLOR.GREEN }}>({STRING.STILL} {this.state.ammount})</Text> </Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                                <TouchableOpacity onPress={this.sub}>
                                    <SvgUri svgXmlData={BTN_SUB} />
                                </TouchableOpacity>
                                <View style={{ width: 25, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
                                    <Text style={{ textAlign: 'center' }}>{this.state.amountOrder}</Text>
                                </View>
                                <TouchableOpacity onPress={this.plus} style={{ borderWidth: 0.5, borderColor: COLOR.PRIMARY, width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: 0.5, height: 13, backgroundColor: COLOR.PRIMARY, position: 'absolute', left: 9 }} />
                                    <View style={{ height: 0.5, width: 13, backgroundColor: COLOR.PRIMARY, position: 'absolute', top: 9 }} />
                                    {/* <Image style={{borderWidth:0.5, borderColor:COLOR.PRIMARY}} source={IMAGE.BTN_ADD} /> */}
                                </TouchableOpacity>
                            </View>
                        </View>)}

                    </View>
                    <View style={{ backgroundColor: COLOR.GRAY, height: 8, marginTop: 16, marginBottom: 6 }} />
                    <View style={styles.content}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <SvgUri svgXmlData={CAR} />
                            <Text style={{ fontSize: 14, marginLeft: 11, color: COLOR.TEXTBODY }}>{STRING.DELIVERY}</Text>
                        </View>
                        <Text style={{ color: COLOR.DESCRIPTION, fontSize: 13, marginTop: 6, marginRight: 26, paddingVertical: 3, lineHeight: 25 }}>{this.state.delivery}</Text>
                    </View>
                    <View style={{ backgroundColor: COLOR.GRAY, height: 8, marginTop: 16, marginBottom: 6 }} />
                    <View style={styles.content}>
                        <Text style={{ fontSize: 14, marginBottom: 6, color: COLOR.TEXTBODY, fontWeight: '600' }}>{STRING.DESCRIPTION}</Text>
                        <HTMLView
                            value={this.state.product.description}
                        />
                    </View>
                    <View style={{ backgroundColor: COLOR.GRAY, height: 8, marginTop: 16, marginBottom: 6 }} />
                    {/* Thông số */}
                    <View style={styles.content}>
                        <Text>{STRING.PRODUCT_SPECIFICATION}</Text>
                        <View style={styles.made_in}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.made_in_title}>{STRING.TRADE_MARK}</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={styles.made_in_text}>{this.state.category.name}</Text>
                            </View>
                        </View>
                        <View style={styles.made_in}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.made_in_title}>{STRING.MADE_IN}</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={styles.made_in_text}>{this.state.madeIn}</Text>
                            </View>
                        </View>
                        <View style={styles.made_in}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.made_in_title}>{STRING.SPECIES}</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={styles.made_in_text}>{this.state.species}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: COLOR.GRAY, height: 8, marginTop: 16, marginBottom: 6 }} />
                    {/* Danh sach cac san pham khac */}
                    <View style={styles.content}>
                        <View style={styles.flex_direction_row}>
                            <Text style={styles.title_list}>{STRING.SAME_PRODUCT}</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ListProductsScreen', { order_by: 'same_type', title: 'Sản phẩm cùng loại', category_id: this.state.categoryId })}>
                                <Text style={styles.see_all}>{STRING.SEE_ALL}</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            horizontal={true}
                            data={this.state.listSameType}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('ProductDetailScreen', { id: item.id }) }}>
                                    <ItemRow image={item.primary_image}
                                        name={item.full_name}
                                        price={item.base_price}
                                        point={5}
                                        review={10}
                                        sale={'-10%'}
                                        sell={50}
                                    />
                                </TouchableOpacity>
                            }
                        />
                    </View>
                    <View style={{ backgroundColor: COLOR.GRAY, height: 8, marginTop: 16, marginBottom: 6 }} />
                    <View style={styles.content_footer}>
                        <View style={styles.flex_direction_row}>
                            <Text style={styles.title_list}>{STRING.SAME_TRADE_MARK}</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ListProductsScreen', { order_by: 'same_trade_mark', title: 'Sản phẩm cùng thương hiệu' })}>
                                <Text style={styles.see_all}>{STRING.SEE_ALL}</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            horizontal={true}
                            data={this.state.listSameType}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('ProductDetailScreen') }}>
                                    <ItemRow image={item.primary_image}
                                        name={item.full_name}
                                        price={item.base_price}
                                        point={5}
                                        review={10}
                                        sale={'-10%'}
                                        sell={50}
                                    />
                                </TouchableOpacity>
                            }
                        />
                    </View>

                </ScrollView>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 56, backgroundColor: COLOR.WHITE, flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ color: COLOR.PRIMARY, fontSize: 16, marginLeft: 20 }}>{this.format(parseInt(this.state.total))} {STRING.CURRENCY}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={this.order} style={{ backgroundColor: COLOR.PRIMARY, borderRadius: 40, height: 48, width: deviceWidth / 2 - 28, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={IMAGE.ORDER} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Dialog
                    onDismiss={() => {
                        this.setState({ warningAmountDialog: false });
                    }}
                    width={0.9}
                    visible={this.state.warningAmountDialog}
                    dialogTitle={
                        <DialogTitle
                            title={STRING.WARNING}
                            hasTitleBar={false}
                            align="center"
                        />
                    }
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text={STRING.ACCEPT}
                                bordered
                                onPress={() => {
                                    this.setState({ warningAmountDialog: false });
                                }}
                                key="button-1"
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>{STRING.CHOOSE_QUANTITY}</Text>
                    </DialogContent>
                </Dialog>
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
        flex: 1,
        backgroundColor: COLOR.WHITE
    },
    header: {
        opacity: 0.8,
        backgroundColor: COLOR.PRIMARY, 
        position: 'absolute',
        top: 0,
        width: deviceWidth,
        height: 45,
        flexDirection: 'row'
    },
    basket: {
        position: 'absolute',
        top: 12,
        alignSelf:'center'
    },
    basket_number: {
        position: 'absolute',
        right: -8,
        top:8,
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: COLOR.WHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        marginLeft: 17,
        marginTop: 10
    },
    content_footer: {
        marginLeft: 17,
        marginTop: 10,
        marginBottom: 56
    },
    tag: {
        fontSize: 14,
        color: COLOR.LINK
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title_text: {
        color: COLOR.TEXTBODY,
        fontSize: 16
    },
    price_text: {
        color: COLOR.PRIMARY,
        fontSize: 16
    },
    item: {
        backgroundColor: 'red',
        width: 30,
        height: 30,
        borderRadius: 15

    },
    container_items: {
        height: 255,
        width: 180,
        marginRight: 5
    },
    made_in_title: {
        color: COLOR.DESCRIPTION,
        fontSize: 14
    },
    made_in_text: {
        color: COLOR.TEXTBODY,
        fontWeight: '600'
    },
    made_in: {
        flexDirection: 'row',
        marginTop: 7
    },
    title_list: {
        fontFamily:STRING.FONT_SEMI_BOLD,
        color: COLOR.TEXTBODY,
        flex: 4,
        textTransform: 'uppercase',
        fontSize: 14,
    },
    see_all: {
        fontFamily:STRING.FONT_SEMI_BOLD,
        color: COLOR.LINK,
        flex: 1,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#000",
        fontSize: 12,
        marginRight: 10
    },
    flex_direction_row: {
        flexDirection: 'row',
        marginTop: 9,
    },
})
export default ProductDetailScreen;