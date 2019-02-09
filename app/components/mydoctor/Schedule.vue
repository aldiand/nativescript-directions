<template>
  <Page class="page">
    <ActionBar class="action-bar" flat="true" :title="'starter_schedule_text' | L">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>
    <StackLayout style="background:#E1E1E1; padding:20px;">

      <!-- <label 
        :text="name"
        class="h5 label-main"/>
      <label 
        :text="clinic_name"
        class="h6"
        style="font-weight:bold;"/> -->

      <Label
              textWrap="true"
              text="drg. Ami R. Sp, KG"
              class="h5 label-main"
            />
      <Label 
              textWrap="true" 
              text="Klinik Mitra" 
              class="h6"
              style="font-weight:bold;"/>

      <StackLayout style="padding:20px;" orientation="vertical">
            <Label text="Mon 09.00 - 14.30" style="padding:15px;"/>
            <Label text="Mon 09.00 - 14.30" class="text-main" style="padding:15px;"/>
      </StackLayout>

      <ListView for="item in schedules">
        <v-template>
          <StackLayout>
            <Label :text="day(item.day) + ' ' + time(item.start_time) + ' - ' + time(item.end_time)" style="padding 15px"/>
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