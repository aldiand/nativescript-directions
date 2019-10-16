<template>
  <Page class="page">
    <AppBar :title="'fragment_myappointments_title'|L"/>
    <StackLayout>
      <AppEmptyView
        :text="'activity_book_submit_failed_title' | L"
        v-bind:visibility="!error ? 'collapse': 'visible'"
        @refresh="loadData"
      />
      <AppLoadingView v-bind:visibility="busy ? 'visible' : 'collapse'"/>
      <GridLayout height="100%" rows="*, auto">
        <ScrollView row="0">
          <StackLayout>
            <CardView class="cardStyle" margin="10" elevation="3" radius="1">
              <DockLayout class="container-list">
                <ImageCacheIt
                  resize="150,150"
                  stretch="fill"
                  :imageUri="mutatableAppointment.photo_profile"
                  placeholder="~/assets/images/doctordefault.png"
                  errorHolder="~/assets/images/doctordefault.png"
                  class="text-primary image-profile"
                  style="width:150px;height:150px;margin:5px;"
                />
                <StackLayout
                  dock="left"
                  orientation="vertical"
                  style="padding:15px;"
                  horizontalAlignment="stretch"
                >
                  <Label
                    textWrap="true"
                    :text="mutatableAppointment.doctor"
                    style="font-weight:bold;font-size:18pt;margin-bottom:10px;color:black;"
                  />
                  <Label
                    textWrap="true"
                    :text="mutatableAppointment.clinic"
                    style="font-size:12pt;margin-bottom:10px;color:#03c1b8;font-weight:bold;"
                  />
                </StackLayout>
              </DockLayout>
            </CardView>
            <CardView margin="10" elevation="3" radius="3">
              <StackLayout orientation="vertical" style="padding:20px;">
                <label :text="'starter_patient_queue'|L" class="h5 label-title"/>
                <label v-if="mutatableAppointment.queue_no && mutatableAppointment.queue_no !== null" :text="mutatableAppointment.queue_no" class="h2 label-title text-main" style="color:#03c1b8;font-weight:bold;"/>    
                <label v-else text="-" class="h2 label-title text-main" style="color:#03c1b8;font-weight:bold;"/>
              </StackLayout>
            </CardView>
            <CardView class="cardStyle" margin="10" elevation="3" radius="1">
              <DockLayout style="padding:20px;" stretchLastChild="false">
                <Label
                  textWrap="true"
                  dock="top"
                  class="sub-title-item"
                  :text="'starter_schedule_text'|L"
                  verticalalAlignment="center"
                />
                <StackLayout dock="bot">
                  <Label
                    textWrap="true"
                    :text="getDate(mutatableAppointment.date)"
                    style="font-weight:bold;color:#03c1b8;margin-top:8;margin-bottom:8;"
                  />
                </StackLayout>
              </DockLayout>
            </CardView>
            <CardView class="cardStyle" margin="10" elevation="3" radius="1">
              <DockLayout
                dock="right"
                width="100%"
                style="padding:20px;"
                stretchLastChild="false"
              >
                <Label
                  dock="top"
                  textWrap="true"
                  :text="'starter_status'|L"
                  class="sub-title-item"
                />
                <Label
                  dock="bot"
                  :text="textStatus"
                  textWrap="true"
                  horizontalAlignment="right"
                  style="margin-top:8; font-weight:bold; margin-bottom:8;"
                  v-bind:class="getClass()"
                />
              </DockLayout>
            </CardView>
            <CardView class="cardStyle" margin="10" elevation="3" radius="1">
              <DockLayout class="container-list" style="padding:20px;">
                <Label
                  textWrap="true"
                  dock="top"
                  :text="'starter_location'|L"
                  class="sub-title-item"
                />
                <Label
                  dock="top"
                  textWrap="true"
                  :text="mutatableAppointment.address"
                  horizontalAlignment="left"
                  style="color:#03c1b8; margin-top:8; margin-bottom:15;font-weight:bold;"
                />
                <StackLayout orientation="horizontal">
                  <StackLayout orientation="horizontal" class="button-location">
                    <Image
                      src="~/assets/images/ic_profile_msg.png"
                      height="50px"
                      width="50px"
                      verticalAlignment="center"
                    />
                    <label 
                      text="Message"
                      class="text-label"
                      style="color:#03c1b8; margin-left:5;"
                      verticalAlignment="center"/>
                  </StackLayout>
                  <StackLayout orientation="horizontal" class="button-location" >
                    <Image
                      src="~/assets/images/ic_profile_direction.png"
                      height="50px"
                      width="50px"
                      verticalAlignment="center"
                    />
                    <label 
                      text="Direction"
                      class="text-label"
                      style="color:#03c1b8; margin-left:5;"
                      verticalAlignment="center"/>
                  </StackLayout>
                </StackLayout>
                <!-- <MapView
                v-if="appointment || dataReady"
                  :latitude="mutatableAppointment.clinic_latitude ? mutatableAppointment.clinic_latitude : 0"
                  :longitude="mutatableAppointment.clinic_longitude ? mutatableAppointment.clinic_longitude : 0"
                  :zoom="zoom"
                  @mapReady="onMapReady"
                  @tap="onLocationClick"
                  dock="bottom"
                  height="200"
                  width="100%"
                  horizontalAlignment="center"
                  style="color:blue;"
                /> -->
              </DockLayout>
            </CardView>
          </StackLayout>
        </ScrollView>

        <DockLayout orientation="horizontal" row="1" class="m-b-20">
          <AppButton
            dock="right"
            :text="'button_confirm'|L"
            @tap="confirm"
            width="40%"
            v-bind:visibility="!btnConfirm ? 'collapse': 'visible'"
          />
          <AppButtonWarning
            dock="right"
            :text="'button_reschedule'|L"
            @tap="reschdule"
            width="40%"
            v-bind:visibility="!btnReschedule ? 'collapse': 'visible'"
          />
          <AppButtonDanger
            dock="left"
            :text="'button_cancel'|L"
            @tap="cancel"
            width="40%"
            v-bind:visibility="!btnCancel ? 'collapse': 'visible'"
          />
        </DockLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>
