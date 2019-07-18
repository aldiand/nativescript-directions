<template>
  <Page class="page">
    <AppBar :title="profile.clinic_name"/>
    <StackLayout>
      <ScrollView>
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
                :text="profile.clinic_name"
                class="h4"
                style="font-weight:bold;color:#4F4F4F;"
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
              <StackLayout dock="right" horizontalAlignment="right" @tap="onLocationClick">
                <label
                  :text="'starter_see_location'|L"
                  class="btn-see-location"
                  textWrap="true"
                  verticalAlignment="center"
                />
              </StackLayout>
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
            <!-- <DockLayout class="container-list">
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
            </DockLayout> -->
            <!-- <label
              style="
                background-color:#C4C4C4;
                width:100%;
                height:1px;
                margin-top:20px;
                margin-bottom:20px;"
            /> -->
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

            
            <StackLayout width="100%" class="container-list">
              <StackLayout
                    v-for="(item, name) in profile.doctors"
                    :key="name"
                    horizontalAlignment="center" 
                  >
                    <CardView elevation="1" radius="1" width="100%" @tap="onDoctorsClick(item.doctor_id)">
                      <DockLayout>
                        <Image
                          dock="left"
                          src="~/assets/images/user.png"
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
                          verticalAlignment="center"
                        >
                          <Label
                            textWrap="true"
                            :text="item.name"
                            class="description-label"
                            style="font-size:12pt"
                          />
                        </StackLayout>
                      </DockLayout>
                    </CardView>
                </StackLayout>
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
import DoctorProfile from "./DoctorProfile"
var Directions = require("nativescript-directions").Directions;

export default {
  mounted() {
    this.loadData();
  },
  data() {
    return {
      profile: {},
      isOpen: false,
      isLoading: true,
      error: false,
    };
  },
  props: {
    clinic_id: Number,
    photo_profile: String
  },
  methods: {
    loadData() {
      this.isLoading = true;
      var success = success => {
        console.log(JSON.stringify(success));
        this.profile = success.data.data;
        if (this.photo_profile) {
          this.profile.photo_profile = this.photo_profile;
        }
        this.isLoading = false;
      };
      var error = error => {
        console.log(JSON.stringify(error));
        this.isLoading = false;
        this.error = true;
      };

      profileApi.getClinicById(this.clinic_id, success, error);
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
    onDoctorsClick(doctor_id) {
      console.log("review onDoctorsClick");
      var doctor = {};
      doctor.clinic_id = this.profile.id;
      doctor.doctor_id = doctor_id;
      this.$navigateTo(DoctorProfile, {
        transition: "slide",
        props: {
          doctor: doctor
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
                lat: this.profile.latitude,
                lng: this.profile.longitude
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
          clinic_id: this.profile.id,
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
          clinic_id: this.profile.id,
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
      this.$navigateTo(SelectTime, {
        transition: "slide",
        backstackVisible: false,
        props: {
          doctor_id: this.doctor.doctor_id,
          clinic_id: this.doctor.clinic_id,
          doctor: this.profile,
          tag: 0
        }
      });
    }
  }
};
</script>