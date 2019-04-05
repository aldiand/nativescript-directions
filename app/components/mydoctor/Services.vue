<template>
  <Page class="page">
    <AppBar :title="'starter_service_text' | L"/>
    <StackLayout style="background-image:url('~/assets/images/Group7.png'); background-size:cover; padding:20px;">
      <label :text="clinic_name" class="h5 label-main"/>

    <GridLayout rows="*" columns="*">
      <ListView for="item in services" rowHeight="900">
        <v-template>
          <StackLayout style="padding:40px; background-color:#ffffff;">
            <Label :text="item.name" class="h6"/>
          </StackLayout>
        </v-template>
      </ListView>
    </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import * as dt from "~/modules/datetime";
export default {
  mounted() {
    this.loadData()
  },
  props: {
    clinic_name: String,
    clinic_id: Number
  },
  data() {
    return {
      services: []
    }
  },
  methods: {
    loadData() {
      this.$http.get(
        "/clinics/"+ this.clinic_id,
        content => {
          let responsePayload = content.content;
          this.services = responsePayload.data.services;
        },
        error => {}
      );
    }
  }
  
};
</script>
