<template>
    <Page class="page">
        
    </Page>
</template>

<script>
    export default {
        data() {
            return {
                listPickerGender: ["Laki-laki", "Perempuan"],
                listPickerLocation: ["Jakarta", "Bandung"],
                selectedGenderIndex: 0,
                selectedLocationIndex: 0,

                namaDepan: "",
                namaBelakang: "",
                email: ""
            };
        }
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
