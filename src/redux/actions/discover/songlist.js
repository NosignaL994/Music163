import {getRequest} from "@/utils/request"

import {
    SET_HQ_SONGLIST,
    SET_HQ_SONGLIST_COUNT,
    SET_SONGLIST_CATEGORY} from "@/common/actionType"

export function getHQSonglistAction (limit=35,before) {
    return dispatch => getRequest("/top/playlist/highquality", before ? {
        limit,
        before
    } : {limit}).then(response => {
        dispatch({
            type: SET_HQ_SONGLIST_COUNT,
            data: response.data.total
        })
        dispatch({
            type: SET_HQ_SONGLIST,
            data: response.data.playlists
        })
    }).catch(error => console.log(error))
}

export function getSonglistCategoryAction () {
    return dispatch => getRequest("/playlist/catlist")
    .then(response => dispatch({
        type: SET_SONGLIST_CATEGORY,
        data: response.data
    })).catch(error => console.log(error))
}