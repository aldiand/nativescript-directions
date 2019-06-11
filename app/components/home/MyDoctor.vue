<template>
  <StackLayout orientation="vertical" width="100%" height="100%" >
    <ScrollView>
      <StackLayout>
        <Label :text="'home' | L" textWrap="true" class="text-title"/>
        <AppEmptyView
          files="ic_no_mail.png"
          :text="'fragment_mydoctor_no_doctor_body' | L"
          v-bind:visibility="busy || (mydoctor && mydoctor.length) ? 'collapse': 'visible'"
          @refresh="loadData"
        />
        <AppLoadingView v-bind:visibility="busy ? 'visible' : 'collapse'"/>
        <label :text="getGreeting()" class="headingHome"/>
        <label :text="'what_do_you_want_to_do' | L" class="secLine" />
        <CardView class="cardStyle" style="margin:15px;border-radius:20;">
          <DockLayout stretchLastChild="true" class="dockSearch">
            <image src="~/assets/images/ic_search.png" width="7%" dock="right" @tap="search"/>
            <TextField :hint="'activity_search_type_doctor_or_clinic' | L" dock="left" v-model="searchText" @returnPress="search" returnKeyType="search" style="border-width:1;border-color:#ffffff;"/>
          </DockLayout>
        </CardView>
        <StackLayout v-if="false">
          <DockLayout style="margin-left:15px;margin-right:15px;">
            <label text="show more" class="headingHome" style="font-size:13pt; color:#03c1b8;" dock="right"/>
            <label text="Special Offer" class="headingHome" style="color:#03c1b8;" dock="left"/>
          </DockLayout>
          <ScrollView orientation="horizontal" v-if="false">
            <StackLayout orientation="horizontal">
              <CardView class="cardStyle" style="margin:15px;">
                <DockLayout stretchLastChild="true" width="500px" style="padding:15px;">
                  <image src="~/assets/images/person-flat.png" style="width:50%;" dock="left"/>
                  <label text="Lorem Ipsum" class="headingHome" style="font-size:13pt;" dock="last child" textWrap="true"/>
                </DockLayout>
              </CardView>
              <CardView class="cardStyle" style="margin:15px;">
                <DockLayout stretchLastChild="true" width="500px" style="padding:15px;">
                  <image src="~/assets/images/person-flat.png" style="width:50%;" dock="left"/>
                  <label text="Lorem Ipsum" class="headingHome" style="font-size:13pt;" dock="last child" textWrap="true"/>
                </DockLayout>
              </CardView>
              <CardView class="cardStyle" style="margin:15px;">
                <DockLayout stretchLastChild="true" width="500px" style="padding:15px;">
                  <image src="~/assets/images/person-flat.png" style="width:50%;" dock="left"/>
                  <label text="Lorem Ipsum" class="headingHome" style="font-size:13pt;" dock="last child" textWrap="true"/>
                </DockLayout>
              </CardView>
            </StackLayout>
          </ScrollView>
        </StackLayout>
        <!--list Clinic---->
          <StackLayout v-if="false">
          <DockLayout style="margin-left:15px;margin-right:15px;">
            <label text="show more" class="headingHome" style="font-size:13pt; color:#03c1b8;" dock="right"/>
            <label text="Your Clinics" class="headingHome" style="color:#03c1b8;" dock="left"/>
          </DockLayout>
          <StackLayout orientation="horizontal" width="100%" height="150px">
            <CardView dock="left" width="45%" class="cardStyle" style="margin:15px;">
              <DockLayout stretchLastChild="true" style="padding:10px;">
                <image src="~/assets/images/info.png" style="width:200px;" dock="left"/>
                <label text="Lorem Ipsum" class="headingHome" style="font-size:13pt;" dock="last child" textWrap="true"/>
              </DockLayout>
            </CardView>
            <CardView dock="left" width="45%" class="cardStyle" style="margin:15px;">
              <DockLayout stretchLastChild="true" style="padding:10px;">
                <image src="~/assets/images/info.png" style="width:200px;" dock="left"/>
                <label text="Lorem Ipsum" class="headingHome" style="font-size:13pt;" dock="last child" textWrap="true"/>
              </DockLayout>
            </CardView>
          </StackLayout>
        </StackLayout>
        <!--list Doctor---->
        <StackLayout class="m-10">
                  
          <DockLayout >
            <!-- <label text="show more" class="headingHome" style="font-size:13pt; color:#03c1b8;" dock="right"/> -->
            <label text="Your Doctor" class="text-main headingHome h4" dock="left"/>
          </DockLayout>
          <StackLayout orientation="horizontal" width="100%">
              <RadListView
                ref="listView"
                for="item in mydoctor"
                @itemTap="onItemTap"
                @pullToRefreshInitiated="onPullToRefreshInitiated"
              >
                <v-template>
                  <CardView dock="left" class="cardStyle" style="margin:15px;">
                    <MyDoctorList :item="item"/>
                  </CardView>
                </v-template>
              </RadListView>
          </StackLayout>
        </StackLayout>
        
      </StackLayout>
    </ScrollView>
  </StackLayout>
