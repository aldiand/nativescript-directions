<template>
  <Page class="page">
    <AppBar :title="'starter_service_text' | L"/>
    <ScrollView>
      <StackLayout>
        <StackLayout v-for="(item, name) in services" :key="name">
          <StackLayout class="m-l-20 m-r-20 p-5">
            <CardView class="m-5" radius="5" elevation="5" >
              <ItemListService iconSrc="~/assets/images/ic_medic_general.png" :service="item.name"/>
            </CardView>
          </StackLayout>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import * as dt from "~/modules/datetime";
import ItemListService from "./ItemListService";
export default {
  components:{
    ItemListService
  },
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
