import  { LocalNotifications }  from "nativescript-local-notifications";
import { Color } from "tns-core-modules/color";

export function makeNotif(message) {
    LocalNotifications.hasPermission().then(
        function (granted) {
            if (!granted) {
                return;
            }
        }
    )

    var data = message.data;

    LocalNotifications.schedule([{
        id: Number(data.dataId),
        title: data.notificationTitle,
        body: data.notificationBody,
        badge: 1,
        color:new Color("#03c1b8"),
        bigTextStyle: true,
        interval: 'minute',
        channel: 'Notif', // default: 'Channel'
        data: data,
    }]).then(
        function () {
            console.log("Notification scheduled");
        },
        function (error) {
            console.log("scheduling error: " + error);
        }
    )

    LocalNotifications.addOnMessageReceivedCallback(
        function (notification) {
            console.log("Notification data: " + JSON.stringify(notification))
         }
    ).then(
        function() {
          console.log("Listener added");
        }
    )
}