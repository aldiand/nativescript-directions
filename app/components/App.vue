<template>
  <Page class="page" actionBarHidden="true" @loaded="onLoaded">
    <StackLayout>
      <GridLayout rows="*, auto">
        <StackLayout row="0" >
          <MyDoctor v-bind:visibility="tabId == 0 ? 'visible': 'collapse'"/>
          <Appointment v-if="appointment" v-bind:visibility="tabId == 1 ? 'visible': 'collapse'"/>
          <Inbox v-if="inbox" v-bind:visibility="tabId == 2 ? 'visible': 'collapse'"/>
          <Reminder v-if="reminder" v-bind:visibility="tabId == 3 ? 'visible': 'collapse'"/>
          <Account v-if="account" v-bind:visibility="tabId == 4 ? 'visible': 'collapse'"/>
        </StackLayout>
        <BottomNavigation @tabSelected="onBottomNavigationTabSelected" row="1">
          <BottomNavigationTab :title="'home'|L" icon="ic_home"/>
          <BottomNavigationTab :title="'appointments'|L" icon="ic_no_appointment"/>
          <BottomNavigationTab :title="'inboxs'|L" icon="ic_mail_new"/>
          <BottomNavigationTab :title="'reminders'|L" icon="ic_reminder_new"/>
          <BottomNavigationTab :title="'accounts'|L" icon="ic_account_new"/>
        </BottomNavigation>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import Vue from "nativescript-vue";
import Splash from "./Splash";
import MyDoctor from "./home/MyDoctor";
import Account from "./home/Account";
import Appointment from "./home/Appointment";
import Inbox from "./home/Inbox";
import Reminder from "./home/Reminder";
import DetailInbox from "./inbox/DetailInbox";
import * as commonapi from "../modules/commonapi";
import { OnTabSelectedEventData } from "nativescript-bottom-navigation";
import { LocalNotifications } from "nativescript-local-notifications";
import DetailAppointment from "~/components/appointment/DetailAppointment";
import ReminderDetail from "~/components/reminder/Reminder";
import * as notification from "~/modules/notification.js";
let LS = require("nativescript-localstorage");
import * as app from "tns-core-modules/application";
import * as firebase from "nativescript-plugin-firebase";
import { topmost } from "ui/frame";

export default {
  created() {},

  mounted() {
    commonapi.updateProfile(
      success => console.log(success),
      error => console.log(error)
    );
  },

  components: {
    MyDoctor,
    Account,
    Appointment,
    Inbox,
    Reminder
  },

  data() {
    return {
      msg: "Hello World!",
      tabId: 0,
      notif: {},
      home: false,
      appointment: false,
      inbox: false,
      reminder: false,
      account: false,
    };
  },

  methods: {
    onBottomNavigationTabSelected(args) {
      this.tabId = args.newIndex;
      switch (this.tabId) {
        case 0:
          this.home = true;
          break;
        case 1:
          this.appointment = true;
          break;
        case 2:
          this.inbox = true;
          break;
        case 3:
          this.reminder = true;
          break;
        case 4:
          this.account = true;
          break;
      
        default:
          break;
      }
    },
    onLoaded() {
      console.log("App on page load");
      this.checknotif();
    },
    checknotif() {
      this.initNotif();
      this.executeNotif();
    },
    initNotif() {
      var notificationType = 0;
      LocalNotifications.addOnMessageReceivedCallback(function(data) {
        console.log("notif" + JSON.stringify(data));
        LS.setItemObject(notification.NOTIFICATION, data.data);
        var data = LS.getItem(notification.NOTIFICATION);
        console.log("data notif " + JSON.stringify(data));
        if (!data) {
          return;
        }
        LS.setItemObject(notification.NOTIFICATION, false);
        switch (data.notificationType) {
          case notification.APPOINTMENT_ACCEPTED:
          case notification.APPOINTMENT_ASSIGNED:
          case notification.APPOINTMENT_CANCELLED:
          case notification.APPOINTMENT_RESCHEDULED:
            console.log("case", notification.APPOINTMENT_RESCHEDULED);
            setTimeout(() => {
              topmost().currentPage.__vuePageRef__.$navigateTo(
                DetailAppointment,
                {
                  transition: "slide",
                  props: {
                    id: data.dataId,
                    notificationType: data.notificationType
                  }
                }
              );
            }, 0);
            break;
          case notification.TREATMENT_RECALL:
          case notification.TREATMENT_REMINDER:
            console.log("case", notification.TREATMENT_REMINDER);
            setTimeout(() => {
              topmost().currentPage.__vuePageRef__.$navigateTo(ReminderDetail, {
                transition: "slide",
                props: {
                  id: data.dataId,
                  notificationType: data.notificationType
                }
              });
            }, 0);
            break;
        case notification.NEW_MESSAGE: 
          console.log("case", notification.NEW_MESSAGE);
          setTimeout(() => {
            topmost().currentPage.__vuePageRef__.$navigateTo(DetailInbox, {
              transition: "slide",
              props: {
                id: data.dataId,
                notificationType: data.notificationType
              }
            });
          }, 0);
          break;
          default:
            console.log("notif not yet implemented", data.notificationType);
            break;
        }
      }).then(function() {
        console.log("finish callback");
      });
      firebase.addOnMessageReceivedCallback(message => {
        if (message.foreground) {
          if (this.$isAndroid) {
            notification.makeNotif(message);
          } else {
            console.log("ios click", message);
            notification.handleNotification(message);
            this.executeNotif();
          }
        } else {
          console.log(JSON.stringify(message));
          notification.handleNotification(message);
        }
      });
    },
    executeNotif() {
      var data = LS.getItem(notification.NOTIFICATION);
      console.log("data notif " + JSON.stringify(data));
      if (!data) {
        return;
      }
      LS.setItemObject(notification.NOTIFICATION, false);
      switch (data.notificationType) {
        case notification.APPOINTMENT_ACCEPTED:
        case notification.APPOINTMENT_ASSIGNED:
        case notification.APPOINTMENT_CANCELLED:
        case notification.APPOINTMENT_RESCHEDULED:
          console.log("case", notification.APPOINTMENT_RESCHEDULED);
          setTimeout(() => {
            this.$navigateTo(
              DetailAppointment,
              {
                transition: "slide",
                props: {
                  id: data.dataId,
                  notificationType: data.notificationType
                }
              }
            );
          }, 0);
          break;
        case notification.TREATMENT_RECALL:
        case notification.TREATMENT_REMINDER:
          console.log("case", notification.TREATMENT_REMINDER);
          setTimeout(() => {
            this.$navigateTo(ReminderDetail, {
              transition: "slide",
              props: {
                id: data.dataId,
                notificationType: data.notificationType
              }
            });
          }, 0);
          break;
        case notification.NEW_MESSAGE: 
          console.log("case", notification.NEW_MESSAGE);
          setTimeout(() => {
            this.$navigateTo(DetailInbox, {
              transition: "slide",
              props: {
                id: data.dataId,
                notificationType: data.notificationType
              }
            });
          }, 0);
          break;
        default:
          console.log("notif not yet implemented", data.notificationType);
          break;
      }
    }
  }
};
</script>
