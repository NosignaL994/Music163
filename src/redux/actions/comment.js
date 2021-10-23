import {getWithCookie,postWithCookie,getRequest} from "@/utils/request"
import {
    ADD_SONGLIST_HOT_COMMENT,
    ADD_SONGLIST_NEW_COMMENT,
    SWITCH_LIKE_COMMENT,
} from "@/common/actionType"
import {
    COMMENT_NEW_URI,
    COMMENT_LIKE_URI,
    PLAYLIST_COMMENT_URI,
    COMMENT_URI
} from "@/common/constant"
export function getNewCommentAction (id,offset=0,before,limit=20) {
    // console.log(id,offset,before,limit);
    return dispatch => getWithCookie(PLAYLIST_COMMENT_URI, {
        id,
        limit,
        offset,
        before
    }).then(response => {
        // console.log(response.data);
        const comments = response.data.comments
        dispatch({
            type: ADD_SONGLIST_NEW_COMMENT,
            data: {
                comments,
                id,
            }
        })
    }).catch(error => console.log(error))
}

export function getHotCommentAction (type,id,pageSize=15) {
    // console.log(111);
    return dispatch => getRequest(COMMENT_NEW_URI, {
        id,
        type,
        pageSize,
        sortType:2
    }).then(response => dispatch({
        type: ADD_SONGLIST_HOT_COMMENT,
        data: {
            comments:response.data,
            id
        }
    })).catch(error => console.log(error))
}

export function switchLikeCommentAction (type,keys,comment,index) {
    return dispatch => postWithCookie(COMMENT_LIKE_URI, {
        id:keys[1],
        cid: comment.commentId,
        t: comment.liked ? 2 : 1,
        type
    }).then(() => dispatch({
        type: SWITCH_LIKE_COMMENT,
        data: {
            keys,
            index
        }
    }))
    .catch(error => console.log(error))
    
}

export function commentAction (type,t,id,content) {
    return dispatch => postWithCookie(COMMENT_URI,{
        type,
        t,
        id,
        content
    }).then(() => dispatch(getNewCommentAction(id,type,1,)))
}
