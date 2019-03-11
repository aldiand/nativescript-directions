<template>
  <Page class="page">
    <AppBar :title="'fragment_myappointments_title'|L"/>
    <StackLayout style="background-image:url('~/assets/images/Group7.png'); background-size:cover;">
      <AppEmptyView
        :text="'activity_book_submit_failed_title' | L"
        v-bind:visibility="!error ? 'collapse': 'visible'"
        @refresh="loadData"
      />
      <AppLoadingView v-bind:visibility="busy ? 'visible' : 'collapse'"/>
      <ScrollView>
        <StackLayout>
          <DockLayout class="container-list">
            <ImageCacheIt
              resize="150,150"
              stretch="aspectFit"
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
                style="font-weight:bold;color:#03c1b8;font-size:18pt;margin-bottom:10px"
              />
              <Label
                textWrap="true"
                :text="mutatableAppointment.clinic"
                style="font-weight:bold;color:#828282;margin-bottom:10px"
              />
              <label
                textWrap="true"
                :text="mutatableAppointment.address"
                style="font-size:12pt;margin-bottom:10px"
              />
            </StackLayout>
          </DockLayout>
          <DockLayout class="container-list">
            <StackLayout
              dock="left"
              orientation="vertical"
              style="padding:20px;"
              horizontalAlignment="stretch"
            >
              <Label
                textWrap="true"
                :text="'starter_schedule_text'|L"
                verticalalAlignment="center"
              />
              <Label
                textWrap="true"
                :text="getDate(mutatableAppointment.date)"
                horizontalAlignment="right"
                class="label-margin"
                style="font-weight:bold;color:#03c1b8;"
              />
              <label
                textWrap="true"
                :text="mutatableAppointment.time"
                horizontalAlignment="right"
                style="font-weight:bold;color:#03c1b8"
              />
            </StackLayout>
          </DockLayout>
          <DockLayout class="container-list" style="padding:20px;">
            <Label textWrap="true" dock="left" :text="'starter_location'|L"/>
            <Label
              dock="top"
              textWrap="true"
              :text="mutatableAppointment.address"
              horizontalAlignment="right"
              style="font-weight:bold;color:#03c1b8;"
            />
            <label
              @tap="onLocationClick"
              dock="right"
              textWrap="true"
              :text="'activity_book_see_location'|L"
              horizontalAlignment="right"
              style="color:blue;"
              marginT
              op="3"
            />
          </DockLayout>
          <DockLayout class="container-list" stretchLastChild="true">
            <StackLayout
              dock="left"
              orientation="vertical"
              style="padding:20px;"
              horizontalAlignment="stretch"
            >
              <Label textWrap="true" :text="'starter_status'|L"/>
              <Label
                :text="textStatus"
                class="label-margin"
                textWrap="true"
                horizontalAlignment="right"
              />
              <!-- <Label :text="'fragment_myappointments_status_waiting_approval' | L" class="label-margin" textWrap="true" horizontalAlignment="right"/> -->
            </StackLayout>
          </DockLayout>
          <AppButton
            :text="'button_confirm'|L"
            @tap="confirm"
            v-bind:visibility="!btnConfirm ? 'collapse': 'visible'"
          />
          <AppButtonWarning
            :text="'button_reschedule'|L"
            @tap="reschdule"
            v-bind:visibility="!btnReschedule ? 'collapse': 'visible'"
          />
          <AppButtonDanger
            :text="'button_cancel_appointment'|L"
            @tap="cancel"
            v-bind:visibility="!btnCancel ? 'collapse': 'visible'"
          />
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>


<script>
var frame = require("ui/frame");
import * as dt from "../../modules/datetime";
import * as constant from "../../modules/constants";
import { appointmentApi } from "../../modules/commonapi";
import { device } from "tns-core-modules/platform";
import Maps from "~/components/mydoctor/Maps";
import { localize } from "nativescript-localize";
import SelectTime from "~/components/book/SelectTime";
var Directions = require("nativescript-directions").Directions;

