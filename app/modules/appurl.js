import { get, set, appUrl } from "./store";
import { openPage } from "./appservice";

export function checkUrl() {
    const url = get(appUrl)
    if (url) {
        console.log('handling url', url);
        handleUrl(url)
        set(appUrl, '')
    }
}

function handleUrl(url) {
    var path = url.split('/')
    if (path[1] === 'patient') {
        if (path[2] === 'appointment') {
            
        }
    }
    console.log('url path', path)
}