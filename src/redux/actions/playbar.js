
import {
    SET_PLAY_SONG, 
    SET_PLAYLIST,
    SET_PLAY_IDX,
    ADD_PLAY_SONG,
    SET_PLAY_URL,
    ADD_PLAYLIST } from "@/common/actionType"

import {
    SONG_URL_URI
} from "@/common/constant"
import {getRequest} from "@/utils/request"
import {isAccessibleAction} from "./common"


export function setPlaySongAction (track) {
    return isAccessibleAction(track,{
        type: SET_PLAY_SONG,
        data: track
    })
}
export function setPlaylistAction (tracks) {
    return isAccessibleAction(tracks[0],{
        type: SET_PLAYLIST,
        data: tracks
    })
}
export function addPlaylistAciton (tracks) {
    return isAccessibleAction(tracks[0],{
        type: ADD_PLAYLIST,
        data: tracks
    })
}
export const setPlayIdxAction = idx => ({
    type: SET_PLAY_IDX,
    data: idx
})

export function addPlaySongAction (track) {
    return isAccessibleAction(track, {
        type: ADD_PLAY_SONG,
        data: track
    })
}

export function setPlayUrlAction (url) {
    return {
        type: SET_PLAY_URL,
        data: url
    }
}
export function getAndSetPlayUrlAction (id) {
    return dispatch => getRequest(SONG_URL_URI, {id})
    .then(response => dispatch(setPlayUrlAction(response.data.data[0].url)))
    .catch(error => console.log(error))
}
