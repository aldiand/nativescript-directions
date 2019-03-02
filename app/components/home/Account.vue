<template>
    <StackLayout orientation="vertical" width="100%" >
        <Label text="Account" textWrap="true" class="text-title"/>
        <DockLayout class="container-list">
            <Image src="~/assets/images/user.png" class="image-list" />           
            <Image dock="right" src="~/assets/images/next-doctor-profile.png" class="next-btn" horizontalAlligment="right" />
            <label :text="'fragment_settings_account'|L" textWrap="true" style="font-size:12pt;margin-top:50px;margin-left:20px" horizontalAlligment="stretch" /> 
        </DockLayout>
        <DockLayout class="container-list">
            <Image src="~/assets/images/info.png" class="image-list" />
            <Image dock="right" src="~/assets/images/next-doctor-profile.png" class="next-btn" horizontalAlligment="right" />
            <label :text="'fragment_settings_about'|L" textWrap="true" style="font-size:12pt;margin-top:50px;margin-left:20px" horizontalAlligment="stretch"/>
        </DockLayout>
        <DockLayout class="container-list">
                <Image src="~/assets/images/star.png" class="image-list" />
                <Image dock="right" src="~/assets/images/next-doctor-profile.png" class="next-btn" horizontalAlligment="right" />
                <label :text="'fragment_settings_rate'|L" textWrap="true" style="font-size:12pt;margin-top:50px;margin-left:20px" horizontalAlligment="stretch"/>
        </DockLayout>
    </StackLayout>
</template>

<style>
    .container-list{
        width: 100%;
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