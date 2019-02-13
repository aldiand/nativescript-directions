<template>
  <Page class="page">
    <ActionBar flat="true" class="action-bar3">
      <StackLayout orientation="horizontal">
        <Label :text="'verif'|L" fontSize="14" verticalAlignment="center" style="color:#03c1b8"/>
      </StackLayout>
    </ActionBar>
    <StackLayout style="background-image:url('~/assets/images/Group7.png'); background-size:cover;">
      <StackLayout style="padding:50px;">
        <!--Add your page content here-->
        <Label textWrap="true" :text="'activity_verification_description'|L" class="description-label" style="font-size:14pt;color:#878787; text-align:center; margin-top:20px;"/>
        <TextField v-model="textFieldValue" :hint="'activity_verification_hint'|L" keyboardType="number" style="text-align:center;font-size:14pt;border-color:#CDCDCD;"/>
        <Label :text="errorText" class="text-danger" style="margin-top:8; text-align:center;"></Label>
        <StackLayout>
          <Button
            :text="'submit'|L"
            @tap="onSubmit"
            class="app-btn btn btn-primary"
            v-bind:visibility="busy ? 'collapse': 'visible'"
            style="border-radius:10px;; margin-top:10px;"
          ></Button>
          <ActivityIndicator class="activity-indicator" v-bind:busy="busy"></ActivityIndicator>
        </StackLayout>
      </StackLayout>
    </StackLayout>
  </Page>
</template>

<script>
import { setString, getString, setNumber } from "application-settings" 
import * as store from '../../modules/store'
import EditProfile from '~/components/login/EditProfile'
import App from '../App'
const localize = require("nativescript-localize");

export default {
    methods: {
    verifCode(x) {
      this.$http.post(
        "/verify",
        {
          phone: getString(store.PHONE, ''),
          token: x
        },
        content => {
          let responsePayload = content.content;
          console.log(responsePayload);
          store.set(store.TOKEN, responsePayload.token);
          console.log("token saved");
          store.set(store.USER_ID, responsePayload.user_id);
          console.log("userid saved");
          store.set(store.PATIENT_ID, responsePayload.patient_id);
          console.log("patientid saved");
          store.set(store.REFRESH_TOKEN, responsePayload.refresh_token);
          console.log("refresh_token saved");
          this.busy = false;
          this.goToEditProfile();
        },
        error => {
          this.errorText = localize('activity_verification_wrong_code');
          this.busy = false;
        }
      );
    },

    onSubmit() {
      console.log("Button was pressed");
      this.busy = true;
      this.errorText = "";
      if (this.validation()) {
        this.verifCode(this.textFieldValue);
      }
    },

    validation() {
      if (this.textFieldValue.length == 0 ) {
        this.errorText = localize('activity_verification_empty_code');
        this.busy = false;
        return false;
      }
      return true;
    },

    goToEditProfile() {
      this.$navigateTo(App, { clearHistory:true });
    }
  },

  data() {
    return {
      textFieldValue: "",
      busy: false,
      errorText: ""
    };
  }
};
</script>

<style scoped>
.home-panel {
  vertical-align: center;
  font-size: 20;
  margin: 15;
}

.description-label {
  margin-bottom: 15;
}

.action-bar3{
  color:#03c1b8;
  background-color:#ffffff;
}
</style>