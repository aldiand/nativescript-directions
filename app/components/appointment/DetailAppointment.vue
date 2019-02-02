<template>
    <Page class="page">
    <ActionBar flat="true" class="ActionBar">
        <NavigationButton text="Go Back" android.systemIcon="ic_menu_back"></NavigationButton>
        <Label :text="'fragment_myappointments_title' | L" fontSize="18" verticalAlignment="center" style="font-weight:bold;color:#03c1b8"/>
    </ActionBar>
    <ScrollView>
        <StackLayout style="background:#E1E1E1;">
            <DockLayout class="container-list">
                <Image src="~/assets/images/photo.png" class="image-profile"/>
                <StackLayout dock="left" orientation="vertical" style="padding:15px;" horizontalAlignment="stretch">
                    <Label textWrap="true" text="drg. Ami R., Sp, KG" style="font-weight:bold;color:#03c1b8;font-size:18pt;margin-bottom:10px"/>
                    <Label textWrap="true" text="Klinik Mitra" style="font-weight:bold;color:#828282;margin-bottom:10px"/>
                    <label textWrap="true" text="Jalan Tamansari No. 5 Bandung " style="font-size:12pt;margin-bottom:10px"/>
                </StackLayout>
            </DockLayout>
             <DockLayout class="container-list">
                <StackLayout dock="left" orientation="vertical" style="padding:20px;" horizontalAlignment="stretch">
                    <Label textWrap="true" :text="'starter_schedule_text'|L" verticalalAlignment="center"  />
                    <Label textWrap="true" text="Jum, 01 Feb 2019" horizontalAlignment="right" class="label-margin" style="font-weight:bold;color:#03c1b8;"/>
                    <label textWrap="true" text="10:00" horizontalAlignment="right"  style="font-weight:bold;color:#03c1b8"/>
                </StackLayout>
            </DockLayout>
             <DockLayout class="container-list">
                <StackLayout dock="left" orientation="vertical" style="padding:20px;" horizontalAlignment="stretch">
                    <Label textWrap="true" :text="'starter_location'|L" />
                    <Label textWrap="true" text="Jalan Tamansari No. 5 Bandung" class="label-margin" horizontalAlignment="right" style="font-weight:bold;color:#03c1b8"/>
                    <label textWrap="true" :text="'activity_book_see_location'|L"  horizontalAlignment="right" style="color:blue" />
                </StackLayout>
            </DockLayout>
             <DockLayout class="container-list">
                <StackLayout dock="left" orientation="vertical" style="padding:20px;" horizontalAlignment="stretch">
                    <Label textWrap="true" :text="'starter_status'|L" />
                    <Label :text="'fragment_myappointments_status_waiting_approval' | L" class="label-margin" textWrap="true" horizontalAlignment="right"/>
                </StackLayout>
            </DockLayout>
        </StackLayout>
    </ScrollView>
  </Page>
</template>


<script>
export default {
    props: {
        appointment: Object
    },
    methods: {
        
    },
};
</script>

<style>
 .container-list{
        background:#FFFFFF;
        width: 100%;
        padding:10px;
        margin-top:20px;
}
.ActionBar{
    background-color:#FFFFFF;
}
.image-profile{
    width:150px;
    height:150px;
    margin:15px;
}
.label-margin{
    margin-top:-40px;
}
</style>