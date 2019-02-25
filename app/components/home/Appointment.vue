<template>
  <StackLayout orientation="vertical" width="100%">
    <Label text="Appointment" textWrap="true" class="text-title"/>
    <RadListView
      ref="listView"
      for="item in appointments"
      @itemTap="onItemTap"
      pullToRefresh="true"
      @pullToRefreshInitiated="onPullToRefreshInitiated"
    >    
    <AppEmptyView files="ic_no_appointment.png" :text="'fragment_myappointments_no_appointments' | L" />

      <v-template>
        <AppointmentList :item="item"/>
      </v-template>
    </RadListView>
  </StackLayout>
</template>


<script>
import AppointmentList from "./AppointmentList";
import Detail from "~/components/appointment/DetailAppointment";

export default {
  components: {
    AppointmentList
  },
  data() {
    return {
      appointments: []
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    onPullToRefreshInitiated({ object }) {
      console.log("Pulling...");
      setTimeout(() => {
        this.appointments = [];
        this.loadData();
        object.notifyPullToRefreshFinished();
      });
    },

    loadData() {
      this.$http.get(
        "/appointments",
        content => {
          let responsePayload = content.content;
          this.appointments = responsePayload;
          console.log(JSON.stringify(responsePayload));
        },
        error => {}
      );
    },
    onItemTap(event) {
      this.$navigateTo(Detail, {
        transition: "slide",

        props: {
          appointment: event.item
        }
      });
    }
  }
};
</script>
