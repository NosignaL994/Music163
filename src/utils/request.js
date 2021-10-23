import axios from "axios";

import {BASE_URL, DEFAULT_REQUEST_TIMEOUT} from "@/common/constant"
// import {getCookie} from "./storage"
// const cookie = getCookie()
// axios.defaults.withCredentials = true

// console.log(cookie);
// if (cookie) document.cookie = cookie
export async function getRequest (url, params) {
    return axios({
        url,
        baseURL: BASE_URL,
        method: "get",
        timeout: DEFAULT_REQUEST_TIMEOUT,
        params
    })
}
export async function getWithCookie (url, params) {
    return axios({
        url,
        baseURL: BASE_URL,
        method: "get",
        timeout: DEFAULT_REQUEST_TIMEOUT,
        params,
        withCredentials:true
    })
}
export async function postRequest (url, params = {}) {
    return axios({
        url,
        baseURL: BASE_URL,
        method: "post",
        timeout: DEFAULT_REQUEST_TIMEOUT,
        params
    })
}
export async function postWithCookie (url, params) {
    return axios({
        url,
        baseURL: BASE_URL,
        method: "post",
        timeout: DEFAULT_REQUEST_TIMEOUT,
        params,
        withCredentials:true
    })
}

