/**
 *
 *  Example:
 *
 *  import MediqloAPI, { BASE_URL, BASE_API_VERSION, BASE_API_NAME } from './readydok_api';
 *
 *  const _api = new MediqloAPI();
 *
 *  function test(id, success, error) {
 *      _api.call('GET', `appointments/${id}`, success, error);
 *      // or
 *      _api.version('v1.1').call('GET', `appointments/${id}`, success, error);
 *  }
 *
 */

import * as store from './store'
const axios = require('axios');

export const BASE_URL = "https://readydok.com/api/";
export const BASE_API_VERSION = "v1";
export const BASE_API_NAME = "/android/";

export default class MediqloAPI {
    constructor() {
        this.api_version = BASE_API_VERSION;
        this.header = {
            'Authorization': 'Bearer ' + store.get(store.TOKEN, ''),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
    }

    version(version) {
        this.api_version = version ? version :  BASE_API_VERSION;
        return this;
    }

    resetVersion() {
        this.api_version = BASE_API_VERSION;
        return this;
    }

    refreshHeader() {
        this.header = Object.assign({}, this.header, {
            'Authorization': 'Bearer ' + store.get(store.TOKEN, '')
        });
        return this;
    }

    generateFullUrl(uri) {
        return `${BASE_URL}${this.api_version}${BASE_API_NAME}`;
    }

    call(method, uri, data, success, error) {
        this.refreshHeader();

        axios({
            method: method,
            "url": this.generateFullUrl(uri),
            "data": data,
            "headers": this.header
        }).then(res => {
            if (res.status)
                success(res);
            else 
                error("Network Error");
        }).catch(err => {
            error(err.response);
        });

        this.resetVersion();
    }
}
