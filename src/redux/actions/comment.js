
import {
    ADD_SONGLIST_HOT_COMMENT,
    ADD_SONGLIST_NEW_COMMENT,
    SWITCH_LIKE_COMMENT,
    COMMENT_NEW_URI,
    COMMENT_LIKE_URI,
    PLAYLIST_COMMENT_URI,
    COMMENT_URI
} from "@/constant"
import request from "@/utils/request"
export function getNewCommentAction (id,offset=0,before,limit=20) {
    // console.log(id,offset,before,limit);
    return dispatch => request.get(PLAYLIST_COMMENT_URI, {
        id,
        limit,
        offset,
        before
    }).then(data => {
        const comments = data.comments
        dispatch({
            type: ADD_SONGLIST_NEW_COMMENT,
            data: {
                comments,
                id,
            }
        })
    })
}

export function getHotCommentAction (type,id,pageSize=15) {
    return dispatch => request.get(COMMENT_NEW_URI, {
        id,
        type,
        pageSize,
        sortType:2
    }).then(data => dispatch({
        type: ADD_SONGLIST_HOT_COMMENT,
        data: {
            comments:data,
            id
        }
    }))
}

export function switchLikeCommentAction (type,keys,comment,index) {
    return dispatch => request.post(COMMENT_LIKE_URI, {
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
    
}

export function commentAction (type,t,id,content) {
    return dispatch => request.post(COMMENT_URI,{
        type,
        t,
        id,
        content
    }).then(() => dispatch(getNewCommentAction(id,type,1,)))
}
