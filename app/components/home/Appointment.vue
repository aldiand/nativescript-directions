<template>
    <StackLayout orientation="vertical" width="100%">
        <Label text="Appointment" textWrap="true" class="text-title"/>
        <ListView for="item in appointments" @itemTap="onItemTap">
            <v-template>
                <AppointmentList :item="item"/>
            </v-template>
        </ListView>
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
    this.$http.get(
      "/appointments",
      content => {
        let responsePayload = content.content;
        this.appointments = responsePayload;
      },
      error => {

        }
    );
  },

  methods: {
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
