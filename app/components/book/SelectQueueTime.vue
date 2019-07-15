<template>
  <Page class="page">
    <AppBar :title="'activity_message_book' | L"/>
    <StackLayout>
        <Frame id="stepFrame" ~stepFrame actionBarVisibility="never">
          <Page>
            <GridLayout height="100%" rows="*, auto">
              <StackLayout row="0">
                <BookStep 
                  horizontalAlignment="center" 
                  classCircle1="active"
                  classCircle2="noActive"
                  classCircle3="noActive"/>
                <StackLayout orientation="vertical" style="text-align:center;margin:5;">
                  <label :text="'starter_queue_status'|L" class="h3 label-title" style="font-weight:bold;"/>
                  <label :text="'starter_queue_status_description'|L" class="description-label"/>    
                </StackLayout>
                <CardView margin="5" elevation="1" radius="1" width="100%">
                  <DockLayout stretchLastChild="true" style="padding:15px;"
                      horizontalAlignment="center" width="100%">
                    <image
                      src="~/assets/images/left-arrow.png"
                      class="next-btn"
                      dock="left"
                      @tap="change('prev')"
                    ></image>
                    <image
                      src="~/assets/images/right-arrow.png"
                      class="next-btn"
                      dock="right"
                      @tap="change('next')"
                    ></image>
                    <label
                      :text="stringDate"
                      class="h4 label-title text-main"
                      dock="center"
                      horizontalAlignment="center"
                      verticalAlignment="center"
                    />
                  </DockLayout>
                </CardView>
                <StackLayout style="padding-left:15;padding-right:15;">
                  <CardView margin="15" elevation="3" radius="3" width="100%">
                    <StackLayout orientation="vertical" style="text-align:center;padding:15;">
                      <label :text="'starter_queue_available'|L" class="h5 label-title"/>
                      <label text="18" class="h2 label-title text-main" style="color:#03c1b8;font-weight:bold;"/>    
                    </StackLayout>
                  </CardView>
                </StackLayout>
              </StackLayout>
              <StackLayout row="1" orientation="horizontal" style="height:120px;width:100%;margin-bottom:30px;">
                  <!-- <Button
                    class="btn btn-next-prev"
                    :text="'starter_btn_prev'|L"
                  />
                  <Button
                    class="btn btn-next-prev"
                    :text="'starter_btn_next'|L"
                  /> -->
              </StackLayout>
            </GridLayout>
          </Page></Frame>
    </StackLayout>
  </Page>
</template>

<style scoped>
.container-schedule {
  padding: 25px;
  border-width: 2px;
  border-color: #03c1b8;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-weight: bold;
}
.container-schedule-off {
  border-color: #a2a2a2;
  color: #a2a2a2;
}
.schedule-time {
  padding-top: 20px;
  padding-bottom: 20px;
  width: 200px;
  vertical-align: middle;
  text-align: center;
  border-width: 3px;
  margin-left:5;
  margin-bottom: 15px;
  border-radius: 7px;
}
.schedule-time:highlighted {
  background-color: #02918a;
}

.active-schedule-time {
  border-color: #03c1b8;
  color: #ffffff;
  background-color: #03c1b8;
}
.off-schedule-time {
  border-color: #a2a2a2;
  color: #a2a2a2;
}
.next-btn {
  width: 50px;
  width: 50px;
  margin: 10px;
  padding: 20px;
}
</style>

<script>
import * as dt from "~/modules/datetime";
import SelectServices from "./SelectServices";
import BookStep from "./BookStep";
import ItemTime from "./ItemTime";
import localize from 'nativescript-localize';
var moment = require("moment");

export default {
  components:{
    BookStep,
    ItemTime
  },
  data() {
    return {
      stringDate: ""
    };
  },
  mounted() {
    this.busy = false;
    setTimeout(() => {
      this.setDate();
    });
  },
  methods: {
    setDate() {
      this.stringDate = moment(this.date).format("ddd, D MMM YYYY");
    },
    change(state) {
      switch (state) {
        case "next":
          console.log("next date");
          this.date = moment(this.date)
            .add(1, "days")
            .format("YYYY-MM-DD");
          this.setDate();
          break;
        case "prev":
          console.log("next date");
          if (this.date == moment().format("YYYY-MM-DD")) {
            return;
          }
          this.date = moment(this.date)
            .subtract(1, "days")
            .format("YYYY-MM-DD");
          this.setDate();
          break;
        default:
          break;
      }
    }
  }
};
</script>
