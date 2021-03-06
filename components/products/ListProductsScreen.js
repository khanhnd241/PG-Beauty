import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ScrollView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {IMAGE} from '../../constants/images';
import SvgUri from 'react-native-svg-uri';
import {STRING} from '../../constants/string';
import {API} from '../../constants/api';
import {COLOR} from '../../constants/colors';
import {BACK_BLACK} from '../../constants/images/back_black';
import ItemColumn from './ItemColumn';
import axios from 'axios';
class ListProductsScreen extends Component {
  constructor(props) {
    super(props);
    const {order_by, title, category_id} = this.props.route.params;
    this.state = {
      order_by: order_by,
      title: title,
      listProduct: [],
      isLoading: false,
      page: 1,
      categoryId: category_id,
      end: false,
      refresh: false,
    };
  }
  componentDidMount = () => {
    this.props.navigation.addListener('focus', async () => {
      this.onRefresh();
    });
    
  };
  loadListProduct = () => {
    switch (this.state.order_by) {
      case 'same_type':
        this.setState({isLoading: true}, this.loadListSameType);
        break;
      case 'category':
        this.setState({isLoading: true}, this.loadCategory);
        break;
      case 'deal_now':
        this.setState({isLoading: true}, this.loadDealNow);
        break;
      case 'selling_product':
        this.setState({isLoading: true}, this.loadListNewProduct);
      default:
        this.setState({isLoading: true}, this.loadListNewProduct);
        break;
    }
    this.setState({refresh: false});
  };
  loadDealNow = () => {
    axios
      .get(API.URL + API.PRODUCTS, {
        params: {
          order_by: 'sale_percent',
          page: this.state.page,
          orientation: 'DESC',
        },
      })
      .then((response) => {
        let listDeal = [];
        if (response.data.success.data.length == 0) {
          this.setState({end: true, isLoading: false});
        } else {
          for (let i = 0; i < response.data.success.data.length; i++) {
            if (response.data.success.data[i].sale_percent !== 0) {
              listDeal.push(response.data.success.data[i]);
            }
          }
          this.setState(
            {
              listProduct: this.state.listProduct.concat(listDeal),
              isLoading: false,
            },
            () => {
              if (listDeal.length === 0) {
                this.setState({end: true, isLoading: false});
              }
            },
          );
        }
      })
      .catch((error) => {
        console.log(JSON.stringify(error.response.data.error));
      });
  };
  loadCategory = () => {
    axios
      .get(API.URL + API.CATEGORIES + '/' + this.state.categoryId, {
        params: {
          with_product: 'true',
          page: this.state.page,
        },
      })
      .then((response) => {
        if (response.data.success.products.data.length === 0) {
          this.setState({end: true, isLoading: false});
        } else {
          this.setState({
            listProduct: this.state.listProduct.concat(
              response.data.success.products.data,
            ),
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        if (__DEV__) {
          console.log(JSON.stringify(error.response.data.error));
        }
        this.setState({
          isLoading: false,
        });
      });
  };
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
        if (
          response.data.success.current_page === response.data.success.last_page
        ) {
          this.setState({end: true, isLoading: false});
        } else {
          this.setState({
            listProduct: this.state.listProduct.concat(
              response.data.success.data,
            ),
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        if (__DEV__) {
          console.log(JSON.stringify(error.response.data.error));
        }
      });
  };
  loadListSameType = () => {
    axios
      .get(API.URL + API.PRODUCTS, {
        params: {
          category_id: this.state.categoryId,
          page: this.state.page,
        },
      })
      .then((response) => {
        if (response.data.success.data.length == 0) {
          this.setState({end: true, isLoading: false});
        } else {
          this.setState({
            listProduct: this.state.listProduct.concat(
              response.data.success.data,
            ),
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        if (__DEV__) {
          console.log(JSON.stringify(error.response.data.error));
        }
      });
  };
  loadMore = () => {
    if (this.state.end === false) {
      this.setState({page: this.state.page + 1, isLoading: true}, () => {
        switch (this.state.order_by) {
          case 'same_type':
            this.loadListSameType();
            break;
          case 'category':
            console.log('load danh muc' + this.state.categoryId);
            this.loadCategory();
            break;
          case 'deal_now':
            this.loadDealNow();
            break;
          default:
            console.log('load san pham moi');
            this.loadListNewProduct();
            break;
        }
      });
    }
  };
  handleFooter = () => {
    return this.state.isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator color={COLOR.PRIMARY} size="large" />
      </View>
    ) : null;
  };
  onRefresh = () => {
    const {order_by, title, category_id} = this.props.route.params;
    this.setState(
      {
        order_by: order_by,
        title: title,
        listProduct: [],
        isLoading: false,
        page: 1,
        categoryId: category_id,
        end: false,
        refresh: true,
      },
      () => {
        this.loadListProduct();
      },
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="light-content" backgroundColor={COLOR.PRIMARY} />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{flex: 1, marginLeft: 10}}>
            <SvgUri svgXmlData={BACK_BLACK} fill={COLOR.WHITE} />
          </TouchableOpacity>
          <View style={{flex: 5, alignItems: 'center'}}>
            <Text style={styles.title}>{this.state.title}</Text>
          </View>
          <View style={{flex: 1}} />
        </View>
        <View style={styles.background}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refresh}
                onRefresh={this.onRefresh}
              />
            }
            numColumns={2}
            data={this.state.listProduct}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('ProductDetailScreen', {
                    id: item.id,
                  });
                }}>
                <ItemColumn
                  image={item.primary_image}
                  name={item.full_name}
                  price={item.base_price}
                  point={5}
                  views={item.views}
                  sale={parseInt(item.sale_percent)}
                />
              </TouchableOpacity>
            )}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={this.handleFooter}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLOR.PRIMARY,
    flex: 1,
  },
  background: {
    backgroundColor: COLOR.WHITE,
    flex: 1,
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
    fontFamily: STRING.FONT_NORMAL,
  },
});
export default ListProductsScreen;
