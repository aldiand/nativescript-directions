<template>
  <Page class="page">
    <ActionBar class="action-bar2" flat="true" title="Doctor Profile">
        <NavigationButton text="Go Back" android.systemIcon="ic_menu_back"></NavigationButton>
        <ActionItem tap="onDelete" ios.systemIcon="16" ios.position="right" text="Test" android.position="popup" style="color:#FFFFFF;" ></ActionItem>
        <ActionItem tap="onDelete" ios.systemIcon="16" ios.position="right" text="Test" android.position="popup" style="color:#FFFFFF;" ></ActionItem>
    </ActionBar>
    <ScrollView>
        <StackLayout style="background:#E1E1E1;">
            <AbsoluteLayout>
                <Image src="~/assets/images/header.jpg" height="400px" left="0" top="0"/>
                <Label style="background-color:rgba(0,0,0,0.5);" width="100%" height="400px" left="0" top="0"/>
            </AbsoluteLayout>
            <StackLayout style="padding:10px;margin-top:-85px;margin-bottom:20px;" orientation="horizontal">
                <Image src="~/assets/images/person-flat.png" class="image-profile"/>
                <StackLayout orientation="vertical" verticalAlignment="Bottom" style="padding:10px;">
                    <Label textWrap="true" text="Dokter Gigi" class="text-label" style="color:#FFFFFF;font-weight:bold;"/>
                    <Label textWrap="true" text="drg. Ami R, Sp. KG" class="description-label" style="font-weight:bold;"/>
                    <Label textWrap="true" text="Klinik Mitra" class="text-label"/>
                </StackLayout>
            </StackLayout>
            <DockLayout class="container-list">
                <Image dock="left" src="~/assets/images/marker-doctor-profile.png" class="image-list"/>
                <StackLayout dock="left" orientation="vertical" style="padding:20px;" horizontalAlignment="stretch">
                    <Label textWrap="true" :text="'starter_location'|L" class="description-label label-title"/>
                    <Label textWrap="true" :text="'Jalan Tamansari'|L" class="description-label" style="font-size:12pt"/>
                </StackLayout>
                <Image dock="right" src="~/assets/images/next-doctor-profile.png" class="next-btn" horizontalAlignment="right"/>
            </DockLayout>
            <DockLayout class="container-list">
                <Image dock="left" src="~/assets/images/clock-doctor-profile.png" class="image-list"/>
                <StackLayout dock="left" orientation="vertical" style="padding:20px;" horizontalAlignment="stretch">
                    <Label textWrap="true" :text="'starter_schedule_text'|L" class="description-label label-title"/>
                    <Label textWrap="true" :text="'Buka sekarang'|L" class="description-label" style="font-size:12pt"/>
                </StackLayout>
                <Image dock="right" src="~/assets/images/next-doctor-profile.png" class="next-btn" horizontalAlignment="right"/>
            </DockLayout>
            <DockLayout class="container-list">
                <Image dock="left" src="~/assets/images/stethoscope-doctor-profile.png" class="image-list"/>
                <StackLayout dock="left" orientation="vertical" style="padding:20px;" horizontalAlignment="stretch">
                    <Label textWrap="true" :text="'starter_service_text'|L" class="description-label label-title"/>
                    <Label textWrap="true" :text="'error_no_information_available'|L" class="description-label" style="font-size:12pt"/>
                </StackLayout>
                <Image dock="right" src="~/assets/images/next-doctor-profile.png" class="next-btn" horizontalAlignment="right"/>
            </DockLayout>
            <DockLayout class="container-list" >
                <Image dock="left" src="~/assets/images/review-doctor-profile.png" class="image-list"/>
                <Image dock="right" src="~/assets/images/next-doctor-profile.png" class="next-btn" horizontalAlignment="right"/>
                <StackLayout dock="top" orientation="horizontal" style="padding:20px;" horizontalAlignment="stretch">
                    <Label textWrap="true" :text="'starter_review_text'|L" class="description-label label-title" style="margin-right:20px;"/>
                    <Image  src="~/assets/images/star-review-doctor-profile.png" class="star-review"/>
                    <Image  src="~/assets/images/star-review-doctor-profile.png" class="star-review"/>
                    <Image  src="~/assets/images/star-review-doctor-profile.png" class="star-review"/>
                    <Image  src="~/assets/images/star-review-doctor-profile.png" class="star-review"/>
                    <Image  src="~/assets/images/star-review-doctor-profile.png" class="star-review"/>
                </StackLayout>
            </DockLayout>
            <StackLayout verticalAlignment="bottom">
                <Button 
                class="app-btn btn btn-primary" 
                :text="'activity_message_book'|L" 
                style="border-radius:10px;" />
            </StackLayout>
        </StackLayout>
    </ScrollView>
  </Page>
</template>

<style>
    .text-label{
        font-size: 12pt;
    }
    .action-bar-docto-profile{
        color:#FFFFFF;
        background-color:rgba(0,0,0,0.1);
    }
    .label-title{
        font-weight:bold;
        color:#03c1b8;
        font-size:12pt;
    }
    .star-review{
        width:30px;
        margin-top:-15px;
    }
    .image-profile{
        width:120px; 
        margin:20px;
    }
    .container-list{
        background:#FFFFFF;
        width: 100%;
        padding:20px;
        margin-bottom:15px;
    }
    .container-btn-janji{
        background:#878787;
        z-index: 1;
    }
    .next-btn{
        width:30px;
        margin:10px;
    }
    .image-list{
        width:50px;
        margin:20px;
    }
</style>


<script>
export default {
    props: {
        doctor: Object
    },
    methods: {
        
    },
};
</script>