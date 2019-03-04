<template>
  <Page class="page">
    <ActionBar flat="true" class="ActionBar">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back"></NavigationButton>
      <Label
        :text="'fragment_myappointments_title' | L"
        fontSize="18"
        verticalAlignment="center"
        style="font-weight:bold;color:#03c1b8"
      />
    </ActionBar>
    <ScrollView>
      <StackLayout style="background:#E1E1E1;">
        <DockLayout class="container-list">
          <ImageCacheIt
            stretch="aspectFit"
            :imageUri="reminder.photo_profile"
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
              :text="reminder.doctor"
              style="font-weight:bold;color:#03c1b8;font-size:18pt;margin-bottom:10px"
            />
            <Label
              textWrap="true"
              :text="reminder.clinic"
              style="font-weight:bold;color:#828282;margin-bottom:10px"
            />
            <label
              textWrap="true"
              :text="reminder.address"
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
            <Label textWrap="true" :text="'starter_schedule_text'|L" verticalalAlignment="center"/>
            <Label
              textWrap="true"
              :text="getDate(reminder.date)"
              horizontalAlignment="right"
              class="label-margin"
              style="font-weight:bold;color:#03c1b8;"
            />
            <label
              textWrap="true"
              :text="reminder.time"
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
              :text="reminder.address"
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
  </Page>
</template>


<script>
import * as dt from "../../modules/datetime";
import { device } from "tns-core-modules/platform";

export default {
  mounted() {},
  props: {
    appointment: Object
  },
  methods: {
    getDate(stringDate) {
      return dt.dateToLongDate(stringDate);
    }
  }
};
</script>

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
export default {
    props: {
        reminder: Object
    },
    methods: {
        
    },
};
</script>