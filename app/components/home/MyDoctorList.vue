<template>
  <StackLayout>
    <DockLayout class="container-list p-l-15">
      <ImageCacheIt
        stretch="aspectFit"
        :imageUri="item.photo_profile"
        placeholder="~/assets/images/doctordefault.png"
        errorHolder="~/assets/images/doctordefault.png"
        resize='200,200'
        style="width:200px;height:200px;margin:5px;"
      /> 
      <StackLayout
        dock="left"
        orientation="vertical"
        style="padding:15px;"
        horizontalAlignment="stretch"
      >
        <Label
          :text="item.profile_name"
          textWrap="true"
          style="font-weight:bold;color:#4F4F4F;font-size:20pt;margin-top:2px"
        />
        <Label
          :text="item.type"
          textWrap="true"
          class="text-primary"
          style="font-size:14pt;margin-top:12px"
        />
        <Label :text="item.doctor_id" visibility="collapse" textWrap="true"/>
        <Label
          :text="item.clinic_name"
          textWrap="true"
          class="text-primary"
          style="font-size:14pt;color:#4F4F4F;margin-top:2px"
        />
      </StackLayout>
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
