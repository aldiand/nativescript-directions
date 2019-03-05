<template>
  <Page class="page">
    <AppBar :title="'fragment_myappointments_title'|L"/>
    <StackLayout style="background-image:url('~/assets/images/Group7.png'); background-size:cover;">
      <ScrollView>
        <StackLayout>
          <DockLayout class="container-list">
            <ImageCacheIt
              resize="150,150"
              stretch="aspectFit"
              :imageUri="appointment.photo_profile"
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
                :text="appointment.doctor"
                style="font-weight:bold;color:#03c1b8;font-size:18pt;margin-bottom:10px"
              />
              <Label
                textWrap="true"
                :text="appointment.clinic"
                style="font-weight:bold;color:#828282;margin-bottom:10px"
              />
              <label
                textWrap="true"
                :text="appointment.address"
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
                :text="getDate(appointment.date)"
                horizontalAlignment="right"
                class="label-margin"
                style="font-weight:bold;color:#03c1b8;"
              />
              <label
                textWrap="true"
                :text="appointment.time"
                horizontalAlignment="right"
                style="font-weight:bold;color:#03c1b8"
              />
            </StackLayout>
          </DockLayout>
          <DockLayout class="container-list" style="padding:20px;">
            <Label textWrap="true" dock="left" :text="'starter_location'|L"/>
            <Label
              dock="top"
              textWrap="true"
              :text="appointment.address"
              horizontalAlignment="right"
              style="font-weight:bold;color:#03c1b8;"
            /> 
            <label
              @tap="onLocationClick"
              dock="right"
              textWrap="true"
              :text="'activity_book_see_location'|L"
              horizontalAlignment="right"
              style="color:blue;"
              marginT op="3"
            />
          </DockLayout>
          <DockLayout class="container-list" stretchLastChild="true">
            <StackLayout
              dock="left"
              orientation="vertical"
              style="padding:20px;"
              horizontalAlignment="stretch"
            >
              <Label textWrap="true" :text="'starter_status'|L"/>
              <Label
                :text="appointment.status"
                class="label-margin"
                textWrap="true"
                horizontalAlignment="right"
              />
              <!-- <Label :text="'fragment_myappointments_status_waiting_approval' | L" class="label-margin" textWrap="true" horizontalAlignment="right"/> -->
            </StackLayout>
          </DockLayout>
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>


<script>
import * as dt from "../../modules/datetime";
import { device } from "tns-core-modules/platform";
import Maps from "~/components/mydoctor/Maps";
var Directions = require("nativescript-directions").Directions;

export default {
  props: {
      selectedTime: String,
      selectedService: String,
  },
  methods: {
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