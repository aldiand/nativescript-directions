<template>
  <Button
    :text="text"
    @tap="tap"
    :class="'app-btn btn btn-primary' "
    style="border-radius:80;font-size:16pt; width:70%; font-weight:bold;text-transform: capitalize;"
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
