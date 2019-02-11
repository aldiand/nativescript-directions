<template>
    <Button :text="text" class="app-btn btn btn-primary"
    style="border-radius:24px;font-size:18pt"></Button>
</template>

<script>
export default {
    props:{
        text: ""
    }
}
</script>