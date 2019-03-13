<template>
    <page class="page">
        <AppBar :title="'activity_about_title'|L" class="text-primary" />
        <StackLayout class="parent-container" orientation="vertical" >
            <Image src="~/assets/images/ic_actionbar.png" class="image-logo" verticalAlligment="center" />
            <Label :text="'about'|L" textWrap="true" verticalAlligment="center" style="margin-top:10px;text-align:center" />
        </StackLayout>    
    </page>
</template>

<style>

.parent-container {
  margin: 20;
}

.image-logo {
    width: 500px;
    height: 450px;
}

</style>