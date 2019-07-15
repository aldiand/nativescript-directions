<template>
  <Page class="page">
    <AppBar :title="'activity_book_title_select_treatment' | L"/>
    <StackLayout>
      <ScrollView>
        <GridLayout height="100%" rows="*, auto">
          <StackLayout row="0">
            <BookStep 
              horizontalAlignment="center" 
              classCircle1="active"
              classCircle2="noActive"
              classCircle3="noActive"/>

            <StackLayout orientation="vertical" class="container-list">
              <label
              :text="'activity_book_title_select_treatment'|L"
              class="h4"
              horizontalAlignment="center"
              style="font-weight:bold;"/>
            <label
              visibility="collapsed"
              :text="'starter_confirm_review_text'|L"
              horizontalAlignment="center"/>
            </StackLayout>

            <StackLayout v-for="(item, name) in services" :key="name" class="p-l-10 p-r-10">
              <StackLayout>
                <CardView class="m-5" radius="5" elevation="5" @tap="onItemTap(item)">
                  <ItemListService iconSrc="~/assets/images/ic_medic_general.png" :service="item.name"/>
                </CardView>
              </StackLayout>
            </StackLayout> 
        </StackLayout>
          <StackLayout row="1" orientation="horizontal" style="height:120px;width:100%;margin-bottom:30px;">
            <!-- <Button
              class="btn btn-next-prev"
              :text="'starter_btn_prev'|L"
            />
            <Button
              class="btn btn-next-prev"
              :text="'starter_btn_next'|L"
            /> -->
          </StackLayout>
        </GridLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>
<style scoped>
ListView {
  background-color: transparent;
}
</style>

<script>
import * as dt from "~/modules/datetime";
import * as constants from "~/modules/constants";
import Confirmation from "./Confirmation";
import SelectTime from "./SelectTime";
import SelectQueueTime from "./SelectQueueTime";
import BookStep from "./BookStep";
import ItemListService from "../mydoctor/ItemListService";

export default {
  components:{
    BookStep,
    ItemListService
  },
  mounted() {
    this.loadData();
  },
  props: {
    doctor: {},
  },
  data() {
    return {
      services: [],
      clinic_id: this.$store.state.clinicId,
      doctor_id: this.$store.state.doctorId,
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
    },
    onItemTap(item) {
      this.$store.commit('setService', item.name)
      if (this.$store.state.bookingState == constants.RESERVATION_TYPE_TIME 
      || this.$store.state.bookingState == constants.RESERVATION_TYPE_TIME_RESCHEDULE ) {
        this.$navigateTo(SelectTime, {
          frame: 'stepFrame',
          transition: "fade",
          backstackVisible: false,
          props: {
            doctor: this.doctor,
          }
        });
      } else {
        this.$navigateTo(SelectQueueTime, {
          frame: 'stepFrame',
          transition: "fade",
          backstackVisible: false,
          props: {
            doctor: this.doctor,
          }
        });
      }
    }
  }
};
</script>