</template>

<style scoped>
  .headingHome{
    margin-left:15px;
    margin-top:15px;
    margin-bottom:15px;
    font-size:18pt;
    font-weight: bold;
    color:#444444;
  }
  .secLine{
    margin-left:15px;
    margin-bottom:15px;
    font-size:18pt;
    font-weight: bold;
    color:#444444;
  }
  .dockSearch{
    padding-left:25px;
    padding-right:25px;
    padding-top:15px;
    padding-bottom:15px;
  }
</style>


<script>
import { getString } from "application-settings"; // Example Only
import * as store from "~/modules/store";
import { getTimeHourNow } from "~/modules/datetime";
import MyDoctorList from "./MyDoctorList";
import Phone from "~/components/login/Phone";
import Detail from "~/components/mydoctor/DoctorProfile";
import SearchPage from "~/components/mydoctor/Search";

const localize = require("nativescript-localize");
export default {
  components: {
    MyDoctorList
  },
  data() {
    return {
      mydoctor: [],
      busy: true,
      isLoading: true,
      searchText: '',
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    onPullToRefreshInitiated({ object }) {
      console.log("Pulling...");
      setTimeout(() => {
        this.mydoctor = [];
        this.loadData();
        object.notifyPullToRefreshFinished();
      });
    },

    loadData() {
      this.busy = true;
      this.$http.get(
        "/mydoctors",
        content => {
          let responsePayload = content.content;
          this.mydoctor = responsePayload;
          console.log(JSON.stringify(responsePayload));
          this.isLoading = false;
          this.busy = false;
        },
        error => {
          this.busy = false;
          if (error.statusCode == 403) {
            alert({
              title: localize("dialog_session_expire_title"),
              message: localize("dialog_session_expire_body"),
              okButtonText: localize("dialog_session_expire_ok")
            }).then(() => {
              this.$navigateTo(Phone, {
                transition: "fade",
                clearHistory: true
              });
            });
          } else {
            var snacbar = new SnackBar();
            snacbar
              .simple(error)
              .then(args => {
                console.log("SnackBar.simple() result", args);
                this.set("jsonResult", JSON.stringify(args));
              })
              .catch(error => {
                console.log("simple snackbar error", error);
              });
          }
        }
      );
    },
    onItemTap(event) {
      this.$navigateTo(Detail, {
        transition: "slide",

        props: {
          doctor: event.item
        }
      });
    },
    getGreeting() {
      if (getTimeHourNow() < 12) {
        return localize("good_morning");
      } else if (getTimeHourNow() < 18) {
        return localize("good_afternoon");
      } else {
        return localize("good_evening");
      }
    },
    search(event) {
      if (!this.searchText) {
        return;
      }
      console.log("searching...", this.searchText);
      this.$navigateTo(SearchPage, {
        transition: "slide",

        props: {
          query: this.searchText
        }
      });
    }
  }
};
</script>
