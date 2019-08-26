<template>
  <Page class="page">

  <DockLayout stretchLastChild="true" height="100%">
    <StackLayout dock="bottom">
      <AppButton :text="'fragment_inbox_create_message'|L" dock="bottom" @tap="createMessage"/>
    </StackLayout>
    <StackLayout orientation="vertical" height="auto" width="100%" dock="top">
      <AppEmptyView
        files="ic_no_mail.png"
        :text="'fragment_messages_body_no_message' | L"
        v-bind:visibility="busy || true ? 'collapse': 'visible'"
        @refresh="loadData"
      />
      <AppLoadingView v-bind:visibility="busy ? 'visible' : 'collapse'"/>
      <RadListView
        v-if="inboxs"
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
  </DockLayout>
  </Page>
</template>

<script>
import InboxList from "./InboxList";
import NewMessage from "../inbox/NewMessage";
import DetailInbox from "../inbox/DetailInbox";
import { ObservableArray } from 'tns-core-modules/data/observable-array';

export default {
  components: {
    InboxList
  },
  data() {
    return {
      busy: true,
      inboxs: {}
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    onPullToRefreshInitiated({ object }) {
      console.log("Pulling...");
      setTimeout(() => {
        this.loadData();
        object.notifyPullToRefreshFinished();
      });
    },

    createMessage () {
      this.$navigateTo(NewMessage, {
        transition: "slide",
      });
    },

    loadData() {
      this.busy = true;
      this.$http.get(
        "/messages",
        content => {
          let responsePayload = content.content;
          this.inboxs = new ObservableArray(responsePayload);
          this.busy = false;
        },
        error => {
          this.busy = false;
        }
      );
    },

    onItemTap(event) {
      this.$navigateTo(DetailInbox, {
        transition: "slide",

        props: {
          messages: event.item
        }
      });
    }
  }
};
</script>
