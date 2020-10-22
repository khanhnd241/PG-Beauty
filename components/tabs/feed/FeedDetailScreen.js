import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  StatusBar,
  AsyncStorage,
  Alert,
} from 'react-native';
import {IMAGE} from '../../../constants/images';
import SvgUri from 'react-native-svg-uri';
import {STRING} from '../../../constants/string';
import {LIKE} from '../../../constants/images/like';
import {COMMENT} from '../../../constants/images/comment';
import {SHARE} from '../../../constants/images/share';
import {BACK_BLACK} from '../../../constants/images/back_black';
import {Rating, AirbnbRating} from 'react-native-ratings';
import PhotoGrid from 'react-native-thumbnail-grid';
import {COLOR} from '../../../constants/colors';
import ImageView from 'react-native-image-view';
import {ICON_AVATAR} from '../../../constants/images/icon_avatar';
import axios from 'axios';
import {API} from '../../../constants/api';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HTMLView from 'react-native-htmlview';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
function ItemComment({userName, content}) {
  // const [users, setUser] = useState(JSON.stringify(user));
  return (
    <View>
      <View style={styles.item_comment_container}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: COLOR.GRAY,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SvgUri svgXmlData={ICON_AVATAR} />
            </View>
          </View>
          <View
            style={{
              flex: 6,
              backgroundColor: COLOR.GRAY,
              borderWidth: 0.5,
              padding: 14,
            }}>
            <Text style={{fontFamily: STRING.FONT_NORMAL}}>
              <Text style={{fontFamily: STRING.FONT_BOLD}}>{userName} </Text>
              {content}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
class FeedDetailScreen extends Component {
  constructor(props) {
    super(props);
    const {id, likeCount, commentsCount, rate} = this.props.route.params;
    this.state = {
      id: id,
      isLike: false,
      feeId: id,
      rate: rate,
      image: [],
      title: 'Giảm giá 30% cho Son cao cấp h_e_rmes',
      time: '12 giờ trước',
      content: '',
      avatar: IMAGE.ANH_DEMO_1,
      likeCount: likeCount,
      commentsCount: parseInt(commentsCount),
      userName: '',
      refesh: false,
      listComment: [],
      comment: '',
      isViewImage: false,
      imageView: [],
      createdAt: '',
      isComment: true,
      token: '',
      isLogin: false,
    };
  }
  likePost = () => {
    if (this.state.token === null || this.state.token === '') {
      Alert.alert(STRING.NOTIFI, STRING.MUST_LOGIN_TO_LIKE_AND_COMMENT);
    } else {
      if (this.state.isLike === false) {
        let data = {};
        this.setState(
          {isLike: true, likeCount: this.state.likeCount + 1},
          () => {
            const config = {
              headers: {
                Authorization: `Bearer ${this.state.token}`,
              },
            };
            axios
              .post(API.URL + API.LIKE + this.state.id, data, config)
              .then((response) => {
                Alert.alert(
                  STRING.NOTIFI,
                  JSON.stringify(response.data.success),
                  [{text: STRING.ACCEPT}],
                );
              })
              .catch((error) => {
                Alert.alert(
                  STRING.ERROR,
                  JSON.stringify(error.response.data.error),
                  [{text: STRING.ACCEPT}],
                );
                if (__DEV__) {
                  console.log(JSON.stringify(error.response));
                }
              });
          },
        );
      } else {
        this.setState({likeCount: this.state.likeCount - 1, isLike: false});
      }
    }
  };
  reload = () => {
    this.setState({refesh: false});
  };
  sendComment = () => {
    let comment = {};
    comment.user_name = this.state.userName;
    (comment.content = this.state.comment),
      this.setState({comment: ''}, () => {
        let data = {content: comment.content};
        if (this.state.token == null || this.state.token == '') {
          Alert.alert(STRING.NOTIFI, STRING.MUST_LOGIN_TO_LIKE_AND_COMMENT);
        } else {
          const config = {
            headers: {
              Authorization: `Bearer ${this.state.token}`,
            },
          };
          axios
            .post(API.URL + API.COMMENT + this.state.id, data, config)
            .then((response) => {
              Alert.alert(
                STRING.NOTIFI,
                JSON.stringify(response.data.success),
                [{text: STRING.ACCEPT}],
              );
              this.state.listComment.push(comment);
              this.setState({
                refesh: true,
                commentsCount: this.state.commentsCount + 1,
              });
              this.reload();
            })
            .catch((error) => {
              Alert.alert(
                STRING.ERROR,
                JSON.stringify(error.response.data.error),
                [{text: STRING.ACCEPT}],
              );
              if (__DEV__) {
                console.log(JSON.stringify(error.response));
              }
            });
        }
      });
  };
  // scrollToEnd = () => {
  //     this.scrollView.scrollTo({x: 0, y: 500, animated: true});
  // }
  componentDidMount = () => {
    // this.scrollToEnd();
    let imageView = [];
    let image = {
      source: {
        uri: '',
      },
      width: 800,
    };
    for (let i = 0; i < this.state.image.length; i++) {
      image.source.uri = this.state.image[i];
      imageView.push(image);
    }
    this.setState({imageView: imageView});
    fetch(API.URL + API.NEWS + '/' + this.state.id)
      .then((response) => response.json())
      .then((json) => {
        let image = [];
        image.push(json.success.photo);
        this.setState({
          listComment: json.success.comments,
          content: json.success.content,
          image: image,
          title: json.success.title,
          createdAt: moment(json.success.created_at).format('DD-MM-YYYY'),
          commentsCount: parseInt(json.success.comment_cnt),
          likeCount: parseInt(json.success.like),
        });
      })
      .catch((error) => {
        if (__DEV__) {
          console.error(error);
        }
      });
    AsyncStorage.getItem('name', (err, name) => {
      if (name) {
        this.setState({userName: name});
      }
    });
    AsyncStorage.getItem('token', (err, token) => {
      if (token) {
        this.setState({token: token, isLogin: true});
      } else {
        this.setState({isLogin: false});
      }
    });
  };
  formatDate = () => {
    let today = new Date();
    let createdAt = moment(this.state.createdAt).diff();
    let subDate = Date.parse(today) - Date.parse(createdAt);
    if (subDate < 60000) {
      return STRING.FEW_SECOND_AGO;
    }
    if (60000 < subDate && subDate < 3600000) {
      let minutes = Math.floor(subDate / 60000);
      return minutes + STRING.MINUTES_AGO;
    }
    if (3600000 < subDate && subDate < 86400000) {
      let hours = Math.floor(subDate / 3600000);
      return hours + STRING.HOURS_AGO;
    }
    if (subDate > 86400000) {
      let createdAt = moment(this.state.createdAt).format('DD-MM-YYYY');
      return createdAt;
    }
  };
  focusInputComment = () => {
    if (this.state.isLogin) {
      this.secondTextInput.focus();
    }
  };
  render() {
    const {
      image,
      title,
      rate,
      time,
      content,
      commentsCount,
      avatar,
      likeCount,
      user,
    } = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: COLOR.PRIMARY}}>
        <StatusBar barStyle="light-content" backgroundColor={COLOR.PRIMARY} />
        <View style={{flex: 1, backgroundColor: COLOR.WHITE}}>
          <View style={styles.header}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity
                style={styles.btnBack}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <SvgUri svgXmlData={BACK_BLACK} fill={COLOR.WHITE} />
              </TouchableOpacity>
            </View>
            <View style={styles.title}>
              <Text style={styles.title_text}>{STRING.PG_BEAUTY_FEED}</Text>
            </View>
            <View style={{flex: 1}}></View>
          </View>
          <ScrollView
            ref={(ref) => {
              this.scrollView = ref;
            }}
            onContentSizeChange={() =>
              this.scrollView.scrollToEnd({animated: true})
            }>
            <View style={styles.item_container}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Image source={IMAGE.ICON_APP} style={styles.avatar} />
                </View>
                <View style={{flexDirection: 'column', flex: 4}}>
                  <Text style={styles.item_title}>{title}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                      alignItems: 'center',
                    }}>
                    <Rating
                      readonly
                      type="custom"
                      startingValue={rate}
                      ratingCount={5}
                      imageSize={15}
                      tintColor={COLOR.WHITE}
                      ratingColor={COLOR.PRIMARY}
                      style={{backgroundColor: COLOR.WHITE, marginLeft: 2}}
                    />
                    <Text style={styles.item_timeline}>
                      {this.state.createdAt}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{marginTop: 10}}>
                <HTMLView value={content} />
                <PhotoGrid
                  width={deviceWidth - 20}
                  source={image}
                  ratio={0.5}
                  onPressImage={(uri) => {
                    this.setState({isViewImage: true});
                  }}
                />
                <View style={{flexDirection: 'row', marginLeft: 10}}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <SvgUri svgXmlData={LIKE} fill={COLOR.PRIMARY} />
                    <Text style={styles.text_comment}>{likeCount}</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row-reverse',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.text_comment}>{STRING.COMMENT_2}</Text>
                    <Text style={styles.text_comment}>{commentsCount}</Text>
                  </View>
                </View>
                <View
                  style={{borderTopWidth: 0.5, borderTopColor: COLOR.LINE}}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}>
                  {this.state.isLike ? (
                    <TouchableOpacity
                      onPress={this.likePost}
                      style={styles.btnLike}>
                      <SvgUri svgXmlData={LIKE} fill={COLOR.PRIMARY} />
                      <Text
                        style={{
                          marginLeft: 7,
                          color: COLOR.PRIMARY,
                          fontFamily: STRING.FONT_NORMAL,
                        }}>
                        {STRING.LIKE}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={this.likePost}
                      style={styles.btnLike}>
                      <SvgUri svgXmlData={LIKE} />
                      <Text
                        style={{marginLeft: 7, fontFamily: STRING.FONT_NORMAL}}>
                        {STRING.LIKE}
                      </Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    onPress={this.focusInputComment}
                    style={styles.btnComment}>
                    <SvgUri svgXmlData={COMMENT} />
                    <Text
                      style={{marginLeft: 8, fontFamily: STRING.FONT_NORMAL}}>
                      {STRING.COMMENT_1}
                    </Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  // inverted={true}
                  style={{marginBottom: 60}}
                  extraData={this.state.refesh}
                  data={this.state.listComment}
                  renderItem={({item}) => {
                    return (
                      <ItemComment
                        content={item.content}
                        userName={item.user_name}
                      />
                    );
                  }}
                />
              </View>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            {this.state.isLogin ? (
              <View style={styles.inputContain}>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <View style={styles.avaCmt}>
                    <SvgUri svgXmlData={ICON_AVATAR} />
                  </View>
                </View>
                <TextInput
                  onFocus={() => {
                    this.scrollView.scrollToEnd();
                  }}
                  ref={(input) => {
                    this.secondTextInput = input;
                  }}
                  onChangeText={(value) => this.setState({comment: value})}
                  style={styles.input}
                  placeholder={STRING.WRITE_COMMENT}
                  autoFocus={this.state.isComment}
                  value={this.state.comment}
                />
                <TouchableOpacity
                  onPress={this.sendComment}
                  style={{flex: 1, alignItems: 'center'}}>
                  <Text style={{fontFamily: STRING.FONT_SEMI_BOLD}}>
                    {STRING.SEND}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.txtMustLogin}>
                {STRING.MUST_LOGIN_TO_LIKE_AND_COMMENT}
              </Text>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: COLOR.PRIMARY,
    height: 46,
    flexDirection: 'row',
  },
  title: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {},
  title_text: {
    fontSize: 16,
    color: COLOR.WHITE,
    fontFamily: STRING.FONT_BOLD,
  },
  tab_active: {
    width: 95,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    width: 101,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_active: {
    color: COLOR.PRIMARY,
    fontSize: 12,
    textAlign: 'center',
  },
  text: {
    color: COLOR.DESCRIPTION,
    fontSize: 12,
    textAlign: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 13,
  },
  avatar_comment: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  item_container: {
    backgroundColor: COLOR.WHITE,
    marginHorizontal: 10,
    marginTop: 10,
  },
  item_comment_container: {
    backgroundColor: COLOR.WHITE,
    marginVertical: 5,
  },
  text_content: {
    color: COLOR.DESCRIPTION,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: STRING.FONT_NORMAL,
  },
  item_title: {
    color: COLOR.TEXTBODY,
    fontSize: 14,
    fontFamily: STRING.FONT_BOLD,
  },
  item_timeline: {
    marginLeft: 5,
    color: COLOR.PLACEHODER,
    fontSize: 12,
  },
  text_comment: {
    color: COLOR.PLACEHODER,
    fontSize: 12,
    padding: 2,
    marginLeft: 3,
    fontFamily: STRING.FONT_NORMAL,
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 20,
    flex: 6,
    height: 40,
    fontSize: 12,
    borderColor: COLOR.LINE,
    padding: 10,
    fontFamily: STRING.FONT_NORMAL,
  },
  btnBack: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnComment: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnLike: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 5,
  },
  txtMustLogin: {
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: STRING.FONT_NORMAL,
    fontSize: 13,
  },
  avaCmt: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLOR.GRAY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: COLOR.WHITE,
    flex: 1,
    position: 'absolute',
    bottom: 0,
    width: deviceWidth,
  },
  inputContain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    height: 40,
  },
});
export default FeedDetailScreen;
