import React, { Component, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, FlatList, ImageBackground, ScrollView, Dimensions, StatusBar, AsyncStorage, Image } from "react-native";
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
const deviceWidth = Dimensions.get('window').width;
function Item({ image, name, price, point, review, sell, sale }) {
    return (
        <View style={styles.container_items}>
            <View style={{ flex: 1 }}>
                <ImageBackground source={image} style={{ width: 160, height: 111, marginTop: 7 }}>
                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <SvgUri svgXmlData={RECTANGLE} />
                        <Text style={{ color: COLOR.WHITE, position: 'absolute', top: 5, left: 5, fontSize: 9 }}>{sale}</Text>
                    </View>
                </ImageBackground>
                <View >
                    <Text numberOfLines={3} style={{ color: COLOR.DESCRIPTION, fontSize: 14, height: 71 }}>{name}</Text>
                    <Text style={{ color: COLOR.TEXTBODY, fontWeight: '600', fontSize: 16 }}>{price}{STRING.CURRENCY}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <SvgUri svgXmlData={STAR} />
                        <Text style={{ color: COLOR.PRIMARY, fontSize: 11, marginLeft: 3 }}>{point}</Text>
                        <Text style={{ color: COLOR.PLACEHOLDER, fontSize: 11, marginLeft: 2 }}>({review} {STRING.REVIEW})</Text>
                        <Text style={{ color: COLOR.PLACEHOLDER, fontSize: 11, marginLeft: 8, flex: 1 }} numberOfLines={1}>{STRING.SOLD} {sell}</Text>
                    </View>
                </View>
            </View>


        </View>

    );
}

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
            description: 'Chanel intense Matte Lip Color là dòng son mới nhất của cuối năm 2018. Với chất son mượt lì mà mềm mại. Thiết kế sang trọng với sự tinh tế từ logo tới vỏ son bề mặt nám.  \nĐặc biệt là chất son được nâng cấp. Nếu dòng son cũ chất son lì, đối với ai khô còn có thể bị bột son, thì dòng son lì mới này hoàn toàn được chinh phục ngay cả những bạn có môi khô nhé',
            tradeMark: '',
            madeIn: 'Pháp',
            species: 'son lì',
            basketNumber: '3',
            index: null,
            colorSelect: '',
            listSameType: [],
            idProduct: id,
            categoryId: '',
            amountOrder: 0
        };
    }
    componentDidMount = () => {
        let imagesProduct = []
        AsyncStorage.getItem('token', (err, result) => {
            if (err) {
            } else {
                axios.get(API.URL + API.PRODUCTS + '/' + this.state.idProduct).then(response => {
                    console.log(response.data.success.category_id);
                    console.log(parseInt(response.data.success.base_price));
                    console.log(response.data.success.images.length);
                    for (let i = 0; i < response.data.success.images.length; i++) {
                        imagesProduct.push(response.data.success.images[i].url);
                    }
                    this.setState({
                        title: response.data.success.full_name,
                        description: response.data.success.description,
                        oldPrice: parseInt(response.data.success.base_price),
                        newPrice: parseInt(response.data.success.base_price),
                        tradeMark: response.data.success.category.name,
                        categoryId: response.data.success.category_id,
                        tag: STRING.TAG + response.data.success.category.name,
                        images: imagesProduct
                    });
                }).catch(error => {
                    console.log(JSON.stringify(error.response.data.error));
                })
            }
        });
        this.getlistSameType();
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
                listSameType: response.data.success.data
            })
        }).catch(error => {
            console.log(JSON.stringify(error.response.data.error));
        })
    }
    plus = () => {
        this.setState({ amountOrder: this.state.amountOrder + 1 });
    }
    sub = () => {
        if (this.state.amountOrder > 0) {
            this.setState({ amountOrder: this.state.amountOrder - 1 });
        }
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
                            <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ marginVertical: 10, marginLeft: 15 }}>
                                <SvgUri svgXmlData={BACK_BLACK} fill={COLOR.WHITE} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.basket}>
                                <SvgUri svgXmlData={BASKET} />
                            </TouchableOpacity>
                            <View style={styles.basket_number}>
                                <Text style={{ color: COLOR.PRIMARY, fontSize: 11 }}>{this.state.basketNumber}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.tag}>{this.state.tag}</Text>
                        <View style={styles.title}>
                            <View style={{ flex: 6 }}>
                                <Text style={styles.title_text}>{this.state.title}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <ImageBackground style={{ width: 30, height: 30.5, alignItems: 'center', justifyContent: 'center' }} source={IMAGE.ICON_SALE_BG}>
                                    <Text style={{ color: COLOR.WHITE, fontSize: 10 }}>{this.state.sale}</Text>
                                </ImageBackground>
                            </View>
                        </View>
                        <View style={styles.title}>
                            <Text style={styles.price_text}>{this.state.newPrice} {STRING.CURRENCY}</Text>
                            <Text style={{ color: COLOR.PLACEHODER, fontSize: 12, textDecorationLine: 'line-through', marginLeft: 16 }}>{this.state.oldPrice} {STRING.CURRENCY}</Text>
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
                                <View style={{ width: 25, justifyContent: 'center', alignItems:'center', marginHorizontal:5 }}>
                                    <Text style={{textAlign:'center'}}>{this.state.amountOrder}</Text>
                                </View>
                                <TouchableOpacity onPress={this.plus}>
                                    <Image source={IMAGE.BTN_ADD} />
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
                            value={this.state.description}
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
                                <Text style={styles.made_in_text}>{this.state.tradeMark}</Text>
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
                                    <Item image={item.primary_image}
                                        name={item.full_name}
                                        price={item.base_price}
                                        point={5}
                                        review={10}
                                        sale={'-10%'}
                                        sell={50} />
                                </TouchableOpacity>
                            }
                        />
                    </View>

                </ScrollView>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 56, backgroundColor: COLOR.WHITE, flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ color: COLOR.PRIMARY, fontSize: 16, marginLeft: 20 }}>{this.state.newPrice} {STRING.CURRENCY}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: COLOR.PRIMARY, borderRadius: 40, height: 48, width: deviceWidth / 2 - 28, alignItems: 'center', justifyContent: 'center' }}>
                            {/* <SvgUri svgXmlData={PLUS}/> */}
                            <Image source={IMAGE.ORDER} />
                        </View>
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
        flex: 1,
        backgroundColor: COLOR.WHITE
    },
    header: {
        opacity: 0.8,
        backgroundColor: COLOR.PRIMARY, position: 'absolute',
        top: 0,
        width: deviceWidth,
        height: 40,
        flexDirection: 'row'
    },
    basket: {
        position: 'absolute',
        top: 8,
        right: 20
    },
    basket_number: {
        position: 'absolute',
        top: 16,
        right: 12,
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
        color: COLOR.TEXTBODY,
        flex: 4,
        textTransform: 'uppercase',
        fontSize: 14,
    },
    see_all: {
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