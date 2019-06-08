<template>
  <Page class="page">
    <AppBar :title="'activity_book_title_select_treatment' | L"/>
    <StackLayout>
      <ScrollView>
        <StackLayout>
          <StackLayout v-for="(item, name) in services" :key="name">
            <StackLayout 
            style="margin: 10; padding:40px; border-width: 1; border-radius: 10; border-color:  #03c1b8; background: white;"  
            @tap="onItemTap(item)">
              <Label :text="item.name" class="h5"/>
            </StackLayout>
          </StackLayout>
        </StackLayout>
      </ScrollView>
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
    onItemTap(item) {
      this.$navigateTo(Confirmation, {
        transition: "slide",
        backstackVisible: false,
        props: {
          doctor: this.doctor,
          clinic_id: this.clinic_id,
          doctor_id: this.doctor_id,
          tag: this.tag,
          time: this.time,
          reason: item.name,
          appointment_id: this.appointment_id
        }
      });
    }
  }
};
</script>
