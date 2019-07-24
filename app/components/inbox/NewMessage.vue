<template>
  <Page class="page">
    <AppBar :title="'fragment_inbox_create_message_title' | L"/>
    <StackLayout height="100%">
      <AppLoadingView v-bind:visibility="busy ? 'visible' : 'collapse'"/>
      <DockLayout
        height="100%"
        stretchLastChild="true"
      >
        <DockLayout dock="bottom">
          <StackLayout orientation="vertical" width="100%" verticalAlignment="center">
            <Label
              :text="errorText"
              class="text-danger"
              style="margin-bottom:8; margin-top:8; text-align:center;"
            ></Label>
            <AppButton
              :text="'activity_new_message_send'|L"
              @tap="onSubmit"
              v-bind:visibility="loading ? 'collapse': 'visible'"
            ></AppButton>
            <ActivityIndicator class="activity-indicator" v-bind:busy="loading"></ActivityIndicator>
          </StackLayout>
        </DockLayout>
        <StackLayout dock="top">
          <ScrollView>
            <PreviousNextView>
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
                    <label
                      verticalAlignment="center"
                      :text="name"
                      marginLeft="10"
                      marginRight="10"
                      v-if="id"
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
                      v-if="!id"
                    ></DropDown>
                  </StackLayout>
                </DockLayout>

                <DockLayout class="container-list" v-if="!id">
                  <StackLayout
                    orientation="horizontal"
                    height="50"
                    width="100%"
                    verticalAlignment="center"
                  >
                    <TextField
                      v-model="title"
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
                      v-model="message"
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
            </PreviousNextView>
          </ScrollView>
        </StackLayout>
      </DockLayout>
    </StackLayout>
  </Page>
</template>

<script>
import { messageApi } from "../../modules/commonapi";
const localize = require("nativescript-localize");
export default {
  props: {
    id: "",
    name: ""
  },
  methods: {
    onSubmit() {
      console.log("submitting...");
      this.errorText = "";
      this.loading = true;
      if (this.validation()) {
        this.sendMessage();
        this.loading = false;
      } else {
        this.loading = false;
      }
    },

    validation() {
      if (this.selectedDoctorIndex == null || this.selectedDoctorIndex == 0) {
        if (!this.id) {
          return false;
        }
      }
      if (this.title == 0) {
        if (!this.id) {
          this.errorText = localize("activity_new_message_error_no_title");
          return false;
        }
      }
      if (this.message == 0) {
        this.errorText = localize("activity_new_message_error_no_message");
        return false;
      }

      return true;
    },

    sendMessage() {
      this.$loader.show();
      if (this.id) {
        messageApi.replyMessage(
          this.id,
          this.message,
          success => {
            this.$loader.hide();
            console.log(JSON.stringify(success));
            alert({
              title: localize("activity_new_message_sent_title"),
              message: localize("activity_new_message_sent_body"),
              okButtonText: localize("dialog_session_expire_ok")
            }).then(() => {
              this.$navigateBack();
            });
          },
          error => {
            this.$loader.hide();
            this.errorText = localize("error_something_went_wrong");
            this.busy = false;
          }
        );
      } else {
        this.$http.post(
          "/messages",
          {
            doctor_id: this.mydoctor[this.selectedDoctorIndex - 1].doctor_id,
            clinic_id: this.mydoctor[this.selectedDoctorIndex - 1].clinic_id,
            title: this.title,
            message: this.message
          },
          content => {
            this.$loader.hide();
            let responsePayload = content.content;
            console.log(JSON.stringify(responsePayload));
            alert({
              title: localize("activity_new_message_sent_title"),
              message: localize("activity_new_message_sent_body"),
              okButtonText: localize("dialog_session_expire_ok")
            }).then(() => {
              this.$navigateBack();
            });
          },
          error => {
            this.$loader.hide();
            this.errorText = localize("error_something_went_wrong");
            this.busy = false;
          }
        );
      }
    },

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
          this.busy = false;
          setTimeout(() => {
            this.selectedDoctorIndex = 0;
          }, 200);
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
      listPickerDoctor: [localize("activity_message_select_recipient")],
      selectedDoctorIndex: 0,
      errorText: "",
      title: "",
      message: "",
      busy: true,
      loading: false,
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
  margin-top: 10px;
}
</style>