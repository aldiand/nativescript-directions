<template>
    <Button :text="text" class="app-btn btn btn-primary"></Button>
</template>

<script>
export default {
    props:{
        text: ""
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
