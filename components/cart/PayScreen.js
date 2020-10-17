import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import {STRING} from '../../constants/string';
import {COLOR} from '../../constants/colors';
import {IMAGE} from '../../constants/images';
import {API} from '../../constants/api';
import {BACK_BLACK} from '../../constants/images/back_black';
import {NEXT} from '../../constants/images/next';
import {INFO} from '../../constants/images/info';
import SvgUri from 'react-native-svg-uri';
import axios from 'axios';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
} from 'react-native-popup-dialog';
class PayScreen extends Component {
  constructor(props) {
    super(props);
    const {
      total,
      discount,
      name,
      phone,
      userAddress,
      comment,
    } = this.props.route.params;
    this.state = {
      listProducts: [],
      total: total,
      discount: discount,
      name: name,
      phone: phone,
      comment: comment,
      userAddress: userAddress,
      listTransfer: [],
      customer: {},
      loadingDialog: false,
      code: '',
      userId: '',
      deviceId: '',
    };
  }
  componentDidMount = () => {
    AsyncStorage.getItem('code', (err, code) => {
      this.setState({code: code});
    });
    this.loadOrder();
  };
  loadOrder = () => {
    AsyncStorage.getItem('id', (err, result) => {
      if (result == null || result == '') {
        AsyncStorage.getItem('deviceId', (err, deviceId) => {
          this.setState({deviceId: deviceId});
          AsyncStorage.getItem(deviceId, (err, listOrder) => {
            this.setState({listProducts: JSON.parse(listOrder)});
            this.transfer();
          });
        });
      } else {
        this.setState({userId: result});
        AsyncStorage.getItem(result, (err, listOrder) => {
          this.setState({listProducts: JSON.parse(listOrder)});
          this.transfer();
        });
      }
    });
  };
  transfer = () => {
    for (let i = 0; i < this.state.listProducts.length; i++) {
      let product = {};
      product.productId = this.state.listProducts[i].id;
      product.quantity = this.state.listProducts[i].quantity;
      product.price = this.state.listProducts[i].base_price;
      product.discount = this.state.listProducts[i].sale_percent;
      this.state.listTransfer.push(product);
    }
    if (this.state.code == null || this.state.code == '') {
      this.state.customer.name = this.state.name;
      this.state.customer.contactNumber = this.state.phone;
      this.state.customer.address = this.state.userAddress;
      this.state.customer.comment = this.state.comment;
    } else {
      this.state.customer.code = this.state.code;
    }
  };
  connect = () => {
    this.setState({loadingDialog: true});
    var data = new FormData();
    data.append(API.SCOPES, API.SCOPES_DATA);
    data.append(API.GRANT_TYPE, API.GRANT_TYPE_DATA);
    data.append(API.CLIENT_ID, API.CLIENT_ID_DATA);
    data.append(API.CLIENT_SECRET, API.CLIENT_SECRET_DATA);
    // goi api connect
    axios
      .post(API.URL_CONNECT_KIOT, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        // console.log(response.data.access_token);
        if (
          response.data.access_token == null ||
          response.data.access_token == ''
        ) {
          Alert.alert(STRING.NOTIFICATION, STRING.ORDER_FAILED, [
            {text: STRING.ACCEPT},
          ]);
        } else {
          let orderDelivery = {
            contactNumber: this.state.phone,
            address: this.state.userAddress,
          };
          let data = {
            branchId: API.BRANDID,
            orderDetails: this.state.listTransfer,
            customer: this.state.customer,
            orderDelivery: orderDelivery,
          };
          const config = {
            headers: {
              Authorization: `Bearer ${response.data.access_token}`,
              Retailer: API.RETAILER,
            },
          };
          //goi api tao moi dat hang
          axios
            .post(API.URL_API_KIOT + API.ORDERS, data, config)
            .then((res) => {
              this.setState({loadingDialog: false});
              Alert.alert(STRING.NOTIFICATION, STRING.ORDER_SUCCESS, [
                {text: STRING.ACCEPT},
              ]);
              let newListOrder = [];
              if (this.state.userId == null || this.state.userId == '') {
                AsyncStorage.setItem(
                  this.state.deviceId,
                  JSON.stringify(newListOrder),
                );
                this.props.navigation.pop(3);
              } else {
                AsyncStorage.setItem(
                  this.state.userId,
                  JSON.stringify(newListOrder),
                );
                this.props.navigation.pop(3);
              }
            })
            .catch((err) => {
              this.setState({loadingDialog: false});
              Alert.alert(
                STRING.NOTIFICATION,
                JSON.stringify(err.response.data.responseStatus.message),
                [{text: STRING.ACCEPT}],
              );
              if (__DEV__) {
                console.log(JSON.stringify(err));
              }
            });
        }
      })
      .catch((err) => {
        this.setState({loadingDialog: false});
        if (__DEV__) {
          console.log(JSON.stringify(err));
        }
        Alert.alert(
          STRING.NOTIFICATION,
          JSON.stringify(err.response.data.responseStatus.message),
          [{text: STRING.ACCEPT}],
        );
      });
  };
  format(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="light-content" backgroundColor={COLOR.PRIMARY} />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <SvgUri svgXmlData={BACK_BLACK} fill={COLOR.WHITE} />
          </TouchableOpacity>
          <View
            style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.header_title}>{STRING.PAY}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.pop(3);
            }}
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.btn_cancel}>{STRING.CANCEL}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.background}>
          <View
            style={{height: 5, backgroundColor: COLOR.GRAY, marginBottom: 15}}
          />
          <View style={styles.form}>
            <Text
              style={{
                fontSize: 16,
                color: COLOR.TEXTBODY,
                fontWeight: 'bold',
                marginBottom: 5,
              }}>
              {STRING.SHIPPING_ADDRESS}
            </Text>
            <Text style={styles.text_info}>
              {this.state.name} - {this.state.phone}
            </Text>
            <Text style={styles.text_info}>{this.state.userAddress}</Text>
            <Text style={styles.text_info}>
              {STRING.NOTE}
              {this.state.comment}
            </Text>
          </View>
          <View
            style={{height: 5, backgroundColor: COLOR.GRAY, marginVertical: 20}}
          />

          <FlatList
            data={this.state.listProducts}
            renderItem={({item, index}) => {
              const imageUri =
                item.primary_image != null ? item.primary_image : '';
              return (
                <View>
                  <View style={styles.form}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 2}}>
                        <Image
                          style={{width: 90, height: 60}}
                          source={
                            imageUri.length != 0 ? {uri: imageUri} : null
                          }></Image>
                      </View>
                      <View style={{flex: 4}}>
                        <Text>{item.full_name}</Text>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text style={{color: COLOR.PRIMARY, fontSize: 16}}>
                            {this.format(parseInt(item.newPrice))}{' '}
                            {STRING.CURRENCY}
                          </Text>
                          <Text
                            style={{
                              color: COLOR.TEXTBODY,
                              fontSize: 14,
                              marginLeft: 16,
                            }}>
                            x{item.quantity}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: COLOR.GRAY,
                      height: 5,
                      marginVertical: 20,
                    }}
                  />
                </View>
              );
            }}
          />
          <View style={styles.form}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.title}>{STRING.ENTER_DISCOUNT_CODE}</Text>
              <View style={{alignItems: 'center', marginTop: 5}}>
                <SvgUri svgXmlData={INFO} fill={COLOR.BLACK} />
              </View>
            </View>
            <View style={styles.input}>
              <TextInput
                value={this.state.codeInput}
                onChangeText={(value) => {
                  this.setState({codeInput: value});
                }}
                style={styles.text_input}
                placeholderTextColor={COLOR.PLACEHODER}
                placeholder={STRING.ENTER_DISCOUNT_CODE}></TextInput>
              <View style={styles.btn_apply}>
                <Text
                  style={{
                    color: COLOR.WHITE,
                    textTransform: 'uppercase',
                    fontSize: 14,
                  }}>
                  {STRING.APPLY}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 14, color: COLOR.TEXTBODY}}>
                  {STRING.DISCOUNT_LEVEL}
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                <Text style={{fontSize: 14, color: COLOR.ORANGE}}>
                  {this.format(parseInt(this.state.discount))} {STRING.CURRENCY}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{backgroundColor: COLOR.GRAY, height: 5, marginVertical: 20}}
          />
          <View style={styles.form}>
            <Text style={styles.title}>{STRING.TRANSPORTATION}</Text>
            <Text
              style={{color: COLOR.DESCRIPTION, fontSize: 13, marginTop: 5}}>
              Vận chuyển giao hàng nhanh
            </Text>
          </View>
          <View
            style={{backgroundColor: COLOR.GRAY, height: 5, marginVertical: 20}}
          />
          <View
            style={{
              marginHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flex: 6}}>
              <Text style={styles.title}>{STRING.PAYMENT_METHOD}</Text>
              <Text
                style={{color: COLOR.DESCRIPTION, fontSize: 13, marginTop: 5}}>
                Thanh toán tiền khi nhận hàng (COD)
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('PaymentMethodsScreen');
              }}
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <SvgUri
                svgXmlData={NEXT}
                fill={COLOR.PLACEHODER}
                width={20}
                height={20}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{backgroundColor: COLOR.GRAY, height: 5, marginVertical: 20}}
          />
          <View style={styles.form}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 14, color: COLOR.TEXTBODY}}>
                  {STRING.MONEY}
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                <Text style={{fontSize: 14, color: COLOR.TEXTBODY}}>
                  {this.format(parseInt(this.state.total))} {STRING.CURRENCY}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 10}}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 14, color: COLOR.TEXTBODY}}>
                  {STRING.DISCOUNT}
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                <Text style={{fontSize: 14, color: COLOR.ORANGE}}>
                  {this.format(parseInt(this.state.discount))} {STRING.CURRENCY}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={{fontSize: 14, color: COLOR.TEXTBODY}}>
                  {STRING.TOTAL}
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                <Text style={{fontSize: 14, color: COLOR.TEXTBODY}}>
                  {this.format(parseInt(this.state.total))} {STRING.CURRENCY}
                </Text>
              </View>
            </View>
            <View style={{flex: 1, marginTop: 10}}>
              <Text style={{fontSize: 14, color: COLOR.TEXTBODY}}>
                {STRING.TOTAL_NOT_YET_SHIP}
              </Text>
            </View>
          </View>

          <View style={{marginBottom: 100}} />
        </ScrollView>

        <View style={styles.footer}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <View style={{flex: 1}}>
              <Text style={{color: COLOR.TEXTBODY, fontSize: 14}}>
                {STRING.TOTAL}
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row-reverse'}}>
              <Text style={{color: COLOR.PRIMARY, fontSize: 16}}>
                {this.format(parseInt(this.state.total))} {STRING.CURRENCY}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.connect();
            }}
            style={styles.btn_footer}>
            <Text
              style={{
                color: COLOR.WHITE,
                fontSize: 16,
                textTransform: 'uppercase',
              }}>
              {STRING.ORDER}
            </Text>
          </TouchableOpacity>
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
    height: 45,
    flexDirection: 'row',
  },
  header_title: {
    fontSize: 16,
    color: COLOR.WHITE,
  },
  btn_cancel: {
    fontSize: 14,
    color: COLOR.WHITE,
  },
  content: {
    backgroundColor: COLOR.WHITE,
  },
  text_info: {
    fontSize: 13,
    color: COLOR.DESCRIPTION,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 94,
    backgroundColor: COLOR.WHITE,
    elevation: 24,
    paddingHorizontal: 15,
  },
  text_step: {
    color: COLOR.PLACEHODER,
    fontSize: 10,
    marginTop: 3,
  },
  form: {
    marginHorizontal: 15,
  },
  input: {
    height: 40,
    borderWidth: 0.5,
    borderColor: COLOR.LINE,
    flexDirection: 'row',
    marginVertical: 8,
  },
  btn_apply: {
    flex: 1,
    backgroundColor: COLOR.LINK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_input: {
    flex: 3,
    fontSize: 16,
    color: COLOR.TEXTBODY,
  },
  title: {
    color: COLOR.TEXTBODY,
    fontSize: 16,
    marginRight: 5,
    fontWeight: '600',
  },
  btn_footer: {
    backgroundColor: COLOR.PRIMARY,
    height: 40,
    borderRadius: 40,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
});
export default PayScreen;
