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
    this.$http.get(
      "/appointments",
      content => {
        let responsePayload = content.content;
        this.appointments = responsePayload;
      },
      error => {

        }
    );
  },

  methods: {}
};
</script>
