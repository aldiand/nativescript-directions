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
    store.set(store.TOKEN, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI2LCJwaG9uZSI6Iis2MjgyMjE4MzIwNzA3IiwiaXNzIjoiaHR0cHM6Ly9yZWFkeWRvay5jb20vYXBpL3YxL2FuZHJvaWQvdmVyaWZ5IiwiaWF0IjoxNTUxNzI5OTA3LCJleHAiOjE1NTE5ODkxMDcsIm5iZiI6MTU1MTcyOTkwNywianRpIjoiYTFleWZBQnpQYVRoYlVUTSJ9.GCwEvGeKTYNBcnfdigc3ecp7g1DLJ6rQeGQj97Gjit4');
    store.set(store.USER_ID, 26);
    store.set(store.PATIENT_ID, '');
    store.set(store.REFRESH_TOKEN, 'R46V7BGECKQK4XF');
}