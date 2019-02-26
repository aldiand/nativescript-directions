<template>
  <Page class="page">
    <AppBar :title="'fragment_inbox_create_message_title' | L"/>
    <StackLayout height="100%">
      <AppLoadingView v-bind:visibility="busy ? 'visible' : 'collapse'"/>
      <DockLayout
        style="background-image:url('~/assets/images/Group7.png'); background-size:cover;"
        height="100%"
         stretchLastChild="true"
      >
        <DockLayout dock="bottom" style="background-color:white;">
          <StackLayout orientation="vertical" width="100%" verticalAlignment="center">
            <Label
              :text="errorText"
              class="text-danger"
              style="margin-bottom:8; text-align:center;"
            ></Label>
            <AppButton :text="'activity_new_message_send'|L" @tap="onSubmit"></AppButton>
          </StackLayout>
        </DockLayout>
        <ScrollView height="auto" dock="top">
          <StackLayout style="padding:10;" height="100%">
            <DockLayout class="container-list">
              <StackLayout
                orientation="horizontal"
                height="50"
                width="100%"
                verticalAlignment="center"
              >
                <label
                  :text="'activity_new_message_to' | L"
                  verticalAlignment="center"
                  marginLeft="10"
                  marginRight="10"
                />
                <DropDown
                  class="default"
                  :items="listPickerDoctor"
                  @selectedIndexChanged="onDoctorChanged"
                  :selectedIndex="selectedDoctorIndex"
                  row="0"
                  colspan="2"
                  horizontalAlignment="stretch"
                  width="100%"
                  ref="doctor"
                ></DropDown>
              </StackLayout>
            </DockLayout>

            <DockLayout class="container-list">
              <StackLayout
                orientation="horizontal"
                height="50"
                width="100%"
                verticalAlignment="center"
              >
                <TextField
                  verticalAlignment="center"
                  marginLeft="10"
                  marginRight="10"
                  :hint="'activity_new_message_title_hint' | L"
                  class="input input-border"
                  width="100%"
                />
              </StackLayout>
            </DockLayout>
            <DockLayout class="container-list" verticalAlignment="stretch">
              <StackLayout orientation="horizontal" verticalAlignment="top" height="100%">
                <TextView
                  marginLeft="10"
                  marginRight="10"
                  marginTop="10"
                  marginBottom="10"
                  :hint="'activity_new_message_body_hint' | L"
                  class="input input-border"
                  width="100%"
                />
              </StackLayout>
            </DockLayout>
          </StackLayout>
        </ScrollView>
      </DockLayout>
    </StackLayout>
  </Page>
</template>

<script>
const localize = require("nativescript-localize");
export default {
  methods: {
    onButtonTap() {
      console.log("Button was pressed");
    },

    onSubmit() {},

    onDoctorChanged(event) {
      console.log(
        `Drop Down selected index changed from ${event.oldIndex} to ${
          event.newIndex
        }`
      );
      this.selectedDoctorIndex = event.newIndex;
    },

    loadData() {
      this.busy = true;
      this.$http.get(
        "/mydoctors",
        content => {
          let responsePayload = content.content;
          this.mydoctor = responsePayload;
          var arrayLength = this.mydoctor.length;
          for (var i = 0; i < arrayLength; i++) {
            this.listPickerDoctor.push(this.mydoctor[i].profile_name);
          }
          this.selectedDoctorIndex=0;
          this.busy = false;
        },
        error => {
          this.busy = false;
          this.errorText = localize("error_something_went_wrong");
        }
      );
    }
  },

  data() {
    return {
      listPickerDoctor: [],
      textFieldValue: "",
      selectedDoctorIndex: 0,
      errorText: "",
      title: "",
      busy: true,
      mydoctor: []
    };
  },

  mounted() {
    this.loadData();
  }
};
</script>

<style scoped>
.default {
  padding: 15;
  font-size: 14;
  text-align: left;
}
.Kepada {
  font-size: 20;
}

.description-label {
  margin-bottom: 15;
}
.container-list {
  background: #ffffff;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
}
</style>