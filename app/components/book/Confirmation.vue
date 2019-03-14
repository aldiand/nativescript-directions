<template>
  <Page class="page">
    <AppBar :title="'activity_book_title_submit_appointment'|L"/>
    <StackLayout style="background-image:url('~/assets/images/Group7.png'); background-size:cover;">
      <ScrollView>
        <StackLayout>
          <DockLayout class="container-list">
            <ImageCacheIt
              resize="150,150"
              stretch="aspectFit"
              :imageUri="doctor.photo_profile"
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
                :text="doctor.profile_name"
                style="font-weight:bold;color:#03c1b8;font-size:18pt;margin-bottom:10px"
              />
              <Label
                textWrap="true"
                :text="doctor.clinic_name"
                style="font-weight:bold;color:#828282;margin-bottom:10px"
              />
              <label
                textWrap="true"
                :text="doctor.location"
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
                :text="getDate()"
                horizontalAlignment="right"
                class="label-margin"
                style="font-weight:bold;color:#03c1b8;"
              />
              <label
                textWrap="true"
                :text="getTime()"
                horizontalAlignment="right"
                style="font-weight:bold;color:#03c1b8"
              />
            </StackLayout>
          </DockLayout>
          <DockLayout class="container-list" stretchLastChild="true">
            <StackLayout
              dock="left"
              orientation="vertical"
              style="padding:20px;"
              horizontalAlignment="stretch"
            >
              <Label textWrap="true" :text="'starter_treatment'|L"/>
              <Label
                :text="reason"
                class="label-margin"
                textWrap="true"
                style="font-weight:bold;color:#03c1b8"
                horizontalAlignment="right"
              />
              <!-- <Label :text="'fragment_myappointments_status_waiting_approval' | L" class="label-margin" textWrap="true" horizontalAlignment="right"/> -->
            </StackLayout>
          </DockLayout>

          <AppButton
            :text="'activity_new_message_send'|L"
            @tap="onSubmit"
            style="margin-top:10px;"
            v-bind:visibility="loading ? 'collapse': 'visible'"
          ></AppButton>
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>


<script>
import * as dt from "../../modules/datetime";
import { appointmentApi } from "../../modules/commonapi";
import DetailAppointment from "~/components/appointment/DetailAppointment";
import { localize } from "nativescript-localize";

var moment = require("moment");

export default {
  props: {
    doctor: {},
    clinic_id: Number,
    doctor_id: Number,
    tag: Number,
    time: String,
    reason: String,
    appointment_id: Number,
  },
  methods: {
    onSubmit() {
      this.$loader.show();
      if (this.tag == 1) {
        this.rescheduleAppointment();
      } else {
        this.submitAppointment();
      }
    },
    submitAppointment() {
      console.log(
        "createBooking" +
          this.doctor_id +
          " " +
          this.clinic_id +
          " " +
          this.time +
          " " +
          this.reason
      );
      appointmentApi.createBooking(
        this.doctor_id,
        this.clinic_id,
        this.time,
        this.reason,
        success => {
          console.log(JSON.stringify(success));
          this.$loader.hide();
          if (success.data.data_id) {
            setTimeout(() => {
              alert({
                title: localize("activity_book_submit_success_title"),
                message: localize("activity_book_submit_success_content"),
                okButtonText: localize("dialog_session_expire_ok")
              }).then(() => {
                // go to appointment page + clear history
                console.log("ok clicked");
                this.$navigateTo(DetailAppointment, {
                  transition: "slide",
                  props: {
                    id: success.data.data_id,
                    photo_profile: this.doctor.photo_profile,
                  }
                });
              });
            }, 0);
          } else {
            setTimeout(() => {
              alert({
                title: localize("activity_book_submit_failed_title"),
                message: localize("error_something_went_wrong"),
                okButtonText: localize("dialog_session_expire_ok")
              }).then(() => {});
            }, 0);
          }
        },
        error => {
          console.log(JSON.stringify(error));
          this.$loader.hide();
          setTimeout(() => {
            alert({
              title: localize("activity_book_submit_failed_title"),
              message: localize("error_something_went_wrong"),
              okButtonText: localize("dialog_session_expire_ok")
            }).then(() => {});
          }, 0);
        }
      );
    },
    rescheduleAppointment() {
      console.log("reschedule appointment ");

      appointmentApi.rescheduleAppointment(
        this.appointment_id,
        this.time,
        success => {
          console.log(JSON.stringify(success));
          this.$loader.hide();
          if (success.data.data_id) {
            setTimeout(() => {
              alert({
                title: localize("activity_book_reschedule_succcess_title"),
                message: localize("activity_book_reschedule_succcess_content"),
                okButtonText: localize("dialog_session_expire_ok")
              }).then(() => {
                // go to appointment page + clear history
                console.log("ok clicked");
                this.$navigateTo(DetailAppointment, {
                  transition: "slide",
                  props: {
                    id: success.data.data_id,
                    photo_profile: this.doctor.photo_profile,
                  }
                });
              });
            }, 0);
          } else {
            setTimeout(() => {
              alert({
                title: localize("activity_book_submit_failed_title"),
                message: localize("error_something_went_wrong"),
                okButtonText: localize("dialog_session_expire_ok")
              }).then(() => {});
            }, 0);
          }
        },
        error => {
          console.log(JSON.stringify(error));
          this.$loader.hide();
          setTimeout(() => {
            alert({
              title: localize("activity_book_submit_failed_title"),
              message: localize("error_something_went_wrong"),
              okButtonText: localize("dialog_session_expire_ok")
            }).then(() => {});
          }, 0);
        }
      );
    },
    getDate() {
      return moment(this.time, "DD-MM-YYYY HH:mm").format("LL");
    },
    getTime() {
      return moment(this.time, "DD-MM-YYYY HH:mm").format("LT");
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