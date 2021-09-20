
import {
    SET_PLAY_SONG, 
    SET_PLAYLIST,
    SET_PLAY_IDX,
    ADD_PLAY,
    SET_PLAY_URL,
    ADD_PLAYLIST } from "@/common/actionType"
import {getSongUrl,getSongsDetail,getPlaylistDetail} from "@/utils/request"
import {formatSongUrl} from "@/utils/format"
import {isAccessible} from "@/utils/common"

import {switchVipGuideVisibleAction} from "./vipguide"

export function setPlaySongAction (track) {
    return (isAccessible(track)) ? {
            type: SET_PLAY_SONG,
            data: track
        } : switchVipGuideVisibleAction()
}
export function setPlaylistAction (tracks) {
    return (isAccessible(tracks[0])) ? {
        type: SET_PLAYLIST,
        data: tracks
    } : switchVipGuideVisibleAction()
}
export function addPlaylistAciton (tracks) {
    return (isAccessible(tracks[0])) ? {
        type: ADD_PLAYLIST,
        data: tracks
    } : switchVipGuideVisibleAction()
}
export const setPlayIdxAction = idx => ({
    type: SET_PLAY_IDX,
    data: idx
})

export function addPlayAction (track) {
    return (isAccessible(track)) ? {
        type: ADD_PLAY,
        data: track
    } : switchVipGuideVisibleAction()
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