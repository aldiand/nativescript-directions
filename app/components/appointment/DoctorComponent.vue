<template>
    
            <CardView class="cardStyle" margin="10" elevation="3" radius="1">
              <DockLayout class="container-list">
                <ImageCacheIt
                  resize="100,100"
                  stretch="fill"
                  :imageUri="image"
                  placeholder="~/assets/images/doctordefault.png"
                  errorHolder="~/assets/images/doctordefault.png"
                  class="text-primary image-profile"
                  style="width:100;height:100;margin:5px;"
                />
                <StackLayout
                  dock="left"
                  orientation="vertical"
                  style="padding:15px;"
                  horizontalAlignment="stretch"
                >
                  <Label
                    textWrap="true"
                    :text="doctor"
                    style="font-weight:bold;font-size:18pt;margin-bottom:10px;color:black;"
                  />
                  <Label
                    textWrap="true"
                    :text="clinic"
                    style="font-size:12pt;margin-bottom:10px;color:#03c1b8;font-weight:bold;"
                  />
                </StackLayout>
              </DockLayout>
            </CardView>
</template>

<script>
export default {
  props: {
    image: "",
    doctor: "",
    clinic: "",
  },
}
</script>