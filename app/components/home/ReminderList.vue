<template>
    <StackLayout>
        <Label :text="item.doctor" class="text-primary"/>
        <Label :text="item.photo_profile" class="text-primary"/>
        <Label :text="item.date" class="text-primary"/>
        <Label :text="item.time" class="text-primary"/>
        <Label :text="item.clinic" class="text-primary"/>
        <Label :text="item.appointment_id" class="text-primary"/>
    </StackLayout>
</template>

<script>
export default {
    props: {
        item : []
    }
};
</script>
