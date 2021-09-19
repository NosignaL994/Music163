import {getRequest} from "@/utils/request"

import {
    SET_SONGLIST,
    SET_SONGLIST_COUNT,
    SET_SONGLIST_CATEGORY} from "@/common/actionType"

export function getSonglistAction (limit=35,offset) {
    return dispatch => getRequest("/top/playlist",{
        limit,
        offset
    }).then(response => {
        dispatch({
            type: SET_SONGLIST_COUNT,
            data: response.data.total
        })
        dispatch({
            type: SET_SONGLIST,
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