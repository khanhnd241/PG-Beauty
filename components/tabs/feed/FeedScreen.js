import React, { Component, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, TouchableOpacity, Image, Dimensions, ScrollView, FlatList, StatusBar, ActivityIndicator, AsyncStorage } from "react-native";
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
import { API } from '../../../constants/api';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
} from 'react-native-popup-dialog';
import ImageView from 'react-native-image-view';
import axios from 'axios';
import ItemFeed from './ItemFeed'
let deviceWidth = Dimensions.get('window').width;

class FeedScreen extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        navigation.addListener('focus', async () => {
            this.setState(this.loadOrder());
        })
        this.state = {
            likePost: true,
            isLike: false,
            listPostLike: [],
            listPostComment: [],
            basketNumber: '4',
            pageLike: 1,
            pageComment: 1,
            isLoading: false,
            isHave: false,
            listUserOrder: [],
            isLoadingList: false,
            endLikePost: false,
            endCommentPost: false
        };
    }
    openPostLike = () => {
        console.log(this.state.likePost);
        this.setState({ likePost: true })
    }
    openPostReview = () => {
        console.log(this.state.likePost);
        this.setState({ likePost: false })
    }
    componentDidMount = () => {
        this.setState({ isLoading: true }, () => {
            this.loadPostComment();
            this.loadPostLike();
            this.loadOrder();
        })
    }
    loadPostComment = () => {
        axios.get(API.URL + API.NEWS, {
            params: {
                order_by: 'comment_cnt',
                page: this.state.pageComment,
                orientation: 'DESC'
            }
        }).then(response => {
            if (response.data.success.data.length == 0) {
                this.setState({ endCommentPost: true })
            }
            this.setState({
                listPostComment: this.state.listPostComment.concat(response.data.success.data),
                isLoading: false,
                isLoadingList: false
            });
        }).catch(error => {
            // console.log(JSON.stringify(error.response.data.error));
            this.setState({
                isLoading: false,
                isLoadingList: false
            });
        })
    }
    loadPostLike = () => {
        console.log('load post like' + this.state.pageLike)
        axios.get(API.URL + API.NEWS, {
            params: {
                order_by: 'like',
                page: this.state.pageLike,
                orientation: 'DESC'
            }
        }).then(response => {
            if (response.data.success.data.length == 0) {
                this.setState({ endLikePost: true })
            }
            this.setState({
                listPostLike: this.state.listPostLike.concat(response.data.success.data),
                isLoading: false,
                isLoadingList: false
            });
        }).catch(error => {
            // console.log(JSON.stringify(error.response.data.error));
            this.setState({
                isLoading: false,
                isLoadingList: false
            });
        })
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
    loadMoreLike = () => {
        if (this.state.endLikePost == false) {
            let page = this.state.pageLike + 1
            console.log('goi api lan nua' + page)
            this.setState({
                pageLike: page,
                isLoadingList: true
            }, this.loadPostLike);
        }

    }
    loadMoreComment = () => {
        if (this.state.endCommentPost == false) {
            let page = this.state.pageComment + 1
            console.log('goi api lan nua')
            this.setState({
                pageComment: page,
                isLoadingList: true
            }, this.loadPostComment);
        }

    }
    handleFooter = () => {
        // console.log('footer day');
        return (
            this.state.isLoadingList ?
                <View style={styles.loader}>
                    <ActivityIndicator color={COLOR.PRIMARY} size='large' />
                </View> :
                null
        )
    }
    render() {
        return (
            <SafeAreaView style={styles.screen}>
                <StatusBar barStyle='light-content' backgroundColor={COLOR.PRIMARY} />
                <View style={styles.background}>
                    <View style={styles.header}>
                        <View style={{ flex: 1 }} />
                        <View style={styles.title}>
                            <Text style={styles.title_text}>{STRING.PG_BEAUTY_FEED}</Text>
                        </View>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('CartDetailScreen') }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 50 }}>
                            <View>
                                <SvgUri svgXmlData={BASKET} />
                                {this.state.isHave ? (
                                    <View style={styles.basket_number}>
                                        <Text style={{ color: COLOR.PRIMARY, fontSize: 11 }}>{this.state.listUserOrder.length}</Text>
                                    </View>
                                ) : null}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row',paddingTop:8, paddingBottom: 8, backgroundColor:COLOR.GRAY }}>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={this.openPostLike}>
                            {this.state.likePost ? (
                                <ImageBackground source={IMAGE.TAB_ACTIVE_BG} style={styles.tab_active}>
                                    <Text style={styles.text_active}>{STRING.POSTS_LIKE}</Text>

                                </ImageBackground>
                            ) : (
                                    <ImageBackground source={IMAGE.TAB_BG} style={styles.tab}>
                                        <Text style={styles.text}>{STRING.POSTS_LIKE}</Text>
                                    </ImageBackground>
                                )}

                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={this.openPostReview}>
                            {this.state.likePost ? (
                                <ImageBackground source={IMAGE.TAB_BG} style={styles.tab}>
                                    <Text style={styles.text}>{STRING.POSTS_REVIEW}</Text>
                                </ImageBackground>
                            ) : (
                                    <ImageBackground source={IMAGE.TAB_ACTIVE_BG} style={styles.tab_active}>
                                        <Text style={styles.text_active}>{STRING.POSTS_REVIEW}</Text>
                                    </ImageBackground>
                                )}
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} />
                    </View>
                    {this.state.isLoading ? (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size='large' color={COLOR.PRIMARY} />
                        </View>
                    ) : (
                            <View style={styles.content}>
                                {this.state.likePost ? (
                                    <FlatList
                                        style={{ marginBottom: 130 }}
                                        data={this.state.listPostLike}
                                        renderItem={({ item }) =>
                                            <ItemFeed
                                                navigation={this.props.navigation}
                                                id={item.id}
                                                photo={item.photo}
                                                title={item.title}
                                                createdAt={item.created_at}
                                                content={item.content}
                                                likeCount={item.like}
                                                commentsCount={item.comment_cnt} />
                                        }
                                        onEndReached={this.loadMoreLike}
                                        onEndReachedThreshold={0.1}
                                        ListFooterComponent={this.handleFooter}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                ) : (
                                        <View>
                                            <FlatList
                                                style={{ marginBottom: 130 }}
                                                data={this.state.listPostComment}
                                                renderItem={({ item }) =>
                                                    <ItemFeed
                                                        navigation={this.props.navigation}
                                                        id={item.id}
                                                        photo={item.photo}
                                                        title={item.title}
                                                        createdAt={item.created_at}
                                                        content={item.content}
                                                        likeCount={item.like}
                                                        commentsCount={item.comment_cnt} />
                                                }
                                                onEndReached={this.loadMoreComment}
                                                onEndReachedThreshold={0.5}
                                                ListFooterComponent={this.handleFooter}
                                                keyExtractor={(item, index) => index.toString()}
                                            />
                                        </View>

                                    )}
                            </View>
                        )}

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
        height: 46,
        flexDirection: 'row'
    },
    title: {
        flex: 7,
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
        textAlign: 'center',
        fontFamily: STRING.FONT_NORMAL
    },
    text: {
        color: COLOR.DESCRIPTION,
        fontSize: 12,
        textAlign: 'center',
        fontFamily: STRING.FONT_NORMAL
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
        paddingLeft: 10,
        paddingRight: 10

    },
    text_content: {
        color: COLOR.DESCRIPTION,
        fontSize: 13
    },
    item_title: {
        color: COLOR.BLACK,
        fontSize: 14,
        fontWeight: 'normal'
    },
    item_timeline: {
        marginLeft: 5,
        color: COLOR.PLACEHODER,
        fontSize: 12
    },
    text_comment: {
        color: COLOR.PLACEHODER,
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
    loader: {
        alignSelf: 'center',
    }

})
export default FeedScreen;