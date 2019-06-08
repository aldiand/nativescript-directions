import { setString, getString, setNumber, getNumber, hasKey, remove as removedata } from "tns-core-modules/application-settings"

export const FCM = 'fcm_token'
export const PHONE = 'phone'
export const TOKEN = 'token'
export const USER_ID = 'user_id'
export const REFRESH_TOKEN = 'refresh_token'
export const PATIENT_ID = 'patient_id'
export const PATIENT_ID_SIZE = 'patient_id_size'
export const FIRST_NAME = 'first_name'
export const LAST_NAME = 'last_name'
export const GENDER = 'gender'
export const LOCATION = 'location'
export const LANGUAGE = 'language'
export const EMAIL = 'email'

export function set(id, value) {
    switch (id) {
        case FCM:
            setString(id, value);
            break;
        case PHONE:
            setString(id, value);
            console.log("saved " + id + ": " + get(id));
            break;
        case TOKEN:
            setString(id, value);
            console.log("saved " + id + ": " + get(id));
            break;
        case USER_ID:
            setNumber(id, value);
            console.log("saved " + id + ": " + get(id));
            break;
        case REFRESH_TOKEN:
            setString(id, value);
            console.log("saved " + id + ": " + get(id));
            break;
        case PATIENT_ID:
            setNumber(PATIENT_ID_SIZE, value.length);
            for (let index = 0; index < value.length; index++) {
                const element = value[index];
                setNumber(PATIENT_ID + index, element);
            }
            console.log("saved " + id + ": " + get(id));
            break;
        default:
            setString(id, value);
            console.log("saved " + id + ": " + get(id));
            break;
    }
}

export function get(id) {
    switch (id) {
        case FCM:
            return getString(id, '');
            break;
        case PHONE:
            return getString(id, '');
            break;
        case TOKEN:
            return getString(id, '');
            break;
        case USER_ID:
            return getNumber(id, 0);
            break;
        case REFRESH_TOKEN:
            return getString(id, '');
            break;
        case PATIENT_ID:
            let size = getNumber(PATIENT_ID_SIZE, 0);
            var ids = [];
            for (let index = 0; index < size; index++) {
                const element = getNumber(PATIENT_ID + index, 0);
                ids.push(element);
            }
            return "";
            break;

        default:
            var x = getString(id, '');
            console.log('GET ' + id + ' value ' + x);
            return x;
    }
}

export function remove(key) {
    removedata(key);
}

export function check(key) {
    return hasKey(key);
}