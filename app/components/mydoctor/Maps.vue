<template>
  <Page class="page">
    <ActionBar class="action-bar" flat="true" :title="'starter_schedule_text' | L">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>
    <StackLayout>
      <StackLayout style="background:#E1E1E1; padding:20px;">
        <Label textWrap="true" :text="title" class="h5 label-main"/>
        <Label textWrap="true" :text="address" class="h6" style="font-weight:bold;"/>
      </StackLayout>
      <MapView
        :latitude="latitude"
        :longitude="longitude"
        :zoom="zoom"
        :minZoom="minZoom"
        :maxZoom="maxZoom"
        @mapReady="onMapReady"
      />
    </StackLayout>
  </Page>
</template>
<script>
import { MapView, Marker, Position } from "nativescript-google-maps-sdk";

export default {
  props: {
    title: String,
    address: String,
    longitude: Number,
    latitude: Number
  },
  methods: {
    onMapReady(event) {
      console.log("Map ready!");
      this.mapView = event.object;
      var marker = new Marker();
      marker.position = Position.positionFromLatLng(this.latitude, this.longitude);
      this.mapView.addMarker(marker);
    }
  },
  data() {
    return {
      zoom: 15,
      minZoom: 0,
      maxZoom: 22,
      bearing: 0,
      tilt: 0,
      mapView: undefined
    };
  }
};
</script>