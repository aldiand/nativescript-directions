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
    if (store.get(store.TOKEN) != "" && store.get(store.TOKEN).length > 0) {
        return true;
    }
    return false;
}