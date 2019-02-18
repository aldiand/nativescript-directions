<template>
  <Page class="page">
    <AppBar :title="'Edit Profile'|L"/>
    <StackLayout style="background-image:url('~/assets/images/Group7.png'); background-size:cover;">
      <ScrollView>
        <StackLayout
          class="parent-container"
          marginTop="15"
          marginLeft="15"
          marginRight="15"
        >
          <StackLayout
            orientation="vertical"
            marginTop="15"
            marginLeft="15"
            marginRight="15"
          >
            <Label :text="'activity_edit_profile_first_name' |L"/>
            <TextField v-model="userProfile.first_name"/>
          </StackLayout>
          <StackLayout
            orientation="vertical"
            marginTop="15"
            marginLeft="15"
            marginRight="15"
          >
            <Label :text="'activity_edit_profile_last_name' | L"/>
            <TextField v-model="userProfile.last_name"/>
          </StackLayout>
          <StackLayout
            orientation="vertical"
            marginTop="15"
            marginLeft="15"
            marginRight="15"
          >
            <Label :text="'activity_edit_profile_gender' | L"/>

            <DropDown
              class="default"
              :items="listPickerGender"
              :selectedIndex="selectedGenderIndex"
              :hint="'activity_edit_profile_gender' | L"
              row="0"
              colspan="2"
              ref="mygender"
            ></DropDown>
          </StackLayout>
          <StackLayout
            orientation="vertical"
            marginTop="15"
            marginLeft="15"
            marginRight="15"
          >
            <Label :text="'activity_edit_profile_location' | L"/>
            <DropDown
              class="default"
              backroundColor="red"
              :items="listPickerLocation"
              :selectedIndex="selectedLocationIndex"
              :hint="'activity_edit_profile_location' | L"
              row="0"
              colspan="1"
              ref="mylocation"
            ></DropDown>
          </StackLayout>
          <StackLayout
            orientation="vertical"
            marginTop="15"
            marginLeft="15"
            marginRight="15"
          >
            <Label :text="'activity_edit_profile_email' | L"/>
            <TextField v-model="userProfile.email"/>
          </StackLayout>
          <StackLayout style="margin-top:20;">
            <Label
              :text="errorText"
              class="text-danger"
              style="margin-bottom:8; text-align:center;"
            ></Label>
            <AppButton
              :text="'submit'|L"
              @tap="onSubmit"
              v-bind:visibility="busy ? 'collapse': 'visible'"
            ></AppButton>
            <ActivityIndicator class="activity-indicator" v-bind:busy="busy"></ActivityIndicator>
          </StackLayout>
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<style scoped>
.default {
  padding: 15;
  color: black;
  font-size: 18;
  text-align: left;
}
</style>

<script>
import * as store from "../../modules/store";
import * as commonapi from "../../modules/commonapi";
const localize = require("nativescript-localize");
import App from "../App";
import { device } from "tns-core-modules/platform";
import { error } from "util";

export default {
  data() {
    return {
      listPickerGender: [
        localize("activity_edit_profile_male"),
        localize("activity_edit_profile_female")
      ],
      listPickerLocation: ["Jakarta", "Bandung"],
      selectedGenderIndex: 0,
      selectedLocationIndex: 0,
      busy: false,
      errorText: "",

      userProfile: {
        first_name: "",
        last_name: "",
        gender: String,
        location: String,
        phone: String,
        fcm_token: String,
        language: String,
        email: ""
      }
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      this.busy = true;
      this.$http.get(
        "/user/" + store.get(store.USER_ID),
        content => {
          let responsePayload = content.content;
          this.userProfile = responsePayload;
          console.log(JSON.stringify(responsePayload));

          if (this.userProfile.location == "Bandung") {
            this.selectedLocationIndex = 1;
          } else if (this.userProfile.location == "Jakarta") {
            this.selectedLocationIndex = 0;
          }

          if ((this.userProfile.gender = "male")) {
            this.selectedGenderIndex = 0;
          } else if ((this.userProfile.gender = "female")) {
            this.selectedGenderIndex = 1;
          }

          this.busy = false;
        },
        error => {
          errorText = localize("error_something_went_wrong");
          this.busy = false;
        }
      );
    },
    onSubmit() {
      this.errorText = "";
      this.busy = true;
      if (this.validation()) {
        this.save();
        commonapi.updateProfile(
          success => {
            this.goToMain();
            this.busy = false;
          },
          error => {
            console.log(error);
            this.errorText = localize("error_something_went_wrong");
            this.busy = false;
          }
        );
      } else {
        this.busy = false;
      }
    },

    validation() {
      if (
        this.userProfile.first_name.length == 0 ||
        this.userProfile.last_name.length == 0
      ) {
        this.errorText = localize("activity_edit_profile_error_empty_field");
        return false;
      }

      if (this.userProfile.email.length == 0) {
        this.errorText = localize("activity_edit_profile_error_email_field");
        return false;
      }

      return true;
    },

    save() {
      store.set(store.FIRST_NAME, this.userProfile.first_name);
      store.set(store.LAST_NAME, this.userProfile.last_name);
      if (this.selectedGenderIndex == 0) {
        store.set(store.GENDER, "male");
      } else if (this.selectedGenderIndex == 1) {
        store.set(store.GENDER, "female");
      }
      store.set(
        store.LOCATION,
        this.listPickerLocation[this.selectedLocationIndex]
      );
      store.set(store.LANGUAGE, device.language);
      store.set(store.EMAIL, this.userProfile.email);
    },

    goToMain() {
      this.$navigateTo(App, { transition: "slide", clearHistory: true });
    }
  }
};
</script>