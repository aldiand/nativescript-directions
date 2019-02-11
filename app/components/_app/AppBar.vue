<template>
    <ActionBar class="action-bar2" >
        <StackLayout orientation="horizontal"
            ios:horizontalAlignment="center"
            android:horizontalAlignment="center">
            <Label :text="title" class="action-title"/>
        </StackLayout>
    </ActionBar>

</template>

<script>
export default {
    props:{
        title: ""
    }
}
</script>
