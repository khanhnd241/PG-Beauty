import React, { Component, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, TouchableOpacity, Image, Dimensions, ScrollView, FlatList, StatusBar } from "react-native";
import { IMAGE } from '../../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../../constants/string';
import { BASKET } from '../../../constants/images/basket';
import { LIKE } from '../../../constants/images/like';
import { LIKE_ACTIVE } from '../../../constants/images/like_active';
import { COMMENT } from '../../../constants/images/comment';
import { SHARE } from '../../../constants/images/share';

import { Rating, AirbnbRating } from 'react-native-ratings';
let deviceWidth = Dimensions.get('window').width - 32;
function Item({ image, title, rate, time, content, avatar, like, comment }) {
    const likeNumber = parseInt(like);
    const [count, setCount] = useState(likeNumber);
    const [isLike, setIsLike] = useState(false);
    var likePost = () => {
        
        if(isLike == false) {
            setIsLike(true);
            setCount(count + 1);
        } else {
            setIsLike(false);
            setCount(count - 1)
        }
    }
    return (
        <View>
            <View style={styles.item_container}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={avatar} style={styles.avatar} />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.item_title}>{title}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                            <Rating
                                readonly
                                type='custom'
                                startingValue={rate}
                                ratingCount={5}
                                imageSize={15}
                                tintColor='white'
                                ratingColor='#BE1E2D'
                                style={{ backgroundColor: 'white', marginLeft: 1 }}
                            />
                            <Text style={styles.item_timeline}>{time}</Text>
                        </View>

                    </View>
                </View>
                <View>
                    <Text style={styles.text_content}>
                        {content}
                    </Text>
                    <Image style={{ width: deviceWidth, height: 400 }} source={image} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <SvgUri svgXmlData={LIKE_ACTIVE} />
                            <Text style={styles.text_comment}>{count}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={styles.text_comment}>{STRING.COMMENT_2}</Text>
                            <Text style={styles.text_comment}>{comment}</Text>
                        </View>
                    </View>
                    <View style={{ borderTopWidth: 0.5, borderTopColor: '#E0E0E0' }} />
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                        {isLike ? (
                            <TouchableOpacity onPress={likePost} style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
                                <SvgUri svgXmlData={LIKE_ACTIVE} />
                                <Text style={{ marginLeft: 8, color:'#BE1E2D' }}>{STRING.LIKE}</Text>
                            </TouchableOpacity>
                        ) : (
                                <TouchableOpacity onPress={likePost} style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
                                    <SvgUri svgXmlData={LIKE} />
                                    <Text style={{ marginLeft: 8 }}>{STRING.LIKE}</Text>
                                </TouchableOpacity>
                            )}

                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                            <SvgUri svgXmlData={COMMENT} />
                            <Text style={{ marginLeft: 8 }}>{STRING.COMMENT_1}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', flexDirection: 'row-reverse' }}>
                            <Text style={{ marginLeft: 8 }}>{STRING.SHARE}</Text>
                            <SvgUri svgXmlData={SHARE} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ height: 8, backgroundColor: '#F2F2F2' }} />

        </View>

    )
}
class FeedScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likePost: true,
            isLike: false,
            listPostLike: [
                {
                    image: IMAGE.ANH_DEMO_3,
                    title: 'Giảm giá 30% cho Son cao cấp h_e_rmes',
                    rate: '4',
                    time: '12 giờ trước',
                    content: '"Vẻ đẹp đối với tôi nghĩa là sự hài lòng với chính bản thân mình. Hoặc một thỏi son đỏ thật nổi bật.” – Gwyneth Paltrow Đàn ông đam mê những chiếc xe thể thao đắt đỏ, cũng giống như phụ nữa khao khát những thỏi son h_e_rmes',
                    avatar: IMAGE.ANH_DEMO_1,
                    like: '3',
                    comment: '4'
                },
                {
                    image: IMAGE.ANH_DEMO_3,
                    title: 'Giảm giá 30% cho Son cao cấp h_e_rmes',
                    rate: '4',
                    time: '12 giờ trước',
                    content: '"Vẻ đẹp đối với tôi nghĩa là sự hài lòng với chính bản thân mình. Hoặc một thỏi son đỏ thật nổi bật.” – Gwyneth Paltrow Đàn ông đam mê những chiếc xe thể thao đắt đỏ, cũng giống như phụ nữa khao khát những thỏi son h_e_rmes',
                    avatar: IMAGE.ANH_DEMO_1,
                    like: '3',
                    comment: '4'
                }
            ]

        };
    }
    openPostLike = () => {
        this.setState({ likePost: true })
    }
    openPostReview = () => {
        this.setState({ likePost: false })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor='#BE1E2D' />
                <View style={styles.header}>
                    <View style={{ flex: 1 }} />
                    <View style={styles.title}>
                        <Text style={styles.title_text}>{STRING.PG_BEAUTY_FEED}</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <SvgUri svgXmlData={BASKET} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 8, paddingBottom: 8 }}>
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
                <ScrollView style={styles.content}>
                    <FlatList
                        data={this.state.listPostLike}
                        renderItem={({ item }) =>
                            <Item
                                image={item.image}
                                avatar={item.avatar}
                                title={item.title}
                                rate={item.rate}
                                time={item.time}
                                content={item.content}
                                like={item.like}
                                comment={item.comment} >
                            </Item>
                        }
                    />

                </ScrollView>

            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#BE1E2D',
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
        color: '#FFFFFF'
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
        color: '#BE1E2D',
        fontSize: 12,
        textAlign: 'center'
    },
    text: {
        color: '#42515F',
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
        backgroundColor: '#FFFFFF',
        paddingTop: 8,
        paddingLeft: 17,
        paddingRight: 17

    },
    text_content: {
        color: '#42515F',
        fontSize: 13
    },
    item_title: {
        color: '#000000',
        fontSize: 14,
        fontWeight: 'normal'
    },
    item_timeline: {
        marginLeft: 5,
        color: '#6C7783',
        fontSize: 12
    },
    text_comment: {
        color: '#6C7783',
        fontSize: 12,
        padding: 2
    }

})
export default FeedScreen;