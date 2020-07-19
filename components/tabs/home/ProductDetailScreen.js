import React, { Component, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, FlatList, ImageBackground, ScrollView, Dimensions, StatusBar } from "react-native";
import { IMAGE } from '../../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../../constants/string';
import { BACK_BLACK } from '../../../constants/images/back_black';
import { SliderBox } from "react-native-image-slider-box";
import { BASKET } from '../../../constants/images/basket';
import { RECTANGLE } from '../../../constants/images/rectangle';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { STAR } from '../../../constants/images/star';
import { SUB } from '../../../constants/images/sub';
import { ADD } from '../../../constants/images/add';
import { CAR } from '../../../constants/images/car';
const deviceWidth = Dimensions.get('window').width;
function Item({ image, name, price, point, review, sell, sale }) {
    return (
        <View style={styles.container_items}>
            <View style={{ flex: 1 }}>
                <ImageBackground source={image} style={{ width: 160, height: 111, marginTop: 7 }}>
                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <SvgUri svgXmlData={RECTANGLE} />
                        <Text style={{ color: 'white', position: 'absolute', top: 5, left: 5, fontSize: 9 }}>{sale}</Text>
                    </View>
                </ImageBackground>
                <View style={{ marginLeft: 16 }} >
                    <Text style={{ color: '#42515F', fontSize: 14, height: 71 }}>{name}</Text>
                    <Text style={{ color: '#2E3E4E', fontWeight: '600', fontSize: 16 }}>{price}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <SvgUri svgXmlData={STAR} />
                        <Text style={{ color: '#BE1E2D', fontSize: 11, marginLeft: 3 }}>{point}</Text>
                        <Text style={{ color: '#6C7783', fontSize: 11, marginLeft: 2 }}>({review} {STRING.REVIEW})</Text>
                        <Text style={{ color: '#6C7783', fontSize: 11, marginLeft: 8, flex: 1 }} numberOfLines={1}>{STRING.SOLD} {sell}</Text>
                    </View>
                </View>
            </View>


        </View>

    );
}

class ProductDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                IMAGE.ANH_DEMO_3,
                IMAGE.ANH_DEMO_6,
                IMAGE.ANH_DEMO_2,
                IMAGE.ANH_DEMO_1
            ],
            tag: '#Chanel',
            title: 'Son Chanel mới nhất Intense Matte Lip Color',
            sale: '-30%',
            newPrice: '890.000 đ',
            oldPrice: '890.000 đ',
            rate: '5',
            review: '26',
            sold: '74',
            color: ['#FF3358', '#FB4911', '#C80078'],
            status: '1',
            ammount: '3',
            delivery: 'Miễn Phí Vận Chuyển khi đơn đạt giá trị tối thiểu hoặc bán kính <3km. Bán kính >3km nội thành HN 25k',
            description: 'Chanel intense Matte Lip Color là dòng son mới nhất của cuối năm 2018. Với chất son mượt lì mà mềm mại. Thiết kế sang trọng với sự tinh tế từ logo tới vỏ son bề mặt nám.  \nĐặc biệt là chất son được nâng cấp. Nếu dòng son cũ chất son lì, đối với ai khô còn có thể bị bột son, thì dòng son lì mới này hoàn toàn được chinh phục ngay cả những bạn có môi khô nhé',
            tradeMark: 'Chanel',
            madeIn: 'Pháp',
            species: 'son lì',
            basketNumber: '3',
            index: null,
            colorSelect: '',
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

        };
    }

    render() {
        return (
            <SafeAreaView style={styles.background}>
                <ScrollView >
                    <SliderBox
                        sliderBoxHeight={250}
                        autoplay={true}
                        images={this.state.images}
                    />
                    <View style={{ position: 'absolute', top: 0 }}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ marginVertical: 10, marginLeft: 15 }}>
                                <SvgUri svgXmlData={BACK_BLACK} fill='#FFFFFF' />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.basket}>
                                <SvgUri svgXmlData={BASKET} />
                            </TouchableOpacity>
                            <View style={styles.basket_number}>
                                <Text style={{ color: '#BE1E2D', fontSize: 11 }}>{this.state.basketNumber}</Text>
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
                                    <Text style={{ color: '#FFFFFF', fontSize: 10 }}>{this.state.sale}</Text>
                                </ImageBackground>
                            </View>
                        </View>
                        <View style={styles.title}>
                            <Text style={styles.price_text}>{this.state.newPrice}</Text>
                            <Text style={{ color: '#C0C5C9', fontSize: 12, textDecorationLine: 'line-through', marginLeft: 16 }}>{this.state.oldPrice}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 4, flexDirection: 'row' }}>
                                <Rating
                                    readonly
                                    type='custom'
                                    startingValue={this.state.rate}
                                    ratingCount={5}
                                    imageSize={15}
                                    tintColor='white'
                                    ratingColor='#BE1E2D'
                                    style={{ backgroundColor: 'white', marginLeft: -1 }}
                                />
                                <Text style={{ color: '#6C7783', fontSize: 11, marginLeft: 8 }}>({this.state.review} {STRING.REVIEW} )</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: '#6C7783', fontSize: 11 }}>{STRING.SOLD} {this.state.sold}</Text>
                            </View>
                        </View>
                        <View style={{ borderColor: '#E0E0E0', borderTopWidth: 0.5, marginVertical: 8 }}></View>
                        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                            <Text style={{ color: '#42515F' }}>{STRING.COLOR} </Text>
                            <Text style={{ color: '#42515F', fontWeight: 'bold' }}>{this.state.color.length} </Text>
                            {this.state.status == '1' ? (
                                <Text style={{ color: 'green' }}>({STRING.AVAILABLE})</Text>

                            ) : (
                                    <Text style={{ color: '#BE1E2D' }}>({STRING.OUT_OF_STOCK})</Text>

                                )}
                        </View>
                        <FlatList
                            horizontal={true}
                            data={this.state.color}
                            renderItem={({ item, index }) =>
                                this.state.index == index ? (
                                    <View style={{ borderColor: '#000000', borderWidth: 1, width: 35, height: 35, borderRadius: 17.5, alignItems: 'center', marginRight: 10, justifyContent: 'center' }}>
                                        <View onPress={(index) => { this.setState({ index: index }) }} style={{ backgroundColor: item, width: 30, height: 30, borderRadius: 15 }}></View>
                                    </View>
                                ) : (
                                        <TouchableOpacity onPress={() => { this.setState({ index: index, colorSelect: item }) }} style={{ backgroundColor: item, width: 30, height: 30, borderRadius: 15, marginRight: 15, marginVertical: 5 }}></TouchableOpacity>
                                    )
                            }
                        />
                        {/* kiểm tra còn hàng không */}
                        {this.state.status == '1' ? (
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 4 }}>
                                    <Text style={{ fontSize: 14 }}>{STRING.AMOUNT} <Text style={{ color: 'green' }}>({STRING.STILL} {this.state.ammount})</Text> </Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <SvgUri svgXmlData={SUB} />
                                    <Text style={{ paddingHorizontal: 10 }}>0</Text>
                                    <SvgUri svgXmlData={ADD} />
                                </View>
                            </View>
                        ) : null}

                    </View>
                    <View style={{ backgroundColor: '#F2F2F2', height: 8, marginTop: 16, marginBottom: 6 }} />
                    <View style={styles.content}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <SvgUri svgXmlData={CAR} />
                            <Text style={{ fontSize: 14, marginLeft: 11, color: '#2E3E4E' }}>{STRING.DELIVERY}</Text>
                        </View>
                        <Text style={{ color: '#42515F', fontSize: 13, marginTop: 6, marginRight: 26, paddingVertical: 3, lineHeight: 25 }}>{this.state.delivery}</Text>
                    </View>
                    <View style={{ backgroundColor: '#F2F2F2', height: 8, marginTop: 16, marginBottom: 6 }} />
                    <View style={styles.content}>
                        <Text style={{ fontSize: 14, marginBottom: 6, color: '#2E3E4E', fontWeight: '600' }}>{STRING.DESCRIPTION}</Text>
                        <Text style={{ fontSize: 13, lineHeight: 25, color: '#42515F' }}>
                            {this.state.description}
                        </Text>
                    </View>
                    <View style={{ backgroundColor: '#F2F2F2', height: 8, marginTop: 16, marginBottom: 6 }} />
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
                    <View style={{ backgroundColor: '#F2F2F2', height: 8, marginTop: 16, marginBottom: 6 }} />
                    <View style={styles.content}>
                        <View style={styles.flex_direction_row}>
                            <Text style={styles.title_list}>{STRING.SELLING_PRODUCT}</Text>
                            <TouchableOpacity>
                                <Text style={styles.see_all}>{STRING.SEE_ALL}</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            horizontal={true}
                            data={this.state.listDeal}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('ProductDetailScreen') }}>
                                    <Item image={item.image}
                                        name={item.name}
                                        price={item.price}
                                        point={item.point}
                                        review={item.review}
                                        sale={item.sale}
                                        sell={item.sell} />
                                </TouchableOpacity>
                            }
                        />
                    </View>
                </ScrollView>
                <View style={{ backgroundColor: '#F2F2F2', height: 8, marginTop: 16, marginBottom: 6 }} />
                <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, height:56,backgroundColor:'#FFFFFF', flexDirection:'row'}}>
                    <View style={{flex:1, justifyContent:'center'}}>
                        <Text style={{color:'#BE1E2D', fontSize:16, marginLeft:20}}>{this.state.newPrice}</Text>
                    </View>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <View style={{backgroundColor:'#BE1E2D', borderRadius:40,height:48, width:deviceWidth/2 - 28, alignItems:'center', justifyContent:'center'}}>
                            <SvgUri svgXmlData={BASKET} />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header: {
        opacity: 0.8,
        backgroundColor: '#BE1E2D', position: 'absolute',
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
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        marginLeft: 17,
        marginTop: 10
    },
    tag: {
        fontSize: 14,
        color: '#111D5E'
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title_text: {
        color: '#2E3E4E',
        fontSize: 16
    },
    price_text: {
        color: '#BE1E2D',
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
        width: 180
    },
    made_in_title: {
        color: '#42515F',
        fontSize: 14
    },
    made_in_text: {
        color: '#2E3E4E',
        fontWeight: '600'
    },
    made_in: {
        flexDirection: 'row',
        marginTop: 7
    },
    title_list: {
        color: '#2E3E4E',
        flex: 4,
        textTransform: 'uppercase',
        fontSize: 14,
    },
    see_all: {
        color: '#111D5E',
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