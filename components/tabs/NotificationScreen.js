import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import {IMAGE} from '../../constants/images';
import SvgUri from 'react-native-svg-uri';
import {STRING} from '../../constants/string';
import {FOR_YOU} from '../../constants/images/for_you';
import {COLOR} from '../../constants/colors';

function ItemForYou({title, content, timeLine}) {
  return (
    <View style={styles.item_container}>
      <View style={styles.title}>
        <SvgUri svgXmlData={FOR_YOU} />
        <Text style={styles.item_title}>{title}</Text>
      </View>
      <Text style={styles.item_content}>{content}</Text>
      <Text style={styles.item_timeline}>{timeLine}</Text>
    </View>
  );
}
class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listForYou: [
        // {
        //   title: 'Xác nhận đơn hàng',
        //   content:
        //     'Cảm ơn bạn đã tin tưởng và đặt hàng tại PG Beauty. Chúng tôi sẽ giao hàng trước ngày 20-07-2020',
        //   created_at: '2 ngày trước',
        // },
        // {
        //     title: 'Giảm giá toàn bộ sản phẩm 50%',
        //     content: 'Tặng áo phông cute khi mua siêu phẩm kem lót CHANEL ( >2400k)',
        //     timeLine: '1 ngày trước'
        // },
        // {
        //     title: 'Khuyến mãi tháng hè',
        //     content: 'Tặng áo phông cute khi mua siêu phẩm kem lót CHANEL ( >2400k)',
        //     timeLine: '1 ngày trước'
        // }
      ],
    };
  }
  componentDidMount = () => {
    this.setState({noNotiPromotion: true});
  };
  renderEmpty = () => {
    return (
      <View style={styles.no_noti}>
        <Image source={IMAGE.NO_NOTI} />
        <Text style={styles.text_no_noti}>{STRING.NO_NOTI}</Text>
      </View>
    );
  };
  renderItem = ({item, index}) => {
    return (
      <ItemForYou
        title={item.title}
        timeLine={item.created_at}
        content={item.content}
        index={index}
      />
    );
  };
  renderSeparator = () => {
    return <View style={styles.separator} />;
  };
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="light-content" backgroundColor={COLOR.PRIMARY} />
        <View style={styles.background}>
          <View style={styles.header}>
            <Text style={styles.title_text}>{STRING.NOTIFICATION}</Text>
          </View>
          <View>
            <View>
              <FlatList
                data={this.state.listForYou}
                ListEmptyComponent={this.renderEmpty}
                renderItem={this.renderItem}
                ItemSeparatorComponent={this.renderSeparator}
              />
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
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {flexDirection: 'row', paddingVertical: 5},
  content: {},
  title_text: {
    fontSize: 16,
    color: COLOR.WHITE,
  },
  text: {
    color: COLOR.DESCRIPTION,
    fontSize: 12,
    textAlign: 'center',
  },
  text_no_noti: {
    marginTop: 24,
    fontSize: 13,
    color: COLOR.DESCRIPTION,
    fontFamily: STRING.FONT_NORMAL,
  },
  item_container: {
    marginHorizontal: 17,
  },
  item_content: {
    color: COLOR.DESCRIPTION,
    fontSize: 13,
  },
  item_title: {
    color: COLOR.TEXTBODY,
    fontSize: 14,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  item_timeline: {
    color: COLOR.PLACEHODER,
    fontSize: 12,
    marginVertical: 5,
  },
  no_noti: {
    marginTop: 60,
    alignItems: 'center',
  },
  separator: {borderTopWidth: 0.5, borderColor: COLOR.LINE, marginBottom: 5},
});
export default NotificationScreen;
