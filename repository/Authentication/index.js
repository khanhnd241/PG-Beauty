import PropTypes from 'prop-types';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import DATABASE from '../../config/database';

import { API } from '../../constants/api';
export const sendToken = async ({ token }) => {
    let body = {
        device_token: token,
        device_id: DeviceInfo.getUniqueId(),
    };
    axios
        .post(API.URL + API.DEVICE_TOKEN, body)
        .then((res) => {
            if (__DEV__) {
                console.log(res.data);
            }
            DATABASE.setFlagToken();
            DATABASE.setTokenFirebase({value: token});
        })
        .catch((err) => {
            if (__DEV__) {
                console.log(err.response.data)
            }
        });
};
sendToken.propTypes = {
    token: PropTypes.string.isRequired,
};
