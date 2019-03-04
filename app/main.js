import Vue from 'nativescript-vue'
import App from './components/App'
import * as platform from "tns-core-modules/platform";
import Phone from './components/login/Phone'
import Verif from './components/login/Verif'
import NewMessage from './components/inbox/NewMessage'
import VueDevtools from 'nativescript-vue-devtools'
import { localize } from "nativescript-localize"
import * as firebase from "nativescript-plugin-firebase"
import Http from '@billow/nsv-http'
import { getString } from "application-settings" // Example Only
import * as store from './modules/store'
import * as commonapi from './modules/commonapi'
import * as auth from './modules/auth'
import * as component from './modules/component'
import * as notification from './modules/notification'
import RadListView from 'nativescript-ui-listview/vue';
import { LocalNotifications } from "nativescript-local-notifications";
import * as app from 'tns-core-modules/application'
require("nativescript-plugin-firebase");
require("nativescript-localstorage");

component.setUpComponent()

Vue.prototype.$isAndroid = platform.isAndroid;
Vue.prototype.$isIOS = platform.isIOS;

if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
Vue.registerElement('BottomNavigation', () => require('nativescript-bottom-navigation').BottomNavigation);
Vue.registerElement('BottomNavigationTab', () => require('nativescript-bottom-navigation').BottomNavigationTab);
Vue.registerElement('Shimmer', () => require('nativescript-shimmer').Shimmer);
Vue.registerElement('DropDown', () => require('nativescript-drop-down/drop-down').DropDown);
Vue.registerElement('MapView', () => require('nativescript-google-maps-sdk').MapView);
Vue.registerElement('ImageCacheIt', () => require('nativescript-image-cache-it').ImageCacheIt);
Vue.registerElement("PreviousNextView", () => require("nativescript-iqkeyboardmanager").PreviousNextView)

Vue.filter("L", localize);
Vue.use(Http, {
  baseUrl: "https://readydok.com/api/v1/android",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + getString(store.TOKEN, '')
  }
});
Vue.use(RadListView);

firebase.init()
  .then(instance => {
    console.log("firebase.init done");
    firebase.registerForPushNotifications(
      {
        displayNotifications: false,
        showNotifications: false,
        showNotificationsWhenInForeground: false,
        onPushTokenReceivedCallback: token => {
          console.log(`------------------- token received: ${token}`) 
          store.set(store.FCM, token);
          commonapi.updateProfile(success => console.log(success),
            error=> console.log(error));
        },
        onMessageReceivedCallback: message => {
          console.log(message);
          notification.makeNotif(message);
        }
      })
      .then(instance => {
        console.log("registerForPushNotifications done")
      })
      .catch(error => console.log(`-------------- registerForPushNotifications error: ${error}`));
  })
  .catch(error => console.log(`firebase.init error: ${error}`));

// Maps
if (platform.isIOS) {
  GMSServices.provideAPIKey("AIzaSyBuguHQxl8jn3wIk3qkBp9PLAyWGJnhUHw");
}

// check firebase token
firebase.getCurrentPushToken().then(token => {
  // may be null if not known yet
  console.log(`Current push token: ${token}`);
  console.log(`Current api token: ` + getString(store.TOKEN, ''));
});

if (true) {
  if (auth.isLogin()) {
    console.log("open main");
    new Vue({
      render: h => h('frame', [h(App)])
    }).$start()
  } else {
    console.log("open phone");
    new Vue({
      render: h => h('frame', [h(Phone)])
    }).$start()
  }
} else {
  new Vue({
    render: h => h('frame', [h(Verif)])
  }).$start()
}

