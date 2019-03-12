import { LocalNotifications } from "nativescript-local-notifications";
import { Color } from "tns-core-modules/color";
import { topmost } from 'ui/frame';
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

    if (!data.notificationTitle) {
        return;
    }

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

export function handleNotification(data) {
    LS.setItemObject(NOTIFICATION, data.data);
    data = LS.getItem(NOTIFICATION);
    switch (data.notificationType) {
        case APPOINTMENT_ACCEPTED:
        case APPOINTMENT_ASSIGNED:
        case APPOINTMENT_CANCELLED:
        case APPOINTMENT_RESCHEDULED:
            console.log("case", APPOINTMENT_RESCHEDULED);
            setTimeout(() => {
                topmost().currentPage.__vuePageRef__.$navigateTo(DetailAppointment, {
                    transition: "slide",
                    props: {
                        id: data.dataId,
                        notificationType: data.notificationType
                    }
                });
            }, 0);
            break;
        case TREATMENT_RECALL:
        case TREATMENT_REMINDER:
            console.log("case", TREATMENT_REMINDER);
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
        case TREATMENT_REMINDER:
            console.log("case", TREATMENT_REMINDER);
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