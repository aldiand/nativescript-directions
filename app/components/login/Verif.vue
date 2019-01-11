<template>
  <Page class="page">
    <ActionBar class="action-bar2">
      <StackLayout orientation="horizontal">
        <Label :text="'verif'|L" fontSize="24" verticalAlignment="center" style="color:#ffffff"/>
      </StackLayout>
    </ActionBar>
    <ScrollView>
      <StackLayout class="home-panel">
        <!--Add your page content here-->
        <Label textWrap="true" text="Instruction" class="h2 description-label"/>
        <TextField v-model="textFieldValue" hint="Enter code..." keyboardType="number"/>
        <Label :text="errorText" class="text-danger" style="margin-top:8"></Label>
        <StackLayout style="margin-top:40;">
          <Button
            text="Sign up"
            @tap="onSubmit"
            class="app-btn btn btn-primary"
            v-bind:visibility="busy ? 'collapse': 'visible'"
          ></Button>
          <ActivityIndicator class="activity-indicator" v-bind:busy="busy"></ActivityIndicator>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import { setString, getString, setNumber } from "application-settings" 
import * as store from '../../modules/store'
import EditProfile from '~/components/login/EditProfile'
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
      this.$navigateTo(EditProfile, { clearHistory:true });
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
</style>