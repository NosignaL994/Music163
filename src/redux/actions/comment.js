import {getRequest} from "@/utils/request"
import {ADD_SONGLIST_HOT_COMMENT} from "@/common/actionType"
export function getCommentAction (id,type,pageNo,cursor) {
    return dispatch => getRequest("/comment/new", {
        id,
        type,
        sortType: 3,
        pageNo,
        cursor
    })
}

export function getHotCommentAction (id,type,pageNo,cursor) {
    return dispatch => getRequest("/comment/new", {
        id,
        type,
        sortType: 2,
        pageNo,
        pageSize: 15,
        cursor
    }).then(response => dispatch({
        type: ADD_SONGLIST_HOT_COMMENT,
        data: response.data.data
    })).catch(error => console.log(error))
}