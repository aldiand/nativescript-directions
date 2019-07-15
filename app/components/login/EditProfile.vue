<template>
  <Page class="page">
    <AppBar :title="'Edit Profile'|L" :back="false"/>
    <StackLayout>
      <ScrollView>
        <StackLayout class="parent-container" marginTop="15" marginLeft="15" marginRight="15">
          <StackLayout
            class="input-field"
            orientation="vertical"
            marginTop="15"
            marginLeft="15"
            marginRight="15"
          >
          <image
          src="~/assets/images/login_edit_profile.png"
          width="35%"
          style="margin-bottom:50px;margin-top:50px;"></image>
            <Label :text="'activity_edit_profile_full_name' |L" class="label-input"/>
            <GridLayout columns="*, *" orientation="horizontal">
                <StackLayout col="0" marginRight="10">
                  <TextField v-model="userProfile.first_name" :hint="'activity_edit_profile_first_name' |L" :paddingTop="$isIOS?'10':'0'"/>
                  <StackLayout v-if="$isIOS" class="hr-light"></StackLayout>
                </StackLayout>
                <StackLayout col="1" marginLeft="10">
                  <TextField v-model="userProfile.last_name" :hint="'activity_edit_profile_last_name' |L" :paddingTop="$isIOS?'10':'0'"/>
                  <StackLayout v-if="$isIOS" class="hr-light"></StackLayout>
                </StackLayout>
            </GridLayout>
          </StackLayout>
          <StackLayout orientation="vertical" marginTop="15" marginLeft="15" marginRight="15">
            <Label :text="'activity_edit_profile_gender' | L" class="label-input"/>
            <StackLayout orientation="horizontal">
                <GridLayout columns="*, *">
                    <StackLayout col="0" orientation="horizontal">
                        <CheckBox :text="'activity_edit_profile_male' | L" @tap="changeGender(0)" fillColor="#03c1b8" class="gender-checkbox" :checked="isChecked" @checkedChange="isChecked = $event.value" boxType="circle" />
                    </StackLayout>
                    <StackLayout col="1" orientation="horizontal">
                        <CheckBox :text="'activity_edit_profile_female' | L " @tap="changeGender(1)" fillColor="#03c1b8" class="gender-checkbox" :checked="!isChecked" @checkedChange="isChecked = !$event.value" boxType="circle"/>
                    </StackLayout>
                </GridLayout>
            </StackLayout>
          </StackLayout>
          <StackLayout orientation="vertical" marginTop="15" marginLeft="15" marginRight="15">
            <Label :text="'activity_edit_profile_location' | L" class="label-input"/>
            <DropDown
              class="default"
              backroundColor="red"
              @selectedIndexChanged="onLocationChanged"
              :items="listPickerLocation"
              :selectedIndex="selectedLocationIndex"
              :hint="'activity_edit_profile_location' | L"
              row="0"
              colspan="1"
              ref="mylocation"
            ></DropDown>
          </StackLayout>
          <StackLayout orientation="vertical" marginTop="15" marginLeft="15" marginRight="15">
            <Label :text="'activity_edit_profile_email' | L" class="label-input"/>
            <TextField v-model="userProfile.email" :hint="'activity_edit_profile_email' | L" :paddingTop="$isIOS?'10':'0'"/>
            <StackLayout class="hr-light" v-if="$isIOS"></StackLayout>
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
  padding: 8;
  color: black;
  font-size: 18;
  text-align: left;
}
.label-input {
  margin-bottom:8;
  color:#03c1b8;
  font-weight: bold;
  font-size: 16;
}
.gender-checkbox {
  color:#03c1b8;
}
</style>

<script>
import * as store from "../../modules/store";
import * as commonapi from "../../modules/commonapi";
const localize = require("nativescript-localize");
import App from "../App";
import { device } from "tns-core-modules/platform";
import { error } from "util";
import { isAndroid, isIOS } from "tns-core-modules/platform";
import { accountApi } from '../../modules/commonapi'

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
      isChecked: true,

      userProfile: {
        first_name: "",
        last_name: "",
        gender: String,
        location: String,
        phone: String,
        fcm_token: String,
        language: String,
        email: "",
      }
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      this.busy = true;
      var success = success => {
          let responsePayload = success.data;
          this.userProfile = responsePayload;
          console.log(JSON.stringify(responsePayload));

          if (this.userProfile.location == "Bandung") {
            this.selectedLocationIndex = 1;
          } else if (this.userProfile.location == "Jakarta") {
            this.selectedLocationIndex = 0;
          }

          if ((this.userProfile.gender == "male")) {
            this.selectedGenderIndex = 0;
          } else if ((this.userProfile.gender == "female")) {
            this.selectedGenderIndex = 1;
          }

          this.selectedGenderIndex == 0 ? this.isChecked=true : this.isChecked=false;

          this.busy = false;
      };
      var error = error => {
          errorText = localize("error_something_went_wrong");
          this.busy = false;
      };
      accountApi.profile(success, error);
    },

    onSubmit() {
      this.errorText = "";
      this.busy = true;
      if (this.validation()) {
        this.save();
        accountApi.updateProfile(
          {
              first_name: store.get(store.FIRST_NAME, ""),
              last_name: store.get(store.LAST_NAME, ""),
              gender: store.get(store.GENDER, ""),
              location: store.get(store.LOCATION, ""),
              phone: store.get(store.PHONE, ""),
              fcm_token: store.get(store.FCM, ""),
              language: store.get(store.LANGUAGE, ""),
              email: store.get(store.EMAIL, ""),
              device_type: "ios"
          },
          success => {
            console.log(success.data);
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
      console.log("location index: " + this.selectedLocationIndex);
      store.set(
        store.LOCATION,
        this.listPickerLocation[this.selectedLocationIndex]
      );
      store.set(store.LANGUAGE, device.language);
      store.set(store.EMAIL, this.userProfile.email);
    },

    goToMain() {
      this.$navigateTo(App, { transition: "slide", clearHistory: true });
    },

    onLocationChanged(event) {
      console.log(
        `Drop Down selected index changed from ${event.oldIndex} to ${
          event.newIndex
        }`
      );
      this.selectedLocationIndex = event.newIndex;
    },

    changeGender(index) {
      console.log("Selected gender", index);
      this.selectedGenderIndex = index;
    },

    onGenderChanged(event) {
      console.log(
        `Drop Down selected index changed from ${event.oldIndex} to ${
          event.newIndex
        }`
      );
      this.selectedGenderIndex = event.newIndex;
    }
  }
};
</script>