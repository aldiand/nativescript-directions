<template>
  <StackLayout orientation="vertical" width="100%">
    <Label text="My Doctor" textWrap="true" class="text-title"/>
    <ListView for="item in mydoctor" @itemTap="onItemTap">
      <v-template>
        <MyDoctorList :item="item"/>
      </v-template>
    </ListView>
  </StackLayout>
</template>

<script>
import { getString } from "application-settings"; // Example Only
import * as store from "~/modules/store";
import MyDoctorList from "./MyDoctorList";
import Phone from "~/components/login/Phone";
import Detail from "~/components/mydoctor/DoctorProfile";
const localize = require("nativescript-localize");
export default {
  components: {
    MyDoctorList
  },
  data() {
    return {
      mydoctor: []
    };
  },

  mounted() {
    this.$http.get(
      "/mydoctors",
      content => {
        let responsePayload = content.content;
        this.mydoctor = responsePayload;
      },
      error => {
        if (error.statusCode == 403) {
          alert({
            title: localize("dialog_session_expire_title"),
            message: localize("dialog_session_expire_body"),
            okButtonText: localize("dialog_session_expire_ok")
          }).then(() => {
            this.$navigateTo(Phone, { transition: "fade", clearHistory: true });
          });
        }
      }
    );
  },

  methods: {
    onItemTap(event) {
      this.$navigateTo(Detail, {
        transition: "slide",

        props: {
          doctor: event.item
        }
      });
    }
  }
};
</script>
