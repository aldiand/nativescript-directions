<template>
  <Page class="page" actionBarHidden="true" @loaded="onLoaded">
    <StackLayout>
      <StackLayout orientation="vertical" class="action-bar" width="100%">
        <Image
          src="~/assets/images/ic_actionbar.png"
          height="40"
          margin="8"
          verticalAlignment="center"
          horizontalAlignment="center"
        />
      </StackLayout>
      <GridLayout rows="*, auto">
        <StackLayout row="0">
          <MyDoctor v-bind:visibility="tabId == 0 ? 'visible': 'collapse'"/>
          <Appointment v-bind:visibility="tabId == 1 ? 'visible': 'collapse'"/>
          <Inbox v-bind:visibility="tabId == 2 ? 'visible': 'collapse'"/>
          <Reminder v-bind:visibility="tabId == 3 ? 'visible': 'collapse'"/>
          <Account v-bind:visibility="tabId == 4 ? 'visible': 'collapse'"/>
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
import Splash from "./Splash";
import MyDoctor from "./home/MyDoctor";
import Account from "./home/Account";
import Appointment from "./home/Appointment";
import Inbox from "./home/Inbox";
import Reminder from "./home/Reminder";
import { OnTabSelectedEventData } from "nativescript-bottom-navigation";
import { LocalNotifications } from "nativescript-local-notifications";
import DetailAppointment from "~/components/appointment/DetailAppointment";
import ReminderDetail from "~/components/reminder/Reminder";
import * as notification from "~/modules/notification.js";
let LS = require("nativescript-localstorage");
import * as app from "tns-core-modules/application";
import { topmost } from 'ui/frame';


export default {
  created() {},

  mounted() {},

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
      notif: {}
    };
  },

  methods: {
    onBottomNavigationTabSelected(args) {
      this.tabId = args.newIndex;
    },
    onLoaded() {
      console.log("App on page load");
      this.checknotif();
    },
    checknotif() {
      var notificationType = 0;
      LocalNotifications.addOnMessageReceivedCallback(function(data) {
        console.log("notif" + JSON.stringify(data));
        LS.setItemObject(notification.NOTIFICATION, data.data);
        data = LS.getItem(notification.NOTIFICATION);
        switch (data.notificationType) {
          case notification.APPOINTMENT_ACCEPTED:
          case notification.APPOINTMENT_ASSIGNED:
          case notification.APPOINTMENT_CANCELLED:
          case notification.APPOINTMENT_RESCHEDULED:
            console.log("case", notification.APPOINTMENT_RESCHEDULED);
            setTimeout(() => {
              topmost().currentPage.__vuePageRef__.$navigateTo(DetailAppointment, {
                transition: "slide",
                props: {
                  id: data.dataId,
                  notificationType: data.notificationType
                }
              });
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

          default:
            console.log("notif not yet implemented", data.notificationType);
            break;
        }
      }).then(function() {
        console.log("finish callback");
      });
    }
  }
};
</script>
