import Vue from 'nativescript-vue'
import AppBar from '../components/_app/AppBar'
import AppButton from '../components/_app/AppButton'


export function setUpComponent(){
    Vue.component('AppBar', AppBar);
    Vue.component('AppButton', AppButton);
}