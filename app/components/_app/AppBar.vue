<template>

    <ActionBar flat="true" class="action-bar3">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back"></NavigationButton>
      <StackLayout orientation="horizontal">
        <Label :text="title" fontSize="14" verticalAlignment="center"/>
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
