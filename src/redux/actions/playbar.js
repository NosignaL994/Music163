
import {
    SET_PLAY_SONG, 
    SET_PLAYLIST,
    SET_PLAY_IDX,
    ADD_PLAY,
    SET_PLAY_URL,
    ADD_PLAYLIST } from "@/common/actionType"
import {getSongUrl,getSongsDetail,getPlaylistDetail} from "@/utils/request"
import {formatSongUrl} from "@/utils/format"
import {isAccessibleAction} from "@/redux/actions/common"


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

export function addPlayAction (track) {
    return isAccessibleAction(track, {
        type: ADD_PLAY,
        data: track
    })
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
        .then(songlist => getSongsDetail(songlist.trackIds))
        .then(songs => dispatch(setPlaylistAction(songs)))
        .catch(error => console.log(error))
} 