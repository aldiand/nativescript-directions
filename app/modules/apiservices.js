import * as store from './store'
const axios = require('axios');

export const BASE_URL = "https://readydok.com/api/v1/android/";

axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
})

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
    console.log("requesting :" + uri);
    refreshHeader();
    axios(
        {
            method: method,
            "url": BASE_URL + uri,
            "data": data,
            "headers": header
        }
    ).then(res => {
        if(res.status)
            success(res);
        else 
            error("Network Error");
    }).catch(err => {
        error(err.response);
    });
}