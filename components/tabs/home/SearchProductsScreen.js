import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ScrollView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  AsyncStorage,
  Image,
} from 'react-native';
import {COLOR} from '../../../constants/colors';
import {IMAGE} from '../../../constants/images';
import SvgUri from 'react-native-svg-uri';
import {STRING} from '../../../constants/string';
import {BACK_BLACK} from '../../../constants/images/back_black';
import {SCAN} from '../../../constants/images/scan';
import {BASKET} from '../../../constants/images/basket';
import {BASKET_RED} from '../../../constants/images/basket_red';
import axios from 'axios';
import {API} from '../../../constants/api';
import {SEARCH} from '../../../constants/images/search';
class SearchProductsScreen extends Component {
  constructor(props) {
    super(props);
    const {amount} = this.props.route.params;
    this.state = {
      amount: amount,
      page: 1,
      listCategory: [],
      isLoading: false,
      listProducts: [],
      refresh: false,
      focus: true,
      textSearch: '',
      isSearch: false,
      noProduct: false,
      history: [],
      refreshHistory: false,
      listNewProducts: [],
      end: false,
    };
  }
  componentDidMount = () => {
    this.loadCategories();
    // this.loadMore();
    AsyncStorage.getItem('history', (err, history) => {
      this.setState({history: JSON.parse(history), refreshHistory: true});
    });
  };
  loadCategories = () => {
    if (this.state.page < 2) {
      axios
        .get(API.URL + API.CATEGORIES, {
          params: {
            page: this.state.page,
          },
        })
        .then((response) => {
          this.setState({
            listCategory: response.data.success.data.splice(15),
            // isLoading: false
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  loadMore = () => {
    if (this.state.end === false) {
      let page = this.state.page + 1;
      this.setState(
        {
          isLoading: true,
          page: page,
        },
        this.search,
      );
    }
  };
  checkTextChange = (text) => {
    setTimeout(() => {
      if (this.state.textSearch == text) {
        this.setState({isSearch: true});
      }
    }, 3000);
    setTimeout(() => {
      this.search();
    }, 4000);
  };
  textChange = (text) => {
    this.setState({textSearch: text});
  };
  search = () => {
    console.log(this.state.page);
    axios
      .get(API.URL + API.PRODUCTS, {
        params: {
          s: this.state.textSearch,
          page: this.state.page,
        },
      })
      .then((response) => {
        if (response.data.success.data.length === 0) {
          if (this.state.page === 1) {
            this.setState({noProduct: true});
          }
          this.setState({
            isLoading: false,
            textChange: '',
            end: true,
          });
        } else {
          this.setState({
            listNewProducts: this.state.listNewProducts.concat(
              response.data.success.data,
            ),
            isLoading: false,
            refresh: true,
            isSearch: false,
            noProduct: false,
            textChange: '',
          });
        }
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          focus: false,
          isSearch: false,
          noProduct: true,
          end: true,
        });
      });
  };
  handleSearch = () => {
    this.setState(
      {
        page: 1,
        focus: false,
        listNewProducts: [],
        end: false,
      },
      () => {
        if (this.state.textSearch.trim() !== '') {
          AsyncStorage.getItem('history', (err, history) => {
            let historySearch = JSON.parse(history);
            if (historySearch.indexOf(this.state.textSearch) == -1) {
              historySearch.push(this.state.textSearch);
              AsyncStorage.setItem('history', JSON.stringify(historySearch));
            }
          });
          this.search();
        }
      },
    );
  };
  format(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  deleteHistory = () => {
    let historySearch = [];
    AsyncStorage.setItem('history', JSON.stringify(historySearch));
    this.setState({history: historySearch});
  };
  renderHistory = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({textSearch: item}, () => {
            this.handleSearch();
          });
        }}
        style={{
          padding: 10,
          borderTopColor: COLOR.GRAY,
          borderTopWidth: 1,
        }}>
        <Text
          style={{
            fontFamily: STRING.FONT_NORMAL,
            fontSize: 14,
            color: COLOR.TEXTBODY,
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  renderProduct = ({item}) => {
    const imageUri = item.primary_image != null ? item.primary_image : '';
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('ProductDetailScreen', {id: item.id})
        }
        style={{
          flexDirection: 'row',
          height: 50,
          backgroundColor: COLOR.WHITE,
          borderRadius: 2,
          borderBottomColor: COLOR.GRAY,
          borderBottomWidth: 1,
          alignItems: 'center',
        }}>
        <Image
          source={imageUri.length != 0 ? {uri: imageUri} : IMAGE.NO_IMAGE}
          style={{
            width: 40,
            height: 30,
            marginHorizontal: 12,
          }}
        />
        <View>
          <Text
            style={{
              fontFamily: STRING.FONT_NORMAL,
              fontSize: 12,
              color: COLOR.TEXTBODY,
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              fontFamily: STRING.FONT_NORMAL,
              fontSize: 12,
              color: COLOR.PRIMARY,
            }}>
            {this.format(parseInt(item.base_price))} {STRING.CURRENCY}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  handleFooter = () => {
    return this.state.isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator color={COLOR.PRIMARY} size="large" />
      </View>
    ) : null;
  };

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar backgroundColor={COLOR.PRIMARY} />
        <View style={styles.background}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{flex: 1, alignItems: 'center', marginTop: 5}}>
              <SvgUri svgXmlData={BACK_BLACK} fill={COLOR.WHITE} />
            </TouchableOpacity>
            <View style={styles.inputHeader}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <SvgUri svgXmlData={SEARCH} />
              </View>
              <TextInput
                onEndEditing={this.handleSearch}
                onChangeText={(text) => this.textChange(text)}
                autoFocus={this.state.focus}
                placeholder={STRING.SEARCH_INPUT}
                placeholderTextColor={COLOR.PLACEHODER}
                style={{
                  flex: 5,
                  fontSize: 15,
                  fontFamily: STRING.FONT_NORMAL,
                  height: 40,
                }}
              />
              <View style={{flex: 1, alignItems: 'center'}} />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.replace('CartDetailScreen');
              }}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
              }}>
              <View style={styles.basket}>
                <SvgUri svgXmlData={BASKET} />
                {this.state.amount > 0 ? (
                  <View style={styles.basket_number}>
                    <Text style={{color: COLOR.PRIMARY, fontSize: 11}}>
                      {this.state.amount}
                    </Text>
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView>
            {this.state.history == 0 ? null : (
              <View style={{backgroundColor: COLOR.WHITE}}>
                <View style={{flexDirection: 'row', margin: 10}}>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: STRING.FONT_NORMAL,
                        color: COLOR.PLACEHODER,
                      }}>
                      {STRING.SEARCH_HISTORY}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this.deleteHistory();
                    }}
                    style={{
                      flex: 1,
                      flexDirection: 'row-reverse',
                      marginLeft: 15,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: STRING.FONT_NORMAL,
                        color: COLOR.LINK,
                      }}>
                      {STRING.DELETE_HISTORY}
                    </Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={this.state.history}
                  extraData={this.state.refreshHistory}
                  renderItem={this.renderHistory}
                />
              </View>
            )}
            {this.state.isLoading ? (
              <View style={{alignItems: 'center'}}>
                <ActivityIndicator size="large" color={COLOR.PRIMARY} />
              </View>
            ) : (
              <View>
                {this.state.noProduct ? (
                  <View style={{alignItems: 'center', marginTop: 15}}>
                    <SvgUri svgXmlData={BASKET_RED} />
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        fontFamily: STRING.FONT_NORMAL,
                        color: COLOR.TEXTBODY,
                      }}>
                      Không tìm thấy sản phẩm phù hợp
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={{marginVertical: 10}}>
                      {STRING.SEARCH_RESULT}
                    </Text>
                    <FlatList
                      data={this.state.listNewProducts}
                      //   extraData={this.state.refresh}
                      renderItem={this.renderProduct}
                      onEndReached={this.loadMore}
                      onEndReachedThreshold={0.1}
                      ListFooterComponent={this.handleFooter}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                )}
              </View>
            )}
            <View style={{marginHorizontal: 16}}>
              <Text
                style={{
                  fontFamily: STRING.FONT_NORMAL,
                  color: COLOR.DESCRIPTION,
                  marginTop: 10,
                }}>
                {STRING.SUGGEST}
              </Text>
              {this.state.listCategory.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ListProductsScreen', {
                        order_by: 'same_type',
                        title: 'Sản phẩm cùng loại',
                        category_id: item.id,
                      })
                    }
                    style={{
                      alignSelf: 'flex-start',
                      padding: 5,
                      backgroundColor: COLOR.WHITE,
                      marginVertical: 7,
                      borderRadius: 2,
                    }}>
                    <Text
                      style={{
                        fontFamily: STRING.FONT_NORMAL,
                        fontSize: 12,
                        color: COLOR.TEXTBODY,
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {/* <FlatList
                                data={this.state.listCategory.splice(15)}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ListProductsScreen', { order_by: 'same_type', title: 'Sản phẩm cùng loại', category_id: item.id })} style={{ alignSelf: 'flex-start', padding: 5, backgroundColor: COLOR.WHITE, marginVertical: 7, borderRadius: 2 }} >
                                            <Text style={{ fontFamily: STRING.FONT_NORMAL, fontSize: 12, color: COLOR.TEXTBODY }}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                                } /> */}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY,
  },
  background: {
    backgroundColor: COLOR.LINE,
    flex: 1,
  },
  header: {
    backgroundColor: COLOR.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputHeader: {
    backgroundColor: COLOR.WHITE,
    flexDirection: 'row',
    borderRadius: 30,
    flex: 6,
    height: 40,
    marginBottom: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  tools: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLOR.WHITE,
  },
  icon_tool: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex_direction_row: {
    flexDirection: 'row',
  },
  title_list: {
    color: COLOR.TEXTBODY,
    fontWeight: '600',
    flex: 4,
    textTransform: 'uppercase',
    fontSize: 14,
    margin: 10,
    marginBottom: 16,
  },
  see_all: {
    color: COLOR.LINK,
    flex: 1,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
    fontSize: 12,
    margin: 10,
  },
  container_items: {
    height: 255,
    width: 180,
  },

  tool_text: {
    color: COLOR.TEXTBODY,
    fontSize: 14,
  },
  basket: {},
  basket_number: {
    position: 'absolute',
    top: 8,
    right: -8,
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: COLOR.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
});
export default SearchProductsScreen;
