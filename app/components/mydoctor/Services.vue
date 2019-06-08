<template>
  <Page class="page">
    <AppBar :title="'starter_service_text' | L"/>
    <ScrollView>
      <StackLayout>
        <StackLayout v-for="(item, name) in services" :key="name">
          <StackLayout
            style="margin: 10; padding:40px; border-width: 1; border-radius: 10; border-color:  #03c1b8; background: white;"
          >
            <Label :text="item.name" class="h5"/>
          </StackLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import * as dt from "~/modules/datetime";
export default {
  mounted() {
    this.loadData();
  },
  props: {
    clinic_name: String,
    clinic_id: Number
  },
  data() {
    return {
      services: []
    };
  },
  methods: {
    loadData() {
      this.$http.get(
        "/clinics/" + this.clinic_id,
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
