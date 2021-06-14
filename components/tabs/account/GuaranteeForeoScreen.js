import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {IMAGE} from '../../../constants/images';
import SvgUri from 'react-native-svg-uri';
import {STRING} from '../../../constants/string';
import {BACK_BLACK} from '../../../constants/images/back_black';
import {LOGO_RED} from '../../../constants/images/logo_red';
import {COLOR} from '../../../constants/colors';
const deviceWidth = Dimensions.get('screen').width;
class GuaranteeForeoScreen extends Component {
  constructor(props) {
    super(props);
    const {title} = this.props.route.params;
    this.state = {
      content: '',
      title: title,
    };
  }
  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar backgroundColor={COLOR.PRIMARY} />
        <View style={styles.background}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <SvgUri svgXmlData={BACK_BLACK} />
            </TouchableOpacity>
            <View style={styles.header_title}>
              <Text style={styles.txtHeader}>{this.state.title}</Text>
            </View>
          </View>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}>
            <View style={styles.icon}>
              <SvgUri svgXmlData={LOGO_RED} />
            </View>
            <View>
              <Text style={styles.txtTitle}>
                HƯỚNG DẪN LÀM BẢO HÀNH 1 ĐỔI 1 CHO MÁY FOREO TRƯỜNG HỢP MÁY BỊ
                LỖI
              </Text>
              <Text style={styles.txtBody}>
                Hiện tại do dịch Covid 19, nên việc vận chuyển hàng từ Việt Nam
                sang TRUNG TÂM BẢO HÀNH DUY NHẤT CỦA FOREO là tại Trung Quốc
                được kiểm duyệt rất khó khăn, các công ty vận chuyên không nhận
                gửi đồ từ Việt Nam sang nữa. Bên mình đã liên hệ với FOREO về
                vấn đề này, và hãng cũng có chính sách linh động hơn, các bạn
                hoàn toàn có thể tự làm, và tự hủy máy tại Việt Nam mà không cần
                gửi đi, và không tôn chi phí. Bài hướng dẫn này bên mình hướng
                dẫn chi tiết cho các bạn hoàn toàn có thể tự làm nhé. Cần thêm
                hỗ trợ các bạn có thể inbox lại bên mình
              </Text>
              <Text style={styles.txtTitle}>B1:MAKE A CLAIM</Text>
              <Text style={styles.txtBody}>
                CÁC BẠN CẦN DÙNG MÁY TÍNH ĐỂ LÀM NHÉ, CHỨ ĐIỆN THOẠI THÌ KHÔNG
                LÀM ĐƯỢC BƯỚC NÀY. SAU ĐÓ CHỈ TRẢ LỜI EMAIL THÔI, NÊN NHỮNG BẠN
                NÀO ĐĂNG NHẬP EMAIL QUA ĐIỆN THOẠI THÌ HOÀN TOÀN TRẢ LỜI QUA ĐÓ
                NHÉ - Đăng nhập tài khoản FOREO của bạn: Vào link:
                <Text style={styles.txtBlue}>
                  https://www.foreo.com/user/login{' '}
                </Text>
                Màn hình sẽ hiện ra như sau:
              </Text>
              <Image
                source={IMAGE.FOREN_6}
                resizeMode="contain"
                style={styles.image}
              />
              <Text style={styles.txtBody}>
                Các bạn nhập thông tin tài khoản FOREO của các bạn: Email và
                Password, ấn vào LOG IN để đăng nhập tài khoản. Màn hình sẽ hiện
                ra như sau:
              </Text>
              <Text style={styles.txtBody}>
                (<Text style={styles.txtTitle}>NOTE</Text>: NHƯNG BẠN KHÔNG TẠO
                TÀI KHOẢN, MÀ SỬ DỤNG CÁC PHÍM TẮT ĐỂ ĐĂNG NHẬP NHƯ: Facebook,
                goolge, Twitter hay Apple các bạn cần đổi sang tk email như trên
                nhé)
              </Text>
              <Image
                source={IMAGE.FOREN_7}
                resizeMode="contain"
                style={styles.image}
              />
              <Text style={styles.txtBody}>
                Đây là phần các model máy bạn đã đăng kí bảo hành, ví dụ trường
                hợp này chiếc máy “LUNA mini 3 Fushia” của mình bị lỗi, mình sẽ
                click vào “MAKE A CLAIM”. Màn hình sẽ hiện ra như sau, các bạn
                điền hết các thông tin mà hãng yêu cầu.
              </Text>
              <Image
                source={IMAGE.FOREN_8}
                resizeMode="contain"
                style={styles.image}
              />
              <Image
                source={IMAGE.FOREN_9}
                resizeMode="contain"
                style={styles.image}
              />
              <Text style={styles.txtBody}>
                Các bạn điền hết thông tin như trên và ấn “MAKE A CLAIM” màn
                hình sẽ hiện ra như sau:
              </Text>
              <Image
                source={IMAGE.FOREN_10}
                resizeMode="contain"
                style={styles.image}
              />
              <Text style={styles.txtBody}>
                Đồng thời hãng cũng sẽ gửi 1 thư vào email của bạn xác nhận đã
                nhận được thông tin yêu cầu bảo hành máy của bạn.
              </Text>
              <Image
                source={IMAGE.FOREN_11}
                resizeMode="contain"
                style={styles.image}
              />
              <Text style={styles.txtBody}>
                NHƯ VẬY LÀ CÁC BẠN ĐÃ HOÀN THÀNH BƯỚC “MAKE A CLAIM”
              </Text>
              <Text style={styles.txtTitle}>
                B2: MÔ TẢ TÌNH TRẠNG LỖI GẶP PHẢI Ở MÁY CỦA BẠN.
              </Text>
              <Text style={styles.txtBody}>
                - Tiếp theo từ 2-3 ngày FOREO sẽ gửi thêm một thư về email của
                bạn, yêu cầu bạn mô tả lỗi và gửi video + hình ảnh chi tiết hơn
                về máy của bạn.
              </Text>
              <Text style={styles.txtBody}>
                - Phần trả lời thư này, các bạn hoàn toàn có thể trả lời bằng
                TIẾNG VIỆT, nếu các bạn không biết viết tiếng anh nhé. Tuy nhiên
                trong phần mô tả các bạn cố gắng trả lời các câu hỏi như: Bạn đã
                thử sạc máy chưa? Khi sạc máy đèn của máy có nháy sáng thể hiện
                đang vào pin hay ko? Sau khi sạc xong thì máy có bật lên được
                không?
              </Text>
              <Text style={styles.txtBlue}>
                - Ví dụ: Mình lấy trường hợp máy của bạn lỗi về pin, tức là sau
                khi các bạn sạc đầy xong, thì máy của bạn chỉ dùng được dưới 7
                ngày. Bạn có thể viết như sau: “Tôi đã thử sạc máy, đèn có sáng
                khi tôi cắm sạc. Sau khi sạc đầy pin, máy của tôi chỉ dùng được
                3 ngày máy lại ngừng hoạt động. Như tôi được biết Luna mini 3 sẽ
                dùng được 3-6 tháng sau 1 lần sạc. Máy tôi đang gặp vấn đề về
                pin. Tôi có gửi kèm hình ảnh mặt trước, mặt sau, và seri number
                (ảnh dưới đấy máy) trong file đính kèm.
              </Text>
              <Text style={styles.txtTitleBlue}>
                NAME: THU PHUONG{'\n'} ADDRESS: 29/84 TRAN QUANG DIEU, DONG DA,
                HA NOI CITY, VIET NAM COUNTRY
              </Text>
              <Text style={styles.txtBlue}>TEL: +84975464011</Text>
              <Text style={styles.txtBody}>
                - Các bạn cư mô tả đúng tình trạng máy của các bạn đang gặp
                phải. Trường hợp một số lỗi như: sạc ko vào điện, rung mạnh và
                rung yếu, sạc vào điện nhưng không bật được lên, hay sạc đầy bật
                lên chỉ 5s lại tắt. Thì các bạn nên quay 1 video ngắn để hiện
                các lỗi đó thì càng tốt, hãng sẽ giải quyết nhanh hơn, lưu ý khi
                quy video nhớ quay phần dược đấy máy để thấy được “Serial
                number” của máy.{'\n'}- LƯU Ý: ở bước mô tả lỗi máy này, các bạn
                nhớ khi trả lời thư hãng cần gửi ảnh mặt trước, mặt sau, mặt
                dưới đáy máy có seri number của máy và 1 video ngắn nhé. Trong
                thư hãng luôn yêu cầu điều đó
              </Text>
              <Text style={styles.txtTitle}>
                B3: YÊU CẦU HỦY MÁY TẠI VIỆT NAM
              </Text>
              <Text style={styles.txtBody}>
                - Sau khi mô tả lỗi máy của bạn xong, hãng sẽ yêu cầu bạn gửi
                máy sang hãng để kiểm tra, và sẽ đổi lại máy mới cho bạn, trường
                hợp máy của bạn lỗi như mô tả.{'\n'}
                Phần thư hãng yêu cầu gửi sang thường như sau:
              </Text>
              <Image
                source={IMAGE.FOREN_12}
                resizeMode="contain"
                style={styles.image}
              />
              <Text style={styles.txtBody}>
                Các bạn sẽ trả lời thư này, nhờ hãng hỗ trợ máy cho hủy tại việt
                nam. Các bạn có thể nêu một vài lý do như: Do dịch bệnh Covid
                phức tạp, việc vận chuyên sang Trung Quốc rất khó khăn. Và tôi
                được biết Foreo có chính sách linh hoạt cho khách hàng, cho phép
                tôi được tiêu hủy máy tại Việt Nam mà không cần phải gửi máy
                sang. Như vậy cũng hạn chế sự lây lan dịch bệnh, tôi sẽ thực
                hiện đầy đủ theo các bước hướng dẫn về hủy máy của các bạn{'\n'}
                Tôi hy vọng bạn đồng ý.
              </Text>
              <Text style={styles.txtTitle}>B4: HỦY MÁY</Text>
              <Text style={styles.txtBody}>
                - Sau khi viết thư gửi yêu cầu hủy máy, hãng sẽ trả lời thư cho
                bạn, nếu họ đồng ý, họ cũng sẽ gửi ảnh hướng dẫn các bạn phá
                máy. Các bạn làm theo hướng dẫn đó là được,{'\n'}- Lưu ý: Nhớ
                chụp lại ảnh máy được tiêu hủy với phần “seri number” và quay
                clip phá máy gửi cho họ.
              </Text>
              <Text style={styles.txtTitle}>
                B5: HÃNG ĐỒNG Ý GỬI MÁY CHO BẠN
              </Text>
              <Text style={styles.txtBody}>
                - Sau khi hủy máy và gửi video cùng hình ảnh phá máy xong, hãng
                sẽ gửi một thư xác nhận sẽ gửi máy về cho các bạn. Như vậy các
                bạn chỉ cần chờ bên vận chuyển gọi điện giao máy mới hãng gửi về
                cho bạn là được nhé.
              </Text>
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
    backgroundColor: COLOR.WHITE,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  header_title: {
    flex: 6,
    alignItems: 'center',
  },
  item: {
    paddingLeft: 16,
    paddingVertical: 15,
  },
  item_text: {
    fontSize: 14,
    color: COLOR.TEXTBODY,
    textTransform: 'uppercase',
  },
  image: {
    width: deviceWidth - 20,
    alignSelf: 'center',
  },
  txtBody: {
    color: COLOR.TEXTBODY,
    lineHeight: 30,
    fontSize: 14,
    fontFamily: STRING.FONT_NORMAL,
  },
  txtTitle: {
    color: COLOR.TEXTBODY,
    lineHeight: 30,
    fontSize: 14,
    fontFamily: STRING.FONT_BOLD,
  },
  txtBlue: {
    color: '#0099cc',
    lineHeight: 30,
    fontSize: 14,
    fontFamily: STRING.FONT_NORMAL,
  },
  txtTitleBlue: {
    color: '#0099cc',
    lineHeight: 30,
    fontSize: 14,
    fontFamily: STRING.FONT_BOLD,
  },
  txtHeader: {
    color: COLOR.TEXTBODY,
    fontSize: 13,
    fontFamily: STRING.FONT_NORMAL,
  },
  content: {paddingHorizontal: 10},
  icon: {alignItems: 'center'},
});
export default GuaranteeForeoScreen;
