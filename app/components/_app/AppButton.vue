<template>
    <Button :text="text" @tap="tap" 
          class="app-btn btn btn-primary"
          style="border-radius:10px;font-size:12pt"></Button>
</template>

<script>
export default {
    props:{
        text: ""
    },
    methods :{
        tap() {
            this.$emit('tap')
        }
    }
}
</script>

<style>
Button {
    border-radius:24px;
    font-size:14pt;
    font-family: FontAwesome;
}
</style>
