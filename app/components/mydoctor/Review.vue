<template>
  <Page class="page">
    <ActionBar class="action-bar" flat="true" :title="'starter_review_text' | L">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>
    <StackLayout style="background:#E1E1E1; padding:40px;">
      <Label textWrap="true" :text="doctor_id? doctor_name: clinic_name" class="h5 label-main"/>
      <Label textWrap="true" v-if="doctor_id" :text="clinic_name" class="h6" style="font-weight:bold;"/>
      <!-- <StackLayout style="padding:20px;">
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
      </StackLayout>-->
      <ListView for="item in reviews" style="padding:20px;margin-top:20px" height="100%" >
        <v-template>
          <StackLayout>
            <!-- <Label 
              :text="item.patient_name + ' - ' + item.rating " 
            class="h6 label-doctor-name"/>-->
            <Label :text="item.patient_name" class="h6  label-doctor-name"/>
            <StackLayout orientation="horizontal">
              <Image
                v-if="item.rating >= 1"
                src="~/assets/images/star-review-doctor-profile.png"
                class="star-review"
              />
              <Image
                v-if="item.rating >= 2"
                src="~/assets/images/star-review-doctor-profile.png"
                class="star-review"
              />
              <Image
                v-if="item.rating >= 3"
                src="~/assets/images/star-review-doctor-profile.png"
                class="star-review"
              />
              <Image
                v-if="item.rating >= 4"
                src="~/assets/images/star-review-doctor-profile.png"
                class="star-review"
              />
              <Image
                v-if="item.rating >= 5"
                src="~/assets/images/star-review-doctor-profile.png"
                class="star-review"
              />
            </StackLayout>
            <Label v-if="item.content.length > 0" :text="item.content" class="h6 text-muted"/>
            <Label v-else :text="'error_no_comment'|L" class="h6 text-muted"/>
          </StackLayout>
        </v-template>
      </ListView>
    </StackLayout>
  </Page>
</template>

<style scoped>
.star-review {
  width: 30px;
  margin: 0;
}
</style>


<script>
export default {
  mounted() {
    this.loadData();
  },
  props: {
    clinic_id: Number,
    doctor_id: Number,
    doctor_name: String,
    clinic_name: String
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