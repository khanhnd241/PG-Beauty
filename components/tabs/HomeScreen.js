import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, FlatList, ImageBackground, ScrollView, Dimensions } from "react-native";
import { IMAGE } from '../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../constants/string';
import { SliderBox } from "react-native-image-slider-box";
let deviceWidth = Dimensions.get('window').width - 10;
function Item({ image, name, price, point, review, sell, sale }) {
    return (
        <View style={styles.container_items}>
            <View style={{ flex: 1 }}>
                <ImageBackground source={image} style={{ width: 160, height: 111, marginLeft: 12, marginTop: 7 }}>
                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <SvgUri source={IMAGE.ICON_RECTANGLE} />
                        <Text style={{ color: 'white', position: 'absolute', top: 5, left: 5, fontSize: 9 }}>{sale}</Text>
                    </View>
                </ImageBackground>
                <View style={{ marginLeft: 16 }} >
                    <Text style={{ color: '#42515F', fontSize: 14, height: 71 }}>{name}</Text>
                    <Text style={{ color: '#2E3E4E', fontWeight: '600', fontSize: 16 }}>{price}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <SvgUri source={IMAGE.ICON_STAR} />
                        <Text style={{ color: '#BE1E2D', fontSize: 11, marginLeft: 3 }}>{point}</Text>
                        <Text style={{ color: '#6C7783', fontSize: 11, marginLeft: 2 }}>({review} review)</Text>
                        <Text style={{ color: '#6C7783', fontSize: 11, marginLeft: 8, flex: 1 }} numberOfLines={1}>Đã bán {sell}</Text>
                    </View>
                </View>
            </View>


        </View>

    );
}
function ItemNewProduct({ image, name, price, point, review, sell, sale }) {
    return (
        <View style={styles.items_new_product}>
            <View style={{ flex: 1 }}>
                <ImageBackground source={image} style={{ width: 164, height: 110, marginLeft: 12, marginTop: 7 }}>
                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <SvgUri source={IMAGE.ICON_RECTANGLE} />
                        <Text style={{ color: 'white', position: 'absolute', top: 5, left: 5, fontSize: 9 }}>{sale}</Text>
                    </View>
                </ImageBackground>
                <View style={{ marginLeft: 16 }} >
                    <Text style={{ color: '#42515F', fontSize: 14, height: 71 }}>{name}</Text>
                    <Text style={{ color: '#2E3E4E', fontWeight: '600', fontSize: 16 }}>{price}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <SvgUri source={IMAGE.ICON_STAR} />
                        <Text style={{ color: '#BE1E2D', fontSize: 11, marginLeft: 3 }}>{point}</Text>
                        <Text style={{ color: '#6C7783', fontSize: 11, marginLeft: 2 }}>({review} review)</Text>
                        <Text style={{ color: '#6C7783', fontSize: 11, marginLeft: 8, flex: 1 }} numberOfLines={1}>Đã bán {sell}</Text>
                    </View>
                </View>
            </View>


        </View>

    );
}
class HomeScreen extends Component {
    constructor(props) {
        super(props);
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
            ]
        };
    }
    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.header}>
                        <View style={styles.inputHeader}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <SvgUri source={IMAGE.ICON_SEARCH} />
                            </View>
                            <TextInput placeholder={STRING.SEARCH_INPUT} placeholderTextColor='#6C7783' style={{ flex: 5, fontSize:15 }}></TextInput>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                                <SvgUri source={IMAGE.ICON_SCAN} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                            <SvgUri source={IMAGE.ICON_BASKET} />
                        </TouchableOpacity>
                    </View>
                    {/* banner và tool */}
                    <View>
                        <SliderBox
                            images={this.state.images}
                        />
                        <View style={styles.tools}>
                            <TouchableOpacity style={styles.icon_tool}>
                                <SvgUri source={IMAGE.ICON_PG_BEAUTY} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.icon_tool}>
                                <SvgUri source={IMAGE.ICON_PG_TOOL} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.icon_tool}>
                                <SvgUri source={IMAGE.ICON_PG_FASHION} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: '#F2F2F2', height: 5 }} />
                    </View>
                    {/* Deal đang diễn ra */}
                    <View style={styles.background}>
                        <View style={styles.flex_direction_row}>
                            <Text style={styles.title_list}>{STRING.DEAL_NOW}</Text>
                            <TouchableOpacity>
                                <Text style={styles.see_all}>{STRING.SEE_ALL}</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            horizontal={true}
                            data={this.state.listDeal}
                            renderItem={({ item }) =>
                                <TouchableOpacity>
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
                    <View style={{backgroundColor:'#F2F2F2', width:8}} />
                    {/* Sản phẩm bán chạy */}
                    <View style={styles.background}>
                        <View style={styles.flex_direction_row}>
                            <Text style={styles.title_list}>{STRING.SELLING_PRODUCT}</Text>
                            <TouchableOpacity>
                                <Text style={styles.see_all}>{STRING.SEE_ALL}</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            horizontal={true}
                            data={this.state.listSellingProduct}
                            renderItem={({ item }) =>
                                <TouchableOpacity>
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
                    <View style={{backgroundColor:'#F2F2F2', width:8}} />
                    {/* Sản phẩm mới */}
                    <View style={styles.background}>
                        <View style={styles.flex_direction_row}>
                            <Text style={styles.title_list}>{STRING.NEW_PRODUCT}</Text>
                            
                        </View>
                        <FlatList
                            numColumns={2}
                            data={this.state.listDeal}
                            renderItem={({ item }) =>
                                <TouchableOpacity>
                                    <ItemNewProduct image={item.image}
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
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    background: {
        backgroundColor: '#FFFFFF'
    },
    header: {
        backgroundColor: '#BE1E2D',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputHeader: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 30,
        width: 310,
        height: 40,
        marginBottom: 5,
        marginRight: 20,
        alignItems: 'center',
        marginTop: 10
    },
    tools: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
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
        color: '#2E3E4E',
        flex: 4,
        textTransform: 'uppercase',
        fontSize: 14,
        margin: 10,
        marginBottom:16
    },
    see_all: {
        color: '#111D5E',
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
        width:deviceWidth/2,
        height:255,
         flex: 1,
         margin:3
    
    }


})
export default HomeScreen;