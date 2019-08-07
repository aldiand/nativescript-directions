<template>
  <Page class="page">
    <AppBar :title="'starter_schedule_text' | L"/>
    <ScrollView>
      <StackLayout>
        <StackLayout v-for="(item, name) in schedules" :key="name">
          <CardView class="cardStyle" margin="10" elevation="3" radius="3" style="padding:5;">
            <StackLayout
              :class="isToday(item.day)?'today':'not-today'"
              orientation="horizontal"
            >
              <Label
                :text="day(item.day)+ ' : '"
                :class="isToday(item.day)?'text-main':''"
              />
              <Label
                :text="time(item.start_time) + ' - ' + time(item.end_time)"
                :class="isToday(item.day)?'text-main':''"
              />
            </StackLayout>
          </CardView>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>
<style scoped>
.today {
  color:#03c1b8;
  margin: 10;
  padding: 10;
  font-weight: bold;
}
.not-today {
  color:rgb(158, 158, 158);
  margin: 10;
  padding: 10;
}
.text-main{
  color:#03c1b8;
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