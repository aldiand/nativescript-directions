<template>
  <Page class="page">
    <ActionBar class="action-bar2" flat="true" title="Doctor Profile">
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
    </ActionBar>
    <ScrollView>
      <StackLayout style="background:#E1E1E1;">
        <AbsoluteLayout>
          <Image
            :src="profile.cover ? profile.cover : '~/assets/images/header.jpg'"
            height="400px"
            width="100%"
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
          <Image :src="profile.photo_profile" class="image-profile"/>
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
              class="description-label"
              style="font-weight:bold;"
            />
            <Label textWrap="true" :text="profile.clinic_name" class="text-label"/>
          </StackLayout>
        </StackLayout>
        <DockLayout class="container-list" @tap="onLocationClick">
          <Image dock="left" src="~/assets/images/marker-doctor-profile.png" class="image-list"/>
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
          <Image dock="left" src="~/assets/images/review-doctor-profile.png" class="image-list"/>
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
        <StackLayout verticalAlignment="bottom">
          <Button
            class="app-btn btn btn-primary"
            :text="'activity_message_book'|L"
            style="border-radius:10px;"
          />
        </StackLayout>
      </StackLayout>
    </ScrollView>
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

export default {
  mounted() {
    this.profile = this.doctor;
    this.loadData();
  },
  data() {
    return {
      profile: {},
      isOpen: false
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
        },
        error => {}
      );
    },

    checkOpen() {
      var schdule = this.profile.schedule;
      schdule.forEach(item => {
        if (dt.isToday(item.day)) {
          dt.isTimeBetween(item.start_time, item.end_time);
          isOpen = true;
          return;
        }
      });
    },

    onLocationClick() {
      console.log("location clicked");
    },

    onReviewClick() {
      console.log("review clicked");
      this.$navigateTo(Review, { transition: "slide",
        props: {
          clinic_id: this.profile.clinic_id,
          doctor_id: this.profile.id,
        }
      });
    },

    onServicesClick() {
      console.log("services clicked");
      this.$navigateTo(Services, { transition: "slide",
        props: {
          clinic_id: this.profile.clinic_id,
          clinic_name: this.profile.clinic_name,
        }
      });
    },

    onScheduleClick() {
      console.log("schedule clicked");
      this.$navigateTo(Schedule, { transition: "slide",
        props: {
          name: this.profile.profile_name,
          clinic_name: this.profile.clinic_name,
          schedules: this.profile.schedule,
        }
      });
    }
  }
};
</script>