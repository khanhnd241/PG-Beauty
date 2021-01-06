import {AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
const TOKEN = 'token';
const USER = 'user';
const ID = 'id';
const TOKEN_FIREBASE = 'TOKEN_FIREBASE';
const FLAG_TOKEN = 'FLAG_TOKEN';
const ADDRESS = 'address';
var Database = {};
//set token
export const setToken = async ({value}) => {
  try {
    await AsyncStorage.setItem(TOKEN, value);
  } catch (error) {
    console.log('setToken err: ', error);
  }
};
setToken.propTypes = {
  value: PropTypes.string.isRequired,
};
//get token
export const getToken = async () => {
  let token = null;
  try {
    token = await AsyncStorage.getItem(TOKEN);
  } catch (err) {
    console.log('getToken: ', err);
  }
  return token;
};
//set user sau khi dang nhap
export const setUserLogin = async ({value}) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(USER, jsonValue);
  } catch (error) {
    console.log('setUserLogin: ', error);
  }
};
setUserLogin.propTypes = {
  value: PropTypes.string.isRequired,
};
//get info user
export const getUserLogin = async () => {
  let user = null;
  try {
    user = await AsyncStorage.getItem(USER);
  } catch (error) {
    console.log('getUserLogin: ', error);
  }
  return JSON.parse(user);
};

//set gio hang theo user id
export const setCartUser = async ({id, value}) => {
  const jsonValue = JSON.stringify(value);
  try {
    await AsyncStorage.setItem(id, jsonValue);
  } catch (error) {
    console.log('setCartUser: ', error);
  }
};
setToken.propTypes = {
  value: PropTypes.string.isRequired,
};
//get gio hang theo user id
export const getCartUser = async (id) => {
  let cart = null;
  try {
    cart = await AsyncStorage.getItem(id);
  } catch (err) {
    console.log('getCartUser: ', err);
  }
  return JSON.parse(cart);
};
// set token firebase
export const setTokenFirebase = async ({value}) => {
  try {
    await AsyncStorage.setItem(TOKEN_FIREBASE, value);
  } catch (error) {
    console.log('setToken err: ', error);
  }
};
setTokenFirebase.propTypes = {
  value: PropTypes.string.isRequired,
};
//get token firebase
export const getTokenFirebase = async () => {
  let token = null;
  try {
    token = await AsyncStorage.getItem(TOKEN_FIREBASE);
  } catch (err) {
    console.log('getToken: ', err);
  }
  return token;
};
// set flag token
export const setFlagToken = async () => {
  let value = FLAG_TOKEN;
  try {
    await AsyncStorage.setItem(TOKEN_FIREBASE, value);
  } catch (error) {
    console.log('setFlagToken err: ', error);
  }
};
//get flag token firebase
export const getFlagToken = async () => {
  let flag = null;
  try {
    flag = await AsyncStorage.getItem(FLAG_TOKEN);
  } catch (err) {
    console.log('getToken: ', err);
  }
  return flag;
};

export const setAddress = async ({value}) => {
  try {
    await AsyncStorage.setItem(ADDRESS, value);
  } catch (error) {
    console.log('setAddress err: ', error);
  }
};
//get flag token firebase
export const getAddress = async () => {
  let address = null;
  try {
    address = await AsyncStorage.getItem(ADDRESS);
  } catch (err) {
    console.log('getAddress: ', err);
  }
  return address;
};
export const removeUserLogin = async () => {
  await AsyncStorage.multiRemove([TOKEN, USER, ID]);
};
Database.setToken = setToken;
Database.getToken = getToken;
Database.setUserLogin = setUserLogin;
Database.getUserLogin = getUserLogin;
Database.setTokenFirebase = setTokenFirebase;
Database.getTokenFirebase = getTokenFirebase;
Database.setFlagToken = setFlagToken;
Database.getFlagToken = getFlagToken;

Database.setAddress = setAddress;
Database.getAddress = getAddress;

Database.removeUserLogin = removeUserLogin;
export default Database;
