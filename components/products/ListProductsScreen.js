import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, ImageBackground, ScrollView, Dimensions, StatusBar, ActivityIndicator } from "react-native";
import { IMAGE } from '../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../constants/string';
import { API } from '../../constants/api';
import { COLOR } from '../../constants/colors'
import { BACK_BLACK } from '../../constants/images/back_black'
import ItemColumn from './ItemColumn';
import axios from 'axios';
class ListProductsScreen extends Component {
    constructor(props) {
        super(props);
        const { order_by, title, category_id } = this.props.route.params;
        this.state = {
            order_by: order_by,
            title: title,
            listProduct: [],
            isLoading: false,
            page: 1,
            categoryId: category_id
        };
    }
    componentDidMount = () => {
        console.log(this.state.categoryId);
        if (this.state.order_by == 'same_type') {
            console.log('load san pham cung loai' + this.state.categoryId);
            this.setState({ isLoading: true }, this.loadListSameType);
        } else {
            console.log('load san pham moi');
            this.setState({ isLoading: true }, this.loadListNewProduct);
        }
    }

    loadListNewProduct = () => {
        axios.get(API.URL + API.PRODUCTS, {
            params: {
                order_by: 'id',
                page: this.state.page,
                orientation: 'DESC'
            }
        }).then(response => {
            this.setState({
                listProduct: this.state.listProduct.concat(response.data.success.data),
                isLoading: false
            });
            console.log(this.state.listProduct.length);
        }).catch(error => {
            console.log(JSON.stringify(error.response.data.error));
        })
    }
    loadListSameType = () => {
        axios.get(API.URL + API.PRODUCTS, {
            params: {
                category_id: this.state.categoryId
            }
        }).then(response => {
            console.log('chieu dai 1 api' + response.data.success.data.length);
            if (response.data.success.data.length == 0) {
                this.setState({ end: true,isLoading: false })
            } else {
                this.setState({
                    listProduct: this.state.listProduct.concat(response.data.success.data),
                    isLoading: false
                });
            }

        }).catch(error => {
            console.log(JSON.stringify(error.response.data.error));
        })
    }
    loadMore = () => {
        if (this.state.end == false) {
            console.log('goi api lan nua')
            this.setState({ page: this.state.page + 1, isLoading: true });
            if (this.state.order_by == 'same_type') {
                console.log('load them san pham cung loai');
                this.loadListSameType();
            } else {
                this.loadListNewProduct();
            }
        }

    }
    handleFooter = () => {
        console.log('footer day');
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
                <StatusBar barStyle='light-content' backgroundColor={COLOR.PRIMARY} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flex: 1, marginLeft: 10 }}>
                        <SvgUri svgXmlData={BACK_BLACK} fill={COLOR.WHITE} />
                    </TouchableOpacity>
                    <View style={{ flex: 5, alignItems: 'center' }}>
                        <Text style={styles.title}>{this.state.title}</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                </View>
                <View style={styles.background}>
                    <FlatList
                        numColumns={2}
                        data={this.state.listProduct}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('ProductDetailScreen', { id: item.id }) }}>
                                <ItemColumn image={item.primary_image}
                                    name={item.full_name}
                                    price={item.base_price}
                                    point={5}
                                    views={item.views}
                                    sale={'-10%'}
                                    sell={50} />
                            </TouchableOpacity>
                        }
                        onEndReached={this.loadMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={this.handleFooter}
                    />
                </View>
            </SafeAreaView >
        );
    }
}
const styles = StyleSheet.create({
    screen: {
        backgroundColor: COLOR.PRIMARY,
        flex: 1
    },
    background: {
        backgroundColor: COLOR.WHITE,
        flex: 1
    },
    header: {
        backgroundColor: COLOR.PRIMARY,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
    },
    title: {
        color: COLOR.WHITE,
        fontSize: 16,
        fontFamily: STRING.FONT_NORMAL
    }

})
export default ListProductsScreen;