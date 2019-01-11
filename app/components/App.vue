<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <StackLayout orientation="horizontal">
        <Image src="~/assets/images/ic_actionbar.png" height="40" verticalAlignment="center"/>
      </StackLayout>
    </ActionBar>
    <GridLayout rows="*, auto">
      <StackLayout row="0">
        <Label text="content"></Label>
      </StackLayout>
      <BottomNavigation
        row="1">
        <BottomNavigationTab :title="'home'|L" icon="ic_home"/>
        <BottomNavigationTab :title="'appointments'|L" icon="ic_no_appointment"/>
        <BottomNavigationTab :title="'inboxs'|L" icon="ic_mail_new"/>
        <BottomNavigationTab :title="'reminders'|L" icon="ic_reminder_new"/>
        <BottomNavigationTab :title="'accounts'|L" icon="ic_account_new"/>
      </BottomNavigation>
    </GridLayout>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hello World!"
    };
  }
};
</script>
