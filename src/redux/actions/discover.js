import {getRequest,getPlaylistDetail,getToplistList,getSongsDetail} from "@/utils/request"
import { 
    GET_BANNER_OVER,
    SET_RCMD_SONGLIST,
    SET_TOPLIST_LIST,
    SET_RCMD_NEW,
    GET_RECOMMEND_SINGER_OVER,
    GET_RECOMMEND_ANCHOR_OVER,
    ADD_TOPLIST} from "@/common/actionType"

import {isAccessible} from "@/utils/common"
import {getCookie} from "@/utils/storage"

import {setPlaylistAction} from "@/redux/actions/playbar"
import {switchVipGuideVisibleAction} from "@/redux/actions/vipguide"

export const getBannerAction = () => dispatch => {
    getRequest('/banner')
    .then(response => dispatch({
            type: GET_BANNER_OVER,
            data: response.data.banners
        }))
    .catch(error => console.log(error))
}

// export const changeBannerAction = currentIdx => ({
//     type: CHANGE_BANNER,
//     data: currentIdx
// })

export const getRcmdSongListAction = () => dispatch => {
    getRequest('/personalized', {
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

export function getPlaylistAction (id) {
    return dispatch => getPlaylistDetail(id)
        .then(songlist => isAccessible(songlist.tracks[0]) ?
            getSongsDetail(songlist.trackIds) : Promise.reject("收费歌曲，无法播放"))
        .then(songs => dispatch(setPlaylistAction(songs)), () => dispatch(switchVipGuideVisibleAction()))
        .catch(error => console.log(error))
} 
export const getRecommendNewAction = () => dispatch => {
    getRequest('/album/newest')
    .then(response => dispatch({
        type: SET_RCMD_NEW,
        data: response.data.albums
    }))
    .catch(error => console.log(error))
}


export const getRecommendSingerAction = () => dispatch => getRequest('/top/artists', {
    limit: 5
})
    .then(response => dispatch({
        type: GET_RECOMMEND_SINGER_OVER,
        data: response.data.artists
    }))
    .catch(error => console.log(error))

export const getRecommendAnchorAction = () => dispatch => getRequest('/dj/toplist', {
    limit: 5
}).then(response => dispatch({
    type: GET_RECOMMEND_ANCHOR_OVER,
    data: response.data.toplist
})).catch(error => console.log(error))

// RcmdPersonal
export function getPersonalSongListAction () {
    const cookie = getCookie()
    return dispatch => getRequest("/recommend/resource", {
        cookie
    }).then(response => dispatch({
        type: SET_RCMD_SONGLIST,
        data: response.data.recommend
    }))
}

// 根据id获取歌单/榜单playlist
// export function getPlaylistAction (id,type) {
//     return dispatch => getPlaylistDetail(id).then(
//         response => dispatch({
//             type,
//             data: response.data.playlist
//         }).catch(error => console.log(error))
//     )
// }