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
      <BottomNavigation 
      @tabSelected="onBottomNavigationTabSelected"
      row="1">
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
import MyDoctor from "./home/MyDoctor";
import Account from "./home/Account";
import Appointment from "./home/Appointment";
import Inbox from "./home/Inbox";
import Reminder from "./home/Reminder";
import { OnTabSelectedEventData } from "nativescript-bottom-navigation";
export default {
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
      tabId: 0
    };
  },

  methods: {
    onBottomNavigationTabSelected(args) {
      this.tabId = args.newIndex;
    }
  }
};
</script>
