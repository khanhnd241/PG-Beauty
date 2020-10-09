import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  ActivityIndicator,
  AsyncStorage,
  RefreshControl,
} from 'react-native';
import {IMAGE} from '../../../constants/images';
import SvgUri from 'react-native-svg-uri';
import {STRING} from '../../../constants/string';
import {RECTANGLE} from '../../../constants/images/rectangle';
import {SEARCH} from '../../../constants/images/search';
import {STAR} from '../../../constants/images/star';
import {SCAN} from '../../../constants/images/scan';
import {BASKET} from '../../../constants/images/basket';
import {PG_BEAUTY} from '../../../constants/images/pg_beauty';
import {PG_FASHION} from '../../../constants/images/pg_fashion';
import {PG_TOOL} from '../../../constants/images/pg_tool';
import {PLUS} from '../../../constants/images/plus';
import {SUB} from '../../../constants/images/sub';
import {COLOR} from '../../../constants/colors';
import ItemCategory from './ItemCategory';
import {API} from '../../../constants/api';
import axios from 'axios';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
} from 'react-native-popup-dialog';
class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    navigation.addListener('focus', async () => {
      this.setState(this.loadOrder());
    });
    this.state = {
      beauty: false,
      tool: false,
      fashion: false,
      cleansing: false,
      page: 1,
      isLoading: false,
      listCategories: [],
      listChildCategories: [],
      end: false,
      loadingDialog: false,
      isHave: false,
      listUserOrder: [],
      refresh: false,
    };
  }
  componentDidMount = () => {
    this.setState({isLoading: true}, () => {
      this.loadCategories();
      this.loadOrder();
    });
  };
  loadCategories = () => {
    axios
      .get(API.URL + API.CATEGORIES, {
        params: {
          page: this.state.page,
        },
      })
      .then((response) => {
        if (response.data.success.data.length == 0) {
          this.setState({end: true});
        }
        for (let i = 0; i < response.data.success.data.length; i++) {
          if (response.data.success.data[i].parent_id == null) {
            this.state.listCategories.push(response.data.success.data[i]);
          } else {
            this.state.listChildCategories.push(response.data.success.data[i]);
          }
        }
        this.setState({
          isLoading: false,
        });
      })
      .catch((error) => {});
  };
  loadMore = () => {
    if (this.state.end == false) {
      let page = this.state.page + 1;
      this.setState(
        {
          isLoading: true,
          page: page,
        },
        this.loadCategories,
      );
    }
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
  };
  handleFooter = () => {
    return this.state.isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator color={COLOR.PRIMARY} size="large" />
      </View>
    ) : null;
  };
  onRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
        listCategories: [],
        listChildCategories: [],
        end: false,
        isLoading: false,
      },
      () => {
        this.loadCategories();
      },
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="light-content" backgroundColor={COLOR.PRIMARY} />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this.onRefresh}
            />
          }
          style={styles.background}>
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

          <View>
            <FlatList
              style={{marginBottom: 50}}
              data={this.state.listCategories}
              renderItem={({item}) => (
                <ItemCategory
                  listChild={this.state.listChildCategories}
                  id={item.id}
                  name={item.name}
                  parent_id={item.parent_id}
                  navigation={this.props.navigation}
                />
              )}
              onEndReached={this.loadMore}
              onEndReachedThreshold={0.1}
              ListFooterComponent={this.handleFooter}
              keyExtractor={(item, index) => index.toString()}
            />
            <Dialog
              dialogStyle={{backgroundColor: 'transparent'}}
              onDismiss={() => {
                this.setState({loadingDialog: false});
              }}
              height={400}
              width={0.9}
              visible={this.state.loadingDialog}>
              <DialogContent
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator color={COLOR.PRIMARY} size="large" />
              </DialogContent>
            </Dialog>
          </View>
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
    flex: 5,
    backgroundColor: COLOR.WHITE,
    flexDirection: 'row',
    borderRadius: 30,
    height: 40,
    marginBottom: 5,
    alignItems: 'center',
    marginTop: 10,
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
  text: {
    fontSize: 14,
    color: COLOR.TEXTBODY,
  },
});
export default CategoryScreen;
