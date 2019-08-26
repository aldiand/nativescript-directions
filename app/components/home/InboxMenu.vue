<template>
  <StackLayout orientation="vertical" width="100%">
    <Label :text="'inboxs' | L" textWrap="true" class="text-title m-b-16"/>
    <SegmentedBar
      class="segmented-bar m-16"
      :selectedIndex="tabIndex"
      @selectedIndexChange="onSelectTabItem"
    >
      <SegmentedBarItem :title="'starter_profile_message' | L" />
      <SegmentedBarItem :title="'reminders' | L" />
    </SegmentedBar>
    <StackLayout heigh="100%" style="background-color:blue;">
        <Frame id="inboxframe" ~inboxframe actionBarVisibility="never">
          <Inbox />
        </Frame>
    </StackLayout>
  </StackLayout>
</template>

<script>
import * as constant from "../../modules/constants";
import Reminder from "../inbox/Reminder"
import Inbox from "../inbox/Inbox"

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
  methods: { 
    onSelectTabItem(event) {
      console.log("index changed " + event.object.selectedIndex)
      switch(event.object.selectedIndex) {
        case 0:
          this.$navigateTo(Inbox, {
            frame: 'inboxframe',
            backstackVisible : false
          });
          break;
        case 1:
          this.$navigateTo(Reminder, {
            frame: 'inboxframe',
            backstackVisible : false
          });
          break;
      }
    },
  },
}
</script>
