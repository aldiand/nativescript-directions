<template>
  <Page class="page">
  <StackLayout orientation="vertical" width="100%" height="100%" >
      <StackLayout>
        <Label :text="'home' | L" textWrap="true" class="text-title"/>
          <ScrollView>
        <StackLayout class="bg-home">
          <AppLoadingView v-if="$isIOS && busy"/>

          <label :text="getGreeting()" class="secLine"/>
          <label :text="'what_do_you_want_to_do' | L" class="secLine" />
          <CardView class="m-20 cardStyle" android:radius="75" margin="20" >
            <DockLayout stretchLastChild="true" class="dockSearch">
              <image src="~/assets/images/ic_search.png" width="7%" dock="right" @tap="goToSpeciality" />
              <TextField :hint="'activity_search_type_doctor_or_clinic' | L" dock="left" @tap="goToSpeciality" editable="false" v-model="searchText" style="border-width:1;border-color:#ffffff;"/>
            </DockLayout>
          </CardView>
          <StackLayout v-if="false">
            <DockLayout style="margin-left:15px;margin-right:15px;">
              <label text="show more" class="headingHome" style="font-size:13pt; color:#03c1b8;" dock="right"/>
              <label text="Special Offer" class="headingHome" style="color:#03c1b8;" dock="left"/>
            </DockLayout>
            <ScrollView orientation="horizontal" v-if="false">
              <StackLayout orientation="horizontal">
                <CardView class="cardStyle" style="margin:15px;">
                  <DockLayout stretchLastChild="true" width="500px" style="padding:15px;">
                    <image src="~/assets/images/person-flat.png" style="width:50%;" dock="left"/>
                    <label text="Lorem Ipsum" class="headingHome" style="font-size:13pt;" dock="last child" textWrap="true"/>
                  </DockLayout>
                </CardView>
                <CardView class="cardStyle" style="margin:15px;">
                  <DockLayout stretchLastChild="true" width="500px" style="padding:15px;">
                    <image src="~/assets/images/person-flat.png" style="width:50%;" dock="left"/>
                    <label text="Lorem Ipsum" class="headingHome" style="font-size:13pt;" dock="last child" textWrap="true"/>
                  </DockLayout>
                </CardView>
                <CardView class="cardStyle" style="margin:15px;">
                  <DockLayout stretchLastChild="true" width="500px" style="padding:15px;">
                    <image src="~/assets/images/person-flat.png" style="width:50%;" dock="left"/>
                    <label text="Lorem Ipsum" class="headingHome" style="font-size:13pt;" dock="last child" textWrap="true"/>
                  </DockLayout>
                </CardView>
              </StackLayout>
            </ScrollView>
          </StackLayout>
          <!--list Clinic---->
            <StackLayout v-if="false">
            <DockLayout style="margin-left:15px;margin-right:15px;">
              <label text="show more" class="headingHome" style="font-size:13pt; color:#03c1b8;" dock="right"/>
              <label text="Your Clinics" class="headingHome" style="color:#03c1b8;" dock="left"/>
            </DockLayout>
            <StackLayout orientation="horizontal" width="100%" height="150px">
              <CardView dock="left" width="45%" class="cardStyle" style="margin:15px;">
                <DockLayout stretchLastChild="true" style="padding:10px;">
                  <image src="~/assets/images/info.png" style="width:200px;" dock="left"/>
                  <label text="Lorem Ipsum" class="headingHome" style="font-size:13pt;" dock="last child" textWrap="true"/>
                </DockLayout>
              </CardView>
              <CardView dock="left" width="45%" class="cardStyle" style="margin:15px;">
                <DockLayout stretchLastChild="true" style="padding:10px;">
                  <image src="~/assets/images/info.png" style="width:200px;" dock="left"/>
                  <label text="Lorem Ipsum" class="headingHome" style="font-size:13pt;" dock="last child" textWrap="true"/>
                </DockLayout>
              </CardView>
            </StackLayout>
          </StackLayout>

          <!--Your Appointment---->
          <StackLayout class="m-x-20" >
            <DockLayout >
              <!-- <label text="show more" class="headingHome" style="font-size:13pt; color:#03c1b8;" dock="right"/> -->
              <label :text="'appointment_today' | L" class="text-main headingHome h4" dock="left"/>
            </DockLayout>

            <StackLayout v-for="(item, name) in todayAppointment" :key="name">
              <StackLayout>
                <CardView dock="left" class="cardStyle" style="margin:15px;" @tap="onTodayItemTap(item)">
                  <AppointmentList :item="item"/> 
                </CardView>
              </StackLayout>
            </StackLayout>
            <StackLayout v-if="todayAppointment.length == 0" horizontalAlignment="center" class="m-24">
              <label class="text-muted" :text="'fragment_myappointments_no_appointments' |L" textwrap="true"/>
            </StackLayout>

          </StackLayout>
          <!--list Doctor---->
          <StackLayout class="m-x-20 m-t-20" >
                    
            <DockLayout >
              <!-- <label text="show more" class="headingHome" style="font-size:13pt; color:#03c1b8;" dock="right"/> -->
              <label :text="'your_doctor' | L" class="text-main headingHome h4" dock="left"/>
            </DockLayout>
            <StackLayout>
                <StackLayout v-if="mydoctor.length == 0" horizontalAlignment="center">
                  <label class="text-muted m-10" :text="'fragment_mydoctor_no_doctor_body' |L" textwrap="true" />
                </StackLayout>
                <StackLayout v-for="(item, name) in mydoctor" :key="name">
                  <StackLayout>
                    <CardView dock="left" class="cardStyle" style="margin:15px;" @tap="onItemTap(item)">
                      <MyDoctorList :item="item"/>
                    </CardView>
                  </StackLayout>
                </StackLayout>
                <StackLayout horizontalAlignment="center">
                  <!-- <label class="text m-t-10" :text="'fragment_mydoctor_no_doctor_row' |L" textwrap="true" /> -->

                </StackLayout>
            </StackLayout>
          </StackLayout>
        </StackLayout>
          </ScrollView>
      </StackLayout>
  </StackLayout>
  </Page>
