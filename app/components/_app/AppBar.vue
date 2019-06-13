<template>
  <ActionBar class="action-bar3">
    <NavigationButton v-if="back" :visibility="back ? 'visible' : 'hidden'" android.systemIcon="ic_menu_back" v-on:tap="goHome ? goToHome() : $navigateBack()"></NavigationButton>
    <StackLayout orientation="horizontal">
      <Label :text="title" fontSize="16" verticalAlignment="center"/>
    </StackLayout>
  </ActionBar>
</template>
 
<script>
var frame = require('ui/frame');
import App from "~/components/App";
export default {
  props: {
    title: "",
    back: {
      type: Boolean,
      default: true
    },
    goHome: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goToHome() {
      this.$navigateTo(App, {
        transition: "slideRight",
        clearHistory: true
      });
    }
  }
};
</script>
