<template>
  <Page class="page">
    <ActionBar class="action-bar2" backgroundColor="#03c1b8">
      <StackLayout orientation="horizontal">
        <Label :text="'Edit Profile'|L" fontSize="24" verticalAlignment="center"/>
      </StackLayout>
    </ActionBar>
    <ScrollView>
      <StackLayout
        class="parent-container"
        marginTop="15"
        marginLeft="15"
        marginRight="15"
        marginBottom="15"
      >
        <StackLayout
          orientation="vertical"
          marginTop="15"
          marginLeft="15"
          marginRight="15"
          marginBottom="15"
        >
          <Label text="Nama Depan"/>
          <TextField v-model="userProfile.first_name"/>
        </StackLayout>
        <StackLayout
          orientation="vertical"
          marginTop="15"
          marginLeft="15"
          marginRight="15"
          marginBottom="15"
        >
          <Label text="Nama Belakang"/>
          <TextField v-model="userProfile.last_name"/>
        </StackLayout>
        <StackLayout
          orientation="vertical"
          marginTop="15"
          marginLeft="15"
          marginRight="15"
          marginBottom="15"
        >
          <Label text="Jenis Kelamin"/>
          <ListPicker :items="listPickerGender" v-model="selectedGenderIndex"/>
        </StackLayout>
        <StackLayout
          orientation="vertical"
          marginTop="15"
          marginLeft="15"
          marginRight="15"
          marginBottom="15"
        >
          <Label text="Lokasi"/>
          <ListPicker :items="listPickerLocation" v-model="selectedLocationIndex"/>
        </StackLayout>
        <StackLayout
          orientation="vertical"
          marginTop="15"
          marginLeft="15"
          marginRight="15"
          marginBottom="15"
        >
          <Label text="Email"/>
          <TextField v-model="userProfile.email"/>
        </StackLayout>
        <StackLayout style="margin-top:30;">
          <Button
            text="Selesai"
            @tap="onSubmit"
            class="app-btn btn btn-primary"
            v-bind:visibility="busy ? 'collapse': 'visible'"
            backgroundColor="#03c1b8"
          ></Button>
          <ActivityIndicator class="activity-indicator" v-bind:busy="busy"></ActivityIndicator>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import * as store from "../../modules/store";

export default {
  data() {
    return {
      listPickerGender: ["Laki-laki", "Perempuan"],
      listPickerLocation: ["Jakarta", "Bandung"],
      selectedGenderIndex: 0,
      selectedLocationIndex: 0,
    busy: false,

      userProfile: {
        first_name : "",
        last_name: "",
        gender: String,
        location: String,
        phone: String,
        fcm_token: String,
        language: String,
        email: ""
      }
    };
  },

  mounted() {
    this.$http.get(
      "/user/" + store.get(store.USER_ID),
      content => {
        let responsePayload = content.content;
        this.userProfile = responsePayload;

      },
      error => {}
    );
  },

  methods: {
      onSubmit() {

      }
  },
};
</script>

<style scoped>
</style>