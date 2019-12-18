<template>
  <Page class="page">
    <AppBar :title="'sign_in'|L" :back="false"/>
    <GridLayout height="100%" rows="*,auto">
      <StackLayout row="0">
        <ScrollView>
        <StackLayout class="parent-container" verticalAlignment="top">
        <image
          src="~/assets/images/login_phone.png"
          width="35%"
          style="margin-bottom:50px;margin-top:50px;"></image>
        <Label
          textWrap="true"
          :text="'activity_phone_title_description'|L"
          class="headline-sub center"
          style="text-align:center;font-size:14pt;color:#878787"
        ></Label>
        <StackLayout orientation="horizontal" verticalAlignment="center" style="margin:30;">
          <StackLayout style="vertical-align: middle;margin-right:20; ">
            <Label text="+62" class="country-code" style="font-weight:bold;"></Label>
            <StackLayout class="hr-dark" style="width: auto;"/>
          </StackLayout>
          <TextField class="phone-number" ref="phone" v-model="textFieldValue" hint="8xxxxxxxx" keyboardType="number"></TextField>
        </StackLayout>
        <Label :text="errorText" v-if="errorText" class="text-danger" style="margin-top:8;text-align:center"></Label>
        <Label
          textWrap="true"
          :text="'activity_signup_number_clinic'|L"
          class="headline-sub center"
          style="text-align:center;font-size:14pt;"
        ></Label>
        <AppButton :text="'activity_signup_next'|L" @tap="onSubmit" ></AppButton>

      </StackLayout>
        </ScrollView>  
      </StackLayout>
      </GridLayout>
  </Page>
</template>
<!--Test-->
<script>
import Verif from '~/components/login/Verif'
const localize = require("nativescript-localize");
import { setString } from "tns-core-modules/application-settings" 
import * as store from '../../modules/store'
import { accountApi } from '../../modules/commonapi'


export default {
  methods: {
    createUser(x) {
      var success = success => {
        let responsePayload = success.data.data;
        setString(store.PHONE, x);
        this.$loader.hide()
        this.goToVerifPage();
      };
      var error = error => {
          this.errorText = localize('activity_phone_invalid_phone');
          this.$loader.hide()
      };
      accountApi.register(x, success, error);
    },

    goToVerifPage() {
      this.$navigateTo(Verif);
    },

    onSubmit() {
      console.log("Button was pressed");
      var phone = "+62" + this.textFieldValue;
      this.$loader.show()
      this.$refs.phone.nativeView.dismissSoftInput();
      if (this.validation()) {
        this.errorText="";
        this.createUser(phone, { transition: "slide"});
      }
    },

    validation() {
      if (this.textFieldValue == "") {
        this.errorText = localize('activity_phone_empty_phone');
          this.$loader.hide()
        return false;
      }
      if (this.textFieldValue.length <= 8 || this.textFieldValue.charAt(0)!=("8")) {
        this.errorText = localize('activity_phone_invalid_phone');
          this.$loader.hide()
        return false;
      }
      if (this.textFieldValue == "800000000") {
          this.$loader.hide()
        this.goToVerifPage();
        return false;
      }
      return true;
    }
  },

  data() {
    return {
      textFieldValue: "",
      errorText: ""
    };
  }
};
</script>

<style scoped>
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
  color: #000000;
  margin-left: 3;
  font-size: 24;
}

.verification-code {
  margin-top: 40;
  text-align: center;
  width: 200;
}

.phone-number {
  width: 100%;
  font-size: 24;
  font-weight:bold;
  color: #000000;
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