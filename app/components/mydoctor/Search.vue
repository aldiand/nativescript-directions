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
            v-if="!data.clinic"
          >
            <label :text="'activity_search_empty_result' |L" class="text-center text-main"/>
          </StackLayout>
          <ScrollView v-if="data.clinic"> 
            <StackLayout>
              <StackLayout v-for="(item, name) in data.clinic" :key="name">
                <StackLayout
                  style="margin: 10; padding:40px; border-width: 1; border-radius: 10; border-color:  #03c1b8; background: white;"
                >
                  <Label :text="item.name" class="h5"/>
                </StackLayout>
              </StackLayout>
            </StackLayout>
          </ScrollView>
        </GridLayout>
      </StackLayout>
    </StackLayout>
  </Page>
</template>

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
        console.log(JSON.stringify(success));
        this.data = success.data.data;
        this.busy = false;
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