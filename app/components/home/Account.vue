<template>
    <StackLayout orientation="vertical" width="100%" >
        <Label text="Account" textWrap="true" class="text-title"/>
        <DockLayout class="container-list" @tap="onAccountClick">
            <Image src="~/assets/images/user.png" class="image-list" />           
            <Image dock="right" src="~/assets/images/next-doctor-profile.png" class="next-btn" horizontalAligment="right" />
            <label :text="'fragment_settings_account'|L" textWrap="true" style="vertical-align: middle;font-size:12pt;margin-left:20px" verticalALignment="center" horizontalAligment="stretch" /> 
        </DockLayout>
        <DockLayout class="container-list" @tap="onAboutClick">
            <Image src="~/assets/images/info.png" class="image-list" />
            <Image dock="right" src="~/assets/images/next-doctor-profile.png" class="next-btn" horizontalAligment="right" />
            <label :text="'fragment_settings_about'|L" textWrap="true" style="vertical-align: middle;font-size:12pt;margin-left:20px" horizontalAligment="stretch"/>
        </DockLayout>
        <DockLayout class="container-list">
                <Image src="~/assets/images/star.png" class="image-list" />
                <Image dock="right" src="~/assets/images/next-doctor-profile.png" class="next-btn" horizontalAligment="right" />
                <label dock="left" :text="'fragment_settings_rate'|L" textWrap="true" verticalALignment="center" style="vertical-align: middle;font-size:12pt;margin-left:20px" horizontalAligment="stretch"/>
        </DockLayout>
    </StackLayout>
</template>

<script>
import EditProfile from "~/components/login/EditProfile";
import AboutReadyDok from "~/components/home/AboutReadyDok";

export default {
    methods: {
        onAboutClick(){
            console.log("AboutReadyDok clicked");
                this.$navigateTo(AboutReadyDok, {
                transition: "slide"
            });
        },

         onAccountClick(){
            console.log("Account clicked");
                this.$navigateTo(EditProfile, {
                transition: "slide"
            });
        }
    
    }
}
</script>
 
<style>
    .container-list{
        width: 100%;
        margin-left:10px;
        margin-right:10px;
        padding:10px;   
        background : #ffffff
    }
    .next-btn {
        width: 30px;
        margin: 10px;
    }
    .image-list{
        width: 85px;
        margin: 20px;
    }
</style>