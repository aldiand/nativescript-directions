<template>
    <Page class="page">
        <ActionBar title="Lihat Pesan" backgroundColor="#03c1b8" color="#ffffff">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back"></NavigationButton>
            <ActionItem @tap="onTapShare" ios.systemIcon="9" ios.position="left"
                android.systemIcon="ic_menu_delete" android.position="actionBar" />
        </ActionBar>
        <ScrollView>
            <StackLayout class="detail-pesan">
                <TextView editable="false" marginBottom="15" marginTop="20"
                    marginLeft="20" marginRight="20">
                    <FormattedString>
                        <Span text="Dari......" />
                    </FormattedString>
                </TextView>
                <TextView editable="false" marginBottom="15" marginTop="20"
                    marginLeft="20" marginRight="20">
                    <FormattedString>
                        <Span text="Judul......" />
                    </FormattedString>
                </TextView>
                <TextView editable="false" marginBottom="15" marginTop="20"
                    marginLeft="20" marginRight="20">
                    <FormattedString>
                        <Span text="pesan................" />
                    </FormattedString>
                </TextView>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
export default {
    props: {
        messages: Object
    },
    methods: {
        
    },
};
</script>