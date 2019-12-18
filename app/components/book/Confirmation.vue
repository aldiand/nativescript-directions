<template>
  <Page class="page">
    <AppBar :title="'activity_book_title_submit_appointment'|L"/>
    <StackLayout>
      <GridLayout height="100%" rows="*, auto">
        <ScrollView row="0">
          <StackLayout>
            <BookStep 
              horizontalAlignment="center" 
              classCircle1="noActive"
              classCircle2="noActive"
              classCircle3="active"/>
            <StackLayout orientation="vertical" class="container-list">
              <label
              :text="'starter_confirm_review'|L"
              class="h4"
              horizontalAlignment="center"
              style="font-weight:bold;"/>
            <label
              :text="'starter_confirm_review_text'|L"
              horizontalAlignment="center"/>
            </StackLayout>
            <label
              :text="'starter_confirm_date'|L"
              style="margin-top:16"
              class="text-title-confirmation container-list"/>
            <CardView class="cardStyle" margin="10" elevation="2" radius="5" col="0">
              <StackLayout orientation="horizontal" class="m-10">
                <Label
                  textWrap="true"
                  :text="getDate()"
                  style="font-size:15; font-weight:bold;color:#494949;"
                />
                <Label
                  v-if="$store.state.bookingState == constant.RESERVATION_TYPE_TIME || $store.state.bookingState == constant.RESERVATION_TYPE_TIME_RESCHEDULE"
                  textWrap="true"
                  :text="'starter_confirm_schdule_date'|L"
                  style="font-weight:bold;color:#494949;"
                />
                <label
                v-if="$store.state.bookingState == constant.RESERVATION_TYPE_TIME || $store.state.bookingState == constant.RESERVATION_TYPE_TIME_RESCHEDULE"
                  textWrap="true"
                  :text="getTime()"
                  style="font-size:15; font-weight:bold;color:#494949"
                />
              </StackLayout>
            </CardView>
            <label
              :text="'starter_confirm_doctor'|L"
              class="text-title-confirmation container-list"/>
            <CardView class="cardStyle" margin="10" style="padding:20px;" elevation="2" radius="5">
              <DockLayout class="container-list" style="margin:10px;">
                <ImageCacheIt
                  resize="150,150"
                  stretch="fill"
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
            <!-- <GridLayout columns="*,*" horizontalAlignment="center" width="100%"> -->
              <!-- <CardView class="cardStyle" margin="10" elevation="1" radius="1" col="0">
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
              </CardView> -->
              <label
                :text="'starter_treatment'|L"
                class="text-title-confirmation container-list"/>
              <CardView class="cardStyle" margin="10" style="padding:20px;"  elevation="2" radius="5" col="1">
                <ItemListService iconSrc="~/assets/images/ic_medic_general.png" :service="reason ? reason : $store.state.bookingReason"/>
              </CardView>
            <!-- </GridLayout> -->
            <!-- <label
                :text="'starter_confirm_notes'|L"
                class="text-title-confirmation container-list"/> -->
            <CardView v-if="$store.state.bookingState == constant.RESERVATION_TYPE_TIME || $store.state.bookingState == constant.RESERVATION_TYPE_QUEUE" class="cardStyle" margin="10" style="padding:20px;"  elevation="2" radius="5" col="1">
                <TextField v-model="notes" :hint="'starter_confirm_notes_hint'|L" autocorrect="false" style="border-width:1;border-color:#ffffff;margin:10px;color:black;"></TextField>
              </CardView>


          <Button
            :text="'activity_new_message_send'|L"
            @tap="onSubmit"
            style="margin-top:32"
            class="btn btn-submit"
          />
          </StackLayout>
        </ScrollView>
         <StackLayout row="1" orientation="horizontal" horizontalAlignment="center" style="width:100%;margin-bottom:30px;">
          <!-- <Button
            class="btn btn-next-prev"
            :text="'starter_btn_prev'|L"
          /> -->
        </StackLayout>
      </GridLayout>
      <!-- <ScrollView>
        <StackLayout>
            <CardView class="cardStyle" margin="10" elevation="1" radius="1">
              <DockLayout class="container-list">
                <ImageCacheIt
                  resize="150,150"
                  stretch="fill"
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
import * as constant from "../../modules/constants";
import { appointmentApi } from "../../modules/commonapi";
import DetailAppointment from "~/components/appointment/DetailAppointment";
import DetailQueue from "~/components/appointment/DetailQueue";
import { localize } from "nativescript-localize";
import BookStep from "./BookStep";
import ItemListService from "../mydoctor/ItemListService";
var moment = require("moment");

export default {
  components:{
    BookStep,
    ItemListService
  },
  props: {
    doctor: {},
  },
  data() {
    return {
      clinic_id: this.$store.state.clinicId,
      doctor_id: this.$store.state.doctorId,
      time: this.$store.state.time,
      date: this.$store.state.date,
      reason: this.$store.state.service,
      appointment_id: this.$store.state.appointmentId,
      constant: constant,
      notes: '',
    }
  },
  methods: {
    onSubmit() {
      this.$loader.show();
      let state = this.$store.state.bookingState;
      switch (state) {
        case constant.RESERVATION_TYPE_TIME:
          this.submitAppointment();
          break;
        case constant.RESERVATION_TYPE_QUEUE:
          this.submitQueue();
          break;
        case constant.RESERVATION_TYPE_TIME_RESCHEDULE:
          this.rescheduleAppointment();
          
          break;
        case constant.RESERVATION_TYPE_QUEUE_RESCHEDULE:
          this.rescheduleQueue();
          
          break;
      
        default:
          console.log("something went wrong");
          break;
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
        this.date,
        this.time,
        this.reason,
        this.notes,
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
        this.date,
        this.time,
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
    submitQueue() {
      console.log("Queue appointment ");
      appointmentApi.createQueue(
        this.doctor_id,
        this.clinic_id,
        this.date,
        this.reason,
        this.notes,
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
                this.$navigateTo(DetailQueue, {
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
        })
    },
    rescheduleQueue() {
      console.log("reschedule Queue ");
      appointmentApi.rescheduleQueueAppointment(
        this.appointment_id,
        this.date,
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
                this.$navigateTo(DetailQueue, {
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
      return moment(this.date + " " + this.time, "YYYY-MM-DD HH:mm").format("LL");
    },
    getTime() {
      return moment(this.date + " " + this.time, "YYYY-MM-DD HH:mm").format("HH.mm");
    }
  }
};
</script>

<style scoped>
.container-list {
  background: #ffffff;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 10px;
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
.text-title-confirmation{
  color : #3DC1C3;
  font-weight: bold;
  font-size:20pt;
  margin-left:10;
}
.text-optional{
  color : rgb(145, 145, 145);
  font-size:16pt;
}
.btn-submit{
  border-radius:50%;
  width:70%;
  color:#FFFFFF;
  background-color:#03c1b8;
}
</style>