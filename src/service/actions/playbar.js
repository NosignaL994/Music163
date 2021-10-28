
import {
    SET_PLAY_SONG, 
    SET_PLAYLIST,
    SET_PLAY_IDX,
    ADD_PLAY_SONG,
    SET_PLAY_URL,
    ADD_PLAYLIST,
    SONG_URL_URI
} from "@/constant"

import request from "@/utils/request"
import { setBuyGuideShowAction } from "@/service/actions/buyguide"
import {switchVipGuideVisibleAction} from "@/service/actions/vipguide"


export function isAccessibleAction(track,action) {
    if (!track) return false
    switch (track.fee) {
        case 1:
            return switchVipGuideVisibleAction()
        case 4:
            return setBuyGuideShowAction()
        default:
            return action
    }
}
export function setPlaySongAction (track) {
    const action = {
        type: SET_PLAY_SONG,
        data: track
    }
    return isAccessibleAction(track,action)
}
export function setPlaylistAction (tracks) {
    const action =  {
        type: SET_PLAYLIST,
        data: tracks
    }
    return isAccessibleAction(tracks[0],action)
}
export function addPlaylistAciton (tracks) {
    const action = {
        type: ADD_PLAYLIST,
        data: tracks
    }
    return isAccessibleAction(tracks[0],action)
}

export function addPlaySongAction (track) {
    const action = {
        type: ADD_PLAY_SONG,
        data: track
    }
    return isAccessibleAction(track,action)
}

export function setPlayIdxAction (idx) {
    return {
        type: SET_PLAY_IDX,
        data: idx
    }
}



export function setPlayUrlAction (url) {
    return {
        type: SET_PLAY_URL,
        data: url
    }
}
export function getAndSetPlayUrlAction (id) {
    return dispatch => request.get(SONG_URL_URI, {id})
    .then(data => dispatch(setPlayUrlAction(data.data[0].url)))
}
