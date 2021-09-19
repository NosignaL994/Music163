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

export async function getPlaylistDetail (id) {
    return getRequest("/playlist/detail", {id}).then(response => response.data.playlist)
}
export async function getToplistList () {
    return getRequest("/toplist").then(response => response.data.list)
}
export async function getSongsDetail (ids) {
    return getRequest("/song/detail", {ids: ids.reduce((acc, trackId, idx) => 
        idx === ids.length-1 ? acc + trackId.id : acc + trackId.id + ','
    , '')}).then(response => response.data.songs)
}
export async function getSongUrl (id) {
    return getRequest("/song/url", {id})
    .then(response => response.data.data[0].url)
}

export async function getSingerDetail (id) {
    // console.log(id);
    return getRequest("/artist/detail",{id})
    .then(response => response.data.data)
}