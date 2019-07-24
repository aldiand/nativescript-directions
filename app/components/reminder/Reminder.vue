<template>
  <Page class="page">
    <AppBar :title="'fragment_reminders_title'|L"/>
    <StackLayout>
      <AppEmptyView
        :text="'error_something_went_wrong' | L"
        v-bind:visibility="!error ? 'collapse': 'visible'"
        @refresh="loadData"
      />
      <AppLoadingView v-bind:visibility="busy ? 'visible' : 'collapse'"/>
      <ScrollView>
        <StackLayout>
            <CardView class="cardStyle" margin="10" elevation="1" radius="1">
              <DockLayout class="container-list">
                <ImageCacheIt
                  resize="150,150"
                  stretch="aspectFit"
                  :imageUri="mutatableReminder.photo_profile"
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
                    :text="mutatableReminder.doctor"
                    style="font-weight:bold;font-size:18pt;margin-bottom:10px;color:black;"
                  />
                  <Label
                    textWrap="true"
                    :text="mutatableReminder.clinic"
                    style="font-size:12pt;margin-bottom:10px;color:#03c1b8"
                  />
                </StackLayout>
              </DockLayout>
            </CardView>
            <StackLayout style="padding-left:15;padding-right:15;">
              <CardView margin="15" elevation="3" radius="3" width="100%">
                <StackLayout orientation="vertical" style="text-align:center;padding:15;">
                  <label :text="'starter_schedule_text'|L" class="h5 label-title"/>
                  <label :text="getDate(mutatableReminder.date)" class="h2 label-title text-main" style="color:#03c1b8;font-weight:bold;"/>    
                  <label v-if="mutatableReminder.time !== '00:00:00'" :text="mutatableReminder.time" class="h2 label-title text-main" style="color:#03c1b8;font-weight:bold;"/>
                </StackLayout>
              </CardView>
            </StackLayout>
            <StackLayout class="m-t-10" horizontalAlignment="center">
              <label
                textWrap="true"
                :text="'error_no_information_available'|L"
                horizontalAlignment="center"
                style="color:blue"
                @tap="detail"
              />
            </StackLayout>

        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

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
<script>
import * as notification from "~/modules/notification.js";
import { reminderApi } from "~/modules/commonapi";
import * as dt from "../../modules/datetime";
import DetailAppointment from "~/components/appointment/DetailAppointment";
import DetailQueue from "~/components/appointment/DetailQueue";

export default {
  mounted() {
    if (this.id) {
      console.log("got id", this.id);
      setTimeout(() => {
        this.loadData();
      }, 0);
    } else {
      this.mutatableReminder = this.reminder;
    }
  },
  data() {
    return {
      mutatableReminder: {},
      error: false,
      busy: false
    };
  },
  props: {
    reminder: Object,
    id: "",
    notificationType: String
  },
  methods: {
    detail() {
      if(this.mutatableReminder.reservation_type == "queue") {
          this.$navigateTo(
            DetailQueue,
            {
              transition: "slide",
              props: {
                id: this.mutatableReminder.appointment_id,
                notificationType: notification.QUEUE_ACCEPTED,
              }
            }
          );
      } else {
          this.$navigateTo(
            DetailAppointment,
            {
              transition: "slide",
              props: {
                id: this.mutatableReminder.appointment_id,
                notificationType: notification.APPOINTMENT_ACCEPTED,

              }
            }
          );
      }
    },
    getDate(stringDate) {
      return dt.dateToLongDate(stringDate);
    },
    loadData() {
      this.busy = true;
      this.error = false;
      var type = "";
      if (this.notificationType == notification.TREATMENT_REMINDER) {
        type = "reminders";
      } else if (this.notificationType == notification.TREATMENT_RECALL) {
        type = "recall";
      }
      reminderApi.getReminderById(
        this.id,
        type,
        success => {
          console.log(success.data);
          this.mutatableReminder = success.data;
          this.busy = false;
        },
        error => {
          this.busy = false;
          this.error = true;
        }
      );
    }
  }
};
</script>