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
        item : {
            profile_name: String,
            doctor_id: Number,
            photo_profile: String,
            type: String,
            specialty_id: Number,
            clinic_name: String,
            clinic_id: Number
        }
    }
};
</script>
