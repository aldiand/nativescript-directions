<template>
    <StackLayout>
        <DockLayout class="container-list">
            <Image :src="item.photo_profile" class="text-primary" style="width:150px;height:150px;margin:5px;"/>
            <StackLayout dock="left" orientation="vertical" style="padding:15px;" horizontalAlignment="stretch">
                <Label :text="item.doctor" textWrap="true" style="font-weight:bold;font-size:14pt;margin-top:12px"/>
                <Label :text="item.clinic" textWrap="true" style="font-size:12pt;color:#828282;margin-top:2px"/>
                <Label :text="item.date" textWrap="true" class="text-primary" style="font-size:12pt;margin-top:2px"/>
                <Label :text="item.time" textWrap="true" class="text-primary" style="font-size:12pt;margin-top:2px"/>
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
</style>