<template>
  <Page class="page">
    <AppBar :title="'fragment_myappointments_title'|L"/>
    <StackLayout style="background-image:url('~/assets/images/Group7.png'); background-size:cover;">
      <ScrollView>
        <StackLayout>
          <DockLayout class="container-list">
            <ImageCacheIt
              resize="150,150"
              stretch="aspectFit"
              :imageUri="appointment.photo_profile"
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
                :text="appointment.doctor"
                style="font-weight:bold;color:#03c1b8;font-size:18pt;margin-bottom:10px"
              />
              <Label
                textWrap="true"
                :text="appointment.clinic"
                style="font-weight:bold;color:#828282;margin-bottom:10px"
              />
              <label
                textWrap="true"
                :text="appointment.address"
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
                :text="getDate(appointment.date)"
                horizontalAlignment="right"
                class="label-margin"
                style="font-weight:bold;color:#03c1b8;"
              />
              <label
                textWrap="true"
                :text="appointment.time"
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
              :text="appointment.address"
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
import * as dt from "../../modules/datetime";
import * as constant from "../../modules/constants";
import { appointmentApi } from "../../modules/commonapi";
import { device } from "tns-core-modules/platform";
import Maps from "~/components/mydoctor/Maps";
import { localize } from "nativescript-localize";
var Directions = require("nativescript-directions").Directions;

export default {
  mounted() {
    this.initData();
  },
  props: {
    appointment: Object
  },
  data() {
    return {
      btnConfirm: false,
      btnReschedule: false,
      btnCancel: false,
      textStatus: ""
    };
  },
  methods: {
    getDate(stringDate) {
      return dt.dateToLongDate(stringDate);
    },
    initData() {
      console.log(JSON.stringify(this.appointment));
      this.initView();
    },
    initView() {
      switch (this.appointment.status) {
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
          this.btnReschedule = true;
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
        title: localize('dialog_cancel_appointment_title'),
        message: localize('dialog_cancel_appointment_body'),
        okButtonText: localize('starter_yes'),
        cancelButtonText: localize('starter_no')
      }).then(result => {
        console.log(result);
        if(result) {
          console.log("cancelling appointment..");
          appointmentApi().cancelAppointment(this.appointment.id, 
          success => {
            console.log(JSON.stringify(success));
          }, 
          error => {
            console.log(JSON.stringify(error));
          });
        }
      });
    },
    reschdule() {
    },
    onLocationClick() {
      console.log(
        "location clicked, long " +
          this.appointment.clinic_longitude +
          ",lat " +
          this.appointment.clinic_latitute
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
                lat: this.appointment.clinic_latitute,
                lng: this.appointment.clinic_longitude
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
            title: this.appointment.clinic,
            address: this.appointment.address,
            longitude: this.appointment.clinic_longitude,
            latitude: this.appointment.clinic_latitute
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