<template>
  <StackLayout orientation="vertical" width="100%">
    <Label text="Appointment" textWrap="true" class="text-title"/>

    <AppEmptyView
      files="ic_no_mail.png"
      :text="'fragment_myappointments_no_appointments' | L"
      v-bind:visibility="busy || (appointments && appointments.length) ? 'collapse': 'visible'"
      @refresh="loadData"
    />
    <AppLoadingView v-bind:visibility="busy ? 'visible' : 'collapse'"/>
    <RadListView
      ref="listView"
      for="item in appointments"
      @itemTap="onItemTap"
      pullToRefresh="true"
      @pullToRefreshInitiated="onPullToRefreshInitiated"
    >
      <v-template>
        <AppointmentList :item="item"/>
      </v-template>
    </RadListView>
  </StackLayout>
</template>


<script>
import AppointmentList from "./AppointmentList";
import DetailAppointment from "~/components/appointment/DetailAppointment";
import DetailQueue from "~/components/appointment/DetailQueue";

export default {
  components: {
    AppointmentList
  },
  data() {
    return {
      busy: true,
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
      this.busy = true;
      this.$http.get(
        "/my/appointments",
        content => {
          let responsePayload = content.content;
          this.appointments = responsePayload;
          console.log(JSON.stringify(responsePayload));
          this.busy = false;
        },
        error => {
          this.busy = false;
        }
      );
    },
    onItemTap(event) {
      if(event.item.reservation_type == "time"){
        this.$navigateTo(DetailAppointment, {
          transition: "slide",
          props: {
            appointment: event.item
          }
        });
      }else if(event.item.reservation_type == "queue"){
        this.$navigateTo(DetailQueue, {
          transition: "slide",
          props: {
            appointment: event.item
          }
        });
      }
    }
  }
};
</script>
