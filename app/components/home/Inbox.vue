<template>
  <StackLayout orientation="vertical" width="100%">
    <Label text="Inbox" textWrap="true" class="text-title"/>
    <ListView for="item in inboxs">
      <v-template>
        <InboxList :item="item"/>
      </v-template>
    </ListView>
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
  }
};
</script>
