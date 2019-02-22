<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <StackLayout orientation="horizontal">
        <Image src="~/assets/images/ic_actionbar.png" height="40" verticalAlignment="center"/>
      </StackLayout>
    </ActionBar>
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
import * as notification from "~/modules/notification.js";
let LS = require("nativescript-localstorage");
import * as app from "tns-core-modules/application";

export default {
  created() {},

  mounted() {
    this.checknotif();
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
      notif: {}
    };
  },

  methods: {
    onBottomNavigationTabSelected(args) {
      this.tabId = args.newIndex;
    },

    checknotif() {
      var notificationType = 0;
      LocalNotifications.addOnMessageReceivedCallback(function(data) {
        console.log("notif" + JSON.stringify(data));
        notificationType = Number(data.data.notificationType);
      }).then(function() {
        app.on("launch", () => {
          if (notificationType > 0) {
            setTimeout(() => {
              this.$navigateTo(Splash);
            });
          }
        });
        app.on("resume", () => {
          if (notificationType > 0) {
            setTimeout(() => {
              this.$navigateTo(Splash);
            });
          }
        });
        console.log("finish callback");
      });
    }
  }
};
</script>
