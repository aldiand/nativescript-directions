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
      
      <GridLayout height="100%" rows="*, auto">
        <ScrollView row="0">
          <StackLayout>
            <CardView class="cardStyle" margin="10" elevation="3" radius="1">
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
                    style="font-size:12pt;margin-bottom:10px;color:#03c1b8;font-weight:bold;"
                  />
                </StackLayout>
              </DockLayout>
            </CardView>
            <GridLayout columns="*,*" horizontalAlignment="center" width="100%">
              <CardView class="cardStyle" margin="10" elevation="3" radius="1" col="0">
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
                      :text="getDate(mutatableReminder.date)"
                      style="font-weight:bold;color:#03c1b8;margin-top:8;"
                    />
                  </StackLayout>
                </DockLayout>
              </CardView>
              <CardView class="cardStyle" margin="10" elevation="3" radius="1" col="1">
                <DockLayout style="padding:20px;" stretchLastChild="false">
                  <Label
                    textWrap="true"
                    dock="top"
                    class="sub-title-item"
                    :text="'starter_time'|L"
                    verticalalAlignment="center"
                  />
                  <StackLayout dock="bot">
                    <Label
                      textWrap="true"
                      :text="mutatableReminder.time"
                      style="font-weight:bold;color:#03c1b8;margin-top:8;"
                    />
                  </StackLayout>
                </DockLayout>
              </CardView>
            </GridLayout>
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
                  :text="mutatableReminder.address"
                  horizontalAlignment="left"
                  style="color:#03c1b8; margin-top:8; margin-bottom:15; font-weight:bold;"
                />
                <StackLayout orientation="horizontal">
                  <StackLayout orientation="horizontal" class="button-location" @tap="onMessageClick">
                    <Image
                      src="~/assets/images/ic_profile_msg.png"
                      height="50px"
                      width="50px"
                      verticalAlignment="center"
                    />
                    <label 
                      :text="'starter_profile_message' | L"
                      class="text-label"
                      style="color:#03c1b8; margin-left:5;"
                      verticalAlignment="center"/>
                  </StackLayout>
                  <StackLayout orientation="horizontal" class="button-location" @tap="onDirection">
                    <Image
                      src="~/assets/images/ic_profile_direction.png"
                      height="50px"
                      width="50px"
                      verticalAlignment="center"
                    />
                    <label 
                      :text="'starter_profile_direction' | L"
                      class="text-label"
                      style="color:#03c1b8; margin-left:5;"
                      verticalAlignment="center"/>
                  </StackLayout>
                </StackLayout>
                <!-- <MapView
                v-if="appointment || dataReady"
                  :latitude="mutatableReminder.clinic_latitude ? mutatableReminder.clinic_latitude : 0"
                  :longitude="mutatableReminder.clinic_longitude ? mutatableReminder.clinic_longitude : 0"
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
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<style scoped>
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
import * as notification from "~/modules/notification.js";
import { reminderApi } from "~/modules/commonapi";
import * as dt from "../../modules/datetime";
import DetailAppointment from "~/components/appointment/DetailAppointment";
import DetailQueue from "~/components/appointment/DetailQueue";
var Directions = require("nativescript-directions").Directions;
import NewMessage from "~/components/inbox/NewMessage";

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
      busy: false,
      textClass: "",
      textStatus: "",
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
    getClass() {
      return this.textClass;
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
    }, 
    onLocationClick() {
      console.log(
        "location clicked, long " +
          this.mutatableReminder.clinic_longitude +
          ",lat " +
          this.mutatableReminder.clinic_latitude
      );
        this.$navigateTo(Maps, {
          transition: "slide",
          props: {
            title: this.mutatableReminder.clinic,
            address: this.mutatableReminder.address,
            longitude: this.mutatableReminder.clinic_longitude,
            latitude: this.mutatableReminder.clinic_latitude
          }
        });
      
    },

    onDirection() {
      console.log("on Direction");
        var directions = new Directions();
        directions.available().then(avail => {
          directions
            .navigate({
              from: {
                // optional, default 'current location'
              },
              to: {
                lat: this.mutatableReminder.latitude,
                lng: this.mutatableReminder.longitude
              }
              // for iOS-specific options, see the TypeScript example below.
            })
            .then(
              function() {
                console.log("Maps app launched.");
              },
              function(error) {
                console.log(error);

                alert({
                  title: localize("direction_alert_title"),
                  message: localize("direction_alert_description"),
                  okButtonText: localize("dialog_session_expire_ok")
                }).then(() => {
                });
              }
            );
        });
    },
    onMessageClick() {
      console.log("onMessageClick clicked");
      this.$navigateTo(NewMessage, {
        transition: "slide",
        props: {
          doctorId:  this.mutatableReminder.doctor_id,
          clinicId:  this.mutatableReminder.clinic_id,
          name:   this.mutatableReminder.doctor ?  this.mutatableReminder.doctor : this.mutatableReminder.clinic,
        }
      });
    },
  }
};
</script>