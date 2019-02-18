<template>
  <Page class="page">
    <ActionBar class="action-bar" flat="true" :title="'starter_service_text'|L">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>
    <StackLayout style="background:#E1E1E1; padding:20px;">
      <label :text="clinic_name" class="h5 label-main"/>
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
