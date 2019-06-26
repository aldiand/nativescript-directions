<template>
  <Page class="page">
    <AppBar :title="'activity_book_title_select_schedule' | L"/>
    <StackLayout>

      <CardView class="cardStyle" margin="5" elevation="1" radius="1">
        <DockLayout stretchLastChild="true" style="padding:15px;"
            horizontalAlignment="center">
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
      <ScrollView>
        <StackLayout
          style="padding:50px;"
          orientation="vertical"
          height="100%"
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
          </WrapLayout>
          </StackLayout>
        </CardView>
        <CardView class="cardStyle" padding="5" elevation="1" radius="1">
          <StackLayout margin="5" 
            horizontalAlignment="center">
          <DockLayout
            stretchLastChild="true"
            @tap="change('siang')"
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
          >
            <label
              v-for="(time, index) in siangTime"
              :key="index"
              :text="time"
              class="schedule-time"
              v-bind:class="isAvailable(time) ? 'active-schedule-time' : 'off-schedule-time' "
              v-on:tap="isAvailable(time) ?  timeSelect(time) : ''"
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
          >
            <label
              v-for="(time, index) in malamTime"
              :key="index"
              :text="time"
              class="schedule-time"
              v-bind:class="isAvailable(time) ? 'active-schedule-time' : 'off-schedule-time' "
              v-on:tap="isAvailable(time) ?  timeSelect(time) : ''"
            />
          </WrapLayout>
          </StackLayout>
        </CardView>
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<style scoped>
.container-schedule {
  padding: 25px;
  border-width: 2px;
  border-color: #03c1b8;
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
  padding-top: 20px;
  padding-bottom: 20px;
  width: 200px;
  vertical-align: middle;
  text-align: center;
  border-width: 3px;
  margin-bottom: 15px;
  margin-right: 35px;
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
.off-schedule-time {
  border-color: #a2a2a2;
  color: #a2a2a2;
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
var moment = require("moment");

export default {
  mounted() {
    this.busy = false;
    setTimeout(() => {
      this.setDate();
      this.loadData();
    });
  },
  // TAG : 1: BOOK. 2: RESCHEDULE
  props: {
    doctor: {},
    clinic_id: Number,
    doctor_id: Number,
    tag: Number,
    appointment_id: Number
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
      selectedTime: String
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
      return this.schedule.data[this.date].includes(time);
    },
    timeSelect(time) {
      console.log("Time Selected : " + this.date + " " + time);
      this.selectedTime = moment(this.date).format("YYYY-MM-DD") + " " + time;
      this.$navigateTo(SelectServices, {
        transition: "slide",
        backstackVisible: false,
        props: {
          doctor: this.doctor,
          clinic_id: this.clinic_id,
          doctor_id: this.doctor_id,
          tag: this.tag,
          time: this.selectedTime,
          appointment_id: this.appointment_id
        }
      });
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
          // setTimeout(() => {
          //   this.pagiTime = dt.getMorningTime(
          //     this.schedule.meta.start_hour,
          //     this.schedule.meta.finish_hour,
          //     this.schedule.meta.slot_interval
          //   );
          //   this.siangTime = dt.getAfternoonTime(
          //     this.schedule.meta.start_hour,
          //     this.schedule.meta.finish_hour,
          //     this.schedule.meta.slot_interval
          //   );
          //   this.malamTime = dt.getNightTime(
          //     this.schedule.meta.start_hour,
          //     this.schedule.meta.finish_hour,
          //     this.schedule.meta.slot_interval
          //   );
          //   console.log(this.pagiTime);
          //   console.log(this.siangTime);
          //   console.log(this.malamTime);
          //   this.busy = false;
          // }, 0);
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
