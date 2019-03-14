<template>
  <Button
    :text="text"
    @tap="tap"
    :class="'app-btn btn btn-warning' "
    style="border-radius:10px;font-size:12pt"
  ></Button>
</template>

<script>
export default {
  props: {
    text: "",
  },
  methods: {
    tap() {
      this.$emit("tap");
    }
  }
};
</script>

<style scoped>
.btn-warning {
    background-color: #e0a800;
    color: #fff;
}
</style>
