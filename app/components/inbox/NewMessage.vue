<template>
    <Page class="page">
        <ActionBar title="Pesan" backgroundColor="#03c1b8" color="#ffffff">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back"></NavigationButton>
            <ActionItem @tap="onTapShare" ios.systemIcon="9" ios.position="left"
                android.systemIcon="ic_menu_send" android.position="actionBar" />
            <ActionItem @tap="onTapDelete" ios.systemIcon="16" ios.position="right"
                text="Tambah Dari Kontak" android.position="popup" />
        </ActionBar>>
        <ScrollView>
            <StackLayout>
                <StackLayout marginBottom="15" marginTop="20" marginLeft="20"
                    marginRight="20">
                    <label text="Kepada:" />
                    <TextField id="kepada"  />
                </StackLayout>
                <StackLayout marginBottom="15" marginTop="5" marginLeft="20"
                    marginRight="20">
                    <label text="Nomor Telepon" />
                    <TextField id="nmrtlpn" />
                </StackLayout>
                <Stacklayout marginBottom="15" marginTop="5" marginLeft="20"
                    marginRight="20">
                    <Label text="Judul" />
                    <TextField id="judul" />
                </Stacklayout>
                <StackLayout marginBottom="15" marginTop="15" marginLeft="20"
                    marginRight="20">
                    <Label text="Ketik Pesan Anda" />
                    <TextView editable="true" />
                </StackLayout>
                
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    export default {
        methods: {
            onButtonTap() {
                console.log("Button was pressed");
            }
        },

        data() {
            return {
                textFieldValue: ""
            };
        }
    };
</script>

<style scoped>
    .Kepada {
        font-size: 20;
    }

    .description-label {
        margin-bottom: 15;
    }
</style>