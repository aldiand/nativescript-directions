<template>
  <Page class="page">
    <AppBar :title="profile.profile_name"/>
    <!-- <ActionBar class="action-bar2" flat="true" title="Doctor Profile">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
      <ActionItem
        tap="onDelete"
        ios.systemIcon="16"
        ios.position="right"
        text="Test"
        android.position="popup"
        style="color:#FFFFFF;"
      ></ActionItem>
      <ActionItem
        tap="onDelete"
        ios.systemIcon="16"
        ios.position="right"
        text="Test"
        android.position="popup"
        style="color:#FFFFFF;"
      ></ActionItem>
    </ActionBar>-->
    <StackLayout>
      <ScrollView height="100%">
          <StackLayout>
            <AbsoluteLayout>
              <ImageCacheIt
                :imageUri="profile.cover ? profile.cover : '~/assets/images/header.jpg'"
                height="400px"
                width="100%"
                resize="500,*"
                left="0"
                top="0"
                stretch="aspectFill"
              />
              <Label
                style="background-color:rgba(0,0,0,0.5);"
                width="100%"
                height="400px"
                left="0"
                top="0"
              />
              <GridLayout 
                width="100%"
                height="400px"
              >
                <StackLayout
                orientation="vertical"
                width="95"
                height="95"
                class="profile-photo-container"
                style="background-color:#FFFFFF;"
                >
                  <ImageCacheIt
                    resize="70,70"
                    stretch="aspectFit"
                    :imageUri="profile.photo_profile"
                    placeholder="~/assets/images/doctordefault.png"
                    errorHolder="~/assets/images/doctordefault.png"
                    class="text-primary"
                    style="width:70;height:70;"
                  />
                </StackLayout>
              </GridLayout>
            </AbsoluteLayout>
            <StackLayout 
              orientation="vertical"
              style="padding-top:20px;"
              class="container-list">
              <Label
                textWrap="true"
                :text="profile.profile_name"
                class="h4"
                style="font-weight:bold;color:#4F4F4F;"
              />
              <Label
                textWrap="true"
                :text="profile.specialty_type"
                class="text-label"
                style="color:#03c1b8;font-style: italic;"
              />
              <!-- <Label textWrap="true" :text="profile.clinic_name" class="text-label text-center"/> -->
              <StackLayout orientation="horizontal" style="margin-top:5px;">
                <Image
                  v-if="profile.rating >= 0.5"
                  src="~/assets/images/star-review-doctor-profile.png"
                  class="star-review"
                />
                <Image
                  v-if="profile.rating >= 1.5"
                  src="~/assets/images/star-review-doctor-profile.png"
                  class="star-review"
                />
                <Image
                  v-if="profile.rating >= 2.5"
                  src="~/assets/images/star-review-doctor-profile.png"
                  class="star-review"
                />
                <Image
                  v-if="profile.rating >= 3.5"
                  src="~/assets/images/star-review-doctor-profile.png"
                  class="star-review"
                />
                <Image
                  v-if="profile.rating >= 4.5"
                  src="~/assets/images/star-review-doctor-profile.png"
                  class="star-review"
                />
                <label
                v-if="profile.reviews"
                  textWrap="true"
                  :text="'review_count' | L(profile.reviews.length)"
                  class="text-label"
                  style="color:#5c687c;text-decoration: underline;"
                  @tap="onReviewClick"
                />
              </StackLayout>
            </StackLayout>
            <label
              style="
                background-color:#C4C4C4;
                width:100%;
                height:1px;
                margin-top:20px;
                margin-bottom:20px;"
            />
            <!-- Location -->
            <DockLayout class="container-list">
              <StackLayout
                dock="left"
                orientation="vertical"
                horizontalAlignment="stretch"
              >
                <Label
                  textWrap="true"
                  :text="'starter_location'|L"
                  class="text-label-title"
                />
                <Label
                  textWrap="true"
                  :text="profile.location"
                  class="label-title"
                  style="font-size:12pt;margin-bottom:10px;"
                />
                <Label
                  textWrap="true"
                  :text="profile.location"
                  class="description-label"
                  style="font-size:12pt"
                />
              </StackLayout>
              <StackLayout dock="right" orientation="horizontal" horizontalAlignment="right" @tap="onLocationClick">
                <label
                  :text="'starter_see_location'|L"
                  class="btn-see-location"
                  textWrap="true"
                  verticalAlignment="center"
                />
              </StackLayout>
            </DockLayout>
            <label
              style="
                background-color:#C4C4C4;
                width:100%;
                height:1px;
                margin-top:20px;
                margin-bottom:20px;"
            />
            <!-- Schedule -->
            <DockLayout class="container-list">
              <StackLayout
                dock="left"
                orientation="vertical"
                horizontalAlignment="stretch"
              >
                <Label
                  textWrap="true"
                  :text="'starter_schedule_text'|L"
                  class="text-label-title"
                />
                <Label
                  textWrap="true"
                  :text="'starter_appointment_text'|L"
                  style="margin-top:10px;"
                  class="description-label label-title"
                />
                <StackLayout orientation="horizontal">
                  <Label
                    textWrap="true"
                    :text="isOpen ? 'doctor_profile_open_now' : 'doctor_profile_close_now'|L"
                    class="description-label"
                    style="font-size:12pt"
                  />
                  <Label
                    textWrap="true"
                    :text="'starter_view_schedule'|L"
                    class="description-label label-title"
                    style="font-size:12pt"
                    @tap="onScheduleClick"
                  />
                </StackLayout>
              </StackLayout>
            </DockLayout>
            <label
              style="
                background-color:#C4C4C4;
                width:100%;
                height:1px;
                margin-top:20px;
                margin-bottom:20px;"
            />
            <!-- Service -->
            <DockLayout class="container-list" v-if="profile.services && profile.services[1]">
              <StackLayout
                dock="left"
                orientation="vertical"
                horizontalAlignment="stretch"
              >
              <Label
                  textWrap="true"
                  :text="'starter_service_text'|L"
                  class="text-label-title"
                />
              <CardView dock="left" class="cardStyle" style="width:100%;margin-top:20px;margin-bottom:20px;">
                <ItemListService iconSrc="~/assets/images/ic_medic_general.png" :service="profile.services[1].name"/>
              </CardView>
               <Label
                    textWrap="true"
                    :text="'starter_view_service'|L"
                    class="description-label label-title"
                    style="font-size:12pt"
                    @tap="onServicesClick"
                  />
              </StackLayout>
            </DockLayout>
            <!-- <DockLayout class="container-list" @tap="onReviewClick">
              <Image
                dock="left"
                src="~/assets/images/review-doctor-profile.png"
                class="image-list"
              />
              <Image
                dock="right"
                src="~/assets/images/next-doctor-profile.png"
                class="next-btn"
                horizontalAlignment="right"
              />
              <StackLayout
                dock="top"
                orientation="vertical"
                style="padding:20px;"
                horizontalAlignment="stretch"
              >
                <Label
                  textWrap="true"
                  :text="'starter_review_text'|L"
                  class="description-label label-title"
                  style="margin-right:20px;"
                />
                <Label
                  textWrap="true"
                  :text="'error_no_information_available'|L"
                  class="description-label"
                  style="font-size:12pt"
                />
              </StackLayout>
            </DockLayout> -->
            <StackLayout verticalAlignment="bottom" class="container-list">
              <Button
              v-if="profile.reservation_type == constant.RESERVATION_TYPE_QUEUE"
                class="app-btn btn btn-primary"
                :text="'activity_message_book_queue'|L"
                style="border-radius:50%;width:100%;"
                @tap="onQueueAppointmentClick"
              />
              <Button
                v-if="profile.reservation_type == constant.RESERVATION_TYPE_TIME"
                class="app-btn btn btn-primary"
                :text="'activity_message_book'|L"
                style="border-radius:50%;width:100%;"
                @tap="onBookAppointmentClick"
              />
            </StackLayout>
          </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<style scoped>
