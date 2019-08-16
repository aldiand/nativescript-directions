<template>
  <StackLayout>
    <DockLayout class="container-list">
      <ImageCacheIt
        stretch="aspectFit"
        resize="150,150"
        :imageUri="item.photo_profile"
        placeholder="~/assets/images/doctordefault.png"
        errorHolder="~/assets/images/doctordefault.png"
        class="text-primary image-profile"
        style="width:150px;height:150px;margin:5px;"
      />

      <StackLayout
        dock="left"
        orientation="vertical"
        style="padding:15px;"
        horizontalAlignment="stretch"
      >
        <Label
          :text="item.doctor"
          class="text-primary"
          style="font-weight:bold;font-size:14pt;margin-top:12px"
        />
        <Label
          :text="item.clinic"
          class="text-primary"
          style="font-size:12pt;color:#828282;margin-top:2px"
        />
        <Label :text="item.date" class="text-primary" style="font-size:12pt;margin-top:2px"/>
        <Label v-if="item.time !== '00:00:00'" :text="item.time" class="text-primary" style="font-size:12pt;margin-top:2px"/>
        <Label :text="item.appointment_id" visibility="collapse" class="text-primary"/>
      </StackLayout>
      <Image
        dock="right"
        src="~/assets/images/next-doctor-profile.png"
        class="next-btn"
        horizontalAlignment="right"
      />
    </DockLayout>
  </StackLayout>
</template>

<script>
export default {
  props: {
    item: {}
  }
};
</script>

<style>
.container-list {
  width: 100%;
  padding: 8px;
}

.image-profile {
  width: 150px;
  height: 150px;
  margin: 15px;
}

.next-btn {
  width: 30px;
  margin: 5px;
}
</style>