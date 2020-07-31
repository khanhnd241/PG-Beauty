import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, StatusBar, FlatList, ActivityIndicator, AppState } from "react-native";
import { IMAGE } from '../../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../../constants/string';
import { RECTANGLE } from '../../../constants/images/rectangle';
import { SEARCH } from '../../../constants/images/search';
import { STAR } from '../../../constants/images/star';
import { SCAN } from '../../../constants/images/scan';
import { BASKET } from '../../../constants/images/basket';
import { PG_BEAUTY } from '../../../constants/images/pg_beauty';
import { PG_FASHION } from '../../../constants/images/pg_fashion';
import { PG_TOOL } from '../../../constants/images/pg_tool';
import { PLUS } from '../../../constants/images/plus';
import { SUB } from '../../../constants/images/sub';
import { COLOR } from '../../../constants/colors';
import ItemCategory from './ItemCategory';
import { API } from '../../../constants/api';
import axios from 'axios';
class CategoryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beauty: false,
            tool: false,
            fashion: false,
            cleansing: false,
            page: 1,
            isLoading: false,
            listCategories: [],
            listChildCategories: []
        };
    }
    openBeauty = () => {
        this.setState({ beauty: !this.state.beauty })
    }
    openTool = () => {
        this.setState({ tool: !this.state.tool })
    }
    openFashion = () => {
        this.setState({ fashion: !this.state.fashion })
    }
    openCleansing = () => {
        this.setState({ cleansing: !this.state.cleansing })
    }
    componentDidMount = () => {
        this.setState({ isLoading: true }, this.loadCategories());
    }
    loadCategories =  () => {
        console.log('gọi api' + this.state.page)
        axios.get(API.URL + API.CATEGORIES, {
            params: {
                page: this.state.page,
            }
        }).then(response => {
            for(let i = 0; i < response.data.success.data.length; i++) {
                if(response.data.success.data[i].parent_id == null) {
                    this.state.listCategories.push(response.data.success.data[i]);
                } else {
                    this.state.listChildCategories.push(response.data.success.data[i]);
                }
            }
            this.setState({
                isLoading: false
            });
            // console.log('mang con' +this.state.listChildCategories);
        }).catch(error => {
        })
    }
    loadMore = () => {
        let page = this.state.page + 1
        console.log('goi api lan nua')
                this.setState({
                    isLoading: true,
                    page: page },this.loadCategories);
    }
    handleFooter = () => {
        // console.log('footer day');
        return (
            this.state.isLoading ?
                <View style={styles.loader}>
                    <ActivityIndicator color={COLOR.PRIMARY} size='large' />
                </View> :
                null
        )
    }
    render() {
        return (
            <SafeAreaView style={styles.screen}>
                <StatusBar backgroundColor={COLOR.PRIMARY} />
                <View style={styles.background}>
                    <View style={styles.header}>
                        <View style={styles.inputHeader}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <SvgUri svgXmlData={SEARCH} />
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput placeholder={STRING.SEARCH_INPUT} placeholderTextColor={COLOR.PLACEHODER} style={{ flex: 5, fontSize: 15 }}></TextInput>

                            </View>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                                <SvgUri svgXmlData={SCAN} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                            <SvgUri svgXmlData={BASKET} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            data={this.state.listCategories}
                            renderItem={({ item }) =>
                                <ItemCategory
                                    listChild={this.state.listCategories} //danh sach cac muc con (dang fake data muc cha)
                                    id={item.id}
                                    name={item.name}
                                    parent_id={item.parent_id}
                                />
                            }
                            onEndReached={this.loadMore}
                            onEndReachedThreshold={0.1}
                            ListFooterComponent={this.handleFooter}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        {/* PG Beauty */}
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <SvgUri svgXmlData={PG_BEAUTY} />
                            </View>
                            <View style={{ flex: 4, flexDirection: 'row' }}>
                                <Text style={styles.text}>{STRING.PG_BEAUTY}</Text>
                            </View>
                            <TouchableOpacity onPress={this.openBeauty} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                {this.state.beauty ? (
                                    <SvgUri svgXmlData={SUB} width={15} height={20} />
                                ) : (
                                        <SvgUri svgXmlData={PLUS} width={25} height={25} />
                                    )}
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderTopWidth: 0.5, borderTopColor: COLOR.LINE }} /> */}
                        {/* {this.state.beauty ? (
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                                    <View style={{ flex: 1 }} />
                                    <View style={{ flex: 4 }}>
                                        <Text style={styles.text}>{STRING.CLEANSING}</Text>
                                    </View>
                                    <TouchableOpacity onPress={this.openCleansing} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        {this.state.cleansing ? (
                                            <SvgUri svgXmlData={SUB} width={15} height={20} />
                                        ) : (
                                                <SvgUri svgXmlData={PLUS} width={25} height={25} />
                                            )}
                                    </TouchableOpacity>
                                </View>
                                <View style={{ borderTopWidth: 0.5, borderTopColor: COLOR.LINE }} />
                                {this.state.cleansing ? (
                                    <View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                                            <View style={{ flex: 1.5 }} />
                                            <View style={{ flex: 5 }}>
                                                <Text style={styles.text}>{STRING.CLEANSER}</Text>
                                            </View>
                                        </View>
                                        <View style={{ borderTopWidth: 0.5, borderTopColor: COLOR.LINE }} />
                                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                                            <View style={{ flex: 1.5 }} />
                                            <View style={{ flex: 5 }}>
                                                <Text style={styles.text}>{STRING.CLEANSING}</Text>
                                            </View>
                                        </View>
                                        <View style={{ borderTopWidth: 0.5, borderTopColor: COLOR.LINE }} />
                                    </View>
                                ) : null}
                            </View>

                        ) : null} */}
                        {/* PG Beauty Tool */}
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <SvgUri svgXmlData={PG_TOOL} />
                            </View>
                            <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.text}>{STRING.PG_BEAUTY_TOOL}</Text>
                            </View>
                            <TouchableOpacity onPress={this.openTool} style={{ flex: 1, alignItems: 'center' }}>
                                {this.state.tool ? (
                                    <SvgUri svgXmlData={SUB} width={15} height={20} />
                                ) : (
                                        <SvgUri svgXmlData={PLUS} width={25} height={25} />
                                    )}
                            </TouchableOpacity>
                        </View> */}
                        {/* PG Beauty Fashion */}
                        {/* <View style={{ borderTopWidth: 0.5, borderTopColor: COLOR.LINE }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <SvgUri svgXmlData={PG_FASHION} />
                            </View>
                            <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.text}>{STRING.PG_FASHION}</Text>
                            </View>
                            <TouchableOpacity onPress={this.openFashion} style={{ flex: 1, alignItems: 'center' }}>
                                {this.state.fashion ? (
                                    <SvgUri svgXmlData={SUB} width={15} height={20} />
                                ) : (
                                        <SvgUri svgXmlData={PLUS} width={25} height={25} />
                                    )}
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderTopWidth: 0.5, borderTopColor: COLOR.LINE }} /> */}
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
        marginRight: 20,
        alignItems: 'center',
        marginTop: 10
    },
    text: {
        fontSize: 14,
        color: COLOR.TEXTBODY,
    }
})
export default CategoryScreen;