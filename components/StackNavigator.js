import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import App from '../App';
import HomeScreen from '../components/tabs/home/HomeScreen';
import LoginScreen from './login/LoginScreen';
import ForgotPassScreen from './login/ForgotPassScreen';
import RegisterScreen from './login/RegisterScreen';
import InfoScreen from '../components/tabs/account/InfoScreen';
import FeedDetailScreen from '../components/tabs/feed/FeedDetailScreen';
import ProductDetailScreen from '../components/tabs/home/ProductDetailScreen';
import CartDetailScreen from '../components/cart/CartDetailScreen';
import OrderInfomationScreen from '../components/cart/OrderInfomationScreen';
import PayScreen from '../components/cart/PayScreen';
import PaymentMethodsScreen from '../components/cart/PaymentMethodsScreen';
import ListProductsScreen from './products/ListProductsScreen';
import HistoryScreen from '../components/tabs/account/HistoryScreen';
import OrderDetailScreen from '../components/tabs/account/OrderDetailScreen';
import SearchProductsScreen from '../components/tabs/home/SearchProductsScreen';
import InfoDetailScreen from '../components/tabs/account/InfoDetailScreen';
import GuaranteeForeoScreen from '../components/tabs/account/GuaranteeForeoScreen';
import codePush from 'react-native-code-push';
const navOptionHandler = () => ({
  headerShown: false,
});
const Stack = createStackNavigator();
class StackNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={navOptionHandler}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={navOptionHandler}
          />
          <Stack.Screen name="App" component={App} options={navOptionHandler} />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={navOptionHandler}
          />
          <Stack.Screen
            name="ForgotPassScreen"
            component={ForgotPassScreen}
            options={navOptionHandler}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={navOptionHandler}
          />
          <Stack.Screen
            name="InfoScreen"
            component={InfoScreen}
            options={navOptionHandler}
          />
          <Stack.Screen
            name="FeedDetailScreen"
            component={FeedDetailScreen}
            options={navOptionHandler}
          />
          <Stack.Screen
            name="ProductDetailScreen"
            component={ProductDetailScreen}
            options={navOptionHandler}
          />
          <Stack.Screen
            name="CartDetailScreen"
            component={CartDetailScreen}
            options={navOptionHandler}
          />
          <Stack.Screen
            name="OrderInfomationScreen"
            component={OrderInfomationScreen}
            options={navOptionHandler}
          />
          <Stack.Screen
            name="PayScreen"
            component={PayScreen}
            options={navOptionHandler}
          />
          <Stack.Screen
            name="PaymentMethodsScreen"
            component={PaymentMethodsScreen}
            options={navOptionHandler}
          />
          <Stack.Screen
            name="ListProductsScreen"
            component={ListProductsScreen}
            options={navOptionHandler}
          />
          <Stack.Screen
            name="HistoryScreen"
            component={HistoryScreen}
            options={navOptionHandler}
          />
          <Stack.Screen
            name="OrderDetailScreen"
            component={OrderDetailScreen}
            options={navOptionHandler}
          />
          <Stack.Screen
            name="SearchProductsScreen"
            component={SearchProductsScreen}
            options={navOptionHandler}
          />
          <Stack.Screen
            name="InfoDetailScreen"
            component={InfoDetailScreen}
            options={navOptionHandler}
          />
          <Stack.Screen
            name="GuaranteeForeoScreen"
            component={GuaranteeForeoScreen}
            options={navOptionHandler}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
};
export default codePush(codePushOptions)(StackNavigator);
