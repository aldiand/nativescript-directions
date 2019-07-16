<template>
  <Page class="page">
    <AppBar :title="'activity_search' | L"/>
    <StackLayout>
      <StackLayout>
          <CardView class="m-20" radius="75" margin="20" v-if="$isAndroid">
            <DockLayout stretchLastChild="true" class="dockSearch" >
              <image src="~/assets/images/ic_search.png" width="7%" dock="right" @tap="search"/>
              <TextField ref="search" :hint="'activity_search_type_doctor_or_clinic' | L" dock="left" v-model="searchText" @returnPress="search" returnKeyType="search" style="border-width:1;border-color:#ffffff;"/>
            </DockLayout>
          </CardView>
          <CardView class="m-t-10" radius="75" v-if="$isIOS">
            <DockLayout stretchLastChild="true" class="m-20 p-10 dockSearch" radius="75" style="background-color:white;">
              <image src="~/assets/images/ic_search.png" width="7%" dock="right" @tap="search"/>
              <TextField ref="search" :hint="'activity_search_type_doctor_or_clinic' | L" dock="left" v-model="searchText" @returnPress="search" returnKeyType="search" style="border-width:1;border-color:#ffffff;"/>
            </DockLayout>
          </CardView>
      </StackLayout>
      <AppEmptyView
        :text="'error_something_went_wrong' | L"
        v-bind:visibility="!error ? 'collapse': 'visible'"
        @refresh="loadData"
      />
      <AppLoadingView v-bind:visibility="busy ? 'visible' : 'collapse'"/>
      <StackLayout v-if="data">
        <SegmentedBar class="segmented-bar" :selectedIndex="tabIndex" @selectedIndexChange="onSelectTabItem">
          <SegmentedBarItem :title="'clinic' | L"/>
          <SegmentedBarItem :title="'doctor' | L"/>
        </SegmentedBar>
        <GridLayout v-if="tabIndex == 0" rows="*" columns="*">
          <StackLayout
            orientation="vertical"
            row="0"
            col="0"
            horizontalAlignment="center"
            verticalAlignment="center"
            v-if="!data.clinics"
          >
            <label :text="'activity_search_empty_result' |L" class="text-center text-main"/>
          </StackLayout>
            <StackLayout horizontalAlignment="center" width="100%" class="m-t-5">
		          <ScrollView row="1">
                <StackLayout horizontalAlignment="center" width="100%">
                  <StackLayout
                    v-for="(item, name) in data.clinics"
                    :key="name"
                    horizontalAlignment="center"
                    width="90%"
                  >
                    <StackLayout @tap="goToClinic(item.id, item.photo)">
                      <ClinicSearchList :item="item" />
                    </StackLayout>
                  </StackLayout>
                </StackLayout>
		          </ScrollView>
            </StackLayout>
        </GridLayout>
        <GridLayout v-if="tabIndex == 1" rows="*" columns="*">
          <StackLayout
            orientation="vertical"
            row="0"
            col="0"
            horizontalAlignment="center"
            verticalAlignment="center"
            v-if="!data.doctor"
          >
            <label :text="'activity_search_empty_result' |L" class="text-center text-main"/>
          </StackLayout>
            <StackLayout horizontalAlignment="center" width="100%" class="m-t-5">
		          <ScrollView row="1">
                <StackLayout horizontalAlignment="center" width="100%">
                  <StackLayout
                    v-for="(item, name) in data.doctor"
                    :key="name"
                    horizontalAlignment="center"
                    width="90%"
                  >

                    <StackLayout @tap="goToDoctor(item.clinic_id, item.id)">
                      <DoctorSearchList :item="item" />
                    </StackLayout>
                    
                  </StackLayout>
                </StackLayout>
		          </ScrollView>
            </StackLayout>
        </GridLayout>
      </StackLayout>
    </StackLayout>
  </Page>
</template>
<style scoped>
.btn-profile {
  font-size:16pt;
    text-align:center;
    color: blue;
}
  .dockSearch{
    padding-left:25px;
    padding-right:25px;
    padding-top:5px;
    padding-bottom:5px;
  }

</style>

<script>
import { commonApi } from "../../modules/commonapi";
import { Label } from 'tns-core-modules/ui/label';
import Detail from "~/components/mydoctor/DoctorProfile";
import ClinicProfile from "~/components/mydoctor/ClinicProfile";
import ClinicSearchList from "./ClinicSearchList";
import DoctorSearchList from "./DoctorSearchList";

export default {
  components: {
    ClinicSearchList,
    DoctorSearchList
  },
  mounted() {
    if (this.query) {
      this.textSearch = this.query;
      this.loadData();
    } else {
      setTimeout(() => {
        this.$refs.search.nativeView.focus(); 
      },100);
    }
  },
  props: {
    query: ""
  },
  data() {
    return {
      searchText: "",
      textSearch: String,
      tabIndex: 0,
      busy: false,
      error: false,
      data: null,
    };
  },
  methods: {
    loadData() {
      this.busy = true;
      this.error = false;
      var success = success => {
        this.data = success.data.data;
        this.busy = false;
        console.log(JSON.stringify(this.data));
      };
      var error = error => {
        console.log(JSON.stringify(error));
        this.busy = false;
        this.error = true;
      };
      commonApi.search(this.textSearch, success, error);
    },
    onSelectTabItem(event) {
      this.tabIndex = event.object.selectedIndex;
      console.log("tab index " + this.tabIndex);
    },
    goToDoctor(clinidId, doctorId) {
      var doctor = {};
      doctor.clinic_id = clinidId;
      doctor.doctor_id = doctorId;
      this.$navigateTo(Detail, {
        transition: "slide",
        props: {
          doctor: doctor
        }
      });
    },
    goToClinic(clinicId, photo) {
      this.$navigateTo(ClinicProfile, {
        transition: "slide",
        props: {
          clinic_id: clinicId,
          photo_profile: photo
        }
      });
    },
    search(event) {
      if (!this.searchText) {
        return;
      }
      this.textSearch = this.searchText;
      this.loadData();
    },
  }
};
</script>