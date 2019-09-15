<template>
  <Page class="page">
    <AppBar :title="'activity_message_title' | L"/>
    <StackLayout>
      <AppEmptyView
        :text="'error_something_went_wrong' | L"
        v-bind:visibility="!error ? 'collapse': 'visible'"
        @refresh="loadData"
      />
      <AppLoadingView v-bind:visibility="busy ? 'visible' : 'collapse'"/>
      <GridLayout
        height="100%"
        rows="*, auto"
      >
      <ScrollView row="0">
        <StackLayout padding="10" >
          <CardView class="cardStyle" margin="10" elevation="1" radius="1">
          <DockLayout class="container-list">
            <ImageCacheIt
              resize="150,150"
              stretch="aspectFit"
              :imageUri="mutatableMessage.doctor_photo? mutatableMessage.doctor_photo : mutatableMessage.clinic_photo"
              placeholder="~/assets/images/doctordefault.png"
              errorHolder="~/assets/images/doctordefault.png"
              class="text-primary image-profile"
              style="width:150px;height:150px;margin:5px;"
            />
            <StackLayout
              dock="left"
              orientation="vertical"
              style="padding:15px;"
              horizontalAlignment="stretch"
            >
              <Label
                textWrap="true"
                :text="mutatableMessage.to_patient_desc == type.MESSAGE_DESC_FROM_CLINIC ? mutatableMessage.clinic_name : mutatableMessage.doctor_name "
                style="font-weight:bold;font-size:18pt;margin-bottom:10px;color:black;"
              />
              <label
                textWrap="true"
                :text="getDateTime(mutatableMessage.created_at)"
                style="font-size:12pt;margin-bottom:10px;color:#03c1b8"
              />
            </StackLayout>
          </DockLayout>
          </CardView>
          <DockLayout style="padding:20px;">
            <Label textWrap="true" dock="top" style="text-size" :text="mutatableMessage.message"/>
          </DockLayout>
          <DockLayout stretchLastChild="true">
            <StackLayout
              dock="left"
              orientation="vertical"
              style="padding:20px;"
              horizontalAlignment="stretch"
            >
            </StackLayout>
          </DockLayout>
        </StackLayout>
      </ScrollView>
      <DockLayout orientation="horizontal" row="1" class="m-b-20">
              <AppButton dock="right" width="40%" :text="'activity_message_reply'|L" @tap="reply"/>
              <AppButtonDanger dock="left" width="40%" :text="'button_delete'|L" @tap="deleteMessage"/>
      </DockLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import * as constant from "../../modules/constants";
import * as notification from "~/modules/notification.js";
import { messageApi } from "../../modules/commonapi";
const localize = require("nativescript-localize");
import * as dt from "../../modules/datetime";
import NewMessage from "./NewMessage";
export default {
  mounted() {
    if (this.id) {
      console.log("got id", this.id, this.photo_profile);
      this.mutatableMessage.id = this.id;
      this.mutatableMessage.photo_profile = this.photo_profile;
      setTimeout(() => {
        this.loadData();
      }, 0);
    } else {
      console.log(JSON.stringify(this.messages));
      this.mutatableMessage = this.messages;
    }
  },
  destroyed() {
    this.$store.dispatch('refreshInbox')
  },
  props: {
    messages: Object,
    id: "",
    photo_profile: "",
    notificationType: Number
  },
  data() {
    return {
      mutatableMessage: {},
      busy: false,
      type: constant,
      error: false,
    };
  },
  methods: {
    getDateTime(stringDate) {
      return dt.dateTimeToLongDateTime(stringDate);
    },
    loadData() {
      this.busy = true;
      this.error = false;
      var success = success => {
        console.log(JSON.stringify(success));
        this.mutatableMessage = success.data;
        if (this.photo_profile) {
          this.mutatableMessage.photo_profile = this.photo_profile;
        }
        this.busy = false;
      };
      var error = error => {
        console.log(JSON.stringify(error));
        this.busy = false;
        this.error = true;
      };
      messageApi.getMessageById(this.mutatableMessage.id, success, error);
    },
    reply() {
      console.log("reply");
      this.$navigateTo(NewMessage, {
        transition: "slide",
        props: {
          id: this.mutatableMessage.id,
          name: this.mutatableMessage.to_patient_desc == this.type.MESSAGE_DESC_FROM_CLINIC ? this.mutatableMessage.clinic_name : this.mutatableMessage.doctor_name,
        }
      });
    },
    deleteMessage() {
      console.log("delete");
      confirm({
        title: localize("dialog_delete_message_title"),
        message: localize("dialog_delete_message_content"),
        okButtonText: localize("starter_yes"),
        cancelButtonText: localize("starter_no")
      }).then(result => {
        console.log(result);
        if (result) {
          this.$loader.show();
          messageApi.deleteMessage(
            this.mutatableMessage.id,
            success => {
              console.log(JSON.stringify(success));
              this.$loader.hide();
              alert({
                title: localize("activity_message_deleted_title"),
                message: localize("activity_message_deleted_content"),
                okButtonText: localize("dialog_session_expire_ok")
              }).then(() => {
                this.$store.dispatch('refreshInbox')
                this.$navigateBack();
              });
            },
            error => {
              console.log(JSON.stringify(error));
              this.$loader.hide();
              alert({
                title: localize("activity_book_submit_failed_title"),
                message: localize("error_something_went_wrong"),
                okButtonText: localize("dialog_session_expire_ok")
              }).then(() => {});
            }
          );
        }
      });
    }
  }
};
</script>