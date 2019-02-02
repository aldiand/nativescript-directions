<template>
    <StackLayout>
        <Label :text="item.profile_name" class="text-primary"/>
        <Label :text="item.doctor_id" class="text-primary"/>
        <Label :text="item.photo_profile" class="text-primary"/>
        <Label :text="item.type" class="text-primary"/>
        <Label :text="item.clinic_name" class="text-primary"/>
    </StackLayout>
</template>

<script>
export default {
    props: {
        item : {}
    }
};
</script>
