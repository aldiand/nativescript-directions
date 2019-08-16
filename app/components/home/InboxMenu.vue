<template>
  <StackLayout orientation="vertical" width="100%">
    <Label :text="'inboxs' | L" textWrap="true" class="text-title"/>
    <SegmentedBar
      class="segmented-bar"
      :selectedIndex="tabIndex"
      @selectedIndexChange="onSelectTabItem"
    >
      <SegmentedBarItem :title="'starter_profile_message' | L" />
      <SegmentedBarItem :title="'reminders' | L" />
    </SegmentedBar>
    <StackLayout>
        <Frame id="inboxframe" ~inboxframe actionBarVisibility="never">
          <Inbox />
        </Frame>
    </StackLayout>
  </StackLayout>
</template>

<script>
import * as constant from "../../modules/constants";

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
