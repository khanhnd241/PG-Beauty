import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {IMAGE} from '../../constants/images';
import SvgUri from 'react-native-svg-uri';
import {STRING} from '../../constants/string';
import {COLOR} from '../../constants/colors';
import {RECTANGLE} from '../../constants/images/rectangle';
import {STAR} from '../../constants/images/star';
let deviceWidth = Dimensions.get('window').width - 10;
const height = Dimensions.get('window').height;
class ItemColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      point: '',
      newPrice: null,
      salePercent: null
    };
  }
  format(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  genRand(min, max, decimalPlaces) {
    var Rand = Math.random() * (max - min) + min;
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(Rand * power) / power;
  }
  componentDidMount = () => {
    this.setState({point: this.genRand(4.5, 5, 1)});
    this.getPrice();
  };
  getPrice = () => {
    if (this.props.sale === 0) {
      this.setState({newPrice: this.props.price});
    } else {
      let newPrice = this.props.price - this.props.sale;
      let salePercent = Math.trunc((this.props.sale / this.props.price) * 100);
      this.setState({newPrice: newPrice, salePercent: salePercent});
    }
  };
  render() {
    const {image, name, price, point, views, sell, sale} = this.props;
    const imageUri = image != null ? image : '';
    return (
      <View style={styles.items_new_product}>
        <View style={{flex: 1}}>
          <ImageBackground
            resizeMode="contain"
            source={imageUri.length != 0 ? {uri: imageUri} : IMAGE.NO_IMAGE}
            style={styles.image}>
            {sale !== 0 && (
              <ImageBackground source={IMAGE.ICON_SALE_BG} style={styles.sale}>
                {/* <SvgUri svgXmlData={RECTANGLE} /> */}
                <Text style={styles.textSale}>{this.state.salePercent}%</Text>
              </ImageBackground>
            )}
          </ImageBackground>
          <View style={{marginHorizontal: 7}}>
            <Text numberOfLines={3} style={styles.textName}>{name}</Text>
            <Text style={styles.textCurrency}>
              {this.format(parseInt(this.state.newPrice))} {STRING.CURRENCY}
            </Text>
            <View style={styles.point}>
              <SvgUri svgXmlData={STAR} />
              <Text style={styles.textPoint}>{this.state.point}</Text>
              <Text style={styles.textView} numberOfLines={1}>
                {STRING.VIEWS} {views}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: COLOR.WHITE,
  },
  image: {
    height: 110,
    marginTop: 7,
  },
  sale: {
    justifyContent: 'center',
    alignItems: 'center',
    width:30,
    height:33,
  },
  textSale: {
    color: 'white',
    fontSize: 9,
    fontFamily: STRING.FONT_NORMAL,
    marginBottom:3
  },
  textName: {
    color: COLOR.DESCRIPTION,
    fontSize: 14,
    height: 71,
    fontFamily: STRING.FONT_NORMAL,
  },
  textCurrency: {
    color: COLOR.TEXTBODY,
    fontWeight: '600',
    fontSize: 16,
    fontFamily: STRING.FONT_SEMI_BOLD,
  },
  point: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    fontFamily: STRING.FONT_NORMAL,
  },
  textPoint: {
    color: COLOR.PRIMARY,
    fontSize: 11,
    marginLeft: 3,
  },
  textView: {
    color: COLOR.PLACEHODER,
    fontSize: 11,
    marginLeft: 8,
    flex: 1,
    fontFamily: STRING.FONT_NORMAL,
    textAlign: 'right',
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
    width: 310,
    height: 40,
    marginBottom: 5,
    marginRight: 30,
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
  items_new_product: {
    width: deviceWidth / 2,
    height: 255,
    flex: 1,
    paddingHorizontal: 5,
  },
  tool_text: {
    color: COLOR.TEXTBODY,
    fontSize: 14,
  },
  basket: {
    position: 'absolute',
    top: 18,
    right: 20,
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
export default ItemColumn;
