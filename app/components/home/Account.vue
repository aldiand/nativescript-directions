<template>
  <Page class="page">
  <StackLayout orientation="vertical" width="100%">
    <Label text="Account" textWrap="true" class="text-title"/>
    <DockLayout class="container-list m-y-15" @tap="onAccountClick">
      <Image src="~/assets/images/user.png" class="image-list"/>
      <Image
        dock="right"
        src="~/assets/images/next-doctor-profile.png"
        class="next-btn"
        horizontalAligment="right"
      />
      <label
        :text="'fragment_settings_account'|L"
        textWrap="true"
        style="vertical-align: middle;font-size:14pt;margin-left:20px"
        verticalALignment="center"
        horizontalAligment="stretch"
      />
    </DockLayout>
    <DockLayout class="container-list m-y-15" @tap="onAboutClick">
      <Image src="~/assets/images/info.png" class="image-list"/>
      <Image
        dock="right"
        src="~/assets/images/next-doctor-profile.png"
        class="next-btn"
        horizontalAligment="right"
      />
      <label
        :text="'fragment_settings_about'|L"
        textWrap="true"
        style="vertical-align: middle;font-size:14pt;margin-left:20px"
        horizontalAligment="stretch"
      />
    </DockLayout>
    <DockLayout class="container-list m-y-15" @tap="onRateAppClick">
      <Image src="~/assets/images/star.png" class="image-list"/>
      <Image
        dock="right"
        src="~/assets/images/next-doctor-profile.png"
        class="next-btn"
        horizontalAligment="right"
      />
      <label
        dock="left"
        :text="'fragment_settings_rate'|L"
        textWrap="true"
        verticalALignment="center"
        style="vertical-align: middle;font-size:14pt;margin-left:20px"
        horizontalAligment="stretch"
      />
    </DockLayout>
  </StackLayout>
  </Page>
</template>

<script>
import EditProfile from "~/components/login/EditProfile";
import AboutReadyDok from "~/components/home/AboutReadyDok";
import * as application from "application";
import * as Utility from "utils/utils";

export default {
  methods: {
    onAboutClick() {
      console.log("AboutReadyDok clicked");
      this.$navigateTo(AboutReadyDok, {
        transition: "slide"
      });
    },

    onAccountClick() {
      console.log("Account clicked");
      this.$navigateTo(EditProfile, {
        transition: "slide"
      });
    },

    onRateAppClick() {
      console.log("onRateAppClick clicked");
      if (this.$isAndroid) {
          this.gotoPlayStore();
      }
    },
    gotoPlayStore() {
      let androidPackageName = application.android.packageName;
      let uri = android.net.Uri.parse(
        "market://details?id=" + androidPackageName
      );
      let myAppLinkToMarket = new android.content.Intent(
        android.content.Intent.ACTION_VIEW,
        uri
      );
      // Launch the PlayStore
      application.android.foregroundActivity.startActivity(myAppLinkToMarket);
    },
    gotoAppStore() {
      let appStore = "";
      appStore = "itms-apps://itunes.apple.com/en/app/id" + myAppId;
      Utility.openUrl(appStore);
    }
  }
};
</script>
 
<style scoped>
.container-list {
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;
  padding: 16;
  background: #ffffff;
}
.next-btn {
  width: 30px;
  margin: 10px;
}
.image-list {
  width: 85px;
  margin: 20px;
}
</style>