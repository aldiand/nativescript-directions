<template>
  <Page class="page">
    <AppBar :title="'starter_schedule_text' | L"/>
    <ScrollView>
      <StackLayout>
        <StackLayout v-for="(item, name) in schedules" :key="name">
          <StackLayout
            :class="isToday(item.day)?'today':'not-today'"
            orientation="horizontal"
          >
            <Label
              :text="day(item.day)"
              style="padding: 15px;width:50%;"
              :class="isToday(item.day)?'text-main':''"
            />
            <Label
              :text="time(item.start_time) + ' - ' + time(item.end_time)"
              style="padding: 15px;"
              :class="isToday(item.day)?'text-main':''"
            />
          </StackLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>
<style scoped>
.today {
  margin: 10; padding:40px; border-width: 1; border-radius: 10; border-color:  #03c1b8; background: white;
}
.not-today {
  margin: 10; padding:40px; border-width: 1; border-radius: 10; border-color:  black; background: white;

}
</style>

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