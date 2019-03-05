<template>
  <Page class="page">
    <AppBar :title="'activity_book_title_select_treatment' | L"/>
    <StackLayout style="background-image:url('~/assets/images/Group7.png'); background-size:cover; padding:20px;">
      <ListView for="item in services">
        <v-template>
          <StackLayout style="padding:40px; background-color:#ffffff;">
            <Label :text="item.name" class="h6"/>
          </StackLayout>
        </v-template>
      </ListView>
    
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
    clinic_id: Number,
    time: String,
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
