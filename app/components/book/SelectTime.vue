<template>
  <Page class="page">
    <AppBar :title="'activity_message_book' | L"/>
    <StackLayout>
        <Frame id="stepFrame" ~stepFrame actionBarVisibility="never">
          <Page>
            <GridLayout height="100%" rows="*, auto">
              <StackLayout row="0">
              <BookStep 
                horizontalAlignment="center" 
                classCircle1="noActive"
                classCircle2="active"
                classCircle3="noActive"/>

            <StackLayout orientation="vertical" class="container-list">
              <label
              :text="'activity_book_title_select_schedule'|L"
              class="h4"
              horizontalAlignment="center"
              style="font-weight:bold;"/>
            <label
              visibility="collapsed"
              :text="'starter_confirm_review_text'|L"
              horizontalAlignment="center"/>
            </StackLayout>

              <CardView margin="5" elevation="1" radius="1" width="100%">
                <DockLayout stretchLastChild="true" style="padding:15px;"
                    horizontalAlignment="center" width="100%">
                  <image
                    src="~/assets/images/left-arrow.png"
                    class="next-btn"
                    dock="left"
                    @tap="change('prev')"
                  ></image>
                  <image
                    src="~/assets/images/right-arrow.png"
                    class="next-btn"
                    dock="right"
                    @tap="change('next')"
                  ></image>
                  <label
                    :text="stringDate"
                    class="h4 label-title text-main"
                    dock="center"
                    horizontalAlignment="center"
                    verticalAlignment="center"
                  />
                </DockLayout>
              </CardView>
              <!-- <AppEmptyView
                files="ic_no_mail.png"
                :text="'fragment_messages_body_no_message' | L"
                v-bind:visibility="busy || (inboxs && inboxs.length) ? 'collapse': 'visible'"
                @refresh="loadData"
              />-->
              <AppLoadingView v-bind:visibility="busy ? 'visible' : 'collapse'"/>
                <ScrollView orientation="vertical" height="95%"> 
                  <StackLayout
                    style="padding:50px;"
                    orientation="vertical"
                    v-bind:visibility="busy ? 'collapse' : 'visible'"
                    @swipe="onSwipe"
                  >

                  <CardView class="cardStyle" padding="5" elevation="1" radius="1">
                    <StackLayout margin="5" 
                      horizontalAlignment="center">
                    <DockLayout
                      stretchLastChild="true"
                      class="container-schedule"
                      @tap="change('pagi')"
                      width="100%"
                      v-bind:class="pagi?'':'container-schedule-off'"
                    >
                      <image
                        :src="pagi ? '~/assets/images/checked.png' : '~/assets/images/checked-muted.png'"
                        width="5%"
                        dock="right"
                      ></image>
                      <label :text="'jadwal_pagi' | L" class="description-label" dock="left"/>
                    </DockLayout>
                    <WrapLayout
                      orientation="horizontal"
                      style="margin-top:15px;"
                      v-bind:visibility="pagi ? 'visible' : 'collapse'"
                      horizontalAlignment="center"
                    >
                      <label
                        v-for="(time, index) in pagiTime"
                        :key="index"
                        :text="time"
                        class="schedule-time"
                        v-bind:class="isAvailable(time) ? 'active-schedule-time' : 'off-schedule-time' "
                        v-on:tap="isAvailable(time) ?  timeSelect(time) : ''"
                      />
                      <label
                        :text="'activity_book_time_not_available' | L"
                        v-if="!isAvailable(pagiTime)"
                        class="no-time"
                        style="width:100%;text-align:center;"
                        width="100%"
                      />
                    </WrapLayout>
                    </StackLayout>
                  </CardView>
                  <CardView class="cardStyle" padding="5" elevation="1" radius="1">
                    <StackLayout margin="5" 
                      horizontalAlignment="center">
                    <DockLayout
                      stretchLastChild="true"
                      @tap="change('siang')"
                      width="100%"
                      v-bind:class="siang?'':'container-schedule-off'"
                      class="container-schedule"
                    >
                      <image
                        :src="siang ? '~/assets/images/checked.png' : '~/assets/images/checked-muted.png'"
                        width="5%"
                        dock="right"
                      ></image>
                      <label :text="'jadwal_siang' | L" class="description-label" dock="left"/>
                    </DockLayout>
                    <WrapLayout
                      orientation="horizontal"
                      style="margin-top:15px;"
                      v-bind:visibility="siang ? 'visible' : 'collapse'"
                      horizontalAlignment="center"
                    >
                      <label
                        v-for="(time, index) in siangTime"
                        :key="index"
                        :text="time"
                        class="schedule-time"
                        v-bind:class="isAvailable(time) ? 'active-schedule-time' : 'off-schedule-time' "
                        v-on:tap="isAvailable(time) ?  timeSelect(time) : ''"
                      />
                      <label
                        :text="'activity_book_time_not_available' | L"
                        v-if="!isAvailable(siangTime)"
                        class="no-time"
                        style="width:100%;text-align:center;"
                        width="100%"
                      />
                    </WrapLayout>
                    </StackLayout>
                  </CardView>
                  <CardView class="cardStyle" padding="5" elevation="1" radius="1">
                    <StackLayout margin="5" 
                      horizontalAlignment="center">
                    <DockLayout
                      stretchLastChild="true"
                      @tap="change('malam')"
                      width="100%"
                      v-bind:class="malam?'':'container-schedule-off'"
                      class="container-schedule"
                    >
                      <image
                        :src="malam ? '~/assets/images/checked.png' : '~/assets/images/checked-muted.png'"
                        width="5%"
                        dock="right"
                      ></image>
                      <label :text="'jadwal_malam' | L" class="description-label" dock="left"/>
                    </DockLayout>
                    <WrapLayout
                      orientation="horizontal"
                      style="margin-top:15px;"
                      v-bind:visibility="malam ? 'visible' : 'collapse'"
                      horizontalAlignment="center"
                    >
                      <label
                        v-for="(time, index) in malamTime"
                        :key="index"
                        :text="time"
                        class="schedule-time"
                        v-bind:class="isAvailable(time) ? 'active-schedule-time' : 'off-schedule-time' "
                        v-on:tap="isAvailable(time) ?  timeSelect(time) : ''"
                      />
                      <label
                        :text="'activity_book_time_not_available' | L"
                        class="no-time"
                        style="width:100%;text-align:center; margin-bottom: 10;"
                        width="100%"
                        v-if="!isAvailable(malamTime)"
                      />
                    </WrapLayout>
                    </StackLayout>
                  </CardView>
                  </StackLayout>
                </ScrollView>
              </StackLayout>
              <!-- <DockLayout row="1" orientation="horizontal" horizontalAlignment="center" style="height:120px;width:100%;margin-bottom:30px;">
                  <Label dock="top" text="I am on top!"/>
                  <Button
                    dock="left"
                    class="btn-next-prev m-10"
                    :text="'starter_btn_prev'|L"
                  />
                  <Button
                    dock="right"
                    class="btn-next-prev m-10"
                    :text="'starter_btn_next'|L"
                  />
              </DockLayout> -->
              <StackLayout row="1" orientation="horizontal" horizontalAlignment="center" style="width:100%;margin-bottom:30px;">
                  <!-- <Button
                    class="btn-next-prev m-10"
                    :text="'starter_btn_prev'|L"
                  />
                  <Button
                    class="btn-next-prev m-10"
                    :text="'starter_btn_next'|L"
                  /> -->
              </StackLayout>
            </GridLayout>
          </Page></Frame>
    </StackLayout>
  </Page>
