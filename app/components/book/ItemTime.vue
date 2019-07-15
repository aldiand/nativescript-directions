<template>
    <CardView dock="left" class="cardStyle" style="margin:15px;text-align:center;width:150px;" @tap="onItemTap(item)">
        <StackLayout :class="timeChoose" >
            <label :text="time" style="padding:15px;"/>
        </StackLayout>
    </CardView>
</template>

<style scoped>
    .available{
        color : #3DC1C3;
    }
    .choosen{
        background-color:#3DC1C3;
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
