<template>
  <StackLayout orientation="vertical" width="100%">
    <Label text="My Doctor" textWrap="true" class="text-title"/>
    <ListView for="item in mydoctor">
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
export default {
  components: {
    MyDoctorList
  },
  data() {
    return {
      mydoctor: null
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
        console.log(getString(store.TOKEN, ""));
      }
    );
  },

  methods: {}
};
</script>
