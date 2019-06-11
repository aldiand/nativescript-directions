<template>
  <Page class="page" loaded="onLoaded">
    <AppBar :title="'verif'|L"/>
    <StackLayout>
      <StackLayout style="padding:50px;">
        <!--Add your page content here-->
        <image
          src="~/assets/images/login_verif.png"
          width="35%"
          style="margin-bottom:50px;margin-top:50px;"></image>
        <Label
          textWrap="true"
          :text="'activity_verification_description'|L"
          class="description-label"
          style="font-size:14pt;color:#878787; text-align:center; margin-top:20px;"
        />
        <TextField
          v-model="textFieldValue"
          :hint="'activity_verification_hint'|L"
          class="input-verif"
          keyboardType="number"
        />
        <StackLayout v-if="false" orientation="horizontal" margin="30" horizontalAlignment="center">
          <TextField
            @textChange="onTextChange"
            @focus="onTextTap"
            v-model="pin1"
            ref="data1"
            maxlength="1"
            class="input-verif"
            keyboardType="number"
          />
          <TextField
            @textChange="onTextChange"
            @focus="onTextTap"
            v-model="pin2"
            ref="data2"
            maxlength="1"
            class="input-verif"
            keyboardType="number"
          />
          <TextField
            @textChange="onTextChange"
            @focus="onTextTap"
            v-model="pin3"
            ref="data3"
            maxlength="1"
            class="input-verif"
            keyboardType="number"
          />
          <TextField
            @textChange="onTextChange"
            @focus="onTextTap"
            v-model="pin4"
            ref="data4"
            maxlength="1"
            class="input-verif"
            keyboardType="number"
          />
        </StackLayout>
        <Label :text="errorText" class="text-danger" style="margin-top:8; text-align:center;"></Label>
        <StackLayout>
          <AppButton
            :text="'submit'|L"
            @tap="onSubmit"
            v-bind:visibility="busy ? 'collapse': 'visible'"
          ></AppButton>
          <ActivityIndicator class="activity-indicator" v-bind:busy="busy"></ActivityIndicator>
        </StackLayout>
      </StackLayout>
    </StackLayout>
  </Page>
</template>

<script>
import { setString, getString, setNumber } from "application-settings";
import * as store from "../../modules/store";
import * as auth from "../../modules/auth";
import EditProfile from "~/components/login/EditProfile";
import App from "../App";
const localize = require("nativescript-localize");

export default {
  methods: {
    onLoaded() {
      // this.$refs.data1.nativeView.focus();
    },
    verifCode(x) {
      this.$http.post(
        "/verify",
        {
          phone: getString(store.PHONE, ""),
          token: x
        },
        content => {
          let responsePayload = content.content;
          console.log(responsePayload);
          auth.login(responsePayload);
          this.$http.setAuthorizationHeader("Bearer " + responsePayload.token);
          this.busy = false;
          auth.isLogin();
          this.goToEditProfile();
        },
        error => {
          this.errorText = localize("activity_verification_wrong_code");
          this.busy = false;
        }
      );
    },

    onSubmit() {
      if(!this.textFieldValue){
        this.textFieldValue = this.getPin();
      }
      console.log("Button was pressed");
      this.busy = true;
      this.errorText = "";
      if (this.validation()) {
        this.verifCode(this.textFieldValue);
      }
    },

    validation() {
      if (this.textFieldValue.length == 0) {
        this.errorText = localize("activity_verification_empty_code");
        this.busy = false;
        return false;
      }
      return true;
    },

    goToEditProfile() {
      this.$navigateTo(EditProfile, {
        transition: "slide",
        clearHistory: true
      });
    },

    getPin() {
      return this.pin1 + this.pin2 + this.pin3 + this.pin4;
    },

    onTextTap() {
        if (!this.pin1) {
          this.$refs.data1.nativeView.focus();
        }
    },

    onTextChange(event) {
      console.log(event.value);
      if (event.value) {
        if (!this.pin1) {
          this.$refs.data1.nativeView.focus();
        } else if (!this.pin2) {
          this.$refs.data2.nativeView.focus();
        } else if (!this.pin3) {
          this.$refs.data3.nativeView.focus();
        } else if (!this.pin4) {
          this.$refs.data4.nativeView.focus();
        }
      } else {
        if (!this.pin2) {
          this.$refs.data1.nativeView.focus();
        } else if (!this.pin3) {
          this.$refs.data2.nativeView.focus();
        } else if (!this.pin4) {
          this.$refs.data3.nativeView.focus();
        }
      }
    }
  },

  data() {
    return {
      textFieldValue: "",
      busy: false,
      pin1: "",
      pin2: "",
      pin3: "",
      pin4: "",
      errorText: "",
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

.action-bar3 {
  color: #03c1b8;
  background-color: #ffffff;
}

.input-verif {
  width: 100%;
  font-size: 24;
  font-weight:bold;
  color: #000000;
}
</style>