.text-label {
  font-size: 12pt;
}
.action-bar-docto-profile {
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.1);
}
.label-title {
  font-weight: bold;
  color: #03c1b8;
  font-size: 12pt;
}
.text-label-title{
  font-weight: bold;
  color: rgb(82, 82, 82);
  font-size: 18pt;
}
.star-review {
  width: 35px;
}
.image-profile {
  padding: 1;
  border-width: 1;
  border-radius: 50%;
  border-color: #03c1b8;
}
.container-list {
  background: #ffffff;
  width: 100%;
  padding-left:70px;
  padding-right:70px;
}
.container-btn-janji {
  background: #878787;
  z-index: 1;
}
.next-btn {
  width: 30px;
  margin: 10px;
}
.btn-see-location{
  background-color: rgb(3, 193, 184, 0.2);
  color:#03c1b8;
  padding:20px;
  font-size:10pt;
  width:200px;
  border-radius:50px;
  font-weight:bold;
}
.image-list {
  width: 50px;
  margin: 20px;
}
</style>


<script>
import * as dt from "../../modules/datetime";
import Schedule from "~/components/mydoctor/Schedule";
import Services from "~/components/mydoctor/Services";
import Review from "~/components/mydoctor/Review";
import Maps from "~/components/mydoctor/Maps";
import SelectTime from "~/components/book/SelectTime";
import BookFrame from "~/components/book/BookFrame";
import { profileApi } from "../../modules/commonapi";
import * as constant from "../../modules/constants";
import ItemListService from "./ItemListService";
var Directions = require("nativescript-directions").Directions;

