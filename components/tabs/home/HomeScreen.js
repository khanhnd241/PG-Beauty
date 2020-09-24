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
import {IMAGE} from '../../../constants/images';
import SvgUri from 'react-native-svg-uri';
import {STRING} from '../../../constants/string';
import {COLOR} from '../../../constants/colors';
import {SliderBox} from 'react-native-image-slider-box';
import {RECTANGLE} from '../../../constants/images/rectangle';
import {SEARCH} from '../../../constants/images/search';
import {STAR} from '../../../constants/images/star';
import {SCAN} from '../../../constants/images/scan';
import {BASKET} from '../../../constants/images/basket';
import {PG_BEAUTY} from '../../../constants/images/pg_beauty';
import {PG_FASHION} from '../../../constants/images/pg_fashion';
import {PG_TOOL} from '../../../constants/images/pg_tool';
import {BTN_CLOSE} from '../../../constants/images/btn_close';
import axios from 'axios';
import {API} from '../../../constants/api';
import ItemColumn from '../../products/ItemColumn';
import ItemRow from '../../products/ItemRow';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import DeviceInfo from 'react-native-device-info';
let deviceWidth = Dimensions.get('window').width - 10;
const height = Dimensions.get('window').height;

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    navigation.addListener('focus', async () => {
      this.loadOrder();
    });
    this.state = {
      images: [IMAGE.BANNER, IMAGE.BANNER_2],
      listDeal: [],
      listSellingProduct: [],
      listNewProducts: [],
      basketNumber: 3,
      page: 1,
      isLoading: false,
      listUserOrder: [],
      isHave: false,
      loadingDialog: false,
      bannerDialog: true,
    };
  }
  loadListNewProduct = () => {
    axios
      .get(API.URL + API.PRODUCTS, {
        params: {
          order_by: 'id',
          page: this.state.page,
          orientation: 'DESC',
        },
      })
      .then((response) => {
        this.setState({
          listNewProducts: this.state.listNewProducts.concat(
            response.data.success.data,
          ),
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({isLoading: false});
      });
  };
  loadListDealNow = () => {
    axios
      .get(API.URL + API.PRODUCTS, {
        params: {
          order_by: 'sale_percent',
          page: this.state.page,
          orientation: 'DESC',
        },
      })
      .then((response) => {
        this.setState({
          listDeal: this.state.listDeal.concat(response.data.success.data),
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({isLoading: false});
      });
  };
  componentDidMount = () => {
    this.setState({isLoading: true}, this.loadListNewProduct);
    this.setState({isLoading: true}, this.loadListDealNow);
  };
  loadOrder = () => {
    AsyncStorage.getItem('id', (err, result) => {
      if (result == null || result == '') {
        AsyncStorage.getItem('deviceId', (err, deviceId) => {
          AsyncStorage.getItem(deviceId, (err, listOrder) => {
            this.setState({listUserOrder: JSON.parse(listOrder)});
            this.checkOrder();
          });
        });
      } else {
        this.setState({userId: result});
        AsyncStorage.getItem(result, (err, listOrder) => {
          if (JSON.parse(listOrder) == null || JSON.parse(listOrder) == '') {
            var newListOrder = [];
            AsyncStorage.setItem(result, JSON.stringify(newListOrder));
            AsyncStorage.getItem(result, (err, listOrder) => {
              this.setState({listUserOrder: JSON.parse(listOrder)});
              this.checkOrder();
            });
          } else {
            this.setState({listUserOrder: JSON.parse(listOrder)});
            this.checkOrder();
          }
        });
      }
    });
  };
  checkOrder = () => {
    if (this.state.listUserOrder.length > 0) {
      this.setState({isHave: true});
    } else {
      this.setState({isHave: false});
    }
    this.setState({loadingDialog: false});
  };
  loadMore = () => {
    this.state.page++;
    this.setState({isLoading: true}, this.loadListNewProduct());
  };
  handleFooter = () => {
    return this.state.isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator color={COLOR.PRIMARY} size="large" />
      </View>
    ) : (
      <View style={styles.loader}>
        <TouchableOpacity
          onPress={this.loadMore}
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: COLOR.PRIMARY,
            padding: 5,
            borderRadius: 3,
          }}>
          <Text style={{color: COLOR.WHITE}}>{STRING.VIEW_MORE}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  navigateToActive = () => {
    this.setState({bannerDialog: false});
    this.props.navigation.navigate('GuaranteeForeoScreen', {
      title: STRING.ACTIVE_GUARANTEE_FOREO,
    });
  };
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="light-content" backgroundColor={COLOR.PRIMARY} />
        <ScrollView style={styles.background}>
          <View style={styles.header}>
            <View style={{flex: 0.5}} />
            <View style={styles.inputHeader}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <SvgUri svgXmlData={SEARCH} />
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('SearchProductsScreen', {
                      amount: this.state.listUserOrder.length,
                    })
                  }
                  style={{
                    flex: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: COLOR.PLACEHODER,
                      fontSize: 15,
                      fontFamily: STRING.FONT_NORMAL,
                    }}>
                    {STRING.SEARCH_INPUT}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, alignItems: 'center'}} />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('CartDetailScreen');
              }}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
              }}>
              <View style={styles.basket}>
                <SvgUri svgXmlData={BASKET} />
                {this.state.isHave ? (
                  <View style={styles.basket_number}>
                    <Text style={{color: COLOR.PRIMARY, fontSize: 11}}>
                      {this.state.listUserOrder.length}
                    </Text>
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
          {/* banner và tool */}
          <View>
            <SliderBox
              // resizeMode='contain'
              autoplay={true}
              images={this.state.images}
            />
            <View style={styles.tools}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ListProductsScreen', {
                    order_by: 'category',
                    title: 'PG Beauty',
                    category_id: '1218106',
                  })
                }
                style={styles.icon_tool}>
                <SvgUri svgXmlData={PG_BEAUTY} />
                <Text style={styles.tool_text}>{STRING.PG_BEAUTY}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ListProductsScreen', {
                    order_by: 'category',
                    category_id: '1218126',
                    title: 'PG Beauty tools',
                  })
                }
                style={styles.icon_tool}
                style={styles.icon_tool}>
                <SvgUri svgXmlData={PG_TOOL} />
                <Text style={styles.tool_text}>{STRING.PG_BEAUTY_TOOL}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ListProductsScreen', {
                    order_by: 'category',
                    title: 'PG Fashion',
                    category_id: '1218125',
                  })
                }
                style={styles.icon_tool}
                style={styles.icon_tool}>
                <SvgUri svgXmlData={PG_FASHION} />
                <Text style={styles.tool_text}>{STRING.PG_FASHION}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{backgroundColor: COLOR.GRAY, height: 5}} />
          {/* Deal đang diễn ra */}
          <View>
            <View style={styles.flex_direction_row}>
              <Text style={styles.title_list}>{STRING.DEAL_NOW}</Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ListProductsScreen', {
                    order_by: 'deal_now',
                    title: 'Deal đang diễn ra',
                  })
                }>
                <Text style={styles.see_all}>{STRING.SEE_ALL}</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal={true}
              data={this.state.listDeal}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ProductDetailScreen', {
                      id: item.id,
                    })
                  }>
                  <ItemRow
                    image={item.primary_image}
                    name={item.full_name}
                    price={item.base_price}
                    point={5}
                    views={item.views}
                    sale={parseInt(item.sale_percent)}
                    sell={50}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={{backgroundColor: COLOR.GRAY, height: 5}}></View>
          {/* Sản phẩm bán chạy */}
          <View>
            <View style={styles.flex_direction_row}>
              <Text style={styles.title_list}>{STRING.SELLING_PRODUCT}</Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ListProductsScreen', {
                    order_by: 'selling_product',
                    title: 'Sản phẩm bán chạy',
                  })
                }>
                <Text style={styles.see_all}>{STRING.SEE_ALL}</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal={true}
              data={this.state.listDeal}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ProductDetailScreen', {
                      id: item.id,
                    })
                  }>
                  <ItemRow
                    image={item.primary_image}
                    name={item.full_name}
                    price={item.base_price}
                    point={5}
                    views={item.views}
                    sale={parseInt(item.sale_percent)}
                    sell={50}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={{backgroundColor: COLOR.GRAY, height: 5}} />
          {/* Sản phẩm mới */}
          <View>
            <View style={styles.flex_direction_row}>
              <Text style={styles.title_list}>{STRING.NEW_PRODUCT}</Text>
            </View>
            <View style={{paddingLeft: 5}}>
              <FlatList
                numColumns={2}
                data={this.state.listNewProducts}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ProductDetailScreen', {
                        id: item.id,
                      })
                    }>
                    <ItemColumn
                      image={item.primary_image}
                      name={item.full_name}
                      price={item.base_price}
                      point={5}
                      views={item.views}
                      sale={parseInt(item.sale_percent)}
                      sell={50}
                    />
                  </TouchableOpacity>
                )}
                // onEndReached={() => this.loadMore}
                // onEndReachedThreshold={0}
                ListFooterComponent={this.handleFooter}
              />
            </View>
          </View>
          <Dialog
            dialogStyle={{backgroundColor: 'transparent'}}
            onDismiss={() => {
              this.setState({loadingDialog: false});
            }}
            height={400}
            width={0.9}
            visible={this.state.loadingDialog}>
            <DialogContent
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator color={COLOR.PRIMARY} size="large" />
            </DialogContent>
          </Dialog>
          <Dialog
            dialogStyle={{backgroundColor: 'transparent'}}
            onDismiss={() => {
              this.setState({bannerDialog: false});
            }}
            visible={this.state.bannerDialog}>
            <DialogContent>
              <TouchableOpacity
                onPress={() => this.setState({bannerDialog: false})}
                style={{flexDirection: 'row-reverse', marginBottom: 25}}>
                <SvgUri svgXmlData={BTN_CLOSE} />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: COLOR.WHITE,
                  alignItems: 'center',
                  paddingVertical: 5,
                }}>
                <Text style={{fontFamily: STRING.FONT_SEMI_BOLD}}>
                  {STRING.ACTIVE_GUARANTEE_FOREO}
                </Text>
              </View>
              <TouchableOpacity onPress={this.navigateToActive}>
                <Image
                  style={{width: deviceWidth - 20, height: 400}}
                  source={IMAGE.POPUP}
                />
              </TouchableOpacity>
            </DialogContent>
          </Dialog>
        </ScrollView>
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
    backgroundColor: COLOR.WHITE,
    flex: 1,
  },
  header: {
    backgroundColor: COLOR.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputHeader: {
    flex: 6,
    backgroundColor: COLOR.WHITE,
    flexDirection: 'row',
    borderRadius: 30,
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
    fontFamily: STRING.FONT_SEMI_BOLD,
    fontWeight: '900',
    flex: 4,
    textTransform: 'uppercase',
    fontSize: 14,
    margin: 10,
    marginBottom: 16,
  },
  see_all: {
    color: COLOR.LINK,
    fontFamily: STRING.FONT_BOLD,
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
  items_new_product: {
    width: deviceWidth / 2,
    height: 255,
    flex: 1,
    margin: 3,
  },
  tool_text: {
    color: COLOR.TEXTBODY,
    fontFamily: STRING.FONT_SEMI_BOLD,
    fontWeight: '600',
    fontSize: 14,
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
    justifyContent: 'center',
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
});
export default HomeScreen;
