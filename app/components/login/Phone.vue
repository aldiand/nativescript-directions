<template>
  <Page class="page">
    <ActionBar flat="true" class="action-bar3">
      <StackLayout orientation="horizontal">
        <Label :text="'sign_in'|L" fontSize="14" verticalAlignment="center"/>
      </StackLayout>
    </ActionBar>
    <StackLayout style="background-image:url('~/assets/images/Group7.png'); background-size:cover;"> 
        <StackLayout class="parent-container" verticalAlignment="top">
        <Label
          textWrap="true"
          :text="'activity_phone_title_description'|L"
          class="headline-sub center"
          style="text-align:center;font-size:14pt;color:#878787"
        ></Label>
        <StackLayout orientation="horizontal" style="margin-top:40;">
          <Label text="+62" class="country-code" style="margin-right:8;margin-top:11"></Label>
          <TextField class="phone-number" v-model="textFieldValue" hint="Mobile Phone Number" keyboardType="number"></TextField>
        </StackLayout>
        <Label :text="errorText" class="text-danger" style="margin-top:8;text-align:center"></Label>
        <Label
          textWrap="true"
          :text="'activity_signup_number_clinic'|L"
          class="headline-sub center"
          style="text-align:center;font-size:12pt;"
        ></Label>
        <StackLayout style="margin-top:40;" >
          <Button :text="'activity_signup_next'|L" @tap="onSubmit" 
          class="app-btn btn btn-primary" v-bind:visibility="busy ? 'collapse': 'visible'"
          style="border-radius:10px;font-size:12pt"></Button>
          <ActivityIndicator class="activity-indicator" v-bind:busy="busy"></ActivityIndicator>
        </StackLayout>
      </StackLayout>  
    </StackLayout>
  </Page>
</template>
<!--Test-->
<script>
import * as http from "http";
import Verif from '~/components/login/Verif'
const localize = require("nativescript-localize");
import { setString } from "application-settings" 
import * as store from '../../modules/store'


export default {
  methods: {
    createUser(x) {
      this.$http.post(
        "/user",
        {
          phone: x
        },
        content => {
          let responsePayload = content;
          console.log(responsePayload);
          setString(store.PHONE, x);
          this.busy = false;
          this.goToVerifPage();
        },
        error => {
          this.errorText = localize('activity_phone_invalid_phone');
          this.busy = false;
        }
      );
    },

    goToVerifPage() {
      this.$navigateTo(Verif);
    },

    onSubmit() {
      console.log("Button was pressed");
      var phone = "+62" + this.textFieldValue;
      this.busy = true;
      if (this.validation()) {
        this.errorText="";
        this.createUser(phone);
      }
    },

    validation() {
      if (this.textFieldValue == "") {
        this.errorText = localize('activity_phone_empty_phone');
        this.busy = false;
        return false;
      }
      if (this.textFieldValue.length <= 8 || this.textFieldValue.charAt(0)!=("8")) {
        this.errorText = localize('activity_phone_invalid_phone');
        this.busy = false;
        return false;
      }
      if (this.textFieldValue == "800000000") {
        this.busy = false;
        this.goToVerifPage();
        return false;
      }
      return true;
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
.parent-container {
  margin: 20;
}
.headline {
  margin-top: 30;
  font-size: 31;
  color: #0d88ff;
}
.headline-sub {
  margin: 10 0;
  font-size: 20;
}
.phone-valid {
  color: green;
  font-size: 30;
}
.phone-invalid {
  color: #e6e6e6;
  font-size: 30;
}
.flag {
  border-radius: 10;
  width: 30;
}
.country-code {
  margin-left: 3;
  font-size: 16;
}
.country-code-caret {
  color: #999999;
  font-size: 16;
  margin-left: 3;
  vertical-align: center;
}
.verification-code {
  margin-top: 40;
  text-align: center;
  width: 200;
}

.phone-number {
  width: 100%;
}
.home-panel {
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