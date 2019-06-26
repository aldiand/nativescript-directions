<template>
  <Page class="page">
    <AppBar :title="'activity_book_title_submit_appointment'|L"/>
    <StackLayout>

      <GridLayout height="100%" rows="*, auto">
        <ScrollView row="0">
          <StackLayout>
            <CardView class="cardStyle" margin="10" elevation="1" radius="1">
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
                    style="font-weight:bold;font-size:18pt;margin-bottom:10px;color:black;"
                  />
                  <Label
                    textWrap="true"
                    :text="doctor.clinic_name"
                    style="font-size:12pt;margin-bottom:10px;color:#03c1b8"
                  />
                </StackLayout>
              </DockLayout>
            </CardView>
            <GridLayout columns="*,*" horizontalAlignment="center" width="100%">
              <CardView class="cardStyle" margin="10" elevation="1" radius="1" col="0">
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
                      :text="getDate()"
                      style="font-weight:bold;color:#03c1b8;margin-top:8;"
                    />
                    <label
                      textWrap="true"
                      :text="getTime()"
                      style="font-weight:bold;color:#03c1b8"
                    />
                  </StackLayout>
                </DockLayout>
              </CardView>
              <CardView class="cardStyle" margin="10" elevation="1" radius="1" col="1">
                <DockLayout
                  dock="right"
                  width="100%"
                  style="padding:20px;"
                  stretchLastChild="false"
                >
                  <Label
                    dock="top"
                    textWrap="true"
                    :text="'starter_treatment'|L"
                    class="sub-title-item"
                  />
                  <Label
                    dock="bot"
                    :text="reason"
                    textWrap="true"
                    horizontalAlignment="right"
                    style="font-weight:bold;color:#03c1b8;margin-top:8;"
                  />
                </DockLayout>
              </CardView>
            </GridLayout>
          </StackLayout>
        </ScrollView>
        <DockLayout orientation="horizontal" row="1" class="m-b-20">
          <AppButton
            dock="top"
            :text="'activity_new_message_send'|L"
            @tap="onSubmit"
            style="margin-top:10px;"
            v-bind:visibility="loading ? 'collapse': 'visible'"
          ></AppButton>
        </DockLayout>
      </GridLayout>
      <!-- <ScrollView>
        <StackLayout>
            <CardView class="cardStyle" margin="10" elevation="1" radius="1">
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
                    style="font-weight:bold;font-size:18pt;margin-bottom:10px;color:black;"
                  />
                  <Label
                    textWrap="true"
                    :text="doctor.clinic_name"
                    style="font-size:12pt;margin-bottom:10px;color:#03c1b8"
                  />
                </StackLayout>
              </DockLayout>
            </CardView>
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
            </StackLayout>
          </DockLayout>

          <AppButton
            :text="'activity_new_message_send'|L"
            @tap="onSubmit"
            style="margin-top:10px;"
            v-bind:visibility="loading ? 'collapse': 'visible'"
          ></AppButton>
        </StackLayout>
      </ScrollView> -->
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
      return moment(this.time, "YYYY-MM-DD HH:mm").format("LL");
    },
    getTime() {
      return moment(this.time, "YYYY-MM-DD HH:mm").format("LT");
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