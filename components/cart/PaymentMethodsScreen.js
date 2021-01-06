import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import {STRING} from '../../constants/string';
import {COLOR} from '../../constants/colors';
import {BACK_BLACK} from '../../constants/images/back_black';
import {RadioButton} from 'react-native-paper';
class PaymentMethodsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: '0',
    };
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
            <Text style={styles.header_title}>{STRING.PAYMENT_METHOD}</Text>
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}></TouchableOpacity>
        </View>
        <View style={styles.background}>
          <View
            style={{backgroundColor: COLOR.GRAY, height: 5, marginBottom: 15}}
          />
          <View style={styles.form}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1}}>
                <RadioButton
                  value="0"
                  status={this.state.checked === '0' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({checked: '0'});
                  }}
                  color={COLOR.PRIMARY}
                />
              </View>
              <View style={{flex: 7}}>
                <Text style={styles.text_content}>
                  Thanh toán tiền khi nhận hàng (COD)
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1}}>
                <RadioButton
                  value="1"
                  status={this.state.checked === '1' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({checked: '1'});
                  }}
                  color={COLOR.PRIMARY}
                />
              </View>
              <View style={{flex: 7}}>
                <Text style={styles.text_content}>
                  Thanh toán qua chuyển khoản ngân hàng
                </Text>
              </View>
            </View>
            {/* Thong tin chuyen khoan */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <View style={{flex: 1}}></View>
              <View style={{flex: 7}}>
                <Text style={styles.text_content}>
                  Chuyển tiền tại quầy chi nhánh ngân hàng vào tài khoản theo
                  thông tin dưới đây:
                </Text>
                <Text style={styles.text_content}>
                  1. Agribank: TK:1500216246139 CTK: Bùi Thị Thu Phương
                </Text>
                <Text style={styles.text_content}>
                  2. Vietcombank TK: 0021000289434 CTK: Bùi Thị Thu Phương
                  Vietcombank Thành Công, Hà Nội
                </Text>
                <Text style={styles.text_content}>
                  3. BIDV TK: 21110000395217 CTK: Bùi Thị Thu Phương BIDV Hà Nội
                </Text>
                <Text style={styles.text_content}>
                  4. Vietinbank TK:100001528452 CTK: Bùi Thị Thu Phương
                  Vietinbank Đống Đa, Hà Nộ
                </Text>
                <Text style={styles.text_content}>
                  5. Techcombank TK:19029567097012 CTK: Nguyễn Mạnh Cường
                </Text>
              </View>
            </View>
          </View>
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
  form: {
    marginHorizontal: 15,
  },
  text_content: {
    fontSize: 14,
    color: COLOR.TEXTBODY,
    lineHeight: 30,
  },
});
export default PaymentMethodsScreen;
