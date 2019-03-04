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
    <StackLayout style="background-image:url('~/assets/images/Group7.png'); background-size:cover;">
      <ScrollView>
        <Shimmer :enabled="isLoading">
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
            </AbsoluteLayout>
            <StackLayout
              style="padding:10px;margin-top:-85px;margin-bottom:20px;"
              orientation="horizontal"
            >
              <ImageCacheIt
                stretch="aspectFit"
                :imageUri="profile.photo_profile"
                resize="150,150"
                placeholder="~/assets/images/doctordefault.png"
                errorHolder="~/assets/images/doctordefault.png"
                class="image-profile"
              />
              <StackLayout orientation="vertical" verticalAlignment="Bottom" style="padding:10px;">
                <Label
                  textWrap="true"
                  :text="profile.specialty_type"
                  class="text-label"
                  style="color:#FFFFFF;font-weight:bold;"
                />
                <Label
                  textWrap="true"
                  :text="profile.profile_name"
                  class="description-label label-title"
                  style="font-weight:bold;"
                />
                <Label textWrap="true" :text="profile.clinic_name" class="text-label"/>
              </StackLayout>
            </StackLayout>
            <DockLayout class="container-list" @tap="onLocationClick">
              <Image
                dock="left"
                src="~/assets/images/marker-doctor-profile.png"
                class="image-list"
              />
              <StackLayout
                dock="left"
                orientation="vertical"
                style="padding:20px;"
                horizontalAlignment="stretch"
              >
                <Label
                  textWrap="true"
                  :text="'starter_location'|L"
                  class="description-label label-title"
                />
                <Label
                  textWrap="true"
                  :text="profile.location"
                  class="description-label"
                  style="font-size:12pt"
                />
              </StackLayout>
              <Image
                dock="right"
                src="~/assets/images/next-doctor-profile.png"
                class="next-btn"
                horizontalAlignment="right"
              />
            </DockLayout>
            <DockLayout class="container-list" @tap="onScheduleClick">
              <Image dock="left" src="~/assets/images/clock-doctor-profile.png" class="image-list"/>
              <StackLayout
                dock="left"
                orientation="vertical"
                style="padding:20px;"
                horizontalAlignment="stretch"
              >
                <Label
                  textWrap="true"
                  :text="'starter_schedule_text'|L"
                  class="description-label label-title"
                />
                <Label
                  textWrap="true"
                  :text="isOpen ? 'doctor_profile_open_now' : 'doctor_profile_close_now'|L"
                  class="description-label"
                  style="font-size:12pt"
                />
              </StackLayout>
              <Image
                dock="right"
                src="~/assets/images/next-doctor-profile.png"
                class="next-btn"
                horizontalAlignment="right"
              />
            </DockLayout>
            <DockLayout class="container-list" @tap="onServicesClick">
              <Image
                dock="left"
                src="~/assets/images/stethoscope-doctor-profile.png"
                class="image-list"
              />
              <StackLayout
                dock="left"
                orientation="vertical"
                style="padding:20px;"
                horizontalAlignment="stretch"
              >
                <Label
                  textWrap="true"
                  :text="'starter_service_text'|L"
                  class="description-label label-title"
                />
                <Label
                  textWrap="true"
                  :text="'error_no_information_available'|L"
                  class="description-label"
                  style="font-size:12pt"
                />
              </StackLayout>
              <Image
                dock="right"
                src="~/assets/images/next-doctor-profile.png"
                class="next-btn"
                horizontalAlignment="right"
              />
            </DockLayout>
            <DockLayout class="container-list" @tap="onReviewClick">
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
                orientation="horizontal"
                style="padding:20px;"
                horizontalAlignment="stretch"
              >
                <Label
                  textWrap="true"
                  :text="'starter_review_text'|L"
                  class="description-label label-title"
                  style="margin-right:20px;"
                />
                <Image
                  v-if="profile.rating >= 1"
                  src="~/assets/images/star-review-doctor-profile.png"
                  class="star-review"
                />
                <Image
                  v-if="profile.rating >= 2"
                  src="~/assets/images/star-review-doctor-profile.png"
                  class="star-review"
                />
                <Image
                  v-if="profile.rating >= 3"
                  src="~/assets/images/star-review-doctor-profile.png"
                  class="star-review"
                />
                <Image
                  v-if="profile.rating >= 4"
                  src="~/assets/images/star-review-doctor-profile.png"
                  class="star-review"
                />
                <Image
                  v-if="profile.rating >= 5"
                  src="~/assets/images/star-review-doctor-profile.png"
                  class="star-review"
                />
              </StackLayout>
            </DockLayout>
          </DockLayout>
          <StackLayout verticalAlignment="bottom">
            <Button
              class="app-btn btn btn-primary"
              :text="'activity_message_book'|L"
              style="border-radius:10px;"
              @tap="onBookAppointmentClick"
            />
          </StackLayout>
          </StackLayout>
        </Shimmer>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<style>
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
.star-review {
  width: 30px;
  margin-top: -15px;
}
.image-profile {
  width: 200px;
  height: 200px;
  margin: 20px;
}
.container-list {
  background: #ffffff;
  width: 100%;
  padding: 20px;
  margin-bottom: 15px;
}
.container-btn-janji {
  background: #878787;
  z-index: 1;
}
.next-btn {
  width: 30px;
  margin: 10px;
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
import appointmenTemp from "~/components/mydoctor/appointmenTemp";
var Directions = require("nativescript-directions").Directions;

export default {
  mounted() {
    this.profile = this.doctor;
    this.loadData();
  },
  data() {
    return {
      profile: {},
      isOpen: false,
      isLoading: true
    };
  },
  props: {
    doctor: Object
  },
  methods: {
    loadData() {
      this.$http.get(
        "/clinics/" +
          this.doctor.clinic_id +
          "/doctor/" +
          this.doctor.doctor_id,
        content => {
          let responsePayload = content.content;
          this.profile = responsePayload.data;
          console.log(JSON.stringify(this.profile));
          this.checkOpen();
          this.isLoading = false;
        },
        error => {}
      );
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
      if (this.$isIOS) {
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
      this.$navigateTo(appointmenTemp, {
        transition: "slide",
        props: {
          doctor_id: this.doctor.doctor_id,
          clinic_id: this.doctor.clinic_id,
          tag: 1
        }
      });
    }
  }
};
</script>