export default {
  components:{
    ItemListService
  },
  mounted() {
    this.profile = this.doctor;
    this.loadData();
  },
  data() {
    return {
      profile: {},
      isOpen: false,
      isLoading: true,
      constant: constant,
    };
  },
  props: {
    doctor: Object
  },
  methods: {
    loadData() {
    
      this.isLoading = true;
      var success = success => {
        console.log(JSON.stringify(success));
        this.profile = success.data.data;
          console.log(JSON.stringify(this.profile));
          this.checkOpen();
          this.isLoading = false;
      };
      var error = error => {
        console.log(JSON.stringify(error));
        this.isLoading = false;
        this.error = true;
      };
      profileApi.getDoctorById(this.doctor.clinic_id, this.doctor.doctor_id, success, error);

    },

    checkOpen() {
      var schdule = this.profile.schedule;
      schdule.forEach(item => {
        if (dt.isToday(item.day)) {
          dt.isTimeBetween(item.start_time, item.end_time);
          this.isOpen = true;
          return;
        }
      });
    },

    onLocationClick() {
      console.log(
        "location clicked, long " +
          this.profile.lon +
          ",lat " +
          this.profile.lat
      );
      if (false) {
        var directions = new Directions();
        directions.available().then(avail => {
          directions
            .navigate({
              from: {
                // optional, default 'current location'
              },
              to: {
                lat: this.profile.lat,
                lng: this.profile.lon
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
            title: this.profile.clinic_name,
            address: this.profile.location,
            longitude: this.profile.lon,
            latitude: this.profile.lat
          }
        });
      }
    },

    onReviewClick() {
      console.log("review clicked");
      this.$navigateTo(Review, {
        transition: "slide",
        props: {
          clinic_id: this.profile.clinic_id,
          doctor_id: this.profile.id,
          clinic_name: this.profile.clinic_name,
          doctor_name: this.profile.profile_name
        }
      });
    },

    onServicesClick() {
      console.log("services clicked");
      this.$navigateTo(Services, {
        transition: "slide",
        props: {
          clinic_id: this.profile.clinic_id,
          clinic_name: this.profile.clinic_name
        }
      });
    },

    onScheduleClick() {
      console.log("schedule clicked");
      this.$navigateTo(Schedule, {
        transition: "slide",
        props: {
          name: this.profile.profile_name,
          clinic_name: this.profile.clinic_name,
          schedules: this.profile.schedule
        }
      });
    },
    onBookAppointmentClick() {
      console.log("appointment clicked");
      this.$store.commit('setDoctorId', this.doctor.doctor_id)
      this.$store.commit('setClinicId', this.doctor.clinic_id)
      this.$store.commit('setBookingState', constant.RESERVATION_TYPE_TIME)
      this.$navigateTo(BookFrame, {
        transition: "slide",
        backstackVisible: false,
        props: {
          doctor: this.profile,
        }
      });
    },
    onQueueAppointmentClick() {
      console.log("onQueueAppointmentClick clicked");
      this.$store.commit('setDoctorId', this.doctor.doctor_id)
      this.$store.commit('setClinicId', this.doctor.clinic_id)
      this.$store.commit('setBookingState', constant.RESERVATION_TYPE_QUEUE)
      this.$navigateTo(BookFrame, {
        transition: "slide",
        backstackVisible: false,
        props: {
          doctor: this.profile,
        }
      });
    }
  }
};
</script>