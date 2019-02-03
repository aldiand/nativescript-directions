<template>
  <Page class="page">
    <ActionBar class="action-bar2" flat="true" :title="'starter_schedule_text' | L">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>
    <StackLayout style="background:#E1E1E1;">
      <label :text="name"/>
      <label :text="clinic_name"/>
      <ListView for="item in schedules">
        <v-template>
          <StackLayout>
            <Label :text="day(item.day) + ' ' + time(item.start_time) + ' - ' + time(item.end_time)"/>
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
  filters: {
  },
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

    }
  }
};
</script>