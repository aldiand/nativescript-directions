<template>
    <Page class="page">
        <ActionBar class="action-bar2">
            <StackLayout orientation="horizontal">
                <Label :text="'sign_in'|L" fontSize="24" verticalAlignment="center" />
            </StackLayout>
        </ActionBar>
        <ScrollView>
            <StackLayout class="parent-container">
                <StackLayout orientation="vertical">
                    <Label text="Nama Depan" />
                    <TextField v-model="namaDepan" />
                </StackLayout>
                <StackLayout orientation="vertical">
                    <Label text="Nama Belakang" />
                    <TextField v-model="namaBelakang" />
                </StackLayout>
                <StackLayout orientation="vertical">
                    <Label text="Jenis Kelamin" />
                    <ListPicker :items="listPickerGender" v-model="selectedGenderIndex" />
                </StackLayout>
                <StackLayout orientation="vertical">
                    <Label text="Lokasi" />
                    <ListPicker :items="listPickerLocation" v-model="selectedLocationIndex" />
                </StackLayout>
                <StackLayout orientation="vertical">
                    <Label text="Email" />
                    <TextField v-model="email" />
                </StackLayout>
            </StackLayout>
        </ScrollView>
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
