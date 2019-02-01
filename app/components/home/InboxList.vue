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
        item : {
            doctor_id: Number,
            clinic_id: Number,
            clinic: String,
            message: String,
            title: String,
            id: Number,
            doctor_name: String,
            doctor_photo: String,
            clinic_name: String,
            clinic_photo: String,
            created_at: String,
            to_patient_desc: String,
        }
    }
};
</script>
