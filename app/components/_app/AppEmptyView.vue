<template>
  <StackLayout
    orientation="vertical"
    width="100%"
    height="100%"
    horizontalAlignment="center"
    verticalAlignment="center"
  >
    <Image  v-if="files" :src="'~/assets/images/' + files" width="100" height="100"/>
    <label :text="text" class="text-center text-main" marginTop="10"/>
    <Button v-if="button" class="btn btn-primary" width="50%" marginTop="10" text="Refresh" @tap="refresh"/>
  </StackLayout>
</template>

<script>
export default {
  props: {
    files: "",
    text: "",
    button: {
        type:Boolean,
        default:true
    },
  },
  methods: {
    refresh() {
      this.$emit("refresh");
    }
  }
};
</script>
