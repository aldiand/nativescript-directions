<template>
    <Button :text="text" class="app-btn btn btn-primary" @tap="tap"></Button>
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
