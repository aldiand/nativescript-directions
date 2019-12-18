<template>
  <StackLayout>
    <DockLayout class="container-list"
        padding="5"
        verticalAlignment="center">
      <ImageCacheIt
        resize="100,100"
        stretch="fill"
        :imageUri="item.photo_profile"
        placeholder="~/assets/images/doctordefault.png"
        errorHolder="~/assets/images/doctordefault.png"
        class="text-primary image-profile"
        style="width:100;height:100;margin:10px;"
      />

      <StackLayout
        dock="left"
        orientation="vertical"
        horizontalAlignment="stretch"
        margin="5"
        style="padding: 10"
      >
        <Label
          :text="item.doctor"
          textWrap="true"
          style="font-weight:bold;color:#4F4F4F;font-size:18pt;"
        />
        <Label
          :text="item.clinic"
          textWrap="true"
          style="font-size:16pt;color:#828282;margin-top:2px"
        />
        <Label
          :text="item.date"
          textWrap="true"
          class="text-primary"
          style="font-size:14pt;margin-top:2px"
        />
        <Label
          :text="item.time"
          textWrap="true"
          class="text-primary"
          style="font-size:14pt;margin-top:2px"
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
  padding: 10px;
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