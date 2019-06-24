<template>
  <Page class="page">
    <AppBar :title="'activity_search' | L"/>
    <StackLayout>
      <AppEmptyView
        :text="'error_something_went_wrong' | L"
        v-bind:visibility="!error ? 'collapse': 'visible'"
        @refresh="loadData"
      />
      <AppLoadingView v-bind:visibility="busy ? 'visible' : 'collapse'"/>
      <StackLayout>
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
                <WrapLayout horizontalAlignment="center" width="100%">
                  <StackLayout
                    v-for="(item, name) in data.clinics"
                    :key="name"
                    horizontalAlignment="center"
                    width="50%"
                  >
                    <CardView class="card" margin="10" elevation="1" radius="1" @tap="goToClinic(item.id, item.photo)">
                      <DockLayout class="card-content p-10" width="100%"
                      > 
                        <!-- <Label dock="bottom" class="btn-profile" align="center" :text="'starter_view_profile' | L" /> -->
                        <Image dock="top" :src="item.photo" stretch="aspectFill" class="m-10" align="center" height="50" width="50"/>
                        <Label dock="left" :text="item.name" width="100%" style="text-align:center;"  height="40" align="center" textWrap="true" />
                      </DockLayout>
                    </CardView>
                  </StackLayout>
                </WrapLayout>
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
                <WrapLayout horizontalAlignment="center" width="100%">
                  <StackLayout
                    v-for="(item, name) in data.doctor"
                    :key="name"
                    horizontalAlignment="center"
                    width="50%"
                  >
                    <CardView class="card" margin="10" elevation="1" radius="1">
                      <DockLayout class="card-content p-10" width="100%"
                      > 
                        <!-- <Label dock="bottom" class="btn-profile" align="center" :text="'starter_view_profile' | L" /> -->
                        <Image dock="top" :src="item.photo" stretch="aspectFill" class="m-10" align="center" height="50" width="50"/>
                        <Label dock="left" :text="item.name" width="100%" style="text-align:center;"  height="40" align="center" textWrap="true" />
                      </DockLayout>
                    </CardView>
                  </StackLayout>
                </WrapLayout>
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
</style>

<script>
import { commonApi } from "../../modules/commonapi";
import { Label } from 'tns-core-modules/ui/label';
import Detail from "~/components/mydoctor/DoctorProfile";
import ClinicProfile from "~/components/mydoctor/ClinicProfile";

export default {
  mounted() {
    if (this.query) {
      this.textSearch = this.query;
      this.loadData();
    }
  },
  props: {
    query: ""
  },
  data() {
    return {
      textSearch: String,
      tabIndex: 0,
      busy: false,
      error: false,
      data: {}
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
      this.$navigateTo(Detail, {
        transition: "slide",
        props: {
          doctor: event
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
    }
  }
};
</script>