<template>
  <StackLayout orientation="vertical" width="100%">
    <Label text="Inbox" textWrap="true" class="text-title"/>
    <RadListView
      ref="listView"
      for="item in inboxs"
      @itemTap="onItemTap"
      pullToRefresh="true"
      @pullToRefreshInitiated="onPullToRefreshInitiated"
    >
      <v-template>
        <InboxList :item="item"/>
      </v-template>
    </RadListView>
  </StackLayout>
</template>

<script>
import InboxList from "./InboxList";

export default {
  components: {
    InboxList
  },
  data() {
    return {
      inboxs: []
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    onPullToRefreshInitiated({ object }) {
      console.log("Pulling...");
      setTimeout(() => {
        this.inboxs = [];
        this.loadData();
        object.notifyPullToRefreshFinished();
      });
    },

    loadData() {
      this.$http.get(
        "/messages",
        content => {
          let responsePayload = content.content;
          this.inboxs = responsePayload;
        },
        error => {}
      );
    },

    onItemTap(event) {
      
    }
  }
};
</script>