</template>

<style scoped>
.container-schedule {
  padding: 25px;
  border-width: 2px;
  border-color: #03c1b8;
  color: #03c1b8;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-weight: bold;
}
.container-schedule-off {
  border-color: #a2a2a2;
  color: #a2a2a2;
}
.schedule-time {
  padding-top: 8;
  padding-bottom: 8;
  font-size: 14;
  width: 200px;
  vertical-align: middle;
  text-align: center;
  border-width: 3px;
  margin-left:8;
  margin-right:8;
  margin-bottom: 16;
  border-radius: 7px;
}
.schedule-time:highlighted {
  background-color: #02918a;
}

.active-schedule-time {
  border-color: #03c1b8;
  color: #ffffff;
  background-color: #03c1b8;
}
.no-time {
  border-color: #dffdfc;
  color: #03c1b8;
}
.off-schedule-time {
  visibility:collapse;
}
.next-btn {
  width: 50px;
  width: 50px;
  margin: 10px;
  padding: 20px;
}
</style>

<script>
import * as dt from "~/modules/datetime";
import SelectServices from "./SelectServices";
import Confirmation from "./Confirmation";
import BookStep from "./BookStep";
import ItemTime from "./ItemTime";
import localize from 'nativescript-localize';
import _ from 'lodash';
var moment = require("moment");

