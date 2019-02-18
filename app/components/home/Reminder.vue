<template>
  <StackLayout orientation="vertical" width="100%">
    <Label text="Reminder" textWrap="true" class="text-title"/>
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

export default {
  components: {
    ReminderList
  },
  data() {
    return {
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
      this.$http.get(
        "/reminders",
        content => {
          let responsePayload = content.content;
          this.reminders = responsePayload;
        },
        error => {}
      );
    },

    onItemTap(event) {
      
    }
  }
};
</script>
