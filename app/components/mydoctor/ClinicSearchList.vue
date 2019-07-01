<template>
    <CardView margin="10" elevation="5" radius="1" >
    <StackLayout class="p-10">
        <DockLayout class="container-list p-l-15">
        <ImageCacheIt
            stretch="aspectFit"
            :imageUri="item.photo"
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
            :text="item.name"
            textWrap="true"
            height="20"
            style="font-weight:bold;color:#4F4F4F;font-size:14pt;margin-top:2px"
            />
            <Label
            :text="'doctor_count' | L(item.doctors_count)"
            textWrap="true"
            class="text-main"
            style="font-size:14pt;margin-top:2px;color:#4F4F4F"
            />
            <StackLayout orientation="horizontal">
                <Label
                :text="item.reviews_rating ? item.reviews_rating.toFixed(1) : 0"
                textWrap="true"
                class="text-main"
                style="font-size:14pt;color:#4F4F4F;margin-top:2px"
                />
                <Label
                :text="'review_count' | L(item.reviews_count)"
                textWrap="true"
                class="text-main m-l-5"
                style="font-size:14pt;color:#4F4F4F;margin-top:2px"
                />
                
            </StackLayout>
        </StackLayout>
        </DockLayout>
    </StackLayout>
    </CardView>
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
