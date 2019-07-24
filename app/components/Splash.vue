<template>
    <Page class="page" actionBarHidden="true">
        
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
import App from './App'
import Intro from './Intro'
import Phone from './login/Phone'
import * as auth from '~/modules/auth'
import { getString, getBoolean, setBoolean } from "tns-core-modules/application-settings" // Example Only

export default {
  data() {
    return {
    };
  },

  mounted() {
  if (auth.isLogin()) {
      console.log("to home App")
      setTimeout(() => {
          this.$navigateTo(App, {
            clearHistory:true
          });
      }, 500);
    } else {
      if (getBoolean("isFirst", true)) {
      console.log("to home Intro")
        setTimeout(() => {
            this.$navigateTo(Intro, {
              clearHistory:true
            });
        }, 500);
      } else {
        setTimeout(() => {
               console.log("to home Phone")
            this.$navigateTo(Phone, {
              clearHistory:true
            });
        
        }, 500);
      }
    }
  },
};
</script>
