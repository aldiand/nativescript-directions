import { Http } from '@billow/nsv-http'
import * as store from './store'
import * as service from './apiservices'

const axios = require('axios');

export let http = new Http({
    // Configure a base url for all requests
    baseUrl: "https://readydok.com/api/v1/android",
    // Example headers, typically this is what we use when interacting with a Laravel Passport API.
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + store.get(store.TOKEN, '')
    }
});
export function updateProfile(success, error) {
    if (store.get(store.USER_ID) == 0) {
        return;
    }

    var data =
    {
        first_name: store.get(store.FIRST_NAME, ""),
        last_name: store.get(store.LAST_NAME, ""),
        gender: store.get(store.GENDER, ""),
        location: store.get(store.LOCATION, ""),
        phone: store.get(store.PHONE, ""),
        fcm_token: store.get(store.FCM, ""),
        language: store.get(store.LANGUAGE, ""),
        email: store.get(store.EMAIL, "")
    }
    var header = {
        'Authorization': 'Bearer ' + store.get(store.TOKEN, ''),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

    axios(
        {
            method: "PATCH",
            "url": "https://readydok.com/api/v1/android/user/" + store.get(store.USER_ID),
            "data": data,
            "headers": header
        }
    ).then(res => {
        success(res);
    }).catch(err => {
        error(err.response);
    });;

}

export const appointmentApi = {
    cancelAppointment(id, success, error) {
        console.log("call cancel appointment");
        service.callApi("DELETE", "appointments/" + id, {}, success, error);
    },
    getAppointmentById(id, success, error) {
        console.log("call getAppointmentById");
        service.callApi("GET", "appointments/" + id, {}, success, error);
    },
    getBookingById(id, success, error){
        console.log("call getBookingById");
        service.callApi("GET", "bookings/" + id, {}, success, error);
    },
    createBooking(doctor, clinic, selectedTime, selectedReason, success, error) {
        console.log("call createBooking");
        service.callApi("POST", "bookings", {
            doctor_id: doctor,
            clinic_id: clinic,
            time: selectedTime,
            reason: selectedReason,
        }, success, error);
    },
    rescheduleAppointment(id, selectedTime, success, error) {
        console.log("call rescheduleAppointment");
        service.callApi("POST", "bookings/"+ id + "/reschedule", {
            time: selectedTime,
        }, success, error);
    }

}