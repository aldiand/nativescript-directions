<template>
    <CardView dock="left" class="cardStyle" style="margin:15px;text-align:center;width:150px;" @tap="onItemTap(item)">
        <StackLayout :class="timeChoose" >
            <label :text="time" style="padding:15px;"/>
        </StackLayout>
    </CardView>
</template>

<style scoped>
    .available{
        color : #03c1b8;
    }
    .choosen{
        background-color:#03c1b8;
        color : #FFFFFF;
    }
    .notAvailable{
        background-color:#AAAAAA;
        color : #FFFFFF;
    }
</style>

<script>
export default {
    props:{
        time:"",
        timeChoose:{
            type:String,
            default:"available"
        }
    }
}
</script>
