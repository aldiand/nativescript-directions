<template>
  <StackLayout
    orientation="vertical"
    width="100%"
    height="100%"
    horizontalAlignment="center"
    verticalAlignment="center"
  >
    <Image :src="'~/assets/images/' + files" width="100" height="100"/>
    <label :text="text" class="text-center text-main" marginTop="10"/>
    <Button class="btn btn-primary" marginTop="10" text="Refresh" @tap="refresh"/>
  </StackLayout>
</template>

<script>
export default {
  props: {
    files: "",
    text: ""
  },
  methods: {
    refresh() {
      this.$emit("refresh");
    }
  }
};
</script>
