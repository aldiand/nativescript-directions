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
