<template>
  <Page class="page">
    <AppBar :title="'activity_message_book' | L"/>
    <StackLayout>
        <Frame id="stepFrame" ~stepFrame actionBarVisibility="never">
          <SelectServices v-if="$store.state.bookingState == constant.RESERVATION_TYPE_TIME || $store.state.bookingState == constant.RESERVATION_TYPE_QUEUE" :doctor="doctor"/>
          <SelectTime v-if="$store.state.bookingState == constant.RESERVATION_TYPE_TIME_RESCHEDULE " :doctor="doctor"/>
          <SelectQueueTime v-if="$store.state.bookingState == constant.RESERVATION_TYPE_QUEUE_RESCHEDULE" :doctor="doctor"/>
        </Frame>
    </StackLayout>
  </Page>
</template>

<script>
import * as constant from "../../modules/constants";
import SelectTime from './SelectTime'
import SelectServices from './SelectServices'
import Confirmation from './Confirmation'

export default {
  mounted() {
    
  },
  components: {
  },
  props: {
    doctor: {},
  },
  data() {
    return {
      constant: constant,
    }
  },
}
</script>
