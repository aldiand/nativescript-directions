<template>
  <StackLayout orientation="vertical" width="100%">
    <Label text="Reminder" textWrap="true" class="text-title"/>
    <AppEmptyView
      files="ic_reminder_new.png"
      :text="'fragment_reminders_body_no_reminder' | L"
      v-bind:visibility="busy || (reminders && reminders.length) ? 'collapse': 'visible'"
      @refresh="loadData"
    />
    <AppLoadingView v-bind:visibility="busy ? 'visible' : 'collapse'"/>
    <RadListView
      ref="listView"
      for="item in reminders"
      @itemTap="onItemTap"
      pullToRefresh="true"
      @pullToRefreshInitiated="onPullToRefreshInitiated"
    >
      <v-template>
        <ReminderList :item="item"/>
      </v-template>
    </RadListView>
  </StackLayout>
</template>

<script>
import ReminderList from "./ReminderList";
import Reminder from "../reminder/Reminder";

export default {
  components: {
    ReminderList
  },
  data() {
    return {
      busy: true,
      reminders: []
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    onPullToRefreshInitiated({ object }) {
      console.log("Pulling...");
      setTimeout(() => {
        this.reminders = [];
        this.loadData();
        object.notifyPullToRefreshFinished();
      });
    },

    loadData() {
      this.busy = true;
      this.$http.get(
        "/reminders",
        content => {
          let responsePayload = content.content;
          console.log(JSON.stringify(responsePayload));
          this.reminders = responsePayload;
          this.busy = false;
        },
        error => {
          this.busy = false;
        }
      );
    },

    onItemTap(event) {
      this.$navigateTo(Reminder, {
        transition: "slide",

        props: {
          reminder: event.item
        }
      });
    }
  }
};
</script>
