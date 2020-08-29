import React, { Component, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, TouchableOpacity, Image, Dimensions, ScrollView, FlatList, StatusBar, AsyncStorage, Alert } from "react-native";
import { IMAGE } from '../../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../../constants/string';
import { BASKET } from '../../../constants/images/basket';
import { LIKE } from '../../../constants/images/like';
import { LIKE_ACTIVE } from '../../../constants/images/like_active';
import { COMMENT } from '../../../constants/images/comment';
import { SHARE } from '../../../constants/images/share';
import { Rating, AirbnbRating } from 'react-native-ratings';
import PhotoGrid from 'react-native-thumbnail-grid';
import { COLOR } from '../../../constants/colors';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
} from 'react-native-popup-dialog';
import ImageView from 'react-native-image-view';
import axios from 'axios';
let deviceWidth = Dimensions.get('window').width;
import moment from 'moment';
import HTMLView from 'react-native-htmlview';
import { API } from '../../../constants/api';
class ItemFeed extends Component {
    constructor(props) {
        super(props);
        const { id, photo, title, createdAt, content, likeCount, commentsCount, navigation } = this.props;
        this.state = {
            navigation: navigation,
            id: id,
            photo: photo,
            title: title,
            likeCount: likeCount,
            commentsCount: commentsCount,
            content: content,
            createdAt: '',
            likeCount: likeCount,
            isLike: false,
            isViewImage: false,
            rate: '',
            token:''
        };
    }
    genRand(min, max, decimalPlaces) {
        var Rand = Math.random() * (max - min) + min;
        var power = Math.pow(10, decimalPlaces);
        return Math.floor(Rand * power) / power;
    }
    componentDidMount = () => {
        AsyncStorage.getItem('token', (err, token) => {
            this.setState({token:token})
        })
        this.setState({ rate: this.genRand(4.5, 5, 1), createdAt: this.props.createdAt }, () => {
            this.formatDate();
        })
    }
    formatDate = () => {
        let today = new Date();
        let createdAt = moment(this.state.createdAt).format('YYYY-MM-DD');
        let subDate = Date.parse(today) - Date.parse(createdAt);
        if (subDate < 60000) {
            return STRING.FEW_SECOND_AGO
        }
        if (60000 < subDate && subDate < 3600000) {
            let minutes = Math.floor(subDate / 60000);
            return minutes + STRING.MINUTES_AGO
        }
        if (3600000 < subDate && subDate < 86400000) {
            let hours = Math.floor(subDate / 3600000);
            return hours + STRING.HOURS_AGO;
        }
        if (subDate > 86400000) {
            let createdAt = moment(this.state.createdAt).format('DD-MM-YYYY');
            return createdAt
        }
    }
    likePost = () => {
        console.log('id bai biet' + this.state.id)
            if (this.state.token == null || this.state.token == '') {
                Alert.alert(STRING.NOTIFI, STRING.MUST_LOGIN_TO_LIKE_AND_COMMENT)
            } else {
                if (this.state.isLike == false) {
                    let data = {}
                    this.setState({ isLike: true, likeCount: this.state.likeCount + 1 }, () => {
                        const config = {
                            headers: {
                                Authorization: `Bearer ${this.state.token}`
                            }
                        };
                        axios.post(API.URL + API.LIKE + this.state.id, data, config).then(response => {
                            console.log(response.data);
                            Alert.alert(STRING.NOTIFI, JSON.stringify(response.data.success), [{ text: STRING.ACCEPT }]);
                        }).catch(error => {
                            Alert.alert(STRING.ERROR, JSON.stringify(error.response.data.error), [{ text: STRING.ACCEPT }]);
                            console.log(JSON.stringify(error.response));
                        });
                    })
                } else {
                    setIsLike(false);
                    this.setState({ likeCount: this.state.likeCount - 1 })
                }
            }

    }
    navigateToDetail = () => {
        if (this.state.token == null || this.state.token == '') {
            Alert.alert(STRING.NOTIFI, STRING.MUST_LOGIN_TO_LIKE_AND_COMMENT)
        } else {
            this.state.navigation.navigate('FeedDetailScreen', { id: this.state.id, likeCount: this.state.likeCount, commentsCount: this.state.commentsCount, rate: this.state.rate })
        }

    }
    render() {
        const { id, photo, title, createdAt, content, likeCount, commentsCount, rate } = this.state;
        return (
            <View>
                <View style={styles.item_container}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Image source={IMAGE.ICON_APP} style={styles.avatar} />
                        </View>
                        <View style={{ flexDirection: 'column', flex: 4 }}>
                            <Text style={styles.item_title}>{title}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                                <Rating
                                    readonly
                                    type='custom'
                                    startingValue={rate}
                                    ratingCount={5}
                                    imageSize={15}
                                    tintColor={COLOR.WHITE}
                                    ratingColor={COLOR.PRIMARY}
                                    style={{ backgroundColor: COLOR.WHITE }}
                                />
                                <Text style={styles.item_timeline}>{this.formatDate()}</Text>
                            </View>

                        </View>
                    </View>
                    <View>
                        <Text style={styles.text_content}>
                            {content}
                        </Text>
                        {/* content la file html */}
                        {/* <HTMLView
                            value={content}
                        /> */}
                        {/* <Image style={{ width: deviceWidth, height: 400 }} source={image} /> */}
                        <Image style={{ width: deviceWidth - 20, height: 400 }} source={{ uri: photo }} resizeMode='contain' />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <SvgUri svgXmlData={LIKE_ACTIVE} />
                                <Text style={styles.text_comment}>{likeCount}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                                <Text style={styles.text_comment}>{STRING.COMMENT_2}</Text>
                                <Text style={styles.text_comment}>{commentsCount}</Text>
                            </View>
                        </View>
                        <View style={{ borderTopWidth: 0.5, borderTopColor: COLOR.LINE }} />
                        <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                            {this.state.isLike ? (
                                <TouchableOpacity onPress={this.likePost} style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                    <SvgUri svgXmlData={LIKE} fill={COLOR.PRIMARY} />
                                    <Text style={{ marginLeft: 8, color: COLOR.PRIMARY, fontFamily: STRING.FONT_NORMAL }}>{STRING.LIKE}</Text>
                                </TouchableOpacity>
                            ) : (
                                    <TouchableOpacity onPress={this.likePost} style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                        <SvgUri svgXmlData={LIKE} />
                                        <Text style={{ marginLeft: 8, fontFamily: STRING.FONT_NORMAL }}>{STRING.LIKE}</Text>
                                    </TouchableOpacity>
                                )}

                            <TouchableOpacity onPress={this.navigateToDetail} style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }} >
                                <SvgUri svgXmlData={COMMENT} />
                                <Text style={{ marginLeft: 8, fontFamily: STRING.FONT_NORMAL }}>{STRING.COMMENT_1}</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={{ flex: 1, alignItems: 'center', flexDirection: 'row-reverse' }}>
                            <Text style={{ marginLeft: 8 }}>{STRING.SHARE}</Text>
                            <SvgUri svgXmlData={SHARE} />
                        </TouchableOpacity> */}
                        </View>
                    </View>
                </View>
                <View style={{ height: 8, backgroundColor: COLOR.GRAY }} />
                {/* <ImageView
                images={photo}
                imageIndex={0}
                isVisible={this.state.isViewImage}
                renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
            /> */}
            </View>

        );
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: COLOR.PRIMARY,
        height: 46,
        flexDirection: 'row'
    },
    title: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {

    },
    title_text: {
        fontSize: 16,
        color: COLOR.WHITE
    },
    tab_active: {
        width: 95,
        height: 62,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tab: {
        width: 101,
        height: 58,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text_active: {
        color: COLOR.PRIMARY,
        fontSize: 12,
        textAlign: 'center'
    },
    text: {
        color: COLOR.DESCRIPTION,
        fontSize: 12,
        textAlign: 'center'
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 13
    },
    item_container: {
        backgroundColor: COLOR.WHITE,
        paddingTop: 8,
        paddingLeft: 15,
        paddingRight: 20

    },
    text_content: {
        color: COLOR.DESCRIPTION,
        fontSize: 13,
        fontFamily: STRING.FONT_NORMAL,
        lineHeight: 20
    },
    item_title: {
        color: COLOR.TEXTBODY,
        fontSize: 14,
        fontFamily: STRING.FONT_BOLD
    },
    item_timeline: {
        marginLeft: 5,
        color: COLOR.PLACEHODER,
        fontSize: 12
    },
    text_comment: {
        color: COLOR.PLACEHODER,
        fontFamily: STRING.FONT_NORMAL,
        fontSize: 12,
        padding: 2
    },
    basket: {
        position: 'absolute',
        top: 10,
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

})
export default ItemFeed;