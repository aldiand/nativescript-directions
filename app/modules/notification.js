import { LocalNotifications } from "nativescript-local-notifications";
import { Color } from "tns-core-modules/color";
import { topmost } from 'tns-core-modules/ui/frame';
let LS = require("nativescript-localstorage");
import Vue from 'nativescript-vue'

export const NOTIFICATION = 'notification';

export const NEW_MESSAGE = '0';
export const APPOINTMENT_ACCEPTED = '1';
export const APPOINTMENT_ASSIGNED = '2';
export const APPOINTMENT_CANCELLED = '3';
export const APPOINTMENT_RESCHEDULED = '4';
export const TREATMENT_RECALL = '5';
export const TREATMENT_REMINDER = '6';
export const TREATMENT_REVIEW = '7';
export const ADDED_AS_PATIENT = '8';

export function makeNotif(message) {
    LocalNotifications.hasPermission().then(
        function (granted) {
            if (!granted) {
                return;
            }
        }
    )

    var data = message.data;

    if(!data) {
        return;
    }

    if (!data.notificationTitle) {
        return;
    }

    LocalNotifications.hasPermission().then(
        function(granted) {
          if(granted) {
            LocalNotifications.schedule([{
                id: Number(data.dataId),
                title: data.notificationTitle,
                body: data.notificationBody,
                badge: 1,
                color: new Color("#03c1b8"),
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
          }
        }
    )
}

export function handleNotification(data) {
    LS.setItemObject(NOTIFICATION, data.data);
}

export function executeNotif() {
    var data = LS.getItem(notification.NOTIFICATION);
    console.log("data notif " + JSON.stringify(data));
    if (!data) {
        return;
    }
    LS.setItemObject(notification.NOTIFICATION, false);
    switch (data.notificationType) {
        case notification.APPOINTMENT_ACCEPTED:
        case notification.APPOINTMENT_ASSIGNED:
        case notification.APPOINTMENT_CANCELLED:
        case notification.APPOINTMENT_RESCHEDULED:
            console.log("case", notification.APPOINTMENT_RESCHEDULED);
            setTimeout(() => {
                topmost().currentPage.__vuePageRef__.$navigateTo(
                    DetailAppointment,
                    {
                        transition: "slide",
                        props: {
                            id: data.dataId,
                            notificationType: data.notificationType
                        }
                    }
                );
            }, 0);
            break;
        case notification.TREATMENT_RECALL:
        case notification.TREATMENT_REMINDER:
            console.log("case", notification.TREATMENT_REMINDER);
            setTimeout(() => {
                topmost().currentPage.__vuePageRef__.$navigateTo(ReminderDetail, {
                    transition: "slide",
                    props: {
                        id: data.dataId,
                        notificationType: data.notificationType
                    }
                });
            }, 0);
            break;
        case notification.TREATMENT_REMINDER:
            console.log("case", notification.TREATMENT_REMINDER);
            setTimeout(() => {
                topmost().currentPage.__vuePageRef__.$navigateTo(ReminderDetail, {
                    transition: "slide",
                    props: {
                        id: data.dataId,
                        notificationType: data.notificationType
                    }
                });
            }, 0);
            break;

        default:
            console.log("notif not yet implemented", data.notificationType);
            break;
    }
}