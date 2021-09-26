import {getRequest,getWithCookie} from "@/utils/request"

import {
    SET_TOP_ALL_SONGLIST,
    SET_SONGLIST_COUNT,
    SET_SONGLIST_CATEGORY,
    ADD_SONGLIST,
    SET_RCMD_SONGLIST,
    COMPLETE_SONGLIST_TRACKS,
    SET_LOGIN_RCMD_SONGLIST
} from "@/common/actionType"
import {
    SONGLIST_URI,
    RCMD_SONGLIST_URI,
    TOP_SONGLIST_URI,
    SONG_TRACK_URI,
    LOGIN_RCMD_SONGLIST_URI
} from "@/common/constant"
import {setPlaylistAction} from "@/redux/actions/playbar"
export function getTopSonglistAction (limit=35,offset) {
    return dispatch => getRequest(TOP_SONGLIST_URI,{
        limit,
        offset
    }).then(response => {
        dispatch({
            type: SET_SONGLIST_COUNT,
            data: response.data.total
        })
        dispatch({
            type: SET_TOP_ALL_SONGLIST,
            data: response.data.playlists
        })
    }).catch(error => console.log(error))
}
export function getRcmdSongListAction () {
    return dispatch => getRequest(RCMD_SONGLIST_URI, {
        limit: 8
    })
    .then(response => dispatch({
            type: SET_RCMD_SONGLIST,
            data: response.data.result
        }))
    .catch(error => console.log(error))
}

export function getLoginRcmdSonglistAction () {
    return dispatch => getWithCookie(LOGIN_RCMD_SONGLIST_URI)
    .then(response => dispatch({
        type: SET_LOGIN_RCMD_SONGLIST,
        data: response.data.recommend
    }))
    .catch(error => console.log(error))
}

export function getSonglistCategoryAction () {
    return dispatch => getRequest("/playlist/catlist")
    .then(response => dispatch({
        type: SET_SONGLIST_CATEGORY,
        data: response.data
    })).catch(error => console.log(error))
}

export function getAndPlaySonglistAction (id) {
    return dispatch => getSonglistAction(id)(dispatch)
        .then(tracks => {
            dispatch(setPlaylistAction(tracks))
        })
        .catch(error => console.log(error))
}
export function getSonglistAction (id) {
    return dispatch => getRequest(SONGLIST_URI,{id})
        .then(response => {
            dispatch({
                type: ADD_SONGLIST,
                data: response.data.playlist
            })
            return response.data.playlist
        }).then(async songlist => {
            let tracks = songlist.tracks
            if (songlist.tracks.length < songlist.trackIds.length) {
                tracks = await completeSonglistTracksAction(songlist)(dispatch)
            }
            return tracks
        }).catch(error => console.log(error))
}

export function completeSonglistTracksAction (songlist) {
    const length = songlist.tracks.length
    const id = songlist.id
    const trackIds = songlist.trackIds
    const ids = trackIds.slice(length).reduce((acc, trackId, idx) => {
        return idx === trackIds.length-length-1 ? acc + trackId.id : (acc + trackId.id + ',')
    }, '')
    return dispatch => getRequest(SONG_TRACK_URI,{ids})
        .then(response => {
            const songs = response.data.songs
            dispatch({
                type: COMPLETE_SONGLIST_TRACKS,
                data: {
                    tracks: songs,
                    id
                }
            })
            return [...songlist.tracks,...songs]
        }).catch(error => console.log(error)) 
}