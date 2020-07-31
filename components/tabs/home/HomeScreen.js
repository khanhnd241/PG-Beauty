import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, FlatList, ImageBackground, ScrollView, Dimensions, StatusBar, ActivityIndicator, AsyncStorage } from "react-native";
import { IMAGE } from '../../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../../constants/string';
import { COLOR } from '../../../constants/colors'
import { SliderBox } from "react-native-image-slider-box";
import { RECTANGLE } from '../../../constants/images/rectangle';
import { SEARCH } from '../../../constants/images/search';
import { STAR } from '../../../constants/images/star';
import { SCAN } from '../../../constants/images/scan';
import { BASKET } from '../../../constants/images/basket';
import { PG_BEAUTY } from '../../../constants/images/pg_beauty';
import { PG_FASHION } from '../../../constants/images/pg_fashion';
import { PG_TOOL } from '../../../constants/images/pg_tool';
import axios from 'axios';
import { API } from '../../../constants/api';
import ItemColumn from '../../products/ItemColumn';
import ItemRow from '../../products/ItemRow';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
} from 'react-native-popup-dialog';
let deviceWidth = Dimensions.get('window').width - 10;
const height = Dimensions.get('window').height;
function Item({ image, name, price, point, review, sell, sale }) {
    return (
        <View style={styles.container_items}>
            <View style={{ flex: 1 }}>
                <ImageBackground source={{ uri: image }} style={{ width: 160, height: 111, marginLeft: 12, marginTop: 7 }}>
                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <SvgUri svgXmlData={RECTANGLE} />
                        <Text style={{ color: 'white', position: 'absolute', top: 5, left: 5, fontSize: 9 }}>{sale}</Text>
                    </View>
                </ImageBackground>
                <View style={{ marginLeft: 16 }} >
                    <Text style={{ color: COLOR.DESCRIPTION, fontSize: 14, height: 71 }}>{name}</Text>
                    <Text style={{ color: COLOR.TEXTBODY, fontWeight: '600', fontSize: 16 }}>{parseInt(price)}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <SvgUri svgXmlData={STAR} />
                        <Text style={{ color: COLOR.PRIMARY, fontSize: 11, marginLeft: 3 }}>{point}</Text>
                        <Text style={{ color: COLOR.PLACEHODER, fontSize: 11, marginLeft: 2 }}>({review} {STRING.REVIEW})</Text>
                        <Text style={{ color: COLOR.PLACEHODER, fontSize: 11, marginLeft: 8, flex: 1 }} numberOfLines={1}>{STRING.SOLD} {sell}</Text>
                    </View>
                </View>
            </View>


        </View>

    );
}

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        navigation.addListener('focus', async () => {
            this.setState({ loadingDialog: true }, this.loadOrder());

        })
        this.state = {
            images: [
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
                "https://source.unsplash.com/1024x768/?girl",
                "https://source.unsplash.com/1024x768/?tree" // Network image
            ],
            listDeal: [
                {
                    image: IMAGE.ANH_DEMO_1,
                    name: 'Kem nền đa năng chanel les beiges tinted Moisturize',
                    price: '690.000 đ',
                    point: '4.8',
                    review: '26',
                    sell: '471',
                    sale: '-30%'
                },
                {
                    image: IMAGE.ANH_DEMO_2,
                    name: 'Máy Rửa Mặt Foreo Luna Mini 2',
                    price: '250.000 đ',
                    point: '4.8',
                    review: '26',
                    sell: '7411',
                    sale: '-40%'
                },
                {
                    image: IMAGE.ANH_DEMO_1,
                    name: 'Kem nền đa năng chanel les beiges tinted Moisturize',
                    price: '690.000 đ',
                    point: '4.8',
                    review: '26',
                    sell: '74',
                    sale: '-30%'
                },
                {
                    image: IMAGE.ANH_DEMO_2,
                    name: 'Máy Rửa Mặt Foreo Luna Mini 2',
                    price: '250.000 đ',
                    point: '4.8',
                    review: '26',
                    sell: '74',
                    sale: '-40%'
                }
            ],
            listSellingProduct: [
                {
                    image: IMAGE.ANH_DEMO_1,
                    name: 'Kem nền đa năng chanel les beiges tinted Moisturize',
                    price: '690.000 đ',
                    point: '4.8',
                    review: '26',
                    sell: '471',
                    sale: '-30%'
                },
                {
                    image: IMAGE.ANH_DEMO_3,
                    name: 'Phấn nước sulwhasoo hoa anh đào limited 2020',
                    price: '250.000 đ',
                    point: '4.8',
                    review: '26',
                    sell: '7411',
                    sale: '-40%'
                },
                {
                    image: IMAGE.ANH_DEMO_1,
                    name: 'Son Gucci Matte mới nhất',
                    price: '690.000 đ',
                    point: '4.8',
                    review: '26',
                    sell: '74',
                    sale: '-30%'
                },
                {
                    image: IMAGE.ANH_DEMO_2,
                    name: 'Máy Rửa Mặt Foreo Luna Mini 2',
                    price: '250.000 đ',
                    point: '4.8',
                    review: '26',
                    sell: '74',
                    sale: '-40%'
                }
            ],
            listNewProducts: [],
            basketNumber: 3,
            page: 1,
            isLoading: false,
            listUserOrder: [],
            isHave: false,
            loadingDialog: false
        };
    }
    loadListNewProduct = () => {
        axios.get(API.URL + API.PRODUCTS, {
            params: {
                order_by: 'id',
                page: this.state.page,
                orientation: 'DESC'
            }
        }).then(response => {
            this.setState({
                listNewProducts: this.state.listNewProducts.concat(response.data.success.data),
                isLoading: false
            });
            console.log(this.state.listNewProducts.length);
        }).catch(error => {
        })
    }
    componentDidMount = () => {
        this.setState({ isLoading: true }, this.loadListNewProduct);
        
    }
    loadOrder = () => {
        AsyncStorage.getItem('id', (err, result) => {
            console.log('id day' + result);
            if (result != null) {
                this.setState({ userId: result });
                AsyncStorage.getItem(result, (err, listOrder) => {
                    console.log('list order' + JSON.parse(listOrder));
                    this.setState({ listUserOrder: JSON.parse(listOrder) })
                    console.log('length order hien tai' + this.state.listUserOrder.length);
                    this.checkOrder();
                })
            } else {
                this.checkOrder();
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
        this.setState({ loadingDialog: false })
    }
    loadMore = () => {
        console.log('goi api lan nua')
        this.setState({ page: this.state.page + 1, isLoading: true });
        this.loadListNewProduct();
    }
    handleFooter = () => {
        console.log('footer day');
        return (
            this.state.isLoading ?
                <View style={styles.loader}>
                    <ActivityIndicator color={COLOR.PRIMARY} size='large' />
                </View> :
                <View style={styles.loader}>
                    <TouchableOpacity onPress={this.loadMore} style={{ flex: 1, alignItems: 'center', backgroundColor: COLOR.PRIMARY, padding: 5, borderRadius: 3 }}>
                        <Text style={{ color: COLOR.WHITE }}>{STRING.VIEW_MORE}</Text>
                    </TouchableOpacity>
                </View>
        )
    }
    render() {
        return (
            <SafeAreaView style={styles.screen}>
                <StatusBar barStyle='light-content' backgroundColor={COLOR.PRIMARY} />
                <ScrollView style={styles.background}>
                    <View style={styles.header}>
                        <View style={styles.inputHeader}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <SvgUri svgXmlData={SEARCH} />
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput placeholder={STRING.SEARCH_INPUT} placeholderTextColor={COLOR.PLACEHODER} style={{ flex: 5, fontSize: 15 }}></TextInput>
                            </View>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                                <SvgUri svgXmlData={SCAN} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('CartDetailScreen') }} style={styles.basket}>
                            <SvgUri svgXmlData={BASKET} />
                            {this.state.isHave ? (
                                <View style={styles.basket_number}>
                                    <Text style={{ color: COLOR.PRIMARY, fontSize: 11 }}>{this.state.listUserOrder.length}</Text>
                                </View>
                            ) : null}
                        </TouchableOpacity>
                    </View>
                    {/* banner và tool */}
                    <View>
                        <SliderBox
                            autoplay={true}
                            images={this.state.images}
                        />
                        <View style={styles.tools}>
                            <TouchableOpacity style={styles.icon_tool}>
                                <SvgUri svgXmlData={PG_BEAUTY} />
                                <Text>{STRING.PG_BEAUTY}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.icon_tool}>
                                <SvgUri svgXmlData={PG_TOOL} />
                                <Text>{STRING.PG_BEAUTY_TOOL}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.icon_tool}>
                                <SvgUri svgXmlData={PG_FASHION} />
                                <Text>{STRING.PG_FASHION}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ backgroundColor: COLOR.GRAY, height: 5 }} />
                    {/* Deal đang diễn ra */}
                    <View>
                        <View style={styles.flex_direction_row}>
                            <Text style={styles.title_list}>{STRING.DEAL_NOW}</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ListProductsScreen', { order_by: 'deal_now', title: 'Deal đang diễn ra' })}>
                                <Text style={styles.see_all}>{STRING.SEE_ALL}</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            horizontal={true}
                            data={this.state.listNewProducts}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetailScreen', { id: item.id })}>
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
                    <View style={{ backgroundColor: COLOR.GRAY, height: 5 }} >
                    </View>
                    {/* Sản phẩm bán chạy */}
                    <View>
                        <View style={styles.flex_direction_row}>
                            <Text style={styles.title_list}>{STRING.SELLING_PRODUCT}</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ListProductsScreen', { order_by: 'selling_product', title: 'Sản phẩm bán chạy' })}>
                                <Text style={styles.see_all}>{STRING.SEE_ALL}</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            horizontal={true}
                            data={this.state.listNewProducts}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetailScreen', { id: item.id })}>
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
                    <View style={{ backgroundColor: COLOR.GRAY, height: 5 }} />
                    {/* Sản phẩm mới */}
                    <View>
                        <View style={styles.flex_direction_row}>
                            <Text style={styles.title_list}>{STRING.NEW_PRODUCT}</Text>
                        </View>
                        <FlatList
                            numColumns={2}
                            data={this.state.listNewProducts}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetailScreen', { id: item.id })}>
                                    <ItemColumn image={item.primary_image}
                                        name={item.full_name}
                                        price={item.base_price}
                                        point={5}
                                        review={10}
                                        sale={'-10%'}
                                        sell={50} />
                                </TouchableOpacity>
                            }
                            // onEndReached={() => this.loadMore}
                            // onEndReachedThreshold={0}
                            ListFooterComponent={this.handleFooter}
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
                </ScrollView>
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
        backgroundColor: COLOR.WHITE,
        flexDirection: 'row',
        borderRadius: 30,
        width: 310,
        height: 40,
        marginBottom: 5,
        marginRight: 30,
        alignItems: 'center',
        marginTop: 10
    },
    tools: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: COLOR.WHITE
    },
    icon_tool: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flex_direction_row: {
        flexDirection: 'row'
    },
    title_list: {
        color: COLOR.TEXTBODY,
        fontWeight: '600',
        flex: 4,
        textTransform: 'uppercase',
        fontSize: 14,
        margin: 10,
        marginBottom: 16
    },
    see_all: {
        color: COLOR.LINK,
        flex: 1,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#000",
        fontSize: 12,
        margin: 10
    },
    container_items: {
        height: 255,
        width: 180
    },
    items_new_product: {
        width: deviceWidth / 2,
        height: 255,
        flex: 1,
        margin: 3
    },
    tool_text: {
        color: COLOR.TEXTBODY,
        fontSize: 14
    },
    basket: {
        position: 'absolute',
        top: 18,
        right: 20
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
    loader: {
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 10
    }

})
export default HomeScreen;