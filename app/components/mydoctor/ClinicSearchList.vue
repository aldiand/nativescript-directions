<template>
    <CardView margin="2" elevation="5" radius="1" >
    <StackLayout class="p-10">
        <DockLayout class="container-list p-l-15">
        <ImageCacheIt
            stretch="aspectFit"
            :imageUri="item.photo"
            placeholder="~/assets/images/doctordefault.png"
            errorHolder="~/assets/images/doctordefault.png"
            resize='75,75'
            style="width:75;height:75;margin:5;"
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
                <StackLayout orientation="horizontal"
                v-if="item.reviews_count != 0 ">
                      
                  <Image
                    v-if="item.reviews_rating >= 0.5"
                    src="~/assets/images/star-review-doctor-profile.png"
                    class="star-review"
                  />
                  <Image
                    v-if="item.reviews_rating >= 1.5"
                    src="~/assets/images/star-review-doctor-profile.png"
                    class="star-review"
                  />
                  <Image
                    v-if="item.reviews_rating >= 2.5"
                    src="~/assets/images/star-review-doctor-profile.png"
                    class="star-review"
                  />
                  <Image
                    v-if="item.reviews_rating >= 3.5"
                    src="~/assets/images/star-review-doctor-profile.png"
                    class="star-review"
                  />
                  <Image
                    v-if="item.reviews_rating >= 4.5"
                    src="~/assets/images/star-review-doctor-profile.png"
                    class="star-review"
                  />
                </StackLayout>
                <label
                v-if="item.reviews_count != 0 "
                  textWrap="true"
                  :text="'review_count' | L(item.reviews_count)"
                  class="text-label m-l-5"
                  style="color:#5c687c;"
                />
                <!-- <Label
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
                /> -->
                
            </StackLayout>
        </StackLayout>
        </DockLayout>
    </StackLayout>
    </CardView>
</template>

<script>
import ItemListService from "./ItemListService";

export default {
  components:{
    ItemListService
  },
  props: {
    item: {}
  }
};
</script>

<style>
.container-list {
  width: 100%;
}

.star-review {
  width: 35px;
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
