<template>
  <Page class="page">
    <AppBar :title="'activity_message_book' | L"/>
    <StackLayout>
        <Frame id="stepFrame" ~stepFrame actionBarVisibility="never">
          <Page>
            <GridLayout height="100%" rows="*, auto" 
                    @swipe="onSwipe">
              <StackLayout row="0">
                <BookStep 
                  horizontalAlignment="center" 
                  classCircle1="noActive"
                  classCircle2="active"
                  classCircle3="noActive"/>
                <StackLayout orientation="vertical" style="text-align:center;margin:5;">
                  <label :text="'starter_queue_status'|L" class="h3 label-title" style="font-weight:bold;"/>
                  <label visibility="collapsed" :text="'starter_queue_status_description'|L" class="description-label"/>    
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
                <StackLayout style="padding-left:15;padding-right:15;">
                  <CardView margin="15" elevation="3" radius="3" width="100%">
                    <StackLayout orientation="vertical" style="text-align:center;padding:15;">
                      <label :text="'starter_queue_available'|L" class="h5 label-title"/>
                      <label :text="numberQueue" class="h2 label-title text-main" style="color:#03c1b8;font-weight:bold;"/>    
                    </StackLayout>
                  </CardView>
                </StackLayout>
              </StackLayout>
              <StackLayout row="1" orientation="horizontal" horizontalAlignment="center" style="height:120px;width:100%;margin-bottom:30px;">
                  <Button
                    class="btn btn-submit"
                    :text="'starter_select_date'|L"
                    @tap="submit"
                  />

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
  margin-left:5;
  margin-bottom: 15px;
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

.btn-submit{
  border-radius:50%;
  width:70%;
  color:#FFFFFF;
  background-color:#03c1b8;
}
</style>

<script>
import * as dt from "~/modules/datetime";
import { appointmentApi}  from "~/modules/commonapi";
import SelectServices from "./SelectServices";
import Confirmation from "./Confirmation";
import BookStep from "./BookStep";
import ItemTime from "./ItemTime";
import localize from 'nativescript-localize';
var moment = require("moment");

export default {
  components:{
    BookStep,
    ItemTime
  },
  data() {
    return {
      stringDate: "",
      numberQueue: 0,
      date: dt.getBookDate(),
      clinic_id: this.$store.state.clinicId,
      doctor_id: this.$store.state.doctorId,
    };
  },
  props: {
    doctor: {},
  },
  mounted() {
    this.busy = false;
    setTimeout(() => {
      this.setDate();
      this.loadData();
    });
  },
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
      this.numberQueue = 0;
    },
    change(state) {
      switch (state) {
        case "next":
          console.log("next date");
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
    loadData() {
      this.busy = true;
      this.first = true;
      var success =  success => {
        this.numberQueue = success.data.data[this.date];
        this.busy = false;
      }
      var error =  error => {
        console.log(JSON.stringify(error));
        this.busy = false;
      }
      this.$store.commit('setDate', moment(this.date).format("YYYY-MM-DD"))
      appointmentApi.availableQueue(this.doctor_id, this.clinic_id, this.date, success, error)
    },
    submit() {
      this.$store.commit('setDate', moment(this.date).format("YYYY-MM-DD"))
      this.$navigateTo(Confirmation, {
        frame: 'stepFrame',
        transition: "fade",
        props: {
          doctor: this.doctor,
        }
      });
    }
  }
};
</script>
