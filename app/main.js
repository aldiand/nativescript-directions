import Vue from 'nativescript-vue'
import App from './components/App'
import * as platform from "tns-core-modules/platform";
import Phone from './components/login/Phone'
import EditProfile from './components/login/EditProfile'
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

Vue.filter("L", localize);
Vue.use(Http, {
  baseUrl: "https://api.readydok.com/v1",
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
        showNotifications: true,
        showNotificationsWhenInForeground: true,
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
// var GMSServices;
if (platform.isIOS) {
  GMSServices.provideAPIKey("AIzaSyBuguHQxl8jn3wIk3qkBp9PLAyWGJnhUHw");
}

// check firebase token
firebase.getCurrentPushToken().then(token => {
  // may be null if not known yet
  console.log(`Current push token: ${token}`);
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
  auth.instantLogin();
  new Vue({
    render: h => h('frame', [h(EditProfile)])
  }).$start()
}

