<template>
	<Page>
		<AppBar :back="false">
    </AppBar>
		<StackLayout iosOverflowSafeArea="false">
      <Label text="Skip" class="message" @tap="onTapSkip"></Label>
			<Pager height="100%" selectedIndex="0" ref="pager" showNativePageIndicator="true">
				<PagerItem style="background-image:url('~/assets/images/Group7.png'); background-size:cover;">
          <Label text=" "></Label>
					<DockLayout height="60%" style="padding:20px;" stretchLastChild="true">
            <Label text="Easy" class="titleMessage" dock="top" />
            <Label text="Meet your doctor in easy way" class="descMessage" dock="bottom"/>
            <image src="~/assets/images/clock-doctor-profile.png" dock="top"  class="imageMessage"/>
          </DockLayout>
				</PagerItem>
				<PagerItem style="background-image:url('~/assets/images/Group7.png'); background-size:cover;">
          <Label text=" "></Label>
					<DockLayout height="60%" style="padding:20px;" stretchLastChild="true">
            <Label text="Best" class="titleMessage" dock="top" />
            <Label text="Best doctor you can find" class="descMessage" dock="bottom"/>
            <image src="~/assets/images/stethoscope-doctor-profile.png" dock="top"  class="imageMessage"/>
          </DockLayout>
				</PagerItem>
				<PagerItem style="background-image:url('~/assets/images/Group7.png'); background-size:cover;">
          <Label text=" "></Label>
					<DockLayout height="60%" style="padding:20px;" stretchLastChild="true">
            <Label text="Consultation" class="titleMessage" dock="top" />
            <Label text="You can chat with doctor" class="descMessage" dock="bottom"/>
            <image src="~/assets/images/review-doctor-profile.png" dock="top"  class="imageMessage"/>
          </DockLayout>	
				</PagerItem>
			</Pager>
		</StackLayout>
	</Page>
</template>


<style scoped>
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
  .titleMessage{
		text-align: center;
		font-size: 36;
    font-family: sans-serif;
    font-weight: bold;
    opacity: 0.8;
		color: #53ba82;
  }
  .descMessage{
    text-align: center;
		font-size: 20;
    font-family: sans-serif;
    opacity: 0.8;
		color: #53ba82;
  }
  .imageMessage{
    width:20%;
  }

</style>

<script>
import Phone from "~/components/login/Phone";
	export default {
    methods: {
        onTapSkip(){
          this.$navigateTo(Phone, {
            transition: "slide",
            backstackVisible: false
          });
          console.log('boom');
      }
    }
  };
</script>