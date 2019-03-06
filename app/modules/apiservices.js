import * as store from './store'
const axios = require('axios');

export const BASE_URL = "https://readydok.com/api/v1/android/";
export const header = {
    'Authorization': 'Bearer ' + store.get(store.TOKEN, ''),
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

export function callApi(method, uri, data, success, error) {
    console.log("requesting :" + uri);
    axios(
        {
            method: method,
            "url": BASE_URL + uri,
            "data": data,
            "headers": header
        }
    ).then(res => {
        success(res);
    }).catch(err => {
        error(err.response);
    });
}