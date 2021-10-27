import axios from "axios"

import {BASE_URL, DEFAULT_REQUEST_TIMEOUT} from "@/constant"


const instance = axios.create({
    baseURL:BASE_URL,
    timeout:DEFAULT_REQUEST_TIMEOUT,
    withCredentials:true
})
instance.interceptors.response.use(response => response.data,error => console.log(error))

function get(url,params) {
    return instance.get(url,{params})
}
function post(url,params) {
    return instance.post(url,{params})
}
const request = {
    get,
    post
}
export default request

