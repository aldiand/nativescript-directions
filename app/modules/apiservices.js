import * as store from './store'
const axios = require('axios');

export const URL = "https://readydok.com/";
export const BASE_URL = URL+"/api/android/v1/";
var dialogs = require("tns-core-modules/ui/dialogs");

var header = {
    'Authorization': 'Bearer ' + store.get(store.TOKEN, ''),
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

function refreshHeader() {
    header = {
        'Authorization': 'Bearer ' + store.get(store.TOKEN, ''),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'MOBILE-VERSION': '2.1.0',
    }
}

export function callApi(method, uri, data, success, error) {
    console.log(method, "requesting :" + uri);
    refreshHeader();
    axios(
        {
            method: method,
            "url": encodeURI(BASE_URL + uri),
            "data": data,
            timeout: 60 * 1000,
            "headers": header,
        }
    ).then(res => {
        console.log("Request success")
        if (res.status){
            success(res);
        }
        else {
            error("Network Error" );
            console.log(res);
        }
    }).catch(err => {
        console.log("error", err)
        error(err.response);
    });
}