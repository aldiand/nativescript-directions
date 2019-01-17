<template>
    <StackLayout>
        <Label :text="item.doctor" class="text-primary"/>
        <Label :text="item.photo_profile" class="text-primary"/>
        <Label :text="item.date" class="text-primary"/>
        <Label :text="item.time" class="text-primary"/>
        <Label :text="item.clinic" class="text-primary"/>
    </StackLayout>
</template>

<script>
export default {
    props: {
        item : {
            id: Number,
            type: String,
            doctor: String,
            doctor_id: Number,
            photo_profile: String,
            clinic: String,
            clinic_id: Number,
            date: String,
            time: String,
            address: String,
            status: String,
            reason: String,
            clinic_latitute: String,
            clinic_longitude: String,
        }
    }
};
</script>
