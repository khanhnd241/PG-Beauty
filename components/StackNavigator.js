import React, { Component } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from './SplashScreen';
import App from '../App';
import LoginScreen from './login/LoginScreen'
const navOptionHandler = () => ({
    headerShown: false
})
const Stack = createStackNavigator();
class StackNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <NavigationContainer >
                <Stack.Navigator initialRouteName="SplashScreen">
                    <Stack.Screen name="SplashScreen" component={SplashScreen} options={navOptionHandler} />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} options={navOptionHandler} />
                    <Stack.Screen name="App" component={App} options={navOptionHandler} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default StackNavigator;