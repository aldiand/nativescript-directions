<template>
  <Page class="page">
    <AppBar :title="'fragment_reminders_title'|L"/>
    <StackLayout style="background-image:url('~/assets/images/Group7.png'); background-size:cover;">
      <AppEmptyView
        :text="'error_something_went_wrong' | L"
        v-bind:visibility="!error ? 'collapse': 'visible'"
        @refresh="loadData"
      />
      <AppLoadingView v-bind:visibility="busy ? 'visible' : 'collapse'"/>
      <ScrollView>
        <StackLayout>
          <DockLayout class="container-list">
            <ImageCacheIt
              resize="150,150"
              stretch="aspectFit"
              :imageUri="mutatableReminder.photo_profile"
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
                :text="mutatableReminder.doctor"
                style="font-weight:bold;color:#03c1b8;font-size:18pt;margin-bottom:10px"
              />
              <Label
                textWrap="true"
                :text="mutatableReminder.clinic"
                style="font-weight:bold;color:#828282;margin-bottom:10px"
              />
              <label
                textWrap="true"
                :text="mutatableReminder.address"
                style="font-size:12pt;margin-bottom:10px"
              />
            </StackLayout>
          </DockLayout>
          <DockLayout class="container-list">
            <StackLayout
              dock="left"
              orientation="vertical"
              style="padding:20px;"
              horizontalAlignment="stretch"
            >
              <Label
                textWrap="true"
                :text="'starter_schedule_text'|L"
                verticalalAlignment="center"
              />
              <Label
                textWrap="true"
                :text="getDate(mutatableReminder.date)"
                horizontalAlignment="right"
                class="label-margin"
                style="font-weight:bold;color:#03c1b8;"
              />
              <label
                textWrap="true"
                :text="mutatableReminder.time"
                horizontalAlignment="right"
                style="font-weight:bold;color:#03c1b8"
              />
            </StackLayout>
          </DockLayout>
          <DockLayout class="container-list">
            <StackLayout
              dock="left"
              orientation="vertical"
              style="padding:20px;"
              horizontalAlignment="stretch"
            >
              <Label :text="'starter_location'|L"/>
              <Label
                textWrap="true"
                :text="mutatableReminder.address"
                class="label-margin"
                horizontalAlignment="right"
                style="font-weight:bold;color:#03c1b8"
              />
              <label
                textWrap="true"
                :text="'activity_book_see_location'|L"
                horizontalAlignment="right"
                style="color:blue"
              />
            </StackLayout>
          </DockLayout>
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<style>
.container-list {
  background: #ffffff;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
}
.ActionBar {
  background-color: #ffffff;
}
.image-profile {
  width: 150px;
  height: 150px;
  margin: 15px;
}
.label-margin {
  margin-top: -40px;
}
</style>
<script>
import * as notification from "~/modules/notification.js";
import { reminderApi } from "~/modules/commonapi";
import * as dt from "../../modules/datetime";

export default {
  mounted() {
    if (this.id) {
      console.log("got id", this.id);
      setTimeout(() => {
        this.loadData();
      }, 0);
    } else {
      this.mutatableReminder = this.reminder;
    }
  },
  data() {
    return {
      mutatableReminder: {},
      error: false,
      busy: false
    };
  },
  props: {
    reminder: Object,
    id: "",
    notificationType: String
  },
  methods: {
    getDate(stringDate) {
      return dt.dateToLongDate(stringDate);
    },
    loadData() {
      this.busy = true;
      this.error = false;
      var type = "";
      if (this.notificationType == notification.TREATMENT_REMINDER) {
        type = "reminders";
      } else if (this.notificationType == notification.TREATMENT_RECALL) {
        type = "recall";
      }
      reminderApi.getReminderById(
        this.id,
        type,
        success => {
          console.log(success.data);
          this.mutatableReminder = success.data;
          this.busy = false;
        },
        error => {
          this.busy = false;
          this.error = true;
        }
      );
    }
  }
};
</script>