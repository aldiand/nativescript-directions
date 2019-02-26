<template>
    <ActionBar flat="true" class="action-bar3">
      <NavigationButton v-if="back" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
      <StackLayout orientation="horizontal">
        <Label :text="title" fontSize="16" verticalAlignment="center"/>
      </StackLayout>
    </ActionBar>

</template>

<script>
export default {
    props:{
        title: "",
        back: {
          type: Boolean,
          default: true
        },
    }
}
</script>
