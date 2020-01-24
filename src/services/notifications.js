import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform, Linking} from 'react-native';
import axios from 'axios';
import navigation from './navigation';
import * as api from '../constants/api';
import * as notifications from '../constants/notifications';

export default class PushNotificationService {
  constructor() {
    this.configure();
  }

  configure() {
    PushNotification.configure({
      onRegister: async ({os, token}) => {
        await axios.post(api.REGISTER_TOKEN_API, {
          device_brand: os === 'android' ? 'Android' : 'Apple',
          device_token: token,
          brand: 'e5',
        });
      },
      onNotification: notification => {
        const {data} = notification;
        const {type} = data;
        if (
          (Platform.OS === 'android' && !notification.foreground) ||
          Platform.OS === 'ios'
        ) {
          switch (type) {
            case 'newsletter':
              Linking.openURL('http://www.google.com');
              break;

            case 'event':
              navigation.navigate('Events');
              break;

            default:
              break;
          }
        }
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      senderID: notifications.FCM_SENDER_ID,
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }
}
