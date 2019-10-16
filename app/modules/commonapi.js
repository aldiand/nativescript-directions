import * as store from './store'
import * as service from './apiservices'

export function updateProfile(success, error) {
    if (store.get(store.USER_ID) == 0) {
        return;
    }

    var data = {
        first_name: store.get(store.FIRST_NAME, ""),
        last_name: store.get(store.LAST_NAME, ""),
        gender: store.get(store.GENDER, ""),
        location: store.get(store.LOCATION, ""),
        phone: store.get(store.PHONE, ""),
        fcm_token: store.get(store.FCM, ""),
        language: store.get(store.LANGUAGE, ""),
        email: store.get(store.EMAIL, ""),
        device_type: "ios"
    }
    var header = {
        'Authorization': 'Bearer ' + store.get(store.TOKEN, ''),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

    accountApi.updateProfile(data, success, error);
}

export const appointmentApi = {
    cancelAppointment(id, success, error) {
        console.log("call cancel appointment");
        service.callApi("DELETE", "appointments/" + id, {}, success, error);
    },
    cancelQueueAppointment(id, success, error) {
        console.log("call cancel appointment");
        service.callApi("DELETE", "queue_appointments/" + id, {}, success, error);
    },
    getAppointment(success, error) {
        console.log("call getAppointment");
        service.callApi("GET", "my/appointments/", {}, success, error);
    },
    getTodayAppointment(success, error) {
        console.log("call getTodayAppointment");
        service.callApi("GET", "my/appointments/today/", {}, success, error);
    },
    getAppointmentById(id, success, error) {
        console.log("call getAppointmentById");
        service.callApi("GET", "appointments/" + id, {}, success, error);
    },
    getBookingById(id, success, error) {
        console.log("call getBookingById");
        service.callApi("GET", "bookings/" + id, {}, success, error);
    },
    getQueueAppointmentById(id, success, error) {
        console.log("call getQueueAppointmentById");
        service.callApi("GET", "appointments/" + id, {}, success, error);
    },
    getQueueBookingById(id, success, error) {
        console.log("call getQueueBookingById");
        service.callApi("GET", "bookings/" + id, {}, success, error);
    },
    createBooking(doctor, clinic, selectedDate, selectedTime, selectedReason, notes, success, error) {
        console.log("call createBooking");
        service.callApi("POST", "bookings", {
            doctor_id: doctor,
            clinic_id: clinic,
            date: selectedDate,
            time: selectedTime,
            reason: selectedReason,
            notes: notes,
        }, success, error);
    },
    rescheduleAppointment(id, selectedDate, selectedTime, success, error) {
        console.log("call rescheduleAppointment");
        service.callApi("POST", "appointments/" + id + "/reschedule", {
            date: selectedDate,
            time: selectedTime,
        }, success, error);
    },
    rescheduleBookings(id, selectedDate, selectedTime, success, error) {
        console.log("call rescheduleAppointment");
        service.callApi("POST", "bookings/" + id + "/reschedule", {
            date: selectedDate,
            time: selectedTime,
        }, success, error);
    },
    rescheduleQueueAppointment(id, selectedDate, success, error) {
        console.log("call rescheduleAppointment");
        service.callApi("POST", "queue_appointments/" + id + "/reschedule", {
            date: selectedDate,
        }, success, error);
    },
    rescheduleQueueBookings(id, selectedDate, success, error) {
        console.log("call rescheduleAppointment");
        service.callApi("POST", "queue_bookings/" + id + "/reschedule", {
            date: selectedDate,
        }, success, error);
    },
    createQueue(doctor, clinic, selectedDate, selectedReason, notes, success, error) {
        console.log("call createQueue");
        service.callApi("POST", "queue_bookings", {
            doctor_id: doctor,
            clinic_id: clinic,
            date: selectedDate,
            reason: selectedReason,
            notes: notes,
        }, success, error);
    },
    availableQueue(doctor, clinic, selectedDate, success, error) {
        console.log("call availableQueue", doctor, clinic, selectedDate);
        service.callApi("GET", "queue_bookings/available_queues" + "?doctor_id=" + doctor +
            "&clinic_id=" + clinic + "&begin_date=" + selectedDate, {
                doctor_id: doctor,
                clinic_id: clinic,
                begin_date: selectedDate,
            }, success, error);
    },
}

export const reminderApi = {
    getReminder(success, error) {
        console.log("call getReminder");
        service.callApi("GET", "reminders", {}, success, error);
    },
    getReminderById(id, type, success, error) {
        console.log("call getReminderById " + type, id);
        service.callApi("GET", type + "/" + id, {}, success, error);
    },
}

export const messageApi = {
    sendMessage(data, success, error) {
        console.log("call sendMessage");
        service.callApi("POST", "messages", data, success, error);
    },
    getMessage(success, error) {
        console.log("call getMessage");
        service.callApi("GET", "messages", {}, success, error);
    },
    getMessageById(id, success, error) {
        console.log("call getMessageById " + id);
        service.callApi("GET", "messages/" + id, {}, success, error);
    },
    deleteMessage(id, success, error) {
        console.log("call deleteMessage " + id);
        service.callApi("DELETE", "messages/" + id, {}, success, error);
    },
    replyMessage(id, messageText, success, error) {
        console.log("call deleteMessage " + id);
        service.callApi("POST", "messages/" + id + "/reply", { message: messageText }, success, error);
    }
}

export const profileApi = {
    getClinicById(id, success, error) {
        console.log("call getClinicById " + id);
        service.callApi("GET", "clinics/" + id, {}, success, error);
    },
    getDoctorById(clinicId, doctorId, success, error) {
        console.log("call getDoctorById ");
        service.callApi("GET", "clinics/" + clinicId + "/doctor/" + doctorId, {}, success, error);
    },
}

export const accountApi = {
    register(phone, success, error) {
        console.log("call register ");
        service.callApi("POST", "account/register", { phone: phone }, success, error);
    },
    verify(phone, verify_token, success, error) {
        console.log("call verify ");
        service.callApi("POST", "account/register/verify", { phone: phone, verify_token: verify_token }, success, error);
    },
    profile(success, error) {
        console.log("call profile ");
        service.callApi("GET", "account/profile", {}, success, error);
    },
    updateProfile(profile = {}, success, error) {
        console.log("call updateProfile ", profile);
        service.callApi("PATCH", "account/profile", profile, success, error);
    },
    changePhone(phone, success, error) {
        console.log("call changePhone ");
        service.callApi("POST", "account/change_phone", { phone: phone }, success, error);
    },
    verifychangePhone(phone, change_token, success, error) {
        console.log("call verifychangePhone ");
        service.callApi("POST", "account/change_phone/verify", { phone: phone, change_token: change_token }, success, error);
    }
}

export const commonApi = {
    search(query, success, error) {
        console.log("call search query " + query);
        service.callApi("GET", "search?query=" + query, {}, success, error);
    },
    searchSuggestion(query, success, error) {
        console.log("call search query " + query);
        service.callApi("GET", "search/autocomplete?query=" + query, {}, success, error);
    },
}