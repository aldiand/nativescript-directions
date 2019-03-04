<template>
  <Page class="page">
    <AppBar :title="'starter_location' | L"/>
    <StackLayout>
      <StackLayout>
        <Label textWrap="true" :text="title" class="h5 label-main"/>
        <Label textWrap="true" :text="address" class="h6" style="font-weight:bold;"/>
      </StackLayout>
      <MapView
        :latitude="latitude"
        :longitude="longitude"
        :zoom="zoom"
        @mapReady="onMapReady"
      />
    </StackLayout>
  </Page>
</template>
<script>
import { Marker, Position } from "nativescript-google-maps-sdk";

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
      marker.position = Position.positionFromLatLng(
        this.latitude,
        this.longitude
      );
      if (this.$isIOS) {
        this.mapView.addMarker(marker);
      } else {
        this.mapView.addMarker(marker);
      }
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