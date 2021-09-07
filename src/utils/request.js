import axios from "axios";

import {BASE_URL, DEFAULT_REQUEST_TIMEOUT} from "@/common/constant"
// import { getCookie } from "./storage";
// const cookie = getCookie()
// const defaultParams = cookie ? {
//     cookie
// } : {}
export function getRequest (url, params) {
    return axios({
        url,
        baseURL: BASE_URL,
        method: "get",
        timeout: DEFAULT_REQUEST_TIMEOUT,
        params
    })
}

export function postRequest (url, params = {}) {
    return axios({
        url,
        baseURL: BASE_URL,
        method: "post",
        timeout: DEFAULT_REQUEST_TIMEOUT,
        params
    })
}