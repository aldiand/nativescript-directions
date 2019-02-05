<template>
  <Page class="page">
    <ActionBar class="action-bar2" flat="true" :title="'starter_service_text'|L">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>
    <StackLayout style="background:#E1E1E1;">
      <label :text="clinic_name"/>
      <ListView for="item in services">
        <v-template>
          <StackLayout>
            <Label :text="item.name"/>
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
