<template>
  <Page class="page">
    <AppBar :title="'starter_review_text' | L"/>
    <ScrollView>
      <StackLayout>
        <StackLayout v-for="(item, patient_name) in reviews" :key="patient_name">
          <CardView class="cardStyle" margin="5" elevation="1" radius="1">
            <StackLayout class="list-comment">
              <StackLayout orientation="horizontal">
                <Image
                  v-if="item.rating >= 0.5"
                  src="~/assets/images/star-review-doctor-profile.png"
                  class="star-review"
                />
                <Image
                  v-if="item.rating >= 1.5"
                  src="~/assets/images/star-review-doctor-profile.png"
                  class="star-review"
                />
                <Image
                  v-if="item.rating >= 2.5"
                  src="~/assets/images/star-review-doctor-profile.png"
                  class="star-review"
                />
                <Image
                  v-if="item.rating >= 3.5"
                  src="~/assets/images/star-review-doctor-profile.png"
                  class="star-review"
                />
                <Image
                  v-if="item.rating >= 4.5"
                  src="~/assets/images/star-review-doctor-profile.png"
                  class="star-review"
                />
              </StackLayout>
              <Label :text="item.patient_name" class="h5 text-main m-t-5"/>
              <Label v-if="item.content.length > 0" :text="item.content" class="h6 text-muted"/>
              <Label v-else :text="'error_no_comment'|L" class="h6 text-muted"/>
            </StackLayout>
          </CardView>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<style scoped>
.star-review {
  width: 30px;
  margin: 0;
}
.list-comment {
  padding: 20px;
  margin-top: 20px;
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