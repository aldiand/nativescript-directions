import Vuex from 'vuex'
import Vue from 'nativescript-vue'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        doctorId: '',
        clinicId: '',
        date: '',
        time: '',
        service: '',
        bookingState: '',
        appointmentId: '',
        mydoctors: {},
        appointments: {},
        inbox: {},
        reminders: {},
    },
    mutations: {
        setDoctorId: (state, doctorId) => {
            console.log("data doctorId mutated");
            state.doctorId = doctorId;
        },
        setClinicId: (state, clinicId) => {
            console.log("data clinicId mutated");
            state.clinicId = clinicId;
        },
        setDate: (state, date) => {
            console.log("data date mutated");
            state.date = date;
        },
        setTime: (state, time) => {
            console.log("data time mutated");
            state.time = time;
        },
        setService: (state, service) => {
            console.log("data service mutated");
            state.service = service;
        },
        setBookingState: (state, bookingState) => {
            console.log("data bookingState mutated");
            state.bookingState = bookingState;
        },
        setAppointmentId: (state, appointmentId) => {
            console.log("data appointmentId mutated");
            state.appointmentId = appointmentId;
        },
        setMyDoctors: (state, mydoctors) => {
            console.log("data mydoctors mutated");
            state.mydoctors = mydoctors;
        },
        setMyAppointments: (state, appointments) => {
            console.log("data appointments mutated");
            state.appointments = appointments;
        },
        setMyInbox: (state, inbox) => {
            console.log("data inbox mutated");
            state.inbox = inbox;
        },
        setMyReminders: (state, reminders) => {
            console.log("data reminders mutated");
            state.reminders = reminders;
        },
    },

    getters: {
        getProfile: state => {
            return '';
        }
    }
    // plugins: [NSVuexPersistent]
})

Vue.prototype.$store = store;

export default store;