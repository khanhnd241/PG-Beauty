
import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, FlatList, ImageBackground, ScrollView, Dimensions, StatusBar, ActivityIndicator } from "react-native";
import { IMAGE } from '../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../constants/string';
import { COLOR } from '../../constants/colors'
import { RECTANGLE } from '../../constants/images/rectangle'
import { STAR } from '../../constants/images/star'
let deviceWidth = Dimensions.get('window').width - 10;
const height = Dimensions.get('window').height;
class ItemRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPrice: null
        };
    }

    format(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    genRand(min, max, decimalPlaces) {
        var Rand = Math.random() * (max - min) + min;
        var power = Math.pow(10, decimalPlaces);
        return Math.floor(Rand * power) / power;
    }
    componentDidMount = () => {
        this.setState({ point: this.genRand(4.5, 5, 1) });
        this.getPrice();
    }
    getPrice = () => {
        let newPrice = this.props.price * (100 - this.props.sale) / 100;
        this.setState({ newPrice: newPrice })
    }
    render() {
        const { image, name, price, point, views, sell, sale } = this.props
        const imageUri = image != null ? image : ""
        return (
            <View style={styles.container_items}>
                <View style={{ flex: 1 }}>
                    <ImageBackground source={imageUri.length != 0 ? { uri: imageUri } : IMAGE.NO_IMAGE} style={{ height: 111, marginTop: 7 }}>
                        {sale !== 0 ? (
                            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <SvgUri svgXmlData={RECTANGLE} />
                                <Text style={{ color: 'white', position: 'absolute', top: 5, left: 5, fontSize: 9, fontFamily: STRING.FONT_NORMAL }}>{sale}</Text>
                            </View>
                        ) : null}

                    </ImageBackground>
                    <View>
                        <Text style={{ color: COLOR.DESCRIPTION, fontSize: 14, height: 71, fontFamily: STRING.FONT_NORMAL }}>{name}</Text>
                        <Text style={{ color: COLOR.TEXTBODY, fontWeight: '600', fontSize: 16, fontFamily: STRING.FONT_SEMI_BOLD }}>{this.format(parseInt(this.state.newPrice))} {STRING.CURRENCY}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <SvgUri svgXmlData={STAR} />
                            <Text style={{ color: COLOR.PRIMARY, fontSize: 11, marginLeft: 3, fontFamily: STRING.FONT_NORMAL }}>{this.state.point}</Text>
                            <Text style={{ color: COLOR.PLACEHODER, fontSize: 11, marginLeft: 8, flex: 1, fontFamily: STRING.FONT_NORMAL, textAlign: 'right' }} numberOfLines={1}>{STRING.VIEWS} {views}</Text>
                        </View>
                    </View>
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
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
        width: 170,
        marginLeft: 10
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
export default ItemRow;