export default {
  components:{
    BookStep,
    ItemTime
  },
  mounted() {
    this.busy = false;
    setTimeout(() => {
      this.setDate();
      this.loadData();
    });
  },
  props: {
    doctor: {},
  },
  data() {
    return {
      schedule: {},
      date: dt.getBookDate(),
      stringDate: "",
      busy: true,
      pagi: false,
      siang: false,
      malam: false,
      pagiTime: [],
      siangTime: [],
      malamTime: [],
      selectedTime: String,
      clinic_id: this.$store.state.clinicId,
      doctor_id: this.$store.state.doctorId,
    };
  },
  computed: {},
  methods: {
    onSwipe(args) {
      console.log("Swipe Direction: " + args.direction);
      if (args.direction == 1) {
        console.log("swipe prev");
        this.change("prev");
      } else if (args.direction == 2) {
        console.log("swipe next");
        this.change("next");
      }
    },
    setDate() {
      this.stringDate = moment(this.date).format("ddd, D MMM YYYY");
    },
    reset() {
      this.pagiTime = [];
      this.siangTime = [];
      this.malamTime = [];
    },
    change(state) {
      switch (state) {
        case "pagi":
          this.pagi = !this.pagi;
          break;
        case "siang":
          this.siang = !this.siang;
          break;
        case "malam":
          this.malam = !this.malam;
          break;
        case "next":
          console.log("next date");
          this.reset();
          this.date = moment(this.date)
            .add(1, "days")
            .format("YYYY-MM-DD");
          this.setDate();
          this.loadData();
          break;
        case "prev":
          console.log("next date");
          if (this.date == moment().format("YYYY-MM-DD")) {
            return;
          }
          this.reset();
          this.date = moment(this.date)
            .subtract(1, "days")
            .format("YYYY-MM-DD");
          this.setDate();
          this.loadData();
          break;
        default:
          break;
      }
    },
    isAvailable(time) {
      if (Array.isArray(time)) {
         return  this.schedule.data && this.schedule.data[this.date].filter(value => time.includes(value)).length > 0;
      }
      return this.schedule.data && this.schedule.data[this.date].includes(time);
    },
    timeSelect(time) {
      console.log("Time Selected : " + this.date + " " + time);
      this.selectedTime = moment(this.date).format("YYYY-MM-DD") + " " + time;
      this.$store.commit('setTime', time)
      this.$store.commit('setDate', moment(this.date).format("YYYY-MM-DD"))
      this.$navigateTo(Confirmation, {
        frame: 'stepFrame',
        transition: "fade",
        props: {
          doctor: this.doctor,
        }
      });
    },
    loadData() {
      this.busy = true;
      this.first = true;
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
          this.pagiTime = dt.getMorningTime(
            this.schedule.meta.start_hour,
            this.schedule.meta.finish_hour,
            this.schedule.meta.slot_duration
          );
          this.siangTime = dt.getAfternoonTime(
            this.schedule.meta.start_hour,
            this.schedule.meta.finish_hour,
            this.schedule.meta.slot_duration
          );
          this.malamTime = dt.getNightTime(
            this.schedule.meta.start_hour,
            this.schedule.meta.finish_hour,
            this.schedule.meta.slot_duration
          );
          console.log(this.pagiTime);
          console.log(this.siangTime);
          console.log(this.malamTime);
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
