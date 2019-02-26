<template>
    <Page class="page">
        
    </Page>
</template>

<script>
    export default {
        mounted() {
            console.log('hello');
        },
    };
</script>

<style scoped>
</style>


<script>
import App from '../App'
export default {
  data() {
    return {
    };
  },

  mounted() {
      this.goToMain();
  },

  methods: {
      goToMain() {
        this.$navigateTo(EditProfile, { clearHistory:true });
      }
  }
};
</script>
