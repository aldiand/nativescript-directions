<template>
  <StackLayout orientation="horizontal" style="padding:10;width:100%;">
        <image :src="iconSrc" style="width:30;"/>
        <label :text="service" class="text-service" textWrap="true" verticalAlignment="center"/>    
  </StackLayout>
</template>

<style scoped>
    .text-service{
        font-size:13pt;
        font-weight:bold;
        color:rgb(82, 82, 82);
        margin-left:20px;
    }
</style>

<script>
export default {
  props: {
    iconSrc: "",
    service:""

  }
};
</script>
