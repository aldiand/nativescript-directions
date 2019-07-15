<template>
  <Page class="page">
    <AppBar :title="'activity_message_book' | L"/>
    <StackLayout>
        <Frame id="stepFrame" ~stepFrame actionBarVisibility="never">
          <SelectServices/>
        </Frame>
    </StackLayout>
  </Page>
</template>

<script>
import SelectTime from './SelectTime'
import SelectServices from './SelectServices'
import Confirmation from './Confirmation'

export default {
  components: {
    SelectTime,
    SelectServices,
    Confirmation
  }
}
</script>
