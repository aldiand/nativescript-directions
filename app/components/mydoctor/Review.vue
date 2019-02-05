<template>
  <Page class="page">
    <ActionBar class="action-bar2" flat="true" :title="'starter_review_text' | L">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>
    <StackLayout style="background:#E1E1E1;">
      <ListView for="item in reviews">
        <v-template>
          <StackLayout>
            <Label :text="item.patient_name + ' - ' + item.rating "/>
            <Label :text="item.content"/>
          </StackLayout>
        </v-template>
      </ListView>
    </StackLayout>
  </Page>
</template>

<script>
export default {
    mounted() {
        this.loadData();
    },
  props: {
    clinic_id: Number,
    doctor_id: Number
  },
  data() {
    return {
      reviews: []
    };
  },
  methods: {
    loadData() {
      if (this.doctor_id != null) {
        this.$http.get(
          "/clinics/" +
            this.clinic_id +
            "/doctor/" +
            this.doctor_id +
            "/reviews",
          content => {
            let responsePayload = content.content;
            this.reviews = responsePayload.data;
            console.log(JSON.stringify(this.reviews));
          },
          error => {}
        );
      } else {
        this.$http.get(
          "/clinics/" + this.clinic_id + "/reviews",
          content => {
            let responsePayload = content.content;
            this.reviews = responsePayload.data;
            console.log(JSON.stringify(this.reviews));
          },
          error => {}
        );
      }
    }
  }
};
</script>