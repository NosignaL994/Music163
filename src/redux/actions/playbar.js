
import {
    SET_PLAY_SONG, 
    SET_PLAYLIST,
    SET_PLAY_IDX,
    ADD_PLAY,
    SET_PLAY_URL } from "@/common/actionType"
import {getSongUrl,getSongsDetail,getPlaylistDetail} from "@/utils/request"
import {formatSongUrl} from "@/utils/format"
import {isAccessible} from "@/utils/common"

import {switchVipGuideVisibleAction} from "./vipguide"

export const setPlaySongAction = track => ({
    type: SET_PLAY_SONG,
    data: track
})
export const setPlaylistAction = playlist => ({
    type: SET_PLAYLIST,
    data: playlist
})

export const setPlayIdxAction = idx => ({
    type: SET_PLAY_IDX,
    data: idx
})

export function addPlayAction (track) {
    return {
        type: ADD_PLAY,
        data: track
    }
}
export function setPlayUrlAction (arg) {
    return isNaN(arg) ? {
            type: SET_PLAY_URL,
            data: arg
        } : dispatch => getSongUrl(arg)
        .then(url => url || Promise.reject())
        .then(url => dispatch({
            type: SET_PLAY_URL,
            data: url
        }), () => dispatch({
            type:SET_PLAY_URL,
            data: formatSongUrl(arg)
        })).catch(error => console.log(error))
}

export function getPlaylistAction (id) {
    return dispatch => getPlaylistDetail(id)
        .then(songlist => isAccessible(songlist.tracks[0]) ?
            getSongsDetail(songlist.trackIds) : Promise.reject("收费歌曲，无法播放"))
        .then(songs => dispatch(setPlaylistAction(songs)), () => dispatch(switchVipGuideVisibleAction()))
        .catch(error => console.log(error))
} 