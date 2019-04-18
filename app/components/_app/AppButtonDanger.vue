<template>
  <Button
    :text="text"
    @tap="tap"
    :class="'app-btn btn btn-danger' "
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
.btn-danger {
    background-color: #ce4844;
    color: #fff;
}
</style>
