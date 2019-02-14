<template>
    <StackLayout orientation="vertical" width="100%">
        <Label text="Reminder" textWrap="true" class="text-title"/>
        <ListView for="item in reminders">
            <v-template>
                <ReminderList :item="item"/>
            </v-template>
        </ListView>
        
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
    this.$http.get(
      "/reminders",
      content => {
        let responsePayload = content.content;
        this.reminders = responsePayload;
      },
      error => {

        }
    );
  },

  methods: {}
};
</script>
