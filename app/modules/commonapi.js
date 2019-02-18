import { Http } from '@billow/nsv-http'
import * as store from './store'
const axios = require('axios');

export let http = new Http({
    // Configure a base url for all requests
    baseUrl: "https://api.readydok.com/v1",
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
        { method: "PATCH", 
            "url": "https://api.readydok.com/v1/user/" + store.get(store.USER_ID) , 
        "data": data, 
        "headers": header }
    ).then(res => {
        success(res);
    }).catch(err => {
        error(err.response);
    });;

}