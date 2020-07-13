import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { IMAGE } from '../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../constants/string';
import {BASKET} from '../../constants/images/basket'
import { Rating, AirbnbRating } from 'react-native-elements';
const STAR = require('../../images/star.png')
function Item({ image, title, rate, time, content, avatar, like, comment }) {
    return (
        <View style={{ backgroundColor: 'red' }}>
            <Rating
                ratingImage={STAR}
                imageSize={20}
                readonly
                startingValue={3.3}
                ratingColor='red'
            />
        </View>
    )

}
class FeedScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLike: true
        };
    }
    openPostLike = () => {
        this.setState({ isLike: true })
    }
    openPostReview = () => {
        this.setState({ isLike: false })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={{ flex: 1 }} />
                    <View style={styles.title}>
                        <Text style={styles.title_text}>{STRING.PG_BEAUTY_FEED}</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <SvgUri svgXmlData={BASKET} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={this.openPostLike}>
                        {this.state.isLike ? (
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
                        {this.state.isLike ? (
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
                <View style={styles.content}>
                    {/* <Item /> */}

                </View>

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
    }
})
export default FeedScreen;