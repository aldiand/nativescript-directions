import * as store from './store'
const axios = require('axios');

export const BASE_URL = "https://readydok.com/api/v1/android/";

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
    }
}

export function callApi(method, uri, data, success, error) {
    console.log(method, "requesting :" + uri);
    refreshHeader();
    axios(
        {
            method: method,
            "url": BASE_URL + uri,
            "data": data,
            "headers": header
        }
    ).then(res => {
        console.log(res)
        if (res.status){
            success(res);
        }
        else {
            error("Network Error");
        }
    }).catch(err => {
        console.log(err)
        error(err.response);
    });
}