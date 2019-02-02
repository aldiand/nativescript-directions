import Vue from 'nativescript-vue'
import App from './components/App'
import DP from './components/mydoctor/DoctorProfile'
import VueDevtools from 'nativescript-vue-devtools'
import { localize } from "nativescript-localize"
import * as firebase from "nativescript-plugin-firebase"
import Http from '@billow/nsv-http'
import { getString } from "application-settings" // Example Only
import * as store from './modules/store'
import * as auth from './modules/auth'



if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
Vue.registerElement('BottomNavigation', () => require('nativescript-bottom-navigation').BottomNavigation);
Vue.registerElement('BottomNavigationTab', () => require('nativescript-bottom-navigation').BottomNavigationTab);
Vue.filter("L", localize);
Vue.use(Http, {
  // Configure a base url for all requests
  baseUrl: "https://api.readydok.com/v1",
  // Example headers, typically this is what we use when interacting with a Laravel Passport API.
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + getString(store.TOKEN, '')
  }
})

firebase.init()
  .then(instance => {
    console.log("firebase.init done");
    firebase.registerForPushNotifications(
      {
        showNotifications: true,
        showNotificationsWhenInForeground: true,
        onPushTokenReceivedCallback: token => console.log(`------------------- token received: ${token}`),
        onMessageReceivedCallback: message => console.log(`------------------- message received`)
      })
      .then(instance => console.log("registerForPushNotifications done"))
      .catch(error => console.log(`-------------- registerForPushNotifications error: ${error}`));
  })
  .catch(error => console.log(`firebase.init error: ${error}`));

if (true) {
  if (auth.isLogin()) {
    new Vue({
      render: h => h('frame', [h(App)])
    }).$start()    
  } else {
    new Vue({
      render: h => h('frame', [h(Phone)])
    }).$start()
  }
}