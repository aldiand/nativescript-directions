<template>
  <Page class="page">
    <AppBar :title="'starter_schedule_text' | L"/>
    <StackLayout style="background-image:url('~/assets/images/Group7.png'); background-size:cover; padding:20px;">
      <Label 
        :text="name"
        class="h5 label-main"/>
      <Label 
        :text="clinic_name"
        class="h6"
      style="font-weight:bold;"/>
      <ListView
        for="item in schedules"
        separatorColor="transparent"
        style="padding:20px;margin:20px"
        height="100%">
        <v-template>
          <StackLayout style="padding:15px;" orientation="horizontal">
            <Label :text="day(item.day)" style="padding 15px;width:200px;" :class="isToday(item.day)?'text-main':''"/>
            <Label
              :text="time(item.start_time) + ' - ' + time(item.end_time)"
              style="padding 15px" :class="isToday(item.day)?'text-main':''"
            />
          </StackLayout>
        </v-template>
      </ListView>
    </StackLayout>
  </Page>
</template>
<script>
import * as dt from "~/modules/datetime";
export default {
  mounted() {},
  filters: {},
  props: {
    name: String,
    clinic_name: String,
    schedules: Array
  },
  methods: {
    day: function(value) {
      return dt.getDateString(value);
    },

    time: function(value) {
      return dt.formatTime(value);
    },

    isToday: function(value) {
      return dt.isToday(value);
    }
  }
};
</script>