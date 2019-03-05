<template>
  <Page class="page">
    <ActionBar class="action-bar" flat="true" :title="'activity_book_title_select_schedule'|L" style="font-size:12pt;">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>
    <StackLayout>
          <DockLayout stretchLastChild="true" style="padding:15px;" >
            <image src="~/assets/images/left-arrow.png" class="next-btn" dock="left"/>
            <image src="~/assets/images/right-arrow.png" class="next-btn" dock="right"/>
            <label text="Wed, 27 Feb 2019" class="description-label label-title" dock="center" horizontalAlignment="center"/>
          </DockLayout>
      <!-- <AppEmptyView
        files="ic_no_mail.png"
        :text="'fragment_messages_body_no_message' | L"
        v-bind:visibility="busy || (inboxs && inboxs.length) ? 'collapse': 'visible'"
        @refresh="loadData"
      /> -->
      <AppLoadingView v-bind:visibility="busy ? 'visible' : 'collapse'"/>
    <ScrollView>
      <StackLayout style="padding:50px;" orientation="vertical">
          <DockLayout stretchLastChild="true" class="container-schedule" @tap="change('pagi')" v-bind:class="pagi?'':'container-schedule-off'">
            <image :src="pagi ? '~/assets/images/checked.png' : '~/assets/images/checked-muted.png'" width="5%" dock="right"/>
            <label text="Jadwal Pagi (8:00 - 11:00)" class="description-label" dock="left"/>
          </DockLayout>
          <WrapLayout orientation="horizontal" style="margin-top:15px;" v-bind:visibility="pagi ? 'visible' : 'collapse'">
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
    </StackLayout>
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
  padding-top: 20px;
  padding-bottom: 20px;
  width: 200px;
  vertical-align: middle;
  text-align: center;
  border-width:3px;
  margin-bottom:15px;
  margin-right: 35px;
  border-radius:7px;
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
  // TAG : 1: BOOK. 2: RESCHEDULE
  props: {
    clinic_id: Number,
    doctor_id: Number,
    tag: Number,
  },
  data() {
    return {
      schedule: {},
      date: dt.getBookDate(),
      busy: true,
      pagi: false
    }
  },
  methods: {
    change(state) {
      switch (state) {
        case 'pagi':
          this.pagi = !this.pagi;
          break;
      
        default:
          break;
      }
    },
    loadData() {
      this.busy = true;
      this.$http.get(
        "/schedule" +
        "?clinic_id=" +
          this.clinic_id +
          "&doctor_id=" +
          this.doctor_id +
          "&begin_date=" +
          this.date,
        content => {
          let responsePayload = content.content;
          this.schedule = responsePayload;
          console.log(JSON.stringify(responsePayload));
          this.busy = false;
        },
        error => {
          console.log(JSON.stringify(error));
          this.busy = false;  
        }
      );
    }
  }
  
};
</script>
