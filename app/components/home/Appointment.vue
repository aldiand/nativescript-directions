<template>
    <StackLayout orientation="vertical" width="100%">
        <Label text="Appointment" textWrap="true" class="text-title"/>
        <ListView for="item in appointments">
            <v-template>
                <AppointmentList :item="item"/>
            </v-template>
        </ListView>
    </StackLayout>
</template>


<script>
import AppointmentList from "./AppointmentList";

export default {
  components: {
    AppointmentList
  },
  data() {
    return {
      appointments: {}
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

  methods: {}
};
</script>
