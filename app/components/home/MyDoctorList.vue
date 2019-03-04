<template>
  <StackLayout>
    <DockLayout class="container-list">
      <ImageCacheIt
        stretch="aspectFit"
        :imageUri="item.photo_profile"
        placeholder="~/assets/images/doctordefault.png"
        errorHolder="~/assets/images/doctordefault.png"
        class="text-primary image-profile"
        resize='150,150'
        style="width:150px;height:150px;margin:5px;"
      /> 
      <StackLayout
        dock="left"
        orientation="vertical"
        style="padding:15px;"
        horizontalAlignment="stretch"
      >
        <Label
          :text="item.type"
          textWrap="true"
          class="text-primary"
          style="font-size:12pt;margin-top:12px"
        />
        <Label
          :text="item.profile_name"
          textWrap="true"
          style="font-weight:bold;font-size:14pt;margin-top:2px"
        />
        <Label :text="item.doctor_id" visibility="collapse" textWrap="true"/>
        <Label
          :text="item.clinic_name"
          textWrap="true"
          class="text-primary"
          style="font-size:12pt;color:#828282;margin-top:2px"
        />
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
