<template>
    <StackLayout>
        <Label :text="item.title" class="text-primary"/>
        <Label :text="item.clinic_name == '' ? item.doctor_name : item.clinic_name" class="text-primary"/>
        <Label :text="item.doctor_photo" class="text-primary"/>
        <Label :text="item.clinic_photo" class="text-primary"/>
        <Label :text="item.message" class="text-primary"/>
    </StackLayout>
</template>

<script>
export default {
    props: {
        item : {}
    }
};
</script>
