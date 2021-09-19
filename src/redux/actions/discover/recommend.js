import {
    getRequest,
    getPlaylistDetail,
    getToplistList,
    getWithCookie
    } from "@/utils/request"
import { 
    GET_BANNER_OVER,
    SET_RCMD_SONGLIST,
    SET_TOPLIST_LIST,
    SET_RCMD_NEW,
    ADD_TOPLIST,
    SET_SINGER_TOPLIST} from "@/common/actionType"


import { getSingerDetailAction } from "./singer"

export const getBannerAction = () => dispatch => {
    getRequest('/banner')
    .then(response => dispatch({
            type: GET_BANNER_OVER,
            data: response.data.banners
        }))
    .catch(error => console.log(error))
}


export function getRcmdSongListAction () {
    return dispatch => getRequest('/personalized', {
        limit: 8
    })
    .then(response => dispatch({
            type: SET_RCMD_SONGLIST,
            data: response.data.result
        }))
    .catch(error => console.log(error))
}
export function getRcmdToplistAction () {
    return dispatch => {
        getToplistList().then(list => {
            dispatch({
                type: SET_TOPLIST_LIST,
                data: list
            })
            for (const toplist of list.slice(0,3)) {
                getPlaylistDetail(toplist.id).then(playlist => {
                    dispatch({
                        type: ADD_TOPLIST,
                        data: playlist
                    })
                })
            }
        }).catch(error => console.log(error))
    }
} 


export function getRcmdNewAction () {
    return dispatch => getRequest('/album/newest')
        .then(response => dispatch({
            type: SET_RCMD_NEW,
            data: response.data.albums
        }))
        .catch(error => console.log(error))
} 


export function getRcmdSingerAction () {
    return dispatch => getRequest('/top/artists')
    .then(response => {
        const artists = response.data.artists
        // console.log(artists);
        dispatch({
            type: SET_SINGER_TOPLIST,
            data: artists
        })
        for (const artist of artists.slice(0,5)) {
            dispatch(getSingerDetailAction(artist.id))
        }
    }).catch(error => console.log(error))
}

// RcmdPersonal
export function getPersonalSongListAction () {
    // const cookie = getCookie()
    return dispatch => getWithCookie("/recommend/resource").then(response => dispatch({
        type: SET_RCMD_SONGLIST,
        data: response.data.recommend
    }))
}
