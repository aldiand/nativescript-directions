<template>
  <Page class="page">
    <ActionBar class="action-bar" flat="true" :title="'activity_book_title_select_schedule'|L" style="font-size:12pt;">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>
    <ScrollView>
      <StackLayout style="padding:50px;" orientation="vertical">
          <DockLayout stretchLastChild="true" style="margin-top:15px;">
            <image src="~/assets/images/left-arrow.png" class="next-btn" dock="left"/>
            <image src="~/assets/images/right-arrow.png" class="next-btn" dock="right"/>
            <label text="Wed, 27 Feb 2019" class="description-label label-title" dock="center" horizontalAlignment="center"/>
          </DockLayout>
          <DockLayout stretchLastChild="true" class="container-schedule">
            <image src="~/assets/images/checked.png" width="5%" dock="right"/>
            <label text="Jadwal Pagi (8:00 - 11:00)" class="description-label" dock="left"/>
          </DockLayout>
          <WrapLayout orientation="horizontal" style="margin-top:15px;" >
            <label text="08:00" class="schedule-time off-schedule-time"/>
            <label text="08:15" class="schedule-time off-schedule-time"/>
            <label text="08:30" class="schedule-time off-schedule-time"/>
            <label text="08:45" class="schedule-time off-schedule-time"/>
            <label text="09:00" class="schedule-time active-schedule-time"/>
            <label text="09:15" class="schedule-time active-schedule-time"/>
            <label text="09:30" class="schedule-time active-schedule-time"/>
            <label text="09:45" class="schedule-time active-schedule-time"/>
            <label text="10:00" class="schedule-time active-schedule-time"/>
            <label text="10:15" class="schedule-time active-schedule-time"/>
            <label text="10:30" class="schedule-time off-schedule-time"/>
            <label text="10:45" class="schedule-time off-schedule-time"/>
            <label text="11:00" class="schedule-time off-schedule-time"/>
          </WrapLayout>
          <DockLayout stretchLastChild="true" class="container-schedule container-schedule-off">
            <image src="~/assets/images/checked-muted.png" width="5%" dock="right"/>
            <label text="Jadwal Siang (11:00 - 15:00)" class="description-label" dock="left"/>
          </DockLayout>
          <DockLayout stretchLastChild="true" class="container-schedule container-schedule-off">
            <image src="~/assets/images/checked-muted.png" width="5%" dock="right"/>
            <label text="Jadwal Sore (15:00 - 18:00)" class="description-label" dock="left"/>
          </DockLayout>
          <DockLayout stretchLastChild="true" class="container-schedule container-schedule-off">
            <image src="~/assets/images/checked-muted.png" width="5%" dock="right"/>
            <label text="Jadwal Malam (18:00 - 22:00)" class="description-label" dock="left"/>
          </DockLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<style scoped>
.container-schedule{
  padding:25px; 
  border-width:2px; 
  border-color:#03c1b8; 
  margin-top:10px; 
  border-radius:5px;
  font-weight: bold;
}
.container-schedule-off{
  border-color:#a2a2a2; 
  color:#a2a2a2;
}
.schedule-time{
  padding:25px;
  padding-left:45px;
  padding-right:45px;
  border-width:3px;
  margin-bottom:15px;
  margin-right: 35px;
  border-radius:7px;
  font-weight: bold;
}
.active-schedule-time{
  border-color:#03c1b8; 
  color:#FFFFFF;
  background-color:#03c1b8;
}
.off-schedule-time{
  border-color:#a2a2a2; 
  color:#a2a2a2;
}
 .next-btn {
  width: 30px;
  margin: 10px;
}
</style>

<script>
import * as dt from "~/modules/datetime";
export default {
  mounted() {
    this.loadData()
  },
  props: {
    clinic_name: String,
    clinic_id: Number
  },
  data() {
    return {
      services: []
    }
  },
  methods: {
    loadData() {
      this.$http.get(
        "/clinics/"+ this.clinic_id,
        content => {
          let responsePayload = content.content;
          this.services = responsePayload.data.services;
        },
        error => {}
      );
    }
  }
  
};
</script>
