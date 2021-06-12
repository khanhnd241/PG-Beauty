import React, { Component } from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet, StatusBar, ImageBackground, TouchableOpacity } from 'react-native';
import { IMAGE } from '../../../constants/images';
import SvgUri from 'react-native-svg-uri';
import { STRING } from '../../../constants/string';
import { BACK_BLACK } from '../../../constants/images/back_black';
import { LOGO_RED } from '../../../constants/images/logo_red';
import { COLOR } from '../../../constants/colors';
class InfoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            version: '4.0',
            appGuide: '- Khi tải về quý khách cài đặt và mở ứng dụng lên \n- Quý khách không cần đăng ký tài khoản vẫn có thể xem và đặt hàng online từ app \n- Để được tích điểm khi mua hàng hay review sản phẩm, tham gia bình luận newfeed quý khách phải đăng ký tài khoản tại mục Tôi -> chọn mục đăng ký tài khoản. Với những khách hàng đã đăng ký tài khoản thì chọn mục đăng nhập và nhập thông tin để đăng nhập vào ứng dụng.',
            policyDelivery:'Chính sách giao hàng :\n - Free ship đối với đơn hàng 2 sp bất kì ( không áp dụng đối với sp đã giảm giá). Đối với khu vực nội thành phí ship là 20-30k/đơn hàng. Khu vực ngoại thành và ship tỉnh phí ship là 30-35k ',
            returnPolicy: 'Chính sách đổi hàng \n- Với đơn hàng khách mua tại shop : hàng đã mua thì không đổi  hàng. Việc bảo quản hàng hóa cửa hàng không thể đảm bảo sau khi khách hàng đã mang ra khỏi cửa hàng, khách hàng kiểm tra đúng sản phẩm trước khi thanh toán để bảo đảm quyền lợi của khách hàng \n- Với khách hàng mua online: Khách hàng có thể đổi sản phẩm tương đương hoặc cao hơn giá sản phẩm đổi, và phải đảm bảo 100% sản phẩm đổi không bị mở niêm phong và thử. khách hàng đổi sảm phẩm vui lòng mang hóa đơn qua cửa hàng để được đổi.',
            introduce: '- PGBeauty một nơi thoả sức mua sắm mỹ phẩm. Shop tuyển chọn những thỏi son tinh tế nhất, những chai nước hoa tới từ nước pháp và skincare tuyệt với nhất!\n- Mỹ phẩm chính hãng làm đẹp với các tính năng và hiệu quả bất ngờ. Bên mình cam kết bán hàng đảm bảo chất lượng tới các bạn !',
            paymentPolicy: 'Các bạn có thể mua hàng \nGiao hàng nhận tiền: Khách hàng có thể nhận hàng rồi thanh toán tiền cho shipper.\nHình thức chuyển khoản: Khách hàng sử dụng hình thức ck theo ngân hàng sau \n1. Agribank: TK:1500216246139 CTK: Bùi Thị Thu Phương \n2. Vietcombank TK: 0021000289434 CTK: Bùi Thị Thu Phương Vietcombank Thành Công, Hà Nội \n3. BIDV TK: 21110000395217 CTK: Bùi Thị Thu Phương BIDV Hà Nội \n4. Vietinbank TK:100001528452 CTK: Bùi Thị Thu Phương Vietinbank Đống Đa, Hà Nộ\n5. Techcombank TK:19029567097012 CTK: Nguyễn Mạnh Cường'
        };
    }
    render() {
        return (
            <SafeAreaView style={styles.screen}>
                <StatusBar backgroundColor={COLOR.PRIMARY} />
                <View style={styles.background}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={styles.header_back}>
                            <SvgUri svgXmlData={BACK_BLACK} />
                        </TouchableOpacity>
                        <View style={styles.header_title}>
                            <Text style={{ color: COLOR.TEXTBODY, fontSize: 16 }}>{STRING.INFO}</Text>
                        </View>
                        <View style={{ flex: 1 }}></View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <SvgUri svgXmlData={LOGO_RED} />
                    </View>
                    <View style={{ marginTop: 27, borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                    <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('InfoDetailScreen',{title:STRING.USE_GUIDE, content: this.state.appGuide})}>
                        <Text style={styles.item_text}>{STRING.USE_GUIDE}</Text>
                    </TouchableOpacity>
                    <View style={{ borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                    <TouchableOpacity style={styles.item}>
                        <Text style={styles.item_text}>{STRING.SHOPPING_GUIDE}</Text>
                    </TouchableOpacity>
                    <View style={{ borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                    <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('InfoDetailScreen',{title:STRING.PAYMENT_POLICY, content: this.state.paymentPolicy})}>
                        <Text style={styles.item_text}>{STRING.PAYMENT_POLICY}</Text>
                    </TouchableOpacity>
                    <View style={{ borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                    <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('InfoDetailScreen',{title:STRING.POLICY_DELIVERY, content: this.state.policyDelivery})}>
                        <Text style={styles.item_text}>{STRING.POLICY_DELIVERY}</Text>
                    </TouchableOpacity>
                    <View style={{ borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                    <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('InfoDetailScreen',{title:STRING.RETURN_POLICY, content: this.state.returnPolicy})}>
                        <Text style={styles.item_text}>{STRING.RETURN_POLICY}</Text>
                    </TouchableOpacity>
                    <View style={{ borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                    <TouchableOpacity style={styles.item}>
                        <Text style={styles.item_text}>{STRING.TERM_OF_USE_POLICY}</Text>
                    </TouchableOpacity>
                    <View style={{ borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                    <TouchableOpacity style={styles.item}>
                        <Text style={styles.item_text}>{STRING.SHOPS}</Text>
                    </TouchableOpacity>
                    <View style={{ borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                    <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('InfoDetailScreen',{title:STRING.INTRODUCE_PG_BEAUTY, content: this.state.introduce})}>
                        <Text style={styles.item_text}>{STRING.INTRODUCE_PG_BEAUTY}</Text>
                    </TouchableOpacity>
                    <View style={{ borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                    <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('GuaranteeForeoScreen',{title:STRING.ACTIVE_GUARANTEE_FOREO})}>
                        <Text style={styles.item_text}>{STRING.ACTIVE_GUARANTEE_FOREO}</Text>
                    </TouchableOpacity>
                    <View style={{ borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                    <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 16, paddingVertical: 15 }}>
                        <View style={{ flex: 6 }}>
                            <Text style={styles.item_text}>{STRING.VERSION}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.item_text}>{this.state.version}</Text>

                        </View>
                    </View>
                    <View style={{ borderColor: COLOR.GRAY, borderTopWidth: 0.5 }} />
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLOR.PRIMARY
    },
    background: {
        backgroundColor: COLOR.WHITE,
        flex: 1
    },
    header: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20
    },
    header_back: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header_title: {
        flex: 6,
        alignItems: 'center'
    },
    item: {
        paddingLeft: 16,
        paddingVertical: 15
    },
    item_text: {
        fontSize: 14,
        color: COLOR.TEXTBODY,
        textTransform: 'uppercase'
    }
})
export default InfoScreen;