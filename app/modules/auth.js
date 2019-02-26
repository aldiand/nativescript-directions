import * as store from "./store"

export function login(data) {
    console.log(data.user_id + " dan " + data.patient_id);
    store.set(store.TOKEN, data.token);
    store.set(store.USER_ID, data.user_id);
    store.set(store.PATIENT_ID, data.patient_id);
    store.set(store.REFRESH_TOKEN, data.refresh_token);
}

export function logout() {
    store.remove(store.TOKEN);
    store.remove(store.USER_ID);
    store.remove(store.PATIENT_ID);
    store.remove(store.REFRESH_TOKEN);
}

export function isLogin() {
    console.log(store.get(store.TOKEN) + "length " + store.get(store.TOKEN).length );
    if (store.get(store.TOKEN) != "" && store.get(store.TOKEN).length > 0) {
        return true;
    }
    return false;
}


export function instantLogin() {
    store.set(store.TOKEN, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI1LCJwaG9uZSI6Iis2MjgxNTQyODAzMzAwIiwiaXNzIjoiaHR0cHM6XC9cL2FwaS5yZWFkeWRvay5jb21cL3YxXC92ZXJpZnkiLCJpYXQiOjE1NTA0MjY2NzQsImV4cCI6MTU1MDY4NTg3NCwibmJmIjoxNTUwNDI2Njc0LCJqdGkiOiI4ZTMzNmExN2IwODBiMDQxYjM0NGE1ZWNiOTQ0OGI2NiJ9.7aSM7KxApxVG-vGw9uRBY7GEJfPdjIxDvnHT1qnWO5w');
    store.set(store.USER_ID, 25);
    store.set(store.PATIENT_ID, '');
    store.set(store.REFRESH_TOKEN, 'R46V7BGECKQK4XF');
}