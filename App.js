import React, { Component, useEffect } from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IMAGE } from './constants/images';
import HomeScreen from './components/tabs/HomeScreen';
import FeedScreen from './components/tabs/FeedScreen';
import CategoryScreen from './components/tabs/CategoryScreen';
import Notification from './components/tabs/NotificationScreen';
import AccountScreen from './components/tabs/AccountScreen'
import SvgUri from 'react-native-svg-uri';
const Tab = createBottomTabNavigator();
console.disableYellowBox = true;
function TabNavigator(props) {
  return (
    <Tab.Navigator initialRouteName="Trang chủ"

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Trang chủ') {
            iconName = focused ? IMAGE.ICON_HOME_ACTIVE : IMAGE.ICON_HOME;
          } else if (route.name === 'Feed') {
            iconName = focused ? IMAGE.ICON_FEED_ACTIVE : IMAGE.ICON_FEED;
          } else if (route.name === 'Danh mục') {
            iconName = focused ? IMAGE.ICON_CATEGORY_ACTIVE : IMAGE.ICON_CATEGORY;
          } 
          else if (route.name === 'Thông báo') {
            iconName = focused ? IMAGE.ICON_NOTIFICATION_ACTIVE : IMAGE.ICON_NOTIFICATION;
          } else if (route.name === 'Tôi') {
            iconName = focused ? IMAGE.ICON_ACCOUNT_ACTIVE : IMAGE.ICON_ACCOUNT;
          }
          // You can return any component that you like here!
          return <SvgUri source={iconName} />;
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