<template>
  <StackLayout orientation="vertical" width="100%" height="100%" 
    horizontalAlignment="center" verticalAlignment="center">
    <Label :text="text" class="text-danger" style="text-align:center"></Label>
    
  </StackLayout>
</template>

<script>
export default {
    props: {
        text: ""
    }
}
</script>
