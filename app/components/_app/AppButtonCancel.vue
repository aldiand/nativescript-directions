<template>
  <Button
    :text="text"
    @tap="tap"
    :class="'btn btn-cancel' "
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
.btn-cancel {
background-color: #fff;
color: #9e9e9e;
}
button {
  border-radius: 24px;
  font-size: 14pt;
  font-family: FontAwesome;
}
</style>