<style scoped>
.button-location{
  width:48%; 
  border-width:1; 
  border-radius:5;
  margin-right: 10;
  border-color: #03c1b8;
  padding:10 15 10 15;
}
.sub-title-item {
  color: black;
  font-size: 16pt;
  font-weight: bold;
}
.class-approved {
  color: #03c1b8;
}
.class-cancelled {
  color: red;
}
.class-waiting {
  color: orange;
}
</style>


<script>
var frame = require("ui/frame");
import * as dt from "../../modules/datetime";
import * as constant from "../../modules/constants";
import * as notification from "~/modules/notification.js";
import { appointmentApi } from "../../modules/commonapi";
import { device } from "tns-core-modules/platform";
import Maps from "~/components/mydoctor/Maps";
import { localize } from "nativescript-localize";
import BookFrame from "~/components/book/BookFrame";
import { Marker, Position } from "nativescript-google-maps-sdk";
import { constants } from 'fs';
var Directions = require("nativescript-directions").Directions;

export default {
  mounted() {
    if (this.id) {
      console.log("got id", this.id, this.photo_profile);
      this.mutatableAppointment.id = this.id;
      this.mutatableAppointment.photo_profile = this.photo_profile;
      this.mutatableAppointment.clinic_latitude = 0;
      this.mutatableAppointment.clinic_longitude = 0;
      setTimeout(() => {
        this.loadData();
      }, 0);
    } else {
      this.mutatableAppointment = this.appointment;
      this.initData();
    }
    setTimeout(() => {
      console.log("current backstack: " + frame.topmost().canGoBack());
    }, 0);
  },
  props: {
    appointment: Object,
    id: "",
    photo_profile: "",
    notificationType: Number,
  },
  data() {
    return {
      mutatableAppointment: {},
      btnConfirm: false,
      btnReschedule: false,
      btnCancel: false,
      textStatus: "",
      textClass: "",
      busy: false,
      error: false,
      zoom: 15,
      minZoom: 0,
      maxZoom: 22,
      bearing: 0,
      tilt: 0,
      mapView: Object,
      dataReady: false,
      canceled: false,
    };
  },
  methods: {

    onMapReady(event) {
      console.log("Map ready!");
      this.mapView = event.object;
      var marker = new Marker();
      marker.position = Position.positionFromLatLng(
        this.mutatableAppointment.clinic_latitude,
        this.mutatableAppointment.clinic_longitude
      );
      this.mapView.addMarker(marker);
      
    },
    getClass() {
      return this.textClass;
    },
    getDate(stringDate) {
      return dt.dateToLongDate(stringDate);
    },
    initData() {
      console.log(JSON.stringify(this.mutatableAppointment));
      this.initView();
    },
    initView() {
      switch (this.mutatableAppointment.status) {
        case constant.APPOINTMENT_STATUS_UNCONFIRMED:
          this.textStatus = localize(
            "fragment_myappointments_status_unconfirmed"
          );
          this.btnConfirm = false;
          this.btnCancel = true;
          this.btnReschedule = true;
          this.textClass = "class-approved"
          break;
        case constant.APPOINTMENT_STATUS_WATING_APPROIVAL:
          this.textStatus = localize(
            "fragment_myappointments_status_waiting_approval"
          );
          this.btnConfirm = false;
          this.btnCancel = false;
          this.btnReschedule = false;
          this.textClass = "class-waiting"
          break;
        case constant.APPOINTMENT_STATUS_CANCELLED:
          this.textStatus = localize("fragment_myappointments_status_canceled");
          this.btnConfirm = false;
          this.btnCancel = false;
          this.btnReschedule = false;
          this.textClass = "class-cancelled"
          break;
        case constant.APPOINTMENT_STATUS_CONFIRMED:
          this.textStatus = localize(
            "fragment_myappointments_status_confirmed"
          );
          this.btnConfirm = false;
          this.btnCancel = true;
          this.btnReschedule = true;
          this.textClass = "class-approved"
          break;
        case constant.APPOINTMENT_STATUS_RESCHEDULED:
          this.textStatus = localize(
            "fragment_myappointments_status_rescheduled"
          );
          this.btnConfirm = false;
          this.btnCancel = false;
          this.btnReschedule = false;
          this.textClass = "class-waiting"
          break;
      }
      this.dataReady = true;
    },
    confirm() {
      console.log("confirm");
    },
    cancel() {
      console.log("cancel");
      confirm({
        title: localize("dialog_cancel_appointment_title"),
        message: localize("dialog_cancel_appointment_body"),
        okButtonText: localize("starter_yes"),
        cancelButtonText: localize("starter_no")
      }).then(result => {
        console.log(result);
        if (result) {
          this.$loader.show();
          appointmentApi.cancelQueueAppointment(
            this.mutatableAppointment.id,
            success => {
              console.log(JSON.stringify(success));
              this.$loader.hide();
              alert({
                title: localize("activity_appointment_canceled_title"),
                message: localize("activity_appointment_canceled_body"),
                okButtonText: localize("dialog_session_expire_ok")
              }).then(() => {
                this.canceled = true;
                this.loadData();
              });
            },
            error => {
              console.log(JSON.stringify(error));
              this.$loader.hide();
              alert({
                title: localize("activity_book_submit_failed_title"),
                message: localize("error_something_went_wrong"),
                okButtonText: localize("dialog_session_expire_ok")
              }).then(() => {});
            }
          );
        }
      });
    },
    loadData() {
      this.busy = true;
      this.error = false;
      var success = success => {
        this.mutatableAppointment = success.data;
        this.mutatableAppointment.clinic_latitude = this.mutatableAppointment.clinic_latitute
        if (this.photo_profile) {
          this.mutatableAppointment.photo_profile = this.photo_profile;
        }
        this.busy = false;
        this.initView();
      };
      var error = error => {
        this.busy = false;
        this.error = true;
      };
      if (
        this.mutatableAppointment.type == "queue" ||
        this.notificationType == notification.QUEUE_RESCHEDULED ||
        this.notificationType == notification.QUEUE_ACCEPTED ||
        this.notificationType == notification.QUEUE_ASSIGNED ||
        this.notificationType == notification.QUEUE_RESCHEDULED ||
        this.canceled
      ) {
        appointmentApi.getQueueAppointmentById(
          this.mutatableAppointment.id,
          success,
          error
        );
      } else {
        appointmentApi.getQueueBookingById(
          this.mutatableAppointment.id,
          success,
          error
        );
      }
    },
    reschdule() {
      console.log("reschedule clicked");
      confirm({
        title: localize("reschedule_title"),
        message: localize("reschedule_content"),
        okButtonText: localize("starter_yes"),
        cancelButtonText: localize("starter_no")
      }).then(result => {
        console.log(result);
        if (result) {
          this.$loader.show();
          var profile;
          this.$http.get(
            "/clinics/" +
              this.mutatableAppointment.clinic_id +
              "/doctor/" +
              this.mutatableAppointment.doctor_id,
            content => {
              let responsePayload = content.content;
              profile = responsePayload.data;
              this.$loader.hide();
              this.$store.commit('setDoctorId', this.mutatableAppointment.doctor_id)
              this.$store.commit('setClinicId', this.mutatableAppointment.clinic_id)
              this.$store.commit('setBookingState', constant.RESERVATION_TYPE_QUEUE_RESCHEDULE)
              this.$store.commit('setAppointmentId', this.mutatableAppointment.id)
              this.$store.commit('setBookingReason', this.mutatableAppointment.reason)
              this.$navigateTo(BookFrame, {
                transition: "slide",
                props: {
                  doctor: profile,
                }
              });
            },
            error => {}
          );
        }
      });
    },
    onLocationClick() {
      console.log(
        "location clicked, long " +
          this.mutatableAppointment.clinic_longitude +
          ",lat " +
          this.mutatableAppointment.clinic_latitude
      );
        this.$navigateTo(Maps, {
          transition: "slide",
          props: {
            title: this.mutatableAppointment.clinic,
            address: this.mutatableAppointment.address,
            longitude: this.mutatableAppointment.clinic_longitude,
            latitude: this.mutatableAppointment.clinic_latitude
          }
        });
    }
  }
};
</script>
