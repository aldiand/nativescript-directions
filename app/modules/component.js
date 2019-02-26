import Vue from 'nativescript-vue'
import AppBar from '../components/_app/AppBar'
import AppButton from '../components/_app/AppButton'
import AppButtonCancel from '../components/_app/AppButtonCancel'
import AppEmptyView from '../components/_app/AppEmptyView'
import AppLoadingView from '../components/_app/AppLoadingView'


export function setUpComponent(){
    Vue.component('AppBar', AppBar);
    Vue.component('AppButton', AppButton);
    Vue.component('AppButtonCancel', AppButtonCancel);
    Vue.component('AppEmptyView', AppEmptyView);
    Vue.component('AppLoadingView', AppLoadingView);
}