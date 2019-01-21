<template>
    <Page class="page">
        <ActionBar class="action-bar2" backgroundColor="#03c1b8">
            <StackLayout orientation="horizontal">
                <Label :text="'Edit Profile'|L" fontSize="24"
                    verticalAlignment="center" />
            </StackLayout>
        </ActionBar>
        <ScrollView>
                    <StackLayout class="parent-container" marginTop="15"
                        marginLeft="15" marginRight="15" marginBottom="15">
                        <StackLayout orientation="vertical" marginTop="15"
                            marginLeft="15" marginRight="15" marginBottom="15">
                            <Label text="Nama Depan" />
                            <TextField v-model="namaDepan" />
                        </StackLayout>
                        <StackLayout orientation="vertical" marginTop="15"
                            marginLeft="15" marginRight="15" marginBottom="15">
                            <Label text="Nama Belakang" />
                            <TextField v-model="namaBelakang" />
                        </StackLayout>
                        <StackLayout orientation="vertical" marginTop="15"
                            marginLeft="15" marginRight="15" marginBottom="15">
                            <Label text="Jenis Kelamin" />
                            <ListPicker :items="listPickerGender" v-model="selectedGenderIndex" />
                        </StackLayout>
                        <StackLayout orientation="vertical" marginTop="15"
                            marginLeft="15" marginRight="15" marginBottom="15">
                            <Label text="Lokasi" />
                            <ListPicker :items="listPickerLocation" v-model="selectedLocationIndex" />
                        </StackLayout>
                        <StackLayout orientation="vertical" marginTop="15"
                            marginLeft="15" marginRight="15" marginBottom="15">
                            <Label text="Email" />
                            <TextField v-model="email" />
                        </StackLayout>
                        <StackLayout style="margin-top:30;">
                            <Button text="Selesai" @tap="onSubmit" class="app-btn btn btn-primary"
                                v-bind:visibility="busy ? 'collapse': 'visible'"
                                backgroundColor="#03c1b8">
                            </Button>
                            <ActivityIndicator class="activity-indicator"
                                v-bind:busy="busy"></ActivityIndicator>
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