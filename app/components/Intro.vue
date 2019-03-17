<template>
  <Page actionBarHidden="true">
    <StackLayout iosOverflowSafeArea="false" style="background-color:#015a52" padding=10>
      <Pager height="80%" selectedIndex="0" ref="pager" showNativePageIndicator="true">
        <PagerItem>
          <Label text=" "></Label>
          <DockLayout height="80%" style="padding:20px;" stretchLastChild="true">
            <Label :text="'activity_intro_find_doctor_title' | L" class="titleMessage" dock="top" textWrap="true"/>
            <Label
              :text="'activity_intro_find_doctor_content' | L"
              class="descMessage"
              dock="bottom" textWrap="true"
            />
            <image
              src="~/assets/images/doctordefault.png"
              dock="top"
              class="imageMessage"
            ></image>
          </DockLayout>
        </PagerItem>
        <PagerItem>
          <Label text=" "></Label>
          <DockLayout height="80%" style="padding:20px;" stretchLastChild="true">
            <Label :text="'activity_intro_book_title' | L" class="titleMessage" dock="top" textWrap="true"/>
            <Label :text="'activity_intro_book_content' | L" class="descMessage" dock="bottom" textWrap="true"/>
            <image
              src="~/assets/images/ic_no_appointment.png"
              dock="top"
              class="imageMessage"
            ></image>
          </DockLayout>
        </PagerItem>
        <PagerItem>
          <Label text=" "></Label>
          <DockLayout height="80%" style="padding:20px;" stretchLastChild="true">
            <Label :text="'activity_intro_stay_healthy_title' | L" class="titleMessage" dock="top" textWrap="true"/>
            <Label :text="'activity_intro_stay_healthy_content' | L" class="descMessage" dock="bottom" textWrap="true"/>
            <image src="~/assets/images/ic_reminder_new.png"  dock="top" class="imageMessage"></image>
          </DockLayout>
        </PagerItem>
      </Pager>
      <Button :text="'sign_in' | L" class="skip-intro" @tap="onTapSkip"></Button>
    </StackLayout>
  </Page>
</template>


<style scoped>
.skip-intro {
  width: 45%;
  font-size: 18;
  background-color: #ffffff;
  color: #0c7da7;
  border-radius: 4;
  padding: 9 17;
}

.opensans-regular {
  font-family: "Open Sans", "OpenSans-Regular";
  font-weight: 400;
}
AppBar {
  background-color: #ffffff;
}
.message {
  vertical-align: center;
  text-align: right;
  font-size: 15;
  font-family: sans-serif;
  font-weight: bold;
  opacity: 0.5;
  color: #53ba82;
  padding-right: 40px;
}
.titleMessage {
  text-align: center;
  font-size: 36;
  font-family: sans-serif;
  font-weight: bold;
  opacity: 0.8;
  color: white;
}
.descMessage {
  text-align: center;
  font-size: 20;
  font-family: sans-serif;
  opacity: 0.8;
  color: white;
}
.imageMessage {
  width: 20%;
}
</style>

<script>
import Phone from "~/components/login/Phone";
import { setBoolean } from "application-settings";
export default {
  methods: {
    onTapSkip() {
      this.$navigateTo(Phone, {
        transition: "slide",
        backstackVisible: false
      });
      setBoolean("isFirst", false);
      console.log("boom");
    }
  }
};
</script>