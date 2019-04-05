<template>
  <Page class="page">
    <AppBar :title="'activity_book_title_select_treatment' | L"/>
    <StackLayout
      style="background-image:url('~/assets/images/Group7.png'); background-size:cover; padding:20px;"
    >
    <GridLayout rows="*" columns="*">
      <ListView for="item in services" @itemTap="onItemTap" rowHeight="900">
        <v-template>
          <StackLayout style="padding:35px; background-color:#ffffff;">
            <Label :text="item.name" class="h5"/>
          </StackLayout>
        </v-template>
      </ListView>
    </GridLayout>
    </StackLayout>
  </Page>
</template>
<style scoped>
ListView {
  background-color: transparent;
}
</style>

<script>
import * as dt from "~/modules/datetime";
import Confirmation from "./Confirmation";

export default {
  mounted() {
    this.loadData();
  },
  props: {
    doctor: {},
    clinic_id: Number,
    doctor_id: Number,
    tag: Number,
    time: String,
    appointment_id: Number
  },
  data() {
    return {
      services: []
    };
  },
  methods: {
    loadData() {
      this.$http.get(
        "/clinics/" + this.clinic_id,
        content => {
          let responsePayload = content.content;
          this.services = responsePayload.data.services;
        },
        error => {}
      );
    },
    onItemTap(event) {
      this.$navigateTo(Confirmation, {
        transition: "slide",
        backstackVisible: false,
        props: {
          doctor: this.doctor,
          clinic_id: this.clinic_id,
          doctor_id: this.doctor_id,
          tag: this.tag,
          time: this.time,
          reason: event.item.name,
          appointment_id: this.appointment_id
        }
      });
    }
  }
};
</script>