</template>

<style scoped>
  .headingHome{
    margin-left:15px;
    margin-top:15px;
    margin-bottom:15px;
    font-size:18pt;
    font-weight: bold;
    color:#03c1b8;
  }
  .secLine{
    margin-left:20;
    margin-bottom:15px;
    font-size:18pt;
    font-weight: bold;
    color:#ffffff;
  }
  .dockSearch{
    padding-left:25px;
    padding-right:25px;
    padding-top:5px;
    padding-bottom:5px;
  }
</style>


<script>
import { getString } from "tns-core-modules/application-settings"; // Example Only
import * as store from "~/modules/store";
import { getTimeHourNow } from "~/modules/datetime";
import MyDoctorList from "./MyDoctorList";
import Phone from "~/components/login/Phone";
import Detail from "~/components/mydoctor/DoctorProfile";
import SearchPage from "~/components/mydoctor/Search";
import SearchSpeciality from "~/components/mydoctor/SearchSpeciality";
import { appointmentApi } from "../../modules/commonapi";
import AppointmentList from "./AppointmentList";
import DetailAppointment from "~/components/appointment/DetailAppointment";
import DetailQueue from "~/components/appointment/DetailQueue";

const localize = require("nativescript-localize");
export default {
  components: {
    AppointmentList,
    MyDoctorList
  },
  data() {
    return {
      mydoctor: [],
      busy: true,
      isLoading: true,
      searchText: '',
      todayAppointment: []
    };
  },

  mounted() {
    this.loadData();
    this.loadToday();
  },

  methods: {
    onPullToRefreshInitiated({ object }) {
      console.log("Pulling...");
      setTimeout(() => {
        this.mydoctor = [];
        this.loadData();
        object.notifyPullToRefreshFinished();
      });
    },

    loadData() {
      this.busy = true;
      this.$loader.show();
      this.$http.get(
        "/mydoctors",
        content => {
          let responsePayload = content.content;
          this.mydoctor = responsePayload;
          console.log(JSON.stringify(responsePayload));
          this.isLoading = false;
          this.busy = false;
          this.$loader.hide();
        },
        error => {
          this.busy = false;
          this.$loader.hide();
          if (error.statusCode == 403 || error.statusCode == 401) {
            alert({
              title: localize("dialog_session_expire_title"),
              message: localize("dialog_session_expire_body"),
              okButtonText: localize("dialog_session_expire_ok")
            }).then(() => {
              this.$navigateTo(Phone, {
                transition: "fade",
                clearHistory: true
              });
            });
          }
        }
      );
    },

    loadToday() {
      var success = success => {
        console.log(JSON.stringify(success));
        this.todayAppointment = success.data;
      };
      var error = error => {
        console.log(JSON.stringify(error));
      };

      appointmentApi.getAppointment(success, error);

    }, 
    onItemTap(event) {
      this.$navigateTo(Detail, {
        transition: "slide",

        props: {
          doctor: event
        }
      });
    },
    onTodayItemTap(event) {
      console.log(JSON.stringify(event));
      if(event.reservation_type == "time"){
        this.$navigateTo(DetailAppointment, {
          transition: "slide",
          props: {
            appointment: event
          }
        });
      }else if(event.reservation_type == "queue"){
        this.$navigateTo(DetailQueue, {
          transition: "slide",
          props: {
            appointment:event
          }
        });
      }
    },
    getGreeting() {
      if (getTimeHourNow() < 12) {
        return localize("good_morning");
      } else if (getTimeHourNow() < 18) {
        return localize("good_afternoon");
      } else {
        return localize("good_evening");
      }
    },
    goToSpeciality() {
      this.$navigateTo(SearchPage, {
        transition: "fade"
      });

    }
  }
};
</script>
