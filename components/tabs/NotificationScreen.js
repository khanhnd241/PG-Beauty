import React, { Component, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, Image, StatusBar } from 'react-native';
import { IMAGE } from '../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../constants/string';
import { GIFT_ORANGE } from '../../constants/images/gift_orange';
import { GIFT_BLUE } from '../../constants/images/gift_blue';
import { FOR_YOU } from '../../constants/images/for_you';
import { COLOR } from '../../constants/colors';
function ItemPromotion({ title, content, timeLine, index }) {
    const [even, setEven] = useState(true);
    useEffect(() => {
        if (index % 2 == 0) {
            setEven(true)
        } else {
            setEven(false)
        }
    })
    return (
        <View>
            <View style={{ marginHorizontal: 17 }}>
                {even ? (
                    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                        <SvgUri svgXmlData={GIFT_ORANGE} />
                        <Text style={styles.item_title}>{title}</Text>
                    </View>

                ) : (
                        <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                            <SvgUri svgXmlData={GIFT_BLUE} />
                            <Text style={styles.item_title}>{title}</Text>
                        </View>
                    )}
                <Text style={styles.item_content}>{content}</Text>
                <Text style={styles.item_timeline}>{timeLine}</Text>
            </View>
            <View style={{ borderTopWidth: 0.5, borderColor:COLOR.LINE, marginBottom:5 }} />
        </View>
    )
}
function ItemForYou({ title, content, timeLine }) {

    return (
        <View>
            <View style={{ marginHorizontal: 17 }}>
                <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                    <SvgUri svgXmlData={FOR_YOU} />
                    <Text style={styles.item_title}>{title}</Text>
                </View>
                <Text style={styles.item_content}>{content}</Text>
                <Text style={styles.item_timeline}>{timeLine}</Text>
            </View>
            <View style={{ borderTopWidth: 0.5, borderColor:COLOR.LINE, marginBottom:5 }} />
        </View>
    )
}
class NotificationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promotionBG: COLOR.GRAY,
            promotionText: COLOR.PRIMARY,
            forYouBG: COLOR.WHITE,
            forYouText: COLOR.TEXTBODY,
            promotion: true,
            noNotiPromotion: false,
            noNotiForYou: false,
            listPromotion: [
                {
                    title: 'Khuyến mãi tháng hè',
                    content: 'Tặng áo phông cute khi mua siêu phẩm kem lót CHANEL ( >2400k)',
                    timeLine: '1 ngày trước'
                },
                {
                    title: 'Giảm giá toàn bộ sản phẩm 50%',
                    content: 'Tặng áo phông cute khi mua siêu phẩm kem lót CHANEL ( >2400k)',
                    timeLine: '1 ngày trước'
                },
                {
                    title: 'Khuyến mãi tháng hè',
                    content: 'Tặng áo phông cute khi mua siêu phẩm kem lót CHANEL ( >2400k)',
                    timeLine: '1 ngày trước'
                }

            ],
            listForYou: [
                {
                    title: 'Xác nhận đơn hàng',
                    content: 'Cảm ơn bạn đã tin tưởng và đặt hàng tại PG Beauty. Chúng tôi sẽ giao hàng trước ngày 20-07-2020',
                    timeLine: '1 ngày trước'
                },
                {
                    title: 'Giảm giá toàn bộ sản phẩm 50%',
                    content: 'Tặng áo phông cute khi mua siêu phẩm kem lót CHANEL ( >2400k)',
                    timeLine: '1 ngày trước'
                },
                {
                    title: 'Khuyến mãi tháng hè',
                    content: 'Tặng áo phông cute khi mua siêu phẩm kem lót CHANEL ( >2400k)',
                    timeLine: '1 ngày trước'
                }

            ]
        };
    }
    openPromotion = () => {
        this.setState({
            promotionBG: COLOR.GRAY,
            promotionText: COLOR.PRIMARY,
            forYouBG: COLOR.WHITE,
            forYouText: COLOR.TEXTBODY,
            promotion: true
        });
        if (this.state.listPromotion.length == 0) {
            this.setState({
                noNotiPromotion: true
            })
        }
    }
    openForYou = () => {
        this.setState({
            promotionBG: COLOR.WHITE,
            forYouBG: COLOR.GRAY,
            promotionText: COLOR.TEXTBODY,
            forYouText: COLOR.PRIMARY,
            promotion: false
        });
        if (this.state.listForYou.length == 0) {
            this.setState({
                noNotiForYou: true
            })
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
                <StatusBar backgroundColor={COLOR.PRIMARY} />
                <View style={styles.header}>
                    <Text style={styles.title_text}>{STRING.NOTIFICATION}</Text>
                </View>
                <View style={styles.option}>
                    <TouchableOpacity onPress={this.openPromotion} style={[styles.tab, { backgroundColor: this.state.promotionBG }]}>
                        <Text style={{ fontSize: 14, color: this.state.promotionText }}>{STRING.PROMOTION}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.openForYou} style={[styles.tab, { backgroundColor: this.state.forYouBG }]}>
                        <Text style={{ fontSize: 14, color: this.state.forYouText }}>{STRING.FOR_YOU}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {this.state.promotion ? (
                        <View>
                            {this.state.noNotiPromotion ? (
                                <View style={styles.no_noti}>
                                    <Image source={IMAGE.NO_NOTI} />
                                    <Text style={styles.text_no_noti}>{STRING.NO_NOTI}</Text>
                                </View>
                            ) : (
                                    <FlatList
                                        data={this.state.listPromotion}
                                        renderItem={({ item, index }) =>
                                            <ItemPromotion
                                                title={item.title}
                                                timeLine={item.timeLine}
                                                content={item.content}
                                                index={index}
                                            />
                                        }
                                    />
                                )}
                        </View>

                    ) : (
                            <View>
                                {this.state.noNotiForYou ? (
                                    <View style={styles.no_noti}>
                                        <Image source={IMAGE.NO_NOTI} />
                                        <Text style={styles.text_no_noti}>{STRING.NO_NOTI}</Text>
                                    </View>
                                ) : (
                                        <FlatList
                                            data={this.state.listForYou}
                                            renderItem={({ item, index }) =>
                                                <ItemForYou
                                                    title={item.title}
                                                    timeLine={item.timeLine}
                                                    content={item.content}
                                                    index={index}
                                                />
                                            }
                                        />
                                    )}
                            </View>

                        )}

                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: COLOR.PRIMARY,
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {

    },
    content: {

    },
    title_text: {
        fontSize: 16,
        color: COLOR.WHITE
    },
    option: {
        flexDirection: 'row',
        margin: 16,
        borderWidth: 0.5,
        borderColor: COLOR.LINE
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6
    },
    text: {
        color: COLOR.DESCRIPTION,
        fontSize: 12,
        textAlign: 'center'
    },
    text_no_noti: {
       marginTop:24,
       fontSize:13,
       color:COLOR.DESCRIPTION
    },
    item_container: {
        backgroundColor: COLOR.WHITE,
        paddingTop: 8,
        paddingLeft: 17,
        paddingRight: 17

    },
    item_content: {
        color: COLOR.DESCRIPTION,
        fontSize: 13
    },
    item_title: {
        color: COLOR.TEXTBODY,
        fontSize: 14,
        marginLeft: 8,
        fontWeight: 'bold'
    },
    item_timeline: {
        color: COLOR.PLACEHODER,
        fontSize: 12,
        marginVertical: 5
    },
    no_noti:{ 
        marginTop: 60, 
        alignItems: 'center' 
    }

})
export default NotificationScreen;