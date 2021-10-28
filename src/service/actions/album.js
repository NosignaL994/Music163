import request from "@/utils/request"
import {
    NEW_ALBUM_URI,
    
    SET_NEW_ALBUMS,
    ADD_ALBUM
} from "@/constant"

export function getNewAlbumAction () {
    return dispatch => request.get(NEW_ALBUM_URI)
        .then(data => dispatch({
            type: SET_NEW_ALBUMS,
            data: data.albums
        }))
    }
export function getAlbumAction (id) {
    return dispatch => request.get("album", {id})
    .then(data => dispatch({
            data: data,
            type: ADD_ALBUM
        }))
}