import React, { Component, useEffect } from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IMAGE } from './constants/images';
import HomeScreen from './components/tabs/home/HomeScreen';
import FeedScreen from './components/tabs/feed/FeedScreen';
import CategoryScreen from './components/tabs/CategoryScreen';
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
import {ACCOUNT_ACTIVE} from './constants/images/account_active'
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
        activeTintColor: '#BE1E2D',
        inactiveTintColor: 'black',
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
 
  render() {
    return(
      <TabNavigator />

    )
  }
}