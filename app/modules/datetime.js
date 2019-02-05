const localize = require("nativescript-localize");
/**
 * The constant MONDAY.
 */
export const MONDAY = 1;
/**
 * The constant TUESDAY.
 */
export const TUESDAY = 2;
/**
 * The constant WEDNESDAY.
 */
export const WEDNESDAY = 3;
/**
 * The constant THURSDAY.
 */
export const THURSDAY = 4;
/**
 * The constant FRIDAY.
 */
export const FRIDAY = 5;
/**
 * The constant SATURDAY.
 */
export const SATURDAY = 6;
/**
 * The constant SUNDAY.
 */
export const SUNDAY = 7;

export function isToday(day) {
    var d = new Date();
    if (day == d.getDay+1 || (day == SUNDAY && d.getDay == 0)) {
        return true;
    }
    return false;
}

export function isTimeBetween(start, end) {
    var dt = new Date();

    var s = start.split(':');
    var dt1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), parseInt(s[0]), parseInt(s[1]), parseInt(s[2]));

    var e = end.split(':');
    var dt2 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), parseInt(e[0]), parseInt(e[1]), parseInt(e[2]));

    if (dt >= dt1 && dt <= dt2) {
        return true;
    }
    return false;
}

export function getDateString(day) {
    console.log("getDateString: " + day);
    switch (Number(day)) {
        case MONDAY:
            return localize('day_monday');
            break;
        case TUESDAY:
            return localize('day_tuesday');
            break;
        case WEDNESDAY:
            return localize('day_wednesday');
            break;
        case THURSDAY:
            return localize('day_thursday');
            break;
        case FRIDAY:
            return localize('day_friday');
            break;
        case SATURDAY:
            return localize('day_saturday');
            break;
        case SUNDAY:
            return localize('day_sunday');
            break;
    
        default:
            console.log("getDateString default returned");
            return "";
            break;
    }
    return false;
}

export function formatTime(time) {
    return time.substring(0, time.length - 3); // "12345.0"
}