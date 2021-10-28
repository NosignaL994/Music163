import request from "@/utils/request"

import {
    SET_TOP_SONGLIST,
    SET_TOP_CATEGORY,
    ADD_SONGLIST,
    SET_RCMD_SONGLIST,
    COMPLETE_SONGLIST_TRACKS,
    SET_LOGIN_RCMD_SONGLIST,
    SONGLIST_URI,
    RCMD_SONGLIST_URI,
    TOP_SONGLIST_URI,
    SONG_TRACK_URI,
    LOGIN_RCMD_SONGLIST_URI,
    SONGLIST_CAT_URI
} from "@/constant"
// import {setPlaylistAction} from "@/service/actions/playbar"
export function getTopSonglistAction (limit=35,offset,cat,order) {
    return dispatch => request.get(TOP_SONGLIST_URI,{
        limit,
        offset,
        cat,
        order
    }).then(data => dispatch({
            type: SET_TOP_SONGLIST,
            data: {
                response: data,
                order
            }
        }))
}
export function getRcmdSongListAction () {
    return dispatch => request.get(RCMD_SONGLIST_URI, {
        limit: 8
    })
    .then(data => dispatch({
            type: SET_RCMD_SONGLIST,
            data: data.result
        }))
}

export function getLoginRcmdSonglistAction () {
    // console.log(111222);
    return dispatch => request.get(LOGIN_RCMD_SONGLIST_URI)
    .then(data => dispatch({
        type: SET_LOGIN_RCMD_SONGLIST,
        data: data.recommend
    }))
}

export function getSonglistCategoryAction () {
    // console.log(123);
    return dispatch => request.get(SONGLIST_CAT_URI)
    .then(data => dispatch({
        type: SET_TOP_CATEGORY,
        data
    }))
}


export function getSonglistAction (id) {
    return dispatch => request.get(SONGLIST_URI,{id})
        .then(data => dispatch({
                type: ADD_SONGLIST,
                data: data.playlist
            }))
}

export function completeSonglistTracksAction (songlist) {
    const length = songlist.tracks.length
    const id = songlist.id
    const trackIds = songlist.trackIds
    const ids = trackIds.slice(length).reduce((acc, trackId, idx) => {
        return idx === trackIds.length-length-1 ? acc + trackId.id : (acc + trackId.id + ',')
    }, '')
    return dispatch => request.get(SONG_TRACK_URI,{ids})
        .then(data => {
            const songs = data.songs
            dispatch({
                type: COMPLETE_SONGLIST_TRACKS,
                data: {
                    tracks: songs,
                    id
                }
            })
        })
}