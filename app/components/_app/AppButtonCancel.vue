<template>
  <Button
    :text="text"
    @tap="tap"
    :class="'btn btn-cancel' "
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
.btn-cancel {
background-color: #A4A4A4;
color: #fff;
}
button {
  border-radius: 24px;
  font-size: 14pt;
  font-family: FontAwesome;
}
</style>
