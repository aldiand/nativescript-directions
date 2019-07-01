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
          <CardView class="m-20" radius="75" margin="20">
            <DockLayout stretchLastChild="true" class="dockSearch">
              <image src="~/assets/images/ic_search.png" width="7%" dock="right" @tap="search"/>
              <TextField ref="search" :hint="'activity_search_type_doctor_or_clinic' | L" dock="left" v-model="searchText" @returnPress="search" returnKeyType="search" style="border-width:1;border-color:#ffffff;"/>
            </DockLayout>
          </CardView>
      </StackLayout>
    </StackLayout>
  </Page>
</template>

<style scoped>

  .dockSearch{
    padding-left:25px;
    padding-right:25px;
    padding-top:5px;
    padding-bottom:5px;
  }
</style>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$refs.search.nativeView.focus(); 
    },100);
  },
  data() {
    return {
      searchText: "",
    }
  },
  methods: {
    search(event) {
      if (!this.searchText) {
        return;
      }
      console.log("searching...", this.searchText);
    },
  },
}
</script>
