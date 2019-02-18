import { Http } from '@billow/nsv-http'
import * as store from './store'

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

    http.request(
        'PATCH',
        {
            url: "user/" + store.get(store.USER_ID),
            data: {
                first_name: store.get(store.PHONE, ""),
                last_name: store.get(store.PHONE, ""),
                gender: store.get(store.PHONE, ""),
                location: store.get(store.PHONE, ""),
                phone: store.get(store.PHONE, ""),
                fcm_token: store.get(store.PHONE, ""),
                language: store.get(store.PHONE, ""),
                email: store.get(store.PHONE, "")
            }
        },
        content => {
            success(content);
        },
        failed => {
            error(failed);
        }
    );
}