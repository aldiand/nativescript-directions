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
        <SegmentedBar class="segmented-bar" :selectedIndex="tabIndex">
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
              <!-- <RadListView ref="listView" for="item in data.clinics" itemHeight="100">
                <v-template>
                  <StackLayout class="item" width="40%">
                    <Label :text="item.name" class="text-name"></Label>
                    <Label :text="item.photo" class="descriptionLabel"></Label>
                  </StackLayout>
                </v-template>
              </RadListView> -->
		          <ScrollView row="1">
                <WrapLayout horizontalAlignment="center" width="100%">
                  <StackLayout
                    v-for="(item, name) in data.clinics"
                    :key="name"
                    horizontalAlignment="center"
                    class="p-10"
                    width="50%"
                  >
                    <CardView class="card" margin="10" elevation="1" radius="1">
                      <StackLayout class="card-content"
                      horizontalAlignment="center"> 
                        <Image :src="item.photo" stretch="aspectFill" height="50" width="50"/>
                        <Label :text="item.name" class="m-t-10" />
                      </StackLayout>
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

</style>

<script>
import { commonApi } from "../../modules/commonapi";

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
    }
  }
};
</script>