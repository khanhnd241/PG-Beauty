import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { lessThan } from 'react-native-reanimated';

class FCMService {
    register = (onRegister, onNotification, onOpenNotification) => {
        this.checkPermission(onRegister);
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification)
    }

    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
        

    }

    checkPermission = (onRegister) => {
        messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    this.getToken(onRegister)
                } else {
                    this.requestPermission(onRegister);
                }
            }).catch(error => {
                console.log('[FCMService] Permission rejected ', error);
            })
    }
    getToken = (onRegister) => {
        messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    onRegister(fcmToken);
                } else {
                    console.log('[FCM Service] User does not have device token');
                }
            }
            ).catch(error => {
                console.log('[FCM Service] get token rejected ', error);
            })
    }

    requestPermission = (onRegister) => {
        messaging().requestPermission()
        .then(() => {
            this.getToken(onRegister)
        }).catch(error => {
            console.log('[FCM Service] Request Permission rejected ',error);
        })
    }

    deleteToken = () => {
        console.log("[FCMService] deleteToken");
        messaging().deleteToken()
        .catch(error => {
            console.log('[FCM Service] Delete token error ', error)
        })
    }

    createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {
        // when app is running, but in the background
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log('[FCM Service] onNotificationApp caused app to open');
            if(remoteMessage) {
                console.log('remote message background + ', remoteMessage);
                // let notification = remoteMessage.notification;
                onOpenNotification(remoteMessage.notification);
            }
        })
        // when app is opened from a quit state
        messaging().getInitialNotification()
        .then(remoteMessage => {
            console.log('[FCM Service] getInitialNotification Notification caused app to open');

            if(remoteMessage) {
                console.log('remote message quit state + ', remoteMessage);
                // let notification = remoteMessage.notification;
                onOpenNotification(remoteMessage.notification);
            }
        });
        //Foreground state messages
        this.messageListener = messaging().onMessage(async remotMessage => {
            console.log('[FCM Service] A new FCM message arrived! ',remotMessage);
            if(remotMessage) {
                let notification = null;
                // if(Platform.OS === 'ios') {
                //     notification = remotMessage.notification;
                // } else {
                    notification = remotMessage.notification;
                // }
                onNotification(notification);
            }
        })
        //refresh token
        messaging().onTokenRefresh(fcmToken => {
            console.log('[FCM Service] New token refresh: ', fcmToken);
            onRegister(fcmToken);
        })
    }
    unRegister = () => {
        this.messageListener()
    }
}
export const fcmService = new FCMService()