import React, { Component, useEffect } from 'react';
import { StatusBar, View, SafeAreaView, Image, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IMAGE } from './constants/images';
import HomeScreen from './components/tabs/home/HomeScreen';
import FeedScreen from './components/tabs/feed/FeedScreen';
import CategoryScreen from './components/tabs/categories/CategoryScreen';
import Notification from './components/tabs/NotificationScreen';
import AccountScreen from './components/tabs/account/AccountScreen';
import SvgUri from 'react-native-svg-uri';
import {HOME} from './constants/images/home';
import {HOME_ACTIVE} from './constants/images/home_active';
import {FEED} from './constants/images/feed';
import {FEED_ACTIVE} from './constants/images/feed_active';
import {CATEGORY} from './constants/images/category';
import {CATEGORY_ACTIVE} from './constants/images/category_active';
import {NOTIFICATION} from './constants/images/notification';
import {NOTIFICATION_ACTIVE} from './constants/images/notification_active';
import {ACCOUNT} from './constants/images/account';
import {ACCOUNT_ACTIVE} from './constants/images/account_active';
import {COLOR} from './constants/colors';
import {fcmService} from './components/firebase/FCMService';
import LocalNotificationService from './components/firebase/LocalNotificationService'
const Tab = createBottomTabNavigator();
console.disableYellowBox = true;
function TabNavigator(props) {
  return (
    <Tab.Navigator initialRouteName="Trang chủ"

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Trang chủ') {
            iconName = focused ? HOME_ACTIVE : HOME;
          } else if (route.name === 'Feed') {
            iconName = focused ? FEED_ACTIVE : FEED;
          } else if (route.name === 'Danh mục') {
            iconName = focused ? CATEGORY_ACTIVE : CATEGORY;
          } 
          else if (route.name === 'Thông báo') {
            iconName = focused ? NOTIFICATION_ACTIVE : NOTIFICATION;
          } else if (route.name === 'Tôi') {
            iconName = focused ? ACCOUNT_ACTIVE : ACCOUNT;
          }
          // You can return any component that you like here!
          return <SvgUri svgXmlData={iconName} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: COLOR.PRIMARY,
        inactiveTintColor: COLOR.PLACEHODER,
        tabStyle: {
          backgroundColor:COLOR.WHITE
        }
      }}
    >
      <Tab.Screen name="Trang chủ" component={HomeScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Danh mục" component={CategoryScreen} />
      <Tab.Screen name="Thông báo" component={Notification} />
      <Tab.Screen name="Tôi" component={AccountScreen} />
    </Tab.Navigator>
  );
}
export default class App extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount = () => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    LocalNotificationService.configure(onOpenNotification);
    function onRegister(token) {
      console.log("[App] onRegister: ",token);
    }

    function onNotification(notify) {
      console.log("[App] onNotification: ", notify);
      const options = {
        soundName: 'default',
        playSound: true
      }
      LocalNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      )
    }
    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification: ', notify)
      alert('Open Notification: ' + notify.body)
    }
    return () => {
      console.log('[App] unRegister')
      fcmService.unRegister()
      LocalNotificationService.unregister()
    }
  }
  render() {
    return(
      <TabNavigator />
    )
  }
}