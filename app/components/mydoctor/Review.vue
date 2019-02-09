<template>
  <Page class="page">
    <ActionBar class="action-bar" flat="true" :title="'starter_review_text' | L">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>
    <StackLayout style="background:#E1E1E1; padding:40px;">
      <Label
              textWrap="true"
              text="drg. Ami R. Sp, KG"
              class="h5 label-main"
            />
      <Label 
              textWrap="true" 
              text="Klinik Mitra" 
              class="h6"
              style="font-weight:bold;"/>
      <StackLayout style="padding:20px;">
        <Label 
          text="Michael"
          class="h6 label-main"/>
          <StackLayout orientation="horizontal">
            <Image
              src="~/assets/images/star-review-doctor-profile.png"
              class="star-review"
            />
            <Image
              src="~/assets/images/star-review-doctor-profile.png"
              class="star-review"
            />
            <Image
              src="~/assets/images/star-review-doctor-profile.png"
              class="star-review"
            />
            <Image
              src="~/assets/images/star-review-doctor-profile.png"
              class="star-review"
            />
            <Image
              src="~/assets/images/star-review-doctor-profile.png"
              class="star-review"
            />
          </StackLayout>
        <Label 
          text="Comment Here"
          class="h6 text-muted"/>
      </StackLayout>
      <ListView for="item in reviews" style="padding:20px;">
        <v-template>
          <StackLayout>
            <Label 
              :text="item.patient_name + ' - ' + item.rating " 
              class="h6 label-doctor-name"/>
            <!-- <StactLayout orientation="horizontal">
              <Image
                v-if="profile.rating >= 1"
                src="~/assets/images/star-review-doctor-profile.png"
                class="star-review"
              />
              <Image
                v-if="profile.rating >= 2"
                src="~/assets/images/star-review-doctor-profile.png"
                class="star-review"
              />
              <Image
                v-if="profile.rating >= 3"
                src="~/assets/images/star-review-doctor-profile.png"
                class="star-review"
              />
              <Image
                v-if="profile.rating >= 4"
                src="~/assets/images/star-review-doctor-profile.png"
                class="star-review"
              />
              <Image
                v-if="profile.rating >= 5"
                src="~/assets/images/star-review-doctor-profile.png"
                class="star-review"
              />
            </StactLayout> -->
            <Label 
              :text="item.content"
              class="h6 text-muted"
            />
          </StackLayout>
        </v-template>
      </ListView>
    </StackLayout>
  </Page>
</template>

<style scoped>

.star-review {
  width: 30px;
  margin:0;
}
</style>


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