export default {
  mounted() {
    if (this.id) {
      console.log("got id", this.id, this.photo_profile);
      this.mutatableAppointment.id = this.id;
      this.mutatableAppointment.photo_profile = this.photo_profile;
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
    photo_profile: ""
  },
  data() {
    return {
      mutatableAppointment: {},
      btnConfirm: false,
      btnReschedule: false,
      btnCancel: false,
      textStatus: "",
      busy: false,
      error: false
    };
  },
  methods: {
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
          break;
        case constant.APPOINTMENT_STATUS_WATING_APPROIVAL:
          this.textStatus = localize(
            "fragment_myappointments_status_waiting_approval"
          );
          this.btnConfirm = false;
          this.btnCancel = false;
          this.btnReschedule = false;
          break;
        case constant.APPOINTMENT_STATUS_CANCELLED:
          this.textStatus = localize("fragment_myappointments_status_canceled");
          this.btnConfirm = false;
          this.btnCancel = false;
          this.btnReschedule = false;
          break;
        case constant.APPOINTMENT_STATUS_CONFIRMED:
          this.textStatus = localize(
            "fragment_myappointments_status_confirmed"
          );
          this.btnConfirm = false;
          this.btnCancel = true;
          this.btnReschedule = true;
          break;
        case constant.APPOINTMENT_STATUS_RESCHEDULED:
          this.textStatus = localize(
            "fragment_myappointments_status_rescheduled"
          );
          this.btnConfirm = false;
          this.btnCancel = false;
          this.btnReschedule = false;
          break;
      }
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
          appointmentApi.cancelAppointment(
            this.mutatableAppointment.id,
            success => {
              console.log(JSON.stringify(success));
              this.$loader.hide();
              alert({
                title: localize("activity_appointment_canceled_title"),
                message: localize("activity_appointment_canceled_body"),
                okButtonText: localize("dialog_session_expire_ok")
              }).then(() => {
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
        console.log(JSON.stringify(success));
        this.mutatableAppointment = success.data;
        if (this.photo_profile) {
          this.mutatableAppointment.photo_profile = this.photo_profile;
        }
        this.busy = false;
        this.initView();
      };
      var error = error => {
        console.log(JSON.stringify(error));
        this.busy = false;
        this.error = true;
      };
      if (this.mutatableAppointment.type == "appointment") {
        appointmentApi.getAppointmentById(
          this.mutatableAppointment.id,
          success,
          error
        );
      } else {
        appointmentApi.getBookingById(
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
              this.$navigateTo(SelectTime, {
                transition: "slide",
                backstackVisible: false,
                props: {
                  doctor_id: this.mutatableAppointment.doctor_id,
                  clinic_id: this.mutatableAppointment.clinic_id,
                  doctor: profile,
                  tag: 1,
                  appointment_id: this.mutatableAppointment.id
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
          this.mutatableAppointment.clinic_latitute
      );
      if (this.$isIOS) {
        var directions = new Directions();
        directions.available().then(avail => {
          directions
            .navigate({
              from: {
                // optional, default 'current location'
              },
              to: {
                lat: this.mutatableAppointment.clinic_latitute,
                lng: this.mutatableAppointment.clinic_longitude
              }
              // for iOS-specific options, see the TypeScript example below.
            })
            .then(
              function() {
                console.log("Maps app launched.");
              },
              function(error) {
                console.log(error);
              }
            );
        });
      } else {
        this.$navigateTo(Maps, {
          transition: "slide",
          props: {
            title: this.mutatableAppointment.clinic,
            address: this.mutatableAppointment.address,
            longitude: this.mutatableAppointment.clinic_longitude,
            latitude: this.mutatableAppointment.clinic_latitute
          }
        });
      }
    }
  }
};
</script>

<style>
.container-list {
  background: #ffffff;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
}
.ActionBar {
  background-color: #ffffff;
}
.image-profile {
  width: 150px;
  height: 150px;
  margin: 15px;
}
.label-margin {
  margin-top: -40px;
}
</style>