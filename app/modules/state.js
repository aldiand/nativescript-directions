import Vuex from 'vuex'
import Vue from 'nativescript-vue'
import * as apiCall from './commonapi'
import { ObservableArray } from 'tns-core-modules/data/observable-array'

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
        mydoctors: [],
        appointments: {
            data: new ObservableArray([]),
            busy: false
        },
        inbox: [],
        reminders: [],
        busy : false,
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
        setMyAppointments: (state, appointments, busy = false) => {
            console.log("data appointments mutated");
            // state.appointments.data.splice(0);
            if (appointments) {
                state.appointments.data = appointments;
            }
            state.appointments.busy = busy;
        },
        setMyInbox: (state, inbox) => {
            console.log("data inbox mutated");
            state.inbox = inbox;
        },
        setMyReminders: (state, reminders) => {
            console.log("data reminders mutated");
            state.reminders = reminders;
        },
        setBusy: (state, busy) => {
            console.log("data busy mutated");
            state.busy = busy;
        },
    },

    getters: {
        getProfile: state => {
            return '';
        }
    },

    actions: {
        refreshAppointment(context) {
            context.commit('setMyAppointments', [], true);
            apiCall.appointmentApi.getAppointment(
                success => {
                    context.commit('setMyAppointments', success.data.data, false);
                },
                error => {
                    context.commit('setMyAppointments', [], false);
                }
            )
        },
        refreshInbox(context) {
            apiCall.messageApi.getMessage(
                success => {
                    context.commit('setMyInbox', []);
                    context.commit('setMyInbox', success.data.data);
                    context.commit('setBusy', false);
                },
                error => {
                    context.commit('setMyInbox', []);
                    context.commit('setBusy', false);
                }
            )
        },
        refreshReminder(context) {
            apiCall.reminderApi.getReminder(
                success => {
                    context.commit('setMyReminders', success.data.data);
                    context.commit('setBusy', false);
                },
                error => {
                    context.commit('setMyReminders', []);
                    context.commit('setBusy', false);
                }
            )
        },
    }
    
})

Vue.prototype.$store = store;

export default store;