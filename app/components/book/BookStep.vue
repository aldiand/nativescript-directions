<template>
    <StackLayout orientation="horizontal" style="margin-top:20px;">
        <StackLayout :class="classCircle1">
            <label text="1" style="padding-top:10px; padding-bottom:10px; padding-left:20px; padding-right:20px;"/>
        </StackLayout>
        <label verticalAlignment="center" style="width:220px;height:2px;background-color:#03c1b8;"/>
        <StackLayout :class="classCircle2">
            <label text="2" style="padding-top:10px; padding-bottom:10px; padding-left:20px; padding-right:20px;"/>
        </StackLayout>
        <label verticalAlignment="center" style="width:220px;height:2px;background-color:#03c1b8;"/>
        <StackLayout :class="classCircle3">
            <label text="3" style="padding-top:10px; padding-bottom:10px; padding-left:20px; padding-right:20px;"/>
        </StackLayout>
    </StackLayout>
</template>

<style scoped>
    .noActive{
        color:#03c1b8;
        border-width:1px;
        border-color:#03c1b8;
        border-radius:100%;
        font-size:14pt;
    
        font-weight:bold;
    }
    .active{
        color:#FFFFFF;
        border:1px;
        background-color: #03c1b8;
        border-color:#03c1b8;
        border-radius:100%;
    }
</style>

<script>
export default {
    props:{
        step:Number,
        classCircle1:{
            type:String,
            default:"noActive"
        },
        classCircle2:{
            type:String,
            default:"noActive"
        },
        classCircle3:{
            type:String,
            default:"noActive"
        }
    }
}
</script>
