import React, { Component, useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image, Dimensions, ScrollView, FlatList, StatusBar } from "react-native";
import { IMAGE } from '../../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../../constants/string';
import { LIKE } from '../../../constants/images/like';
import { COMMENT } from '../../../constants/images/comment';
import { SHARE } from '../../../constants/images/share';
import { BACK_BLACK } from '../../../constants/images/back_black';
import { Rating, AirbnbRating } from 'react-native-ratings';
import PhotoGrid from 'react-native-thumbnail-grid';
import { COLOR } from '../../../constants/colors';
let deviceWidth = Dimensions.get('window').width;
function ItemComment({ avatar, name, comment }) {
    useEffect(() => {
        console.log('refresh');
    })
    return (
        <View>
            <View style={styles.item_comment_container}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={avatar} style={styles.avatar_comment} />

                    </View>
                    <View style={{ flex: 6, backgroundColor: COLOR.GRAY, borderWidth: 0.5, padding: 14 }}>
                        <Text><Text style={{ fontWeight: 'bold' }}>{name} </Text>{comment}</Text>

                    </View>
                </View>
            </View>

        </View>

    )
}
class FeedDetailScreen extends Component {
    constructor(props) {
        super(props);
        const { id } = this.props.route.params;
        this.state = {
            isLike: false,
            feeId: id,
            image : [
                IMAGE.ANH_DEMO_1,
                'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029_960_720.jpg',
                'https://cdn.pixabay.com/photo/2016/08/12/22/34/apple-1589869_960_720.jpg',
                'https://taybacsensetravel.com/nview/at_diem-danh-nhung-diem-san-anh-dep-tim-lim-mua-lua-chin_c7ed1097335b91ca8cc67122805c1de7.jpg',
                'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029_960_720.jpg',
              
              ],
            title: 'Giảm giá 30% cho Son cao cấp h_e_rmes',
            rate: '4',
            time: '12 giờ trước',
            content: '"Vẻ đẹp đối với tôi nghĩa là sự hài lòng với chính bản thân mình. Hoặc một thỏi son đỏ thật nổi bật.” – Gwyneth Paltrow Đàn ông đam mê những chiếc xe thể thao đắt đỏ, cũng giống như phụ nữa khao khát những thỏi son h_e_rmes',
            avatar: IMAGE.ANH_DEMO_1,
            like: '3',
            postComment: '4',
            user: {
                name: 'Khánh',
                avatar: IMAGE.ANH_DEMO_3
            },
            refesh: false,
            listComment: [
                {
                    avatar: IMAGE.ANH_DEMO_1,
                    name: 'Khanh',
                    comment: 'shop ơi sản phẩm này còn khuyễn mãi không?'
                },
                {
                    avatar: IMAGE.ANH_DEMO_1,
                    name: 'Khanh',
                    comment: 'shop ơi sản phẩm này còn khuyễn mãi không?shop ơi sản phẩm này còn khuyễn mãi không?shop ơi sản phẩm này còn khuyễn mãi không?'
                },
                {
                    avatar: IMAGE.ANH_DEMO_1,
                    name: 'Khanh',
                    comment: 'shop ơi sản phẩm này còn khuyễn mãi không?'
                }

            ],
            comment: '',
        };
    }
    likePost = () => {
        let likeNumber = parseInt(this.state.like);
        this.setState({ like: likeNumber })
        if (this.state.isLike == false) {
            likeNumber = likeNumber + 1;
            this.setState({
                isLike: true,
                like: likeNumber
            })
        } else {
            likeNumber = likeNumber - 1;
            this.setState({
                isLike: false,
                like: likeNumber
            })
        }
    }
    reload = () => {
        this.setState({ refesh: false })
    }
    sendComment = () => {
        let comment = {};
        comment.name = this.state.user.name;
        comment.comment = this.state.comment,
        comment.avatar = this.state.user.avatar;
        this.state.listComment.push(comment);
        this.setState({ refesh: true });
        this.reload();
        this.setState({comment:''})
    }

    render() {
        const { image, title, rate, time, content, postComment, avatar, like, user } = this.state
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
                <View style={styles.header}>
                    <View style={{ flex: 1,  alignItems: 'center', justifyContent: 'center', }} >
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                                <SvgUri svgXmlData={BACK_BLACK} fill={COLOR.WHITE} />
                            </TouchableOpacity>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.title_text}>{STRING.PG_BEAUTY_FEED}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        
                    </View>
                </View>
                <ScrollView>
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
                                        tintColor={COLOR.WHITE}
                                        ratingColor={COLOR.PRIMARY}
                                        style={{ backgroundColor: COLOR.WHITE, marginLeft: 1 }}
                                    />
                                    <Text style={styles.item_timeline}>{time}</Text>
                                </View>

                            </View>
                        </View>
                        <View>
                            <Text style={styles.text_content}>
                                {content}
                            </Text>
                            <PhotoGrid width={deviceWidth - 20} source={this.state.image} ratio={0.5} onPressImage={uri => {console.log(uri)}}  />
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <SvgUri svgXmlData={LIKE} fill={COLOR.PRIMARY} />
                                    <Text style={styles.text_comment}>{like}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                                    <Text style={styles.text_comment}>{STRING.COMMENT_2}</Text>
                                    <Text style={styles.text_comment}>{postComment}</Text>
                                </View>
                            </View>
                            <View style={{ borderTopWidth: 0.5, borderTopColor: COLOR.LINE }} />
                            <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                                {this.state.isLike ? (
                                    <TouchableOpacity onPress={this.likePost} style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginLeft:5 }}>
                                        <SvgUri svgXmlData={LIKE} fill={COLOR.PRIMARY} />
                                        <Text style={{ marginLeft: 7, color: COLOR.PRIMARY }}>{STRING.LIKE}</Text>
                                    </TouchableOpacity>
                                ) : (
                                        <TouchableOpacity onPress={this.likePost} style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginLeft:5 }}>
                                            <SvgUri svgXmlData={LIKE} />
                                            <Text style={{ marginLeft: 7 }}>{STRING.LIKE}</Text>
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
                            <FlatList
                                extraData={this.state.refesh}
                                data={this.state.listComment}
                                renderItem={({ item }) =>
                                    <ItemComment
                                        avatar={item.avatar}
                                        comment={item.comment}
                                        name={item.name} />
                                }
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical:10, height:40 }}>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Image source={user.avatar} style={styles.avatar_comment} />
                                </View>
                                <TextInput 
                                onChangeText={(value) => this.setState({ comment: value })} 
                                style={styles.input} 
                                placeholder={STRING.WRITE_COMMENT} 
                                autoFocus={true}
                                value={this.state.comment}
                                 />
                                <TouchableOpacity onPress={this.sendComment} style={{ flex: 1, alignItems: 'center' }}>
                                    <Text>{STRING.SEND}</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
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
    avatar_comment: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
    },
    item_container: {
        backgroundColor: COLOR.WHITE,
        marginHorizontal:10,
        marginTop:10

    },
    item_comment_container: {
        backgroundColor: COLOR.WHITE,
        marginVertical:5

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
        padding: 2,
        marginLeft:3
    },
    input: {
        borderWidth: 0.5,
        borderRadius: 20,
        flex: 6,
        height: 40,
        fontSize: 12,
        borderColor: COLOR.LINE,
        padding:10
    }

})
export default FeedDetailScreen;