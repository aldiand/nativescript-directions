<template>
  <Page actionBarHidden="true">
    <StackLayout iosOverflowSafeArea="false"
        style="background-image:url('~/assets/images/intro_bg.png'); background-position: center; background-size:cover;"
        height="100%" padding=10>
      <StackLayout >
        
        <label :text="'sign_in' | L" textWrap="false" @tap="onTapSkip" horizontalAlignment="right" class="sign-in-btn" height="5%"/>
      </StackLayout>
      <Pager height="80%" :selectedIndex="pageIndex" @selectedIndexChange="onIndexChange" ref="pager" showNativePageIndicator="true">
        <PagerItem>
          <Label text=" "></Label>
          <DockLayout stretchLastChild="true" class="pager-item">
            <Label :text="'activity_intro_find_doctor_title' | L" class="titleMessage" dock="top" textWrap="true"/>
            <Label
              :text="'activity_intro_find_doctor_content' | L"
              class="descMessage"
              dock="bottom" textWrap="true"
            />
            <image
              src="~/assets/images/intro_doctor.png"
              dock="top"
              class="imageMessage"
            ></image>
          </DockLayout>
        </PagerItem>
        <PagerItem>
          <Label text=" "></Label>
          <DockLayout stretchLastChild="true" class="pager-item">
            <Label :text="'activity_intro_book_title' | L" class="titleMessage" dock="top" textWrap="true"/>
            <Label :text="'activity_intro_book_content' | L" class="descMessage" dock="bottom" textWrap="true"/>
            <image
              src="~/assets/images/intro_appoinment.png"
              dock="top"
              class="imageMessage"
            ></image>
          </DockLayout>
        </PagerItem>
        <PagerItem>
          <Label text=" "></Label>
          <DockLayout class="pager-item">
            <Label :text="'activity_intro_stay_healthy_title' | L" class="titleMessage" dock="top" textWrap="true"/>
            <Label :text="'activity_intro_stay_healthy_content' | L" class="descMessage" dock="bottom" textWrap="true"/>
            <image src="~/assets/images/intro_health.png"  dock="top" class="imageMessage"></image>
          </DockLayout>
        </PagerItem>
        <PagerItem>
          <Label text=" "></Label>
          <DockLayout class="pager-item">
            <Label :text="'activity_intro_keep_in_touch_title' | L" class="titleMessage" dock="top" textWrap="true"/>
            <Label :text="'activity_intro_keep_in_touch_content' | L" class="descMessage" dock="bottom" textWrap="true"/>
            <image src="~/assets/images/intro_keep_in_touch.png"  dock="top" class="imageMessage"></image>
          </DockLayout>
        </PagerItem>
      </Pager>
      <StackLayout height="10%" orientation="horizontal" horizontalAlignment="center" >
          <StackLayout v-for="n in 4" :key="n" v-bind:class="getClass(n)" verticalAlignment="center" col="0" ></StackLayout>
      </StackLayout>
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
  opacity: 1;
  color: #00C1C0;
}
.descMessage {
  text-align: center;
  font-size: 20;
  font-family: sans-serif;
  font-weight: bold;
  opacity: 1;
  color: white;
  padding: 10;
}
.imageMessage {
  width: 40%;
  vertical-align: top;
  margin-top: 40;
}
.sign-in-btn {
  font-size: 18;
  font-family: sans-serif;
  opacity: 1;
  color: #00C1C0;
  padding: 5;
  border-color: #03c1b8;
  border-width: 1;
  border-radius: 10;
}
.caro-item-dot {
    background: #FFFFFF;
    border-radius: 6;
    height: 12;
    width: 12;
    margin: 8;
}

.caro-item-dot-selected {
    opacity: .3;
}

.pager-item {
  height: 100%;

}
</style>

<script>
import Phone from "~/components/login/Phone";
import { setBoolean } from "application-settings";
export default {
  data() {
    return {
      pageIndex: 0,
    }
  },
  methods: {
    onTapSkip() {
      this.$navigateTo(Phone, {
        transition: "slide",
        backstackVisible: false,
        clearHistory:true
      });
      setBoolean("isFirst", false);
      console.log("boom");
    },
    getClass(item) {
      console.log("get cass carousel ", item, this.pageIndex)
        if (item-1 == this.pageIndex)
            return "caro-item-dot caro-item-dot-selected";
        return "caro-item-dot";
    },
    onIndexChange(event) {
      this.pageIndex = event;
    }
  }
};
</script>
