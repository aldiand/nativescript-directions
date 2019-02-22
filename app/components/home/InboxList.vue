<template>
    <StackLayout>
        <DockLayout class="container-list">
                        <ImageCacheIt stretch="aspectFit" :imageUri="item.doctor_photo? item.doctor_photo : item.clinic_photo"  placeHolder="~/assets/images/doctordefault.png" errorHolder="~/assets/images/doctordefault.png" class="text-primary image-profile" style="width:150px;height:150px;margin:5px;"/>
            <StackLayout dock="left" orientation="vertical" style="padding:15px;" horizontalAlignment="stretch">
                <Label :text="item.clinic_name == '' ? item.doctor_name : item.clinic_name" style="font-weight:bold;font-size:14pt;margin-top:12px"/>
                <!-- <Label :text="item.message" class="text-primary" style="font-size:12pt;margin-top:8px"/> -->
                <Label :text="item.title" class="text-primary"/>        
            </StackLayout>
        <Image dock="right" src="~/assets/images/next-doctor-profile.png" class="next-btn" horizontalAlignment="right" />
        </DockLayout>
    </StackLayout>
</template>

<script>
export default {
    props: {
        item : {}
    }
};
</script>

<style>
.container-list{
        width: 100%;
        padding:10px;   
}

.image-profile{
    width:150px;
    height:150px;
    margin:15px;
}

.next-btn {
  width: 30px;
  margin: 5px;
}