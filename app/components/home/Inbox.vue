<template>
  <StackLayout orientation="vertical" width="100%">
    <Label text="Inbox" textWrap="true" class="text-title"/>

    <AppEmptyView files="ic_no_mail.png" :text="'fragment_messages_body_no_message' | L" 
            v-bind:visibility="busy || (inboxs && inboxs.length) ? 'collapse': 'visible'"
            @refresh="loadData"/>
    <AppLoadingView 
            v-bind:visibility="busy ? 'visible' : 'collapse'"/>
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
      busy: true,
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
      this.busy = true;
      this.$http.get(
        "/messages",
        content => {
          let responsePayload = content.content;
          this.inboxs = responsePayload;
          console.log(JSON.stringify(responsePayload));
          this.busy = false;
        },
        error => {
          this.busy = false;
        }
      );
    },

    onItemTap(event) {}
  }
};
